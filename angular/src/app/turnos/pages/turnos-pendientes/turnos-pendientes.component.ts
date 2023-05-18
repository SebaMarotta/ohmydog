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
import { SolicitudPendiente } from 'src/app/turnos/interfaces/interfaces';
import { TurnoService } from 'src/app/services/turno.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-turnos-pendientes',
  templateUrl: './turnos-pendientes.component.html',
  styleUrls: ['./turnos-pendientes.component.css'],
})
export class TurnosPendientesComponent implements OnInit {
  protected solicitudesPendientes: SolicitudPendiente[] = [];
  protected solicitudAceptadaModal: Boolean = false;
  protected solicitudRechazadaModal: Boolean = false;
  protected solicitudIndividual: SolicitudPendiente = {
    id: 0,
    mascota: undefined,
    user: undefined,
    horario: '',
    motivo: '',
    estado: false,
  };
  @Output() cantidadSolicitudes: EventEmitter<string> = new EventEmitter();

  constructor(private turnoService: TurnoService, private router: Router) {}

  ngOnInit() {
    this.turnoService
      .getTurnosPendientes()
      .pipe(map((resp) => resp.filter((resp2) => resp2.estado == true)))
      .subscribe((resp) => {
        this.solicitudesPendientes = resp;
        this.cantidadSolicitudes.emit(`${resp.length}`);
      });
  }

  redireccionar(id: String) {
    this.router.navigateByUrl(`clientes/${id}`);
  }

  toggleSolicitudAceptada(solicitud) {
    if (!this.solicitudAceptadaModal) this.solicitudIndividual = solicitud;
    this.solicitudAceptadaModal = !this.solicitudAceptadaModal;
  }

  toggleSolicitudRechazada(solicitud) {
    if (!this.solicitudRechazadaModal) this.solicitudIndividual = solicitud;
    this.solicitudRechazadaModal = !this.solicitudRechazadaModal;
  }
}
