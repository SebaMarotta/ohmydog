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
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent {
  validador: Boolean;
  formulario: FormGroup;
  zonas: Zona[] = [];
  diass: Dias[] = [];
  tipos: Tipo[] = [];

  editarServicio: ServicioTercero = {
    nombre: '',
    apellido: '',
    telefono: '',
    zona: '',
    email: '',
    tipo: '',
    rangoHorario: '',
    dias: '',
    disponible: true,
    id: 0,
  };

  isButtonDisabled: Boolean = false;

  @Output() editarModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() servicio: ServicioTercero;

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
      email: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      rangoHorario: ['', [Validators.required]],
      dias: ['', [Validators.required]],
      disponible: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.formulario.patchValue({
      nombre: this.servicio.nombre,
      apellido: this.servicio.apellido,
      telefono: this.servicio.telefono,
      zona: { zona: this.servicio.zona },
      email: this.servicio.email,
      tipo: { tipo: this.servicio.tipo },
      rangoHorario: this.servicio.rangoHorario,
      dias: { dias: this.servicio.dias },
      disponible: this.servicio.disponible,
    });
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

    this.editarServicio = this.formulario.value;
    this.editarServicio.id = this.servicio.id;
    this.editarServicio.tipo = this.formulario.value.tipo['tipo'];
    this.editarServicio.zona = this.formulario.value.zona['zona'];
    this.editarServicio.dias = this.formulario.value.dias['dias'];

    return this.servicioTerceroService
    .editarServicio(this.editarServicio)
    .pipe(
      map((resp: any) => resp as ServicioTercero),
      catchError((e: any) => {
        this.messageService.add({
          severity: 'error',
          summary: `Error`,
          detail: `Este servicio ya se encuentra registrado`,
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
    this.editarModal.emit(false);
  }
}
