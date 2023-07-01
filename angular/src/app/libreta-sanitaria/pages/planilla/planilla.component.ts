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
import { SolicitudAceptada, Turno } from 'src/app/turnos/interfaces/interfaces';
import {
  addDays,
  addYears,
  differenceInMonths,
  differenceInYears,
  format,
} from 'date-fns';
import { UserService } from 'src/app/services/user.service';
import { tr } from 'date-fns/locale';

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
  balance: any;
  protected inputHidden: Boolean = true;
  protected isButtonDisabled: Boolean = false;
  protected balanceModal: Boolean = false;

  @Output() planillaModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() turno: Turno;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private mascotaService: MascotaService,
    private turnoService: TurnoService,
    private router: Router,
    private userService: UserService
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
      if (value == 'DESPARASITACION') {
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
    this.formulario.patchValue({
      motivo: this.turno.motivo,
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

  //Se usa para sacar la edad de la mascota
  private formatearStringADate(string: String) {
    const partesFecha = string.split('-');

    const año = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1; // Resta 1 al mes porque los meses en JavaScript van de 0 a 11
    const día = parseInt(partesFecha[2], 10);

    return new Date(año, mes, día);
  }

  private restaFechaNacimientoYHoy(fechaNacimiento: Date) {
    const fechaActual = new Date();

    const años = differenceInYears(fechaActual, fechaNacimiento);
    const meses = differenceInMonths(fechaActual, fechaNacimiento) % 12;

    return { años, meses };
  }

  toggleBalanceModal(resp) {
    if (this.balanceModal == false) this.balance = resp;
    this.balanceModal = !this.balanceModal;
  }

  guardar() {
    this.isButtonDisabled = true;
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) {
      this.isButtonDisabled = false;
      return null;
    }
    this.planilla = this.formulario.value;

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

        //Aca arranca la parte de asignacion de turnos automaticos
        this.turnoService
          .getPlanillaByMascota(this.turno.mascota.id)
          .subscribe((resp) => {
            let cantTipoA = 0;
            let cantTipoB = 0;

            const parseDate = this.formatearStringADate(
              this.turno.mascota.fechaDeNacimiento
            );
            let edadMascota = this.restaFechaNacimientoYHoy(parseDate);
            for (let planilla of resp) {
              console.log(planilla);
              if (planilla.motivo == 'VACUNA_TIPO_A') cantTipoA++;
              if (planilla.motivo == 'VACUNA_TIPO_B') cantTipoB++;
            }

            const currentDate = new Date(this.turno.fecha); //toma la fecha del turno y despues le agrega 21 dias o 365 dependiendo de las condiciones para asignar el turno nuevo

            //Reutiliza la clase SolicitudAceptada para que envie la informacion al backend de como queremos que sea el turno

            if (
              (this.turno.motivo == 'VACUNA_TIPO_A') ||
              (this.turno.motivo == 'VACUNA_TIPO_B')
            ) {
              if (this.turno.motivo == 'VACUNA_TIPO_A') {
                console.log(cantTipoA, edadMascota.años == 0, edadMascota.meses < 4);
                //Pongo cantTipoA == 1 porque primero agrega la planilla, y despues evalua el turno, por lo que si es la primera vez que lo vacuna, siempre va a tener la cantidad de 1 planilla
                if (cantTipoA == 1 && edadMascota.años == 0 && edadMascota.meses < 4) {
                    let turno21dias: SolicitudAceptada = {
                      idMascota: this.turno.mascota.id,
                      idUser: this.turno.cliente.id,
                      fecha: addDays(currentDate, 21),
                      motivo: this.turno.motivo,
                      observaciones: this.turno.observaciones,
                    };

                    this.turnoService
                      .setTurnoAutomatico(turno21dias)
                      .subscribe((resp) => {
                        const currentUrl = this.router.url;
                        this.router
                          .navigateByUrl('/', { skipLocationChange: true })
                          .then(() => {
                            this.router.navigateByUrl(currentUrl);
                          });
                        this.userService
                          .withdrawBalance(
                            Number(this.planilla.monto),
                            this.turno.cliente.id
                          )
                          .subscribe((resp) => {
                            if (resp['final'] < 0) {
                              resp['final'] = resp['final'] * -1;
                            } else {
                              resp['final'] = 0;
                            }
                            this.messageService.addAll([
                              {
                                severity: 'success',
                                summary: 'Operacion completada',
                                detail:
                                  'Se registró la planilla y se asignó un nuevo turno dentro de 21 dias',
                                sticky: true,
                              },
                              {
                                severity: 'info',
                                summary: 'Cobro',
                                detail: ` Saldo anterior -> $${resp['antes']}\n
                       Monto de la practica -> $${resp['practica']}\n
                       Nuevo saldo -> $${resp['actual']} \n
                       Debe abonar -> $${resp['final']} \n

                     `,
                                sticky: true,
                              },
                            ]);
                          });
                        this.isButtonDisabled = false;
                      });

                } else {
                  let turno365dias: SolicitudAceptada = {
                    idMascota: this.turno.mascota.id,
                    idUser: this.turno.cliente.id,
                    fecha: addYears(currentDate, 1),
                    motivo: this.turno.motivo,
                    observaciones: this.turno.observaciones,
                  };

                  this.turnoService
                    .setTurnoAutomatico(turno365dias)
                    .subscribe((resp) => {
                      const currentUrl = this.router.url;
                      this.router
                        .navigateByUrl('/', { skipLocationChange: true })
                        .then(() => {
                          this.router.navigateByUrl(currentUrl);
                        });
                      this.userService
                        .withdrawBalance(
                          Number(this.planilla.monto),
                          this.turno.cliente.id
                        )
                        .subscribe((resp) => {
                          if (resp['final'] < 0) {
                            resp['final'] = resp['final'] * -1;
                          } else {
                            resp['final'] = 0;
                          }
                          this.messageService.addAll([
                            {
                              severity: 'success',
                              summary: 'Operacion completada',
                              detail:
                                'Se registró la planilla y se asignó un nuevo turno dentro de 365 dias',
                              sticky: true,
                            },
                            {
                              severity: 'info',
                              summary: 'Cobro',
                              detail: ` Saldo anterior -> $${resp['antes']}\n
                     Monto de la practica -> $${resp['practica']}\n
                     Nuevo saldo -> $${resp['actual']} \n
                     Debe abonar -> $${resp['final']} \n

                   `,
                              sticky: true,
                            },
                          ]);
                        });
                      this.isButtonDisabled = false;
                    });
                }
              }

              if (this.turno.motivo == 'VACUNA_TIPO_B') {
                let turno365dias: SolicitudAceptada = {
                  idMascota: this.turno.mascota.id,
                  idUser: this.turno.cliente.id,
                  fecha: addYears(currentDate, 1),
                  motivo: this.turno.motivo,
                  observaciones: this.turno.observaciones,
                };

                this.turnoService
                  .setTurnoAutomatico(turno365dias)
                  .subscribe((resp) => {
                    const currentUrl = this.router.url;
                    this.router
                      .navigateByUrl('/', { skipLocationChange: true })
                      .then(() => {
                        this.router.navigateByUrl(currentUrl);
                      });

                    this.userService
                      .withdrawBalance(
                        Number(this.planilla.monto),
                        this.turno.cliente.id
                      )
                      .subscribe((resp) => {
                        if (resp['final'] < 0) {
                          resp['final'] = resp['final'] * -1;
                        } else {
                          resp['final'] = 0;
                        }
                        this.messageService.addAll([
                          {
                            severity: 'success',
                            summary: 'Operacion completada',
                            detail:
                              'Se registró la planilla y se asignó un nuevo turno dentro de 365 dias',
                            sticky: true,
                          },
                          {
                            severity: 'info',
                            summary: 'Cobro',
                            detail: ` Saldo anterior -> $${resp['antes']}\n
                       Monto de la practica -> $${resp['practica']}\n
                       Nuevo saldo -> $${resp['actual']} \n
                       Debe abonar -> $${resp['final']} \n

                     `,
                            sticky: true,
                          },
                        ]);
                      });

                    this.isButtonDisabled = false;
                  });
              }
            } else {
              //Aca arranca la parte de "refresh" y mensaje de exito
              const currentUrl = this.router.url;
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigateByUrl(currentUrl);
                });

              this.userService
                .withdrawBalance(
                  Number(this.planilla.monto),
                  this.turno.cliente.id
                )
                .subscribe((resp) => {
                  if (resp['final'] < 0) {
                    resp['final'] = resp['final'] * -1;
                  } else {
                    resp['final'] = 0;
                  }
                  this.messageService.addAll([
                    {
                      severity: 'success',
                      summary: 'Operacion completada',
                      detail: 'La practica fue registrada correctamente',
                      sticky: true,
                    },
                    {
                      severity: 'info',
                      summary: 'Cobro',
                      detail: ` Saldo anterior -> $${resp['antes']}\n
                       Monto de la practica -> $${resp['practica']}\n
                       Nuevo saldo -> $${resp['actual']} \n
                       Debe abonar -> $${resp['final']} \n

                     `,
                      sticky: true,
                    },
                  ]);
                });

              this.isButtonDisabled = false;
            }
          });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.planillaModal.emit(false);
  }

  private guardado(idMascota) {}
}
