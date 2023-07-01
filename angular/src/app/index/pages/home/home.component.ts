import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/clientes/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}
  protected user$: BehaviorSubject<User> = this.authService.userSession;

  cambioPassword: boolean = true;
  idUser: number = null;
  veterinarias: boolean = false;

  ngOnInit(): void {
    this.user$.subscribe((resp) => {
      if (this.user$.value != null) {
        this.cambioPassword = resp.cambioContraseña;
        this.idUser = resp.id;
      }
    });
  }

  toggleEditarPassword() {
    this.cambioPassword = true;
  }
  verCartelera() {
    this.router.navigateByUrl('cartelera');
  }

  verDonaciones() {
    this.router.navigateByUrl('donaciones');
  }

  verVeterinarias () {
    this.veterinarias = !this.veterinarias;
  }

  recargaModal(){
    this.veterinarias = false;
    setTimeout(() => {
      this.veterinarias = true;
    }, 0); // 2000 ms = 2 segundos
  }
}
