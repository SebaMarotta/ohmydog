import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {}

  formulario: FormGroup = this.fb.group({
    username: [''],
    password: [''],
  });

  login() {
    const { username, password } = this.formulario.value;

    this.usuarioService.login(username, password).subscribe((resp) => {});
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/');
  }
}
