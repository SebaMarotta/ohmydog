import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Turno } from 'src/app/turnos/interfaces/interfaces';
import { TurnoService } from 'src/app/services/turno.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
})
export class TurnosComponent {
  protected turnos: Turno[] = [];
  protected turnoAceptadoModal: Boolean = false;
  protected turnoRechazadoModal: Boolean = false;
  protected turnoIndividual: Turno = {
    id: 0,
    cliente: undefined,
    mascota: undefined,
    motivo: '',
    activo: false,
    fecha: undefined,
  };

  constructor(private turnoService: TurnoService, private router: Router) {}

  ngOnInit() {
    this.turnoService
      .getTurnos()
      .pipe(map((resp) => resp.filter((resp2) => resp2.activo == true)))
      .subscribe((resp) => {
        this.turnos = resp;
      });
  }

  toggleTurnoAceptado(solicitud) {
    if (!this.turnoAceptadoModal) this.turnoIndividual = solicitud;
    this.turnoAceptadoModal = !this.turnoAceptadoModal;
  }

  toggleTurnoRechazado(solicitud) {
    if (!this.turnoRechazadoModal) this.turnoIndividual = solicitud;
    this.turnoRechazadoModal = !this.turnoRechazadoModal;
  }
}
