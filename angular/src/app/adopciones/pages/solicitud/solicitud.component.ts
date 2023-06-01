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
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import {
  Adopcion,
  FormularioAdopcionRequest,
} from '../../interfaces/interfaces';
import { AdopcionService } from 'src/app/services/adopcion.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css'],
})
export class SolicitudComponent implements OnInit {
  formularioAdopcion: FormularioAdopcionRequest;
  validador: Boolean;
  isButtonDisabled: Boolean = false;
  protected user$: BehaviorSubject<User> = this.authService.userSession;
  protected rolSession: string = '';
  protected idUser: number = 0;

  formulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
  });

  @Output() solicitudModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() adopcion: Adopcion;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private adopcionService: AdopcionService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (Object.keys(this.user$.value).length != 0) {
      this.user$.subscribe((resp) => {
        this.rolSession = resp.role;
        this.idUser = resp.id;
        this.formulario.patchValue({
          nombre: this.user$.value.nombre + ` ` + this.user$.value.apellido,
          email: this.user$.value.email,
          telefono: this.user$.value.telefono,
        });
      });
    }
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

    this.formularioAdopcion = this.formulario.value;
    this.formularioAdopcion.idAdopcion = this.adopcion.id;
    this.formularioAdopcion.idDueño = this.adopcion.cliente.id;

    return this.adopcionService
      .enviarFormularioInteres(this.formularioAdopcion)
      .pipe(
        map((resp: any) => resp as FormularioAdopcionRequest),
        catchError((e: any) => {
          const error: string = 'Duplicate entry';
          const mensaje: string = e.error.error;

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
        const url = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigateByUrl(url);
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion completada',
          detail: `Se envió un email con tu información al dueño para que se contacte con vos`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.solicitudModal.emit(false);
  }
}
