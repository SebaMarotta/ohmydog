import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
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
import {
  SolicitudAceptada,
  SolicitudPendiente,
} from '../../interfaces/interfaces';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turno-pendiente-aceptar',
  templateUrl: './turno-pendiente-aceptar.component.html',
  styleUrls: ['./turno-pendiente-aceptar.component.css'],
})
export class TurnoPendienteModalComponent implements OnInit {
  turno: SolicitudAceptada = {
    idMascota: 0,
    idUser: 0,
    idSolicitud: 0,
    fecha: undefined,
    motivo: '',
    observaciones: '',
  };
  validador: Boolean;
  formulario: FormGroup;
  minDate: Date;
  @Output() solicitudModal: EventEmitter<null> = new EventEmitter();

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() solicitud: SolicitudPendiente;

  protected isButtonDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private turnoService: TurnoService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      fecha: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.minDate = new Date();
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
        case 'email':
          return 'Formato de email inválido';
      }
    }
    return null;
  }

  guardar() {
    this.formulario.markAllAsTouched();
    this.isButtonDisabled = true;
    if (this.formulario.invalid) {
      this.isButtonDisabled = false;
      return null;
    }
    this.turno.idMascota = this.solicitud.mascota.id;
    this.turno.idUser = this.solicitud.user.id;
    this.turno.idSolicitud = this.solicitud.id;
    this.turno.motivo = this.solicitud.motivo;
    this.turno.fecha = this.formulario.value['fecha'];
    this.turno.observaciones = this.solicitud.observaciones;
    return this.turnoService
      .setTurno(this.turno)
      .pipe(
        map((resp: any) => resp as SolicitudAceptada),
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
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigateByUrl(`/turnos`);
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion completada',
          detail: `El turno fue creado correctamente`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.solicitudModal.emit();
  }
}
