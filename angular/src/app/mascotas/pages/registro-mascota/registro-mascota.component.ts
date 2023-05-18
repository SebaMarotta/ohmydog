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
import { catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.css'],
})
export class RegistroMascotaComponent {
  mascota: RegisterMascotaRequest;
  validador: Boolean;
  formulario: FormGroup;
  sexos: any;
  @Output() registroModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() idDuenio: number;

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
      imagen: [null],
      cruza: [false],
    });
    this.sexos = [{ sexo: 'MACHO' }, { sexo: 'HEMBRA' }];
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
    if (this.formulario.invalid) return null;

    this.mascota = this.formulario.value;
    this.mascota.sexo = this.mascota.sexo['sexo'];

    return this.mascotaService
      .register(this.mascota, this.idDuenio)
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
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion completada',
          detail: `La mascota ${resp.nombre} fue registrada correctamente`,
          closable: false,
        });
        this.registroModal.emit(false);
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.registroModal.emit(false);
  }
}
