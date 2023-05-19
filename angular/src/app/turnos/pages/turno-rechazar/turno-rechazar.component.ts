import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SolicitudPendiente, Turno } from '../../interfaces/interfaces';
import { TurnoService } from 'src/app/services/turno.service';
import { SolicitudRechazada } from '../../interfaces/interfaces';

@Component({
  selector: 'app-turno-rechazar',
  templateUrl: './turno-rechazar.component.html',
  styleUrls: ['./turno-rechazar.component.css'],
})
export class TurnoRechazarComponent {
  turno: SolicitudRechazada = {
    idSolicitud: 0,
    motivo: '',
  };
  validador: Boolean;
  formulario: FormGroup;
  @Output() turnoRechazadoModal: EventEmitter<null> = new EventEmitter();

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() turnoRechazado: Turno;

  isButtonDisabled: Boolean = false;

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
    this.isButtonDisabled = true;
    if (this.formulario.invalid) {
      this.isButtonDisabled = false;
      return null;
    }

    this.turno.idSolicitud = this.turnoRechazado.id;
    this.turno.motivo = this.formulario.value.motivo;

    return this.turnoService
      .setTurnoRechazado(this.turno)
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
        location.reload();
        this.turnoRechazadoModal.emit();
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion completada',
          detail: `El turno fue rechazado correctamente`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.turnoRechazadoModal.emit();
  }
}
