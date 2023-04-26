import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private usuarioService: UsuarioService) {}

  get role() {
    var { role } = this.usuarioService.user;
    return role;
  }
}
