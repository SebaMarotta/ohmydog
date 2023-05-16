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
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import {
  RegisterUserRequest,
  User,
} from 'src/app/clientes/interfaces/interfaces';
import { catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent {
  userActual: User = {};
  userEditado: User;
  validador: Boolean;
  formulario: FormGroup;
  @Output() editarModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() idUser: number;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.userService.findById(this.idUser).subscribe((resp) => {
      this.userActual = resp;
      this.formulario.patchValue({
        nombre: this.userActual.nombre,
        apellido: this.userActual.apellido,
        email: this.userActual.email,
        telefono: this.userActual.telefono,
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
    if (this.formulario.invalid) return null;

    this.userEditado = this.userActual;
    this.userEditado.nombre = this.formulario.value.nombre;
    this.userEditado.apellido = this.formulario.value.apellido;
    this.userEditado.email = this.formulario.value.email;
    this.userEditado.telefono = this.formulario.value.telefono;

    return this.userService
      .edit(this.userEditado)
      .pipe(
        map((resp: any) => resp as User),
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

        this.router.navigateByUrl(`/clientes/${this.idUser}`);
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion completada',
          detail: `El cliente ${resp.nombre} fue editado correctamente`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.editarModal.emit(false);
  }
}
