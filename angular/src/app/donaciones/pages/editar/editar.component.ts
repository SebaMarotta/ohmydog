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
  Razas,
  RegisterMascotaRequest,
} from 'src/app/mascotas/interfaces/interfaces';
import {
  catchError,
  filter,
  forkJoin,
  map,
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
import {
  Tipo,
  Zona,
} from '../../../servicios-de-terceros/interfaces/interfaces';
import { ServicioDeTerceroService } from 'src/app/services/servicio-de-tercero.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { AuthService } from 'src/app/services/auth.service';
import { CrearDonacion, Donacion, EditarDonacion } from '../../interfaces/interface';
import { DonacionesService } from 'src/app/services/donaciones.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

  @Output() modal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() donacion: Donacion;

  validador: Boolean;
  formulario: FormGroup;

  editarDonacion: EditarDonacion = {
    nombre: '',
    descripcion: '',
    objetivo: 0,
    id: 0,
    activa: false,
    fechaVencimiento: undefined
  }

  isButtonDisabled: Boolean = false;
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private servicioTerceroService: ServicioDeTerceroService,
    private router: Router,
    private mascotaService: MascotaService,
    private busquedaService: BusquedaService,
    private authService: AuthService,
    private donacionesService: DonacionesService

  ) {
    this.formulario = this.fb.group({

      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      objetivo: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
      activa: [''],

    });
  }
  ngOnInit(): void {
    const fecha = this.donacion.fechaVencimiento.toString();
    const [year, month, day] = fecha.split('-');
    const aux = new Date(Number.parseInt(year),Number.parseInt(month) - 1,Number.parseInt(day))
    this.formulario.patchValue({
      nombre: this.donacion.nombre,
      descripcion: this.donacion.descripcion,
      objetivo: this.donacion.objetivo,
      activa: this.donacion.activa,
      fechaVencimiento: aux,
    });

    this.minDate = new Date();

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
        case 'email':
          return 'Formato de email inválido';
        case 'customDate':
          return errors['customDate'].message;
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

    this.editarDonacion = this.formulario.value;
    this.editarDonacion.id = this.donacion.id;

    return this.donacionesService
      .editar(this.editarDonacion)
      .pipe(
        map((resp: any) => resp as Donacion),
        catchError((e: any) => {
          this.messageService.add({
            severity: 'error',
            summary: `Error`,
            detail: `Error al editar`,
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
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion completada',
          detail: `El servicio se editó correctamente`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.modal.emit(false);
  }
}
