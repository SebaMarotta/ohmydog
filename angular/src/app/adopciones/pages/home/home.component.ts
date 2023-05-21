import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Adopcion } from '../../interfaces/interfaces';
import { AdopcionService } from 'src/app/services/adopcion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  protected adopciones: Adopcion[] = [];
  protected registroModal: Boolean = false;
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

  @ViewChild('RegistroContainer', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(
    private adopcionService: AdopcionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.adopcionService.getAdopciones().subscribe((resp) => {
      this.adopciones = resp;
    });
  }

  redireccionar(id: String) {
    this.router.navigateByUrl(`clientes/${id}`);
  }

  toggleRegistro() {
    this.registroModal = !this.registroModal;
  }

  toggleSolicitud(adopcion) {
    if (!this.solicitudModal) this.adopcionIndividual = adopcion;
    this.solicitudModal = !this.solicitudModal;
  }
}
