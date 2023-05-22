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

import { catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Motivos, RegisterPlanillaRequest } from '../../interfaces/interfaces';
import { DatePipe } from '@angular/common';
import { Turno } from 'src/app/turnos/interfaces/interfaces';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.css'],
})
export class PlanillaComponent implements OnInit {
  planilla: RegisterPlanillaRequest;
  validador: Boolean;
  formulario: FormGroup;
  motivos: Motivos[] = [];
  protected inputHidden: Boolean = true;

  @Output() planillaModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  @Input() turno: Turno;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private mascotaService: MascotaService,
    private turnoService: TurnoService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      motivo: ['', [Validators.required]],
      observaciones: [''],
      monto: ['', [Validators.required]],
      peso: [{ value: '', disabled: true }, Validators.required],
      cantidad: [
        { value: '', disabled: true },
        [Validators.required, Validators.min(0)],
      ],
    });

    this.formulario.get('motivo').valueChanges.subscribe((value) => {
      if (value.motivo === 'DESPARACITACION') {
        this.inputHidden = false;
        this.formulario.get('peso').enable();
        this.formulario.get('cantidad').enable();
      } else {
        this.inputHidden = true;
        this.formulario.get('peso').disable();
        this.formulario.get('cantidad').disable();
      }
    });
  }
  ngOnInit(): void {
    this.turnoService.getMotivosTurno().subscribe((resp) => {
      resp.forEach((resp) => {
        this.motivos.push({ motivo: resp });
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
        case 'email':
          return 'Formato de email inválido';
        case 'min':
          return `La cantidad minima es 0`;
      }
    }
    return null;
  }

  guardar() {
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) return null;

    this.planilla = this.formulario.value;
    this.planilla.motivo = this.planilla.motivo['motivo'];

    return this.turnoService
      .setPlanilla(this.planilla, this.turno.mascota.id)
      .pipe(
        map((resp: any) => resp as RegisterPlanillaRequest),
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
        this.turnoService
          .setTurnoCompletado(this.turno.id)
          .pipe(
            map((resp: any) => resp as RegisterPlanillaRequest),
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
            // Lo dejo vacio asi se activa pero no necesito que haga nada porque solo da de baja el turno en la base de datos
          });

        const currentUrl = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigateByUrl(currentUrl);
          });

        this.messageService.add({
          severity: 'success',
          summary: 'Operacion completada',
          detail: `El turno fue completado correctamente`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.planillaModal.emit(false);
  }

  private guardado(idMascota) {}
}
