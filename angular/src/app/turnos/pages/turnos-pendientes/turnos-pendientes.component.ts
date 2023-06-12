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
import { Subscription, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/clientes/interfaces/interfaces';

@Component({
  selector: 'app-turnos-pendientes',
  templateUrl: './turnos-pendientes.component.html',
  styleUrls: ['./turnos-pendientes.component.css'],
})
export class TurnosPendientesComponent implements OnInit {
  protected solicitudesPendientes: SolicitudPendiente[] = [];
  protected solicitudAceptadaModal: Boolean = false;
  protected solicitudRechazadaModal: Boolean = false;
  protected suscripcionRefresh: Subscription;
  protected user: User;
  protected solicitudIndividual: SolicitudPendiente = {
    id: 0,
    mascota: undefined,
    user: undefined,
    horario: '',
    motivo: '',
    estado: false,
    observaciones: '',
  };
  @Output() cantidadSolicitudes: EventEmitter<string> = new EventEmitter();

  constructor(
    private turnoService: TurnoService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.turnoService
      .getTurnosPendientes()
      .pipe(map((resp) => resp.filter((resp2) => resp2.estado == true)))
      .subscribe((resp) => {
        this.solicitudesPendientes = resp;
        this.cantidadSolicitudes.emit(`${resp.length}`);
      });

    this.authService.userSession
      .pipe(
        map((user) => {
          this.user = user;
          return user;
        }),
        switchMap(() => this.turnoService.getTurnosPendientes()),
        map((resp) => resp.filter((resp2) => resp2.estado == true)),
        map((resp) => {
          if (this.user.role === 'USER') {
            return resp.filter((resp3) => resp3.user.id == this.user.id);
          } else {
            return resp;
          }
        })
      )
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
