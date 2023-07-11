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
import {
  catchError,
  filter,
  forkJoin,
  map,
  of,
  takeWhile,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';
import { TurnoService } from 'src/app/services/turno.service';
import {
  Horarios,
  Motivos,
  SolicitudTurno,
} from 'src/app/libreta-sanitaria/interfaces/interfaces';
import { differenceInYears, differenceInMonths } from 'date-fns';

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
  solicitud: SolicitudTurno = {
    mascota: 0,
    user: 0,
    motivo: '',
    horario: '',
  };
  isButtonDisabled: Boolean = false;

  @Output() solicitudModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() idMascota: number;
  @Input() idUser: number;

  ok: boolean = true;
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
      observaciones: [''],
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

  formatoOpcion(motivo: Motivos) {
    // Realiza el formateo del motivo según tus necesidades
    return `Texto formateado: ${motivo.motivo}`;
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

  guardar() {
    const solicitudTurno$ = this.turnoService.getTurnosPendientes();
    const turnos$ = this.turnoService.getTurnos();
    const mascota$ = this.mascotaService.findById(this.idMascota);
    const planilla$ = this.turnoService.getPlanillaByMascota(this.idMascota);
    let menor2meses: boolean = false;
    let menor4meses: boolean = false;
    let solicitudEstablecida: boolean = false;
    let turnoEstablecido: boolean = false;
    let cantidadTipoA: number = 0;
    let cantidadTipoB: number = 0;
    let castrado: boolean = false;
    let tipoA: boolean = false;
    let tipoB: boolean = false;

    this.formulario.markAllAsTouched();
    this.isButtonDisabled = true;
    if (this.formulario.invalid) {
      this.isButtonDisabled = false;
      return null;
    }

    this.solicitud = this.formulario.value;
    this.solicitud.mascota = this.idMascota;
    this.solicitud.user = this.idUser;
    this.solicitud.horario = this.solicitud.horario['horario'];
    this.solicitud.motivo = this.solicitud.motivo['motivo'];


    forkJoin({
      solicitudTurno: solicitudTurno$,
      turnos: turnos$,
      mascota: mascota$,
      planillas: planilla$,
    })
      .pipe(
        filter(({ solicitudTurno, turnos, mascota, planillas }) => {
          // Comprobar si el usuario hizo una solicitud de turno
          solicitudEstablecida = solicitudTurno.some((solicitud) => {
            return (
              solicitud.user.id == this.solicitud.user &&
              solicitud.motivo == this.solicitud.motivo &&
              solicitud.mascota.id == this.solicitud.mascota &&
              solicitud.estado == true
            );
          });

          // Comprobar si al menos hay un turno asignado al usuario
          turnoEstablecido = turnos.some((turno) => {
            return (
              turno.cliente.id == this.solicitud.user &&
              turno.motivo == this.solicitud.motivo &&
              turno.mascota.id == this.solicitud.mascota &&
              turno.activo == true
            );
          });

          const fechaNacimiento = this.formatearStringADate(
            mascota.fechaDeNacimiento
          );

          const edad = this.restaFechaNacimientoYHoy(fechaNacimiento);

          if (
            this.solicitud.motivo == 'VACUNA_TIPO_A' &&
            edad.años == 0 &&
            edad.meses < 2
          ) {
            menor2meses = true;
          }

          if (
            this.solicitud.motivo == 'VACUNA_TIPO_B' &&
            edad.años == 0 &&
            edad.meses < 4
          ) {
            menor4meses = true;
          }

          if (this.solicitud.motivo == 'CASTRACION' && mascota.castrada) {
            castrado = true;
          }

          return (
            turnoEstablecido ||
            solicitudEstablecida ||
            menor2meses ||
            menor4meses ||
            castrado ||
            true
          );
        })
      )
      .subscribe((result) => {
        // El usuario ya hizo una solicitud de turno o tiene un turno asignado
        this.ok = false;
        this.cerrar();
        if (menor2meses) {
          return this.messageService.add({
            severity: 'error',
            summary: 'Solicitud inválida',
            detail: `Se necesita que el cachorro sea mayor a los 2 meses para la vacuna tipo A`,
            closable: false,
          });
        }

        if (menor4meses) {
          return this.messageService.add({
            severity: 'error',
            summary: 'Solicitud inválida',
            detail: `Se necesita que el cachorro sea mayor a los 4 meses para la vacuna tipo B`,
            closable: false,
          });
        }

        if (solicitudEstablecida) {
          return this.messageService.add({
            severity: 'error',
            summary: 'Solicitud inválida',
            detail: `Usted ya solicitó un turno para este motivo, espere la respuesta de la administración`,
            closable: false,
          });
        }
        if (turnoEstablecido) {
          return this.messageService.add({
            severity: 'error',
            summary: 'Solicitud inválida',
            detail: `Usted ya tiene un turno asignado para este motivo`,
            closable: false,
          });
        }
        if (tipoA) {
          return this.messageService.add({
            severity: 'error',
            summary: 'Solicitud inválida',
            detail: `La mascota ya tiene las dosis maximas de la vacuna tipo A`,
            closable: false,
          });
        }
        if (tipoB) {
          return this.messageService.add({
            severity: 'error',
            summary: 'Solicitud inválida',
            detail: `La mascota ya tiene las dosis maximas de la vacuna tipo B`,
            closable: false,
          });
        }
        if (castrado) {
          return this.messageService.add({
            severity: 'error',
            summary: 'Solicitud inválida',
            detail: `Su mascota ya está castrada`,
            closable: false,
          });
        }


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
            }),
            takeWhile(
              () =>
                !menor2meses &&
                !menor4meses &&
                !solicitudEstablecida &&
                !turnoEstablecido &&
                !castrado
            )
          )
          .subscribe((resp) => {
            const url = this.router.url;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigateByUrl(url);
              });
            this.solicitudModal.emit(false);
            this.messageService.add({
              severity: 'success',
              summary: 'Operacion completada',
              detail: `La solicitud fue enviada correctamente, espere la respuesta de la administracion`,
              closable: false,
            });
          });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.solicitudModal.emit(false);
  }
}
