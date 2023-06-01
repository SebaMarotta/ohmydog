import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';
import { User } from 'src/app/clientes/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioTercero } from '../../interfaces/interfaces';
import { ServicioDeTerceroService } from 'src/app/services/servicio-de-tercero.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  protected servicios: ServicioTercero[] = [];
  protected crearModal: Boolean = false;
  protected editarModal: Boolean = false;
  protected solicitudModal: Boolean = false;
  protected servicioIndividual: ServicioTercero = {
    id: 0,
    nombre: '',
    apellido: '',
    telefono: '',
    zona: '',
    email: '',
    tipo: '',
    rangoHorario: '',
    dias: '',
    disponible: false,
  };
  protected user$: BehaviorSubject<User> = this.authService.userSession;
  protected rolSession: string = '';
  protected idUser: number = 0;

  @ViewChild('RegistroContainer', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(
    private servicioDeTerceroService: ServicioDeTerceroService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user$.subscribe((resp) => {
      if (this.user$.value != null) {
        this.rolSession = resp.role;
        this.idUser = resp.id;
      }
    });
    this.servicioDeTerceroService
      .getServicios()
      .pipe(map((resp) => resp.filter((resp2) => resp2.disponible == true)))
      .subscribe((resp) => {
        this.servicios = resp;
      });
  }

  redireccionar(id: String) {
    this.router.navigateByUrl(`clientes/${id}`);
  }

  toggleCrear() {
    this.crearModal = !this.crearModal;
  }

  toggleSolicitud(servicio) {
    if (!this.solicitudModal) this.servicioIndividual = servicio;
    this.solicitudModal = !this.solicitudModal;
  }

  toggleEditar(servicio) {
    if (!this.editarModal) this.servicioIndividual = servicio;
    this.editarModal = !this.editarModal;
  }
}
