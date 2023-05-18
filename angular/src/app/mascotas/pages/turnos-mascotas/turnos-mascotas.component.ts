import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import {
  Mascota,
  RegisterMascotaRequest,
} from 'src/app/mascotas/interfaces/interfaces';
import { catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';
import { TurnoService } from 'src/app/services/turno.service';
import {
  Horarios,
  Motivos,
  SolicitudTurno,
} from 'src/app/libreta-sanitaria/interfaces/interfaces';

@Component({
  selector: 'app-turnos-mascotas',
  templateUrl: './turnos-mascotas.component.html',
  styleUrls: ['./turnos-mascotas.component.css'],
})
export class TurnosMascotasComponent {
  validador: Boolean;
  formulario: FormGroup;
  motivos: Motivos[] = [];
  horarios: Horarios[] = [];
  solicitud: SolicitudTurno;

  @Output() solicitudModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() idMascota: number;
  @Input() idUser: number;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private mascotaService: MascotaService,
    private turnoService: TurnoService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      motivo: ['', [Validators.required]],
      horario: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.turnoService.getMotivosTurno().subscribe((resp) => {
      resp.forEach((resp) => {
        this.motivos.push({ motivo: resp });
      });
    });
    this.turnoService.getHorariosTurno().subscribe((resp) => {
      resp.forEach((resp) => {
        this.horarios.push({ horario: resp });
      });
    });
  }

  isValidField(field: string) {
    return (
      this.formulario.controls[field].errors &&
      this.formulario.controls[field].touched
    );
  }

  getFieldError(field: string) {
    if (!this.formulario.controls[field]) return null;

    const errors = this.formulario.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
      }
    }
    return null;
  }

  guardar() {
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) return null;

    this.solicitud = this.formulario.value;
    this.solicitud.mascota = this.idMascota;
    this.solicitud.user = this.idUser;
    this.solicitud.horario = this.solicitud.horario['horario'];
    this.solicitud.motivo = this.solicitud.motivo['motivo'];

    return this.turnoService
      .setSolicitudTurno(this.solicitud)
      .pipe(
        map((resp: any) => resp as SolicitudTurno),
        catchError((e: any) => {
          this.messageService.add({
            severity: 'error',
            summary: `${e.error.mensaje}`,
            detail: `${e.error.error}`,
            closable: false,
          });
          return throwError(e);
        })
      )
      .subscribe((resp) => {
        this.router.navigateByUrl(`/clientes/${this.idUser}/${this.idMascota}`);
        this.solicitudModal.emit(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion completada',
          detail: `La solicitud fue enviada correctamente, espere la respuesta de la administracion`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.solicitudModal.emit(false);
  }
}
