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
  selector: 'app-turno-aceptar',
  templateUrl: './turno-aceptar.component.html',
  styleUrls: ['./turno-aceptar.component.css'],
})
export class TurnoAceptarComponent {
  turno: Turno;
  validador: Boolean;
  formulario: FormGroup;
  planillaModal: Boolean = false;
  @Output() turnoAceptadoModal: EventEmitter<null> = new EventEmitter();
  @Input() turnoAceptado: Turno;

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

  togglePlanilla() {
    this.planillaModal = !this.planillaModal;
  }

  cerrar(): void {
    this.turnoAceptadoModal.emit();
  }
}
