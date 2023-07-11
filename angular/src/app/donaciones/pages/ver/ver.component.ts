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
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Donacion, DonacionResponse } from '../../interfaces/interface';

import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import {
  RegisterUserRequest,
  User,
} from 'src/app/clientes/interfaces/interfaces';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { Route, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { AdopcionService } from 'src/app/services/adopcion.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioDeTerceroService } from 'src/app/services/servicio-de-tercero.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DonacionesService } from 'src/app/services/donaciones.service';
import { fechaValidator } from '../../validators/fecha.validator';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent {

  @Output() cerrarModal: EventEmitter<Boolean> = new EventEmitter();
  @Input() donacion: Donacion;
  formulario: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  isButtonDisabled: boolean = false;

  constructor(
    private busquedaService: BusquedaService,
    private donacionService: DonacionesService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
  ) {}
  ngOnInit(){
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      numeroTarjeta: ['', [Validators.required]],
      vencimientoTarjeta: ['', [Validators.required,fechaValidator]],
      codSeguridad: ['', [Validators.required]],
      monto: ['', [Validators.required]],
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
        case 'customDate':
          return errors['customDate'].message;
      }
    }
    return null;
  }

  guardar() {
    let numeroTarjeta: number = this.formulario.value['numeroTarjeta'];
    let codSeguridad: number = this.formulario.value['codSeguridad'];
    let vencimientoTarjeta: number = this.formulario.value['vencimientoTarjeta'];
    let monto: number = this.formulario.value['monto'];
    let idCampana = this.donacion.id;
    let idCliente = this.authService.userSession.getValue().id;

    let fechaHoy = new Date();

    this.formulario.markAllAsTouched();
    this.isButtonDisabled = true;
    if (this.formulario.invalid) {
      this.isButtonDisabled = false;
      return null;
    }

    if (numeroTarjeta.toString().length != 19 ) {
      this.messageService.add({
        severity: 'error',
        summary: `Error`,
        detail: `La cantidad de digitos de la tarjeta debe ser 16`,
        closable: false,
      });
      this.isButtonDisabled = false;
      return null
    }

    if (codSeguridad.toString().length != 3 ) {
      this.messageService.add({
        severity: 'error',
        summary: `Error`,
        detail: `El codigo de seguridad debe ser de 3 digitos`,
        closable: false,
      });
      this.isButtonDisabled = false;
      return null;
    }

    if (monto <= 0 ) {
      this.messageService.add({
        severity: 'error',
        summary: `Error`,
        detail: `La cantidad a donar debe ser mayor a 0`,
        closable: false,
      });
      this.isButtonDisabled = false;
      return null;
    }


    return this.donacionService
      .registerDonacion(idCampana,idCliente,monto)
      .pipe(
        map((resp: any) => resp as DonacionResponse),
        catchError((e: any) => {
          this.messageService.add({
            severity: 'error',
            summary: `Error`,
            detail: `Hubo un error al momento de donar`,
            closable: false,
          });
          this.isButtonDisabled = false;
          return throwError(e);
        })
      )
      .subscribe((resp) => {
        const url = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigateByUrl(url);
          });
          if (idCliente != undefined){
          this.messageService.addAll([
            {
              severity: 'success',
              summary: 'Operacion completada',
              detail:
                'Se registró la donacion y se agregó un 20% de la donacion a su saldo!',
              sticky: true,
            },
            {
              severity: 'info',
              summary: 'Donacion',
              detail: ` Saldo anterior -> $${resp['saldoAnterior']}\n
     Saldo Actual -> $${resp['saldoActual']}\n
   `,
              sticky: true,
            },
          ]);} else {
            this.messageService.addAll([
              {
                severity: 'success',
                summary: 'Operacion completada',
                detail:
                  'Muchas gracias por colaborar con la campaña!',
                sticky: false,
              },

            ]);
          }
      });
  }
  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.cerrarModal.emit(false);
  }
}
