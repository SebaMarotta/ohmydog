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
import {
  SolicitudAceptada,
  SolicitudPendiente,
} from '../../interfaces/interfaces';
import { TurnoService } from 'src/app/services/turno.service';
import { SolicitudRechazada } from '../../interfaces/interfaces';

@Component({
  selector: 'app-turno-pendiente-rechazar',
  templateUrl: './turno-pendiente-rechazar.component.html',
  styleUrls: ['./turno-pendiente-rechazar.component.css'],
})
export class TurnoPendienteRechazarComponent {
  turno: SolicitudRechazada = {
    idSolicitud: 0,
    motivo: '',
  };
  validador: Boolean;
  formulario: FormGroup;
  @Output() solicitudRechazadaModal: EventEmitter<null> = new EventEmitter();

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() solicitud: SolicitudPendiente;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private turnoService: TurnoService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      motivo: ['', [Validators.required]],
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
        case 'email':
          return 'Formato de email inválido';
      }
    }
    return null;
  }

  guardar() {
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) return null;

    this.turno.idSolicitud = this.solicitud.id;
    this.turno.motivo = this.formulario.value.motivo;

    return this.turnoService
      .setSolicitudTurnoRechazado(this.turno)
      .pipe(
        map((resp: any) => resp as Boolean),
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
        this.solicitudRechazadaModal.emit();
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion completada',
          detail: `La solicitud fue rechazada correctamente`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.solicitudRechazadaModal.emit();
  }
}
