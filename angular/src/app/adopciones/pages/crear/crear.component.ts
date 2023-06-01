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
import { catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { RegisterAdopcionRequest } from '../../interfaces/interfaces';
import { AdopcionService } from 'src/app/services/adopcion.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {
  formularioAdopcion: RegisterAdopcionRequest;
  validador: Boolean;
  isButtonDisabled: Boolean = false;
  protected sexos: any;
  formulario: FormGroup = this.fb.group({
    nombrePerro: ['', Validators.required],
    edad: ['', Validators.required],
    raza: ['', Validators.required],
    color: ['', Validators.required],
    sexo: ['', Validators.required],
    origen: ['', Validators.required],
  });

  @Output() crearModal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() idUser: number;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService,
    private adopcionService: AdopcionService,
    private router: Router
  ) {}
  ngOnInit(): void {
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
    this.isButtonDisabled = true;
    if (this.formulario.invalid) {
      this.isButtonDisabled = false;
      return null;
    }

    this.formularioAdopcion = this.formulario.value;
    this.formularioAdopcion.sexo = this.formularioAdopcion.sexo['sexo'];

    return this.adopcionService
      .register(this.formularioAdopcion, this.idUser)
      .pipe(
        map((resp: any) => resp as User),
        catchError((e: any) => {
          this.messageService.add({
            severity: 'error',
            summary: `${e}`,
            detail: `${e}`,
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
          detail: `La publicacion de adopcion fue creada correctamente`,
          closable: false,
        });
      });
  }

  cerrar(): void {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.crearModal.emit(false);
  }
}
