import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';
import { Mascota } from '../../interfaces/interfaces';
import { TurnoService } from 'src/app/services/turno.service';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/clientes/interfaces/interfaces';

@Component({
  selector: 'app-perfil-mascota',
  templateUrl: './perfil-mascota.component.html',
  styleUrls: ['./perfil-mascota.component.css'],
})
export class PerfilMascotaComponent {
  protected mascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    color: '',
    observaciones: '',
    sexo: '',
    fechaDeNacimiento: null,
    imagen: '',
    duenio: 0,
    cruza: false,
  };
  protected libretaSanitaria: any = {};
  protected planillaModal: Boolean = false;
  protected solicitudModal: Boolean = false;
  protected user$: BehaviorSubject<User> = this.authService.userSession;
  protected rolSession = '';

  protected idUser: number;
  protected observaciones: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private mascotaService: MascotaService,
    private turnoService: TurnoService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.user$.subscribe((resp) => {
      if (this.user$.value != null) this.rolSession = resp.role;
    });
    this.activatedRoute.params.subscribe((resp) => {
      const id = resp['idMascota'];
      this.mascotaService.findById(id).subscribe((resp) => {
        this.mascota = resp;
      });
      this.turnoService.getPlanilla(id).subscribe((resp) => {
        this.libretaSanitaria = resp;
      });
      this.rolSession = this.authService.userSession.getValue()['role'];
      this.idUser = this.authService.userSession.getValue()['id'];
    });
  }
  redireccionar(mascota: Number) {
    // this.router.navigateByUrl(`/clientes/${this.user.id}/${mascota}`);
  }
  togglePlanilla() {
    this.planillaModal = !this.planillaModal;
  }
  toggleSolicitud() {
    this.solicitudModal = !this.solicitudModal;
  }

  espaciarObservacion() {}
}
