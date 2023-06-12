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
  CrearServicioRequest,
  Dias,
  ServicioTercero,
  Tipo,
  Zona,
} from '../../interfaces/interfaces';
import { ServicioDeTerceroService } from 'src/app/services/servicio-de-tercero.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent {
  validador: Boolean;
  formulario: FormGroup;
  zonas: Zona[] = [];
  diass: Dias[] = [];
  tipos: Tipo[] = [];

  crearServicio: CrearServicioRequest = {
    nombre: '',
    apellido: '',
    telefono: '',
    zona: '',
    email: '',
    tipo: '',
    rangoHorario: '',
    dias: '',
    disponible: true,
  };

  isButtonDisabled: Boolean = false;

  @Output() crearModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private mascotaService: MascotaService,
    private servicioTerceroService: ServicioDeTerceroService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['', [Validators.required]],
      rangoHorario: ['', [Validators.required]],
      dias: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.servicioTerceroService.getZonas().subscribe((resp) => {
      resp.forEach((resp) => {
        this.zonas.push({ zona: resp });
      });
    });
    this.servicioTerceroService.getDias().subscribe((resp) => {
      resp.forEach((resp) => {
        this.diass.push({ dias: resp });
      });
    });
    this.servicioTerceroService.getTipos().subscribe((resp) => {
      resp.forEach((resp) => {
        this.tipos.push({ tipo: resp });
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

    this.crearServicio = this.formulario.value;
    this.crearServicio.dias = this.crearServicio.dias['dias'];
    this.crearServicio.zona = this.crearServicio.zona['zona'];
    this.crearServicio.tipo = this.crearServicio.tipo['tipo'];
    this.crearServicio.disponible = true;

    return this.servicioTerceroService
      .registerServicio(this.crearServicio)
      .pipe(
        map((resp: any) => resp as ServicioTercero),
        catchError((e: any) => {
          this.messageService.add({
            severity: 'error',
            summary: `Error`,
            detail: `Este servicio ya se encuentra registrado`,
            closable: false,
          });
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
          detail: `El servicio se agregó correctamente`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.crearModal.emit(false);
  }
}
