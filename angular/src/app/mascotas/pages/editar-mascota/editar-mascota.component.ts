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
import { UserService } from 'src/app/services/user.service';
import {
  Mascota,
  Razas,
  RegisterMascotaRequest,
} from 'src/app/mascotas/interfaces/interfaces';
import { catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';
import { fechaValidator } from '../../validators/fecha.validator';

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.css'],
})
export class EditarMascotaComponent implements OnInit {
  mascotaActual: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    color: '',
    observaciones: '',
    sexo: '',
    fechaDeNacimiento: '',
    imagen: '',
    duenio: 0,
    cruza: false,
    castrada: false,
  };
  mascotaEditada: Mascota;
  validador: Boolean;
  formulario: FormGroup;
  sexos: any;
  razas: Razas[] = [];
  isButtonDisabled: Boolean = false;
  @Output() editarModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() idMascota: number;

  sexo: any; //Sirve para la validacion
  raza: any; //Tambien

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private mascotaService: MascotaService,
    private router: Router
  ) {
    this.mascotaService.getRazas().subscribe((resp) => {
      resp.forEach((resp) => {
        this.razas.push({ raza: resp });
      });
    });
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', [Validators.required]],
      sexo: ['', Validators.required],
      fechaDeNacimiento: ['', [Validators.required, fechaValidator]],
      observaciones: [''],
      // imagen: [],
      cruza: [''],
      castrada: [''],
    });
    this.sexos = [{ sexo: 'MACHO' }, { sexo: 'HEMBRA' }];
  }
  ngOnInit(): void {
    this.mascotaService.findById(this.idMascota).subscribe((resp) => {
      this.mascotaActual = resp;
      const fecha = resp.fechaDeNacimiento.toString();
      const [year, month, day] = fecha.split('-');
      const fechaFormateada = `${day}/${month}/${year}`;
      this.formulario.patchValue({
        nombre: this.mascotaActual.nombre,
        raza: { raza: this.mascotaActual.raza },
        color: this.mascotaActual.color,
        sexo: { sexo: this.mascotaActual.sexo },
        fechaDeNacimiento: fechaFormateada,
        observaciones: this.mascotaActual.observaciones,
        imagen: this.mascotaActual.imagen,
        cruza: this.mascotaActual.cruza,
        castrada: this.mascotaActual.castrada,
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
        case 'customDate':
          return errors['customDate'].message;
      }
    }
    return null;
  }

  get placeholderText(): string {
    if (this.formulario.value['raza'] == '') return 'Raza (*)';

    return this.formulario.value['raza'];
  }

  guardar() {
    if (
      this.formulario.value.sexo['sexo'] != undefined &&
      this.formulario.value.sexo['sexo'] != null
    ) {
      this.sexo = this.formulario.value.sexo['sexo'];
    }
    this.formulario.markAllAsTouched();
    this.isButtonDisabled = true;
    if (this.formulario.invalid) {
      this.isButtonDisabled = false;
      return null;
    }

    if (
      this.formulario.value.cruza == true &&
      this.formulario.value.castrada == true
    ) {
      this.messageService.add({
        severity: 'error',
        summary: `Error`,
        detail: `La mascota no puede estar castrada y acceder al servicio de cruza`,
        closable: false,
      });
      this.isButtonDisabled = false;
      return null;
    }

    this.mascotaEditada = this.mascotaActual;
    this.mascotaEditada.nombre = this.formulario.value.nombre;
    this.mascotaEditada.raza = this.formulario.value.raza['raza'];
    this.mascotaEditada.sexo = this.sexo;
    this.mascotaEditada.color = this.formulario.value.color;
    this.mascotaEditada.observaciones = this.formulario.value.observaciones;
    this.mascotaEditada.imagen = this.formulario.value.imagen;
    this.mascotaEditada.cruza = this.formulario.value.cruza;
    this.mascotaEditada.castrada = this.formulario.value.castrada;
    this.mascotaEditada.duenio = this.mascotaEditada.duenio['id'];
    this.mascotaEditada.fechaDeNacimiento =
      this.formulario.value.fechaDeNacimiento;

    return this.mascotaService
      .editar(this.mascotaEditada)
      .pipe(
        map((resp: any) => resp as Mascota),
        catchError((e: any) => {
          this.messageService.add({
            severity: 'error',
            summary: `Error`,
            detail: `${e.error.mensaje}`,
            closable: false,
          });
          this.isButtonDisabled = false;
          return throwError(e);
        })
      )
      .subscribe((resp) => {
        this.cerrar();

        const url = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigateByUrl(url);
          });

        this.messageService.add({
          severity: 'success',
          summary: 'Operacion completada',
          detail: `La mascota ${resp.nombre} fue editada correctamente`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.editarModal.emit(false);
  }
}
