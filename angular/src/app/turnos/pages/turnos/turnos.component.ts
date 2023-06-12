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
import { map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/clientes/interfaces/interfaces';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
})
export class TurnosComponent {
  protected turnos: Turno[] = [];
  protected turnoAceptadoModal: Boolean = false;
  protected turnoRechazadoModal: Boolean = false;
  protected balanceModal: Boolean = false;
  protected turnoIndividual: Turno = {
    id: 0,
    cliente: undefined,
    mascota: undefined,
    motivo: '',
    activo: false,
    fecha: undefined,
    observaciones: '',
  };

  constructor(
    private turnoService: TurnoService,
    private router: Router,
    private authService: AuthService
  ) {}
  user: User;

  ngOnInit() {
    this.authService.userSession
      .pipe(
        map((user) => {
          this.user = user;
          return user;
        }),
        switchMap(() => this.turnoService.getTurnos()),
        map((resp) => resp.filter((resp2) => resp2.activo == true)),
        map((resp) => {
          if (this.user.role === 'USER') {
            return resp.filter((resp3) => {
              resp3.cliente.id == this.user.id;
              resp3.activo == true
            });
          } else {
            return resp;
          }
        })
      )
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

  toggleBalanceModal(solicitud) {
    if (!this.balanceModal) this.turnoIndividual = solicitud;
    this.balanceModal = !this.balanceModal;
  }
}
