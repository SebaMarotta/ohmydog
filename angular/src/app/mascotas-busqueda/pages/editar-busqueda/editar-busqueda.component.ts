
import { BusquedaMascota } from '../../interfaces/interfaces';

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
import { fechaValidator } from 'src/app/mascotas/validators/fecha.validator';

@Component({
  selector: 'app-editar-busqueda',
  templateUrl: './editar-busqueda.component.html',
  styleUrls: ['./editar-busqueda.component.css']
})
export class EditarBusquedaComponent {

  @Output() modal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() publicacion: BusquedaMascota;
  crearBusqueda: BusquedaMascota;

  validador: Boolean;
  formulario: FormGroup;
  zonas: Zona[] = [];
  tipos: Tipo[] = [];
  sexos = [{ sexo: 'MACHO' }, { sexo: 'HEMBRA' }];
  razas: Razas[] = [];


  crearPublicacion: BusquedaMascota = {
    nombre: '',
    raza: '',
    sexo: '',
    zona: '',
    telefono: '',
    email: '',
    fecha: undefined,
    imagen: '',
    edad: '',
    observaciones: '',
    estado: '',
    id: 0,
    activo: true,
    color: '',
    idCliente: 0,
    tipo: '',
    duenio: undefined
  };

  isButtonDisabled: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private servicioTerceroService: ServicioDeTerceroService,
    private router: Router,
    private mascotaService: MascotaService,
    private busquedaService: BusquedaService,
    private authService: AuthService,

  ) {
    this.formulario = this.fb.group({

      nombre: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      email: ['', [Validators.required]],
      color: ['', [Validators.required]],
      raza: ['', Validators.required],
      imagen: [''],
      fecha: ['', [Validators.required,fechaValidator]],
      sexo: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      observaciones: [''],
      estado: [''],
      tipo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      activo: [''],

    });
  }
  ngOnInit(): void {
    const fecha = this.publicacion.fecha.toString();
    const [year, month, day] = fecha.split('-');
    const fechaFormateada = `${day}/${month}/${year}`;
    this.servicioTerceroService.getZonas().subscribe((resp) => {
      resp.forEach((resp) => {
        this.zonas.push({ zona: resp });
      });
    });

    this.mascotaService.getRazas().subscribe((resp) => {
      resp.forEach((resp) => {
        this.razas.push({ raza: resp });
      });
    });
    this.busquedaService.getTipoBusqueda().subscribe((resp) => {
      resp.forEach((resp) => {
        this.tipos.push({ tipo: resp });
      });
    });

    if (this.publicacion)
    this.formulario.patchValue({
      nombre: this.publicacion.nombre,
      zona: {zona: this.publicacion.zona},
      email: this.publicacion.email,
      color: this.publicacion.color,
      raza: {raza: this.publicacion.raza},
      imagen: this.publicacion.imagen,
      fecha: fechaFormateada,
      sexo: {sexo: this.publicacion.sexo},
      edad: this.publicacion.edad,
      observaciones: this.publicacion.observaciones,
      estado: this.publicacion.estado,
      tipo: {tipo: this.publicacion.tipo},
      telefono: this.publicacion.telefono,
      activo: this.publicacion.activo,
    });
  }

  imageSelected(event) {
    this.formulario.value['imagen'] = event.target.files[0];
  }


  get placeholderTextRaza(): string {
    if (this.formulario.value['raza'] == '' || this.formulario.value['raza'] == null) return 'Raza (*)';

    return this.formulario.value['raza'].raza;
  }

  get placeholderTextTipo(): string {
    if (this.formulario.value['tipo'] == '' || this.formulario.value['tipo'] == null) return 'Tipo (*)';

    return this.formulario.value['tipo'].tipo;
  }

  get placeholderTextZona(): string {
    if (this.formulario.value['zona'] == '' || this.formulario.value['zona'] == null) return 'Zona (*)';

    return this.formulario.value['zona'].zona;
  }

  get placeholderTextSexo(): string {
    if (this.formulario.value['sexo'] == '' || this.formulario.value['sexo'] == null) return 'Sexo (*)';
    return this.formulario.value['sexo'].sexo;
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


    this.crearBusqueda = this.formulario.value;
    this.crearBusqueda.zona = this.crearBusqueda.zona['zona'];
    this.crearBusqueda.sexo = this.crearBusqueda.sexo['sexo'];
    this.crearBusqueda.raza = this.crearBusqueda.raza['raza'];
    this.crearBusqueda.tipo = this.crearBusqueda.tipo['tipo'];
    this.crearBusqueda.id = this.publicacion.id;
    this.crearBusqueda.idCliente = this.publicacion.duenio.id;
    this.crearBusqueda.imagen = this.formulario.value['imagen'];


    return this.busquedaService
      .editar(this.crearBusqueda)
      .pipe(
        map((resp: any) => resp as BusquedaMascota),
        catchError((e: any) => {
          this.messageService.add({
            severity: 'error',
            summary: `Error`,
            detail: `Hubo un error`,
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
          detail: `La busqueda se editó correctamente`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.modal.emit(false);
  }
}
