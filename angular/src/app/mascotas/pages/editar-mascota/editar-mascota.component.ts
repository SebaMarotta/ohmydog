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
  RegisterMascotaRequest,
} from 'src/app/mascotas/interfaces/interfaces';
import { catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';

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
  };
  mascotaEditada: Mascota;
  validador: Boolean;
  formulario: FormGroup;
  sexos: any;
  isButtonDisabled: Boolean = false;
  @Output() editarModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() idMascota: number;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private mascotaService: MascotaService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', [Validators.required]],
      sexo: ['', Validators.required],
      fechaDeNacimiento: ['', [Validators.required]],
      observaciones: [''],
      imagen: [],
      cruza: [''],
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
        raza: this.mascotaActual.raza,
        color: this.mascotaActual.color,
        sexo: { sexo: this.mascotaActual.sexo },
        fechaDeNacimiento: fechaFormateada,
        observaciones: this.mascotaActual.observaciones,
        imagen: this.mascotaActual.imagen,
        cruza: this.mascotaActual.cruza,
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

    this.mascotaEditada = this.mascotaActual;
    this.mascotaEditada.nombre = this.formulario.value.nombre;
    this.mascotaEditada.raza = this.formulario.value.raza;
    this.mascotaEditada.sexo = this.formulario.value.sexo['sexo'];
    this.mascotaEditada.color = this.formulario.value.color;
    this.mascotaEditada.observaciones = this.formulario.value.observaciones;
    this.mascotaEditada.imagen = this.formulario.value.imagen;
    this.mascotaEditada.cruza = this.formulario.value.cruza;
    this.mascotaEditada.duenio = this.mascotaEditada.duenio['id'];

    const [year, month, day] = this.mascotaEditada.fechaDeNacimiento.split('-');
    const fechaFormateada = `${day}-${month}-${year}`;

    this.mascotaEditada.fechaDeNacimiento = fechaFormateada;

    return this.mascotaService
      .editar(this.mascotaEditada)
      .pipe(
        map((resp: any) => resp as Mascota),
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
