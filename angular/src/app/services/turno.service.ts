import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  RegisterPlanillaRequest,
  SolicitudTurno,
  SolicitudTurnoRechazado,
} from '../libreta-sanitaria/interfaces/interfaces';
import {
  SolicitudAceptada,
  SolicitudPendiente,
  Turno,
} from '../turnos/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getMotivosTurno(): Observable<String[]> {
    const url = `${this.baseUrl}/turno/motivos`;
    return this.http.get<String[]>(url);
  }

  getHorariosTurno(): Observable<String[]> {
    const url = `${this.baseUrl}/turno/horarios`;
    return this.http.get<String[]>(url);
  }

  setPlanilla(
    planilla: RegisterPlanillaRequest,
    idMascota: number
  ): Observable<Boolean> {
    const url = `${this.baseUrl}/practica/crear/${idMascota}`;
    return this.http.post<any>(url, planilla);
  }

  getPlanilla(idMascota: number): Observable<any> {
    const url = `${this.baseUrl}/practica/buscar-mascota/${idMascota}`;
    return this.http.get<any>(url);
  }
  setSolicitudTurno(solicitud: SolicitudTurno): Observable<Boolean> {
    const url = `${this.baseUrl}/solicitud-turno/crear`;
    return this.http.post<any>(url, solicitud);
  }

  setSolicitudTurnoRechazado(
    solicitud: SolicitudTurnoRechazado
  ): Observable<Boolean> {
    const url = `${this.baseUrl}/solicitud-turno/rechazar`;
    return this.http.post<any>(url, solicitud);
  }

  setTurnoRechazado(turno: SolicitudTurnoRechazado): Observable<Boolean> {
    const url = `${this.baseUrl}/turno/rechazar`;
    return this.http.post<any>(url, turno);
  }

  getTurnosPendientes(): Observable<SolicitudPendiente[]> {
    const url = `${this.baseUrl}/solicitud-turno/listado`;
    return this.http.get<SolicitudPendiente[]>(url);
  }

  setTurno(solicitud: SolicitudAceptada): Observable<Boolean> {
    const url = `${this.baseUrl}/turno/crear`;
    return this.http.post<any>(url, solicitud);
  }

  getTurnos(): Observable<Turno[]> {
    const url = `${this.baseUrl}/turno/listar`;
    return this.http.get<Turno[]>(url);
  }
}
