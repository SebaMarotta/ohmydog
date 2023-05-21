import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/mascotas/interfaces/interfaces';
import { MascotaService } from 'src/app/services/mascota.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  protected id: number;
  protected user: User = {};
  protected mascotas: Mascota[] = [];
  protected registroModal: Boolean = false;
  protected sexos: any = ['MACHO', 'HEMBRA'];
  protected user$: BehaviorSubject<User> = this.authService.userSession;
  protected rolSession = '';
  protected editarModalMascota: Boolean = false;
  protected editarModalUser: Boolean = false;
  protected editarModalPassword: Boolean = false;
  protected cardMascotaId: number;
  protected suscriptionLista: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private mascotaService: MascotaService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.user$.subscribe((resp) => {
      if (this.user$.value != null) this.rolSession = resp.role;
    });

    this.activatedRoute.params.subscribe((resp) => {
      this.id = resp['id'];
      this.userService.findById(this.id).subscribe((resp) => {
        this.user = resp;
        this.rolSession = this.authService.userSession.getValue()['role'];
      });
    });

    this.mascotaService.getMascotasUser(this.id).subscribe((resp) => {
      this.mascotas = resp;
      this.rolSession = this.authService.userSession.getValue()['role'];
    });

    this.suscriptionLista = this.mascotaService.refresh.subscribe(() => {
      this.mascotaService.getMascotasUser(this.id).subscribe((resp) => {
        this.mascotas = resp;
        this.rolSession = this.authService.userSession.getValue()['role'];
      });
    });
  }
  redireccionar(mascota: Number) {
    this.router.navigateByUrl(`/clientes/${this.user.id}/${mascota}`);
  }

  toggleRegistro() {
    this.registroModal = !this.registroModal;
  }

  toggleEditarUser() {
    this.editarModalUser = !this.editarModalUser;
  }

  toggleEditarMascota() {
    this.editarModalMascota = !this.editarModalMascota;
  }

  toggleEditarPassword() {
    this.editarModalPassword = !this.editarModalPassword;
  }
}