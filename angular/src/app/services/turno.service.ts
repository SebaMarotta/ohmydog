import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterPlanillaRequest } from '../libreta-sanitaria/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getMotivosTurno(): Observable<String[]> {
    const url = `${this.baseUrl}/turno/motivos`;
    http: return this.http.get<String[]>(url);
  }

  setPlanilla(
    planilla: RegisterPlanillaRequest,
    idMascota: number
  ): Observable<Boolean> {
    const url = `${this.baseUrl}/practica/crear/${idMascota}`;
    http: return this.http.post<any>(url, planilla);
  }

  getPlanilla(idMascota: number): Observable<any> {
    const url = `${this.baseUrl}/practica/buscar-mascota/${idMascota}`;
    http: return this.http.get<any>(url);
  }
}
