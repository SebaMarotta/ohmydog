import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Planilla,
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
  private _refresh$ = new Subject<void>();

  get refresh$() {
    return this._refresh$;
  }

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

  getPlanillaByMascota(idMascota: number): Observable<Planilla[]> {
    const url = `${this.baseUrl}/practica/buscar-mascota/${idMascota}`;
    return this.http.get<Planilla[]>(url);
  }

  getPlanillaById(id: number): Observable<Planilla> {
    const url = `${this.baseUrl}/practica/buscar-planilla/${id}`;
    return this.http.get<Planilla>(url);
  }
  setSolicitudTurno(solicitud: SolicitudTurno): Observable<Boolean> {
    const url = `${this.baseUrl}/solicitud-turno/crear`;
    return this.http.post<any>(url, solicitud).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
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

  //Uso la misma estructura de solicitud de turno rechazado pero agrego manualmente como motivo="ok" entonces en spring si el motivo es ok, da de baja el turno y no envia el email
  setTurnoCompletado(idTurno: number): Observable<Boolean> {
    const url = `${this.baseUrl}/turno/aceptado`;
    return this.http.post<any>(url, idTurno);
  }

  getTurnosPendientes(): Observable<SolicitudPendiente[]> {
    const url = `${this.baseUrl}/solicitud-turno/listado`;
    return this.http.get<SolicitudPendiente[]>(url);
  }

  setTurno(solicitud: SolicitudAceptada): Observable<Boolean> {
    const url = `${this.baseUrl}/turno/crear`;
    return this.http.post<any>(url, solicitud);
  }

  setTurnoAutomatico(solicitud: SolicitudAceptada): Observable<Boolean> {
    const url = `${this.baseUrl}/turno/crear-automatico`;
    return this.http.post<any>(url, solicitud);
  }

  getTurnos(): Observable<Turno[]> {
    const url = `${this.baseUrl}/turno/listar`;
    return this.http.get<Turno[]>(url);
  }

  getTurnosDelDia(): Observable<Turno[]> {
    const url = `${this.baseUrl}/turno/listarDia`;
    return this.http.get<Turno[]>(url);
  }

  getTurnosFuturos(): Observable<Turno[]> {
    const url = `${this.baseUrl}/turno/listarFuturos`;
    return this.http.get<Turno[]>(url);
  }
}
