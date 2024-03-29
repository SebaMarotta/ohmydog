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
import { catchError, firstValueFrom, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-password',
  templateUrl: './editar-password.component.html',
  styleUrls: ['./editar-password.component.css'],
})
export class EditarPasswordComponent {
  userActual: User = {};
  userEditado: User;
  validador: Boolean;
  formulario: FormGroup;
  isButtonDisabled: Boolean = false;
  @Output() editarModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() idUser: number;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      passwordAntiguo: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepetida: ['', [Validators.required]],
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
      }
    }
    return null;
  }

  async guardar() {
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) return null;
    return this.authService
      .passwordIsValid(this.formulario.value.passwordAntiguo, this.idUser)
      .subscribe(
        (data) => {
          if (this.formulario.invalid) return null;

          if (
            this.formulario.value.password !=
            this.formulario.value.passwordRepetida
          ) {
            this.messageService.add({
              severity: 'error',
              summary: `Error`,
              detail: `Las contraseñas no coinciden`,
              closable: false,
            });
            return null;
          }

          return this.userService
            .editPassword(this.formulario.value.password, this.idUser)
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
              this.formulario.markAllAsTouched();
              this.isButtonDisabled = true;
              if (this.formulario.invalid) {
                this.isButtonDisabled = false;
                return null;
              }

              this.authService.userSession.next(resp);
              this.cerrar();
              this.messageService.add({
                severity: 'success',
                summary: 'Operacion completada',
                detail: `La contraseña ha sido cambiada exitosamente`,
                closable: false,
              });
            });
        },
        (error) => {
          // Manejar un error emitido por el observable (equivalente a onError en RxJS v5)
          this.messageService.add({
            severity: 'error',
            summary: `Error`,
            detail: `La contraseña actual es incorrecta`,
            closable: false,
          });
          return null;
        }
      );
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.editarModal.emit(true);
  }
}





