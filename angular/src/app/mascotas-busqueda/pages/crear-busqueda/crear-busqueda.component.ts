import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { BusquedaMascota } from '../../interfaces/interfaces';

@Component({
  selector: 'app-crear-busqueda',
  templateUrl: './crear-busqueda.component.html',
  styleUrls: ['./crear-busqueda.component.css']
})
export class CrearBusquedaComponent {

  @Output() modal: EventEmitter<Boolean> = new EventEmitter();
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input() publicacion: BusquedaMascota;

}
