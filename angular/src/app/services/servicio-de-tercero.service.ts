import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import {
  Adopcion,
  FormularioAdopcionRequest,
  RegisterAdopcionRequest,
} from '../adopciones/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import {
  FormularioServicioTerceroRequest,
  RegisterServicioTerceroRequest,
  ServicioTercero,
} from '../servicios-de-terceros/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ServicioDeTerceroService {
  constructor(private http: HttpClient, private router: Router) {}

  private baseUrl: string = environment.baseUrl;
  private refresh$ = new Subject<void>();

  getServicios(): Observable<ServicioTercero[]> {
    const url = `${this.baseUrl}/servicioDeTerceros/listar`;
    return this.http.get<ServicioTercero[]>(url);
  }

  getZonas(): Observable<String[]> {
    const url = `${this.baseUrl}/servicioDeTerceros/listar/all-zonas`;
    return this.http.get<String[]>(url);
  }

  getDias(): Observable<String[]> {
    const url = `${this.baseUrl}/servicioDeTerceros/listar/all-dias`;
    return this.http.get<String[]>(url);
  }

  getTipos(): Observable<String[]> {
    const url = `${this.baseUrl}/servicioDeTerceros/listar/all-tipos`;
    return this.http.get<String[]>(url);
  }

  findById(id: Number): Observable<ServicioTercero> {
    const url = `${this.baseUrl}/servicioDeTerceros/${id}`;
    return this.http.get<ServicioTercero>(url);
  }

  enviarFormularioInteres(
    formulario: FormularioServicioTerceroRequest
  ): Observable<boolean> {
    const url = `${this.baseUrl}/servicioDeTerceros/solicitud`;
    return this.http.post<boolean>(url, formulario);
  }

  registerServicio(
    servicio: RegisterServicioTerceroRequest
  ): Observable<ServicioTercero> {
    const url = `${this.baseUrl}/servicioDeTerceros/registro`;
    return this.http.post<ServicioTercero>(url, servicio).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  editarServicio(servicio: ServicioTercero): Observable<ServicioTercero> {
    const url = `${this.baseUrl}/servicioDeTerceros/modificar/${servicio.id}`;
    return this.http.put<ServicioTercero>(url, servicio).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  // editar(mascota: Adopcion): Observable<Adopcion> {
  //   const url = `${this.baseUrl}/mascota/modificacion/${mascota.user.id}`;
  //   return this.http.put<Adopcion>(url, mascota);
  // }
}
