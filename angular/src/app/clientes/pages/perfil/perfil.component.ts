import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/mascotas/interfaces/interfaces';
import { MascotaService } from 'src/app/services/mascota.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';

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
  protected rolSession: any;
  protected editarModal: Boolean = false;
  protected cardMascotaId: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private mascotaService: MascotaService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.rolSession = this.authService.userSession.getValue()['role'];
    this.activatedRoute.params.subscribe((resp) => {
      this.id = resp['id'];
      this.userService.findById(this.id).subscribe((resp) => {
        this.user = resp;
      });
    });
    this.mascotaService.getMascotasUser(this.id).subscribe((resp) => {
      this.mascotas = resp;
    });
  }
  redireccionar(mascota: Number) {
    this.router.navigateByUrl(`/clientes/${this.user.id}/${mascota}`);
  }

  toggleRegistro() {
    this.registroModal = !this.registroModal;
  }

  toggleEditar() {
    this.editarModal = !this.editarModal;
  }
}
