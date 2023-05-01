import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { catchError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  formulario: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    const { username, password } = this.formulario.value;

    this.authService.login(username, password).subscribe((resp) => {
      if (!resp.ok) {
        this.messageService.add({
          severity: 'error',
          summary: 'Informacion errónea',
          detail: 'DNI o password inválido',
          closable: false,
        });
      }
    });
  }
}
