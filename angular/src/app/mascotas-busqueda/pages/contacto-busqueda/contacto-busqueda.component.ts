import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BusquedaMascota } from '../../interfaces/interfaces';

@Component({
  selector: 'app-contacto-busqueda',
  templateUrl: './contacto-busqueda.component.html',
  styleUrls: ['./contacto-busqueda.component.css']
})
export class ContactoBusquedaComponent {

  @Output() cerrarModal: EventEmitter<Boolean> = new EventEmitter();
  @Input() contacto: BusquedaMascota;
}
