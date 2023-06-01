import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Adopcion } from '../../interfaces/interfaces';
import { AdopcionService } from 'src/app/services/adopcion.service';
import { User } from 'src/app/clientes/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  protected adopciones: Adopcion[] = [];
  protected crearModal: Boolean = false;
  protected solicitudModal: Boolean = false;
  protected adopcionIndividual: Adopcion = {
    id: 0,
    cliente: undefined,
    nombrePerro: '',
    edad: 0,
    raza: '',
    color: '',
    sexo: '',
    fecha: undefined,
    origen: '',
    visible: false,
  };
  protected user$: BehaviorSubject<User> = this.authService.userSession;
  protected rolSession: string = '';
  protected idUser: number = 0;

  @ViewChild('RegistroContainer', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(
    private adopcionService: AdopcionService,
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
    this.adopcionService.getAdopciones().subscribe((resp) => {
      this.adopciones = resp;
    });
  }

  redireccionar(id: String) {
    this.router.navigateByUrl(`clientes/${id}`);
  }

  toggleCrear() {
    this.crearModal = !this.crearModal;
  }

  toggleSolicitud(adopcion) {
    if (!this.solicitudModal) this.adopcionIndividual = adopcion;
    this.solicitudModal = !this.solicitudModal;
  }
}
