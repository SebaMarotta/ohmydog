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

@Injectable({
  providedIn: 'root',
})
export class AdopcionService {
  constructor(private http: HttpClient, private router: Router) {}

  private baseUrl: string = environment.baseUrl;
  private refresh$ = new Subject<void>();

  getAdopciones(): Observable<Adopcion[]> {
    const url = `${this.baseUrl}/adopciones/listar`;
    return this.http.get<Adopcion[]>(url);
  }

  findById(id: Number): Observable<Adopcion> {
    const url = `${this.baseUrl}/adopciones/${id}`;
    return this.http.get<Adopcion>(url);
  }

  enviarFormularioInteres(
    formulario: FormularioAdopcionRequest
  ): Observable<boolean> {
    const url = `${this.baseUrl}/adopciones/solicitud`;
    return this.http.post<boolean>(url, formulario);
  }

  register(
    mascota: RegisterAdopcionRequest,
    idDuenio: Number
  ): Observable<Adopcion> {
    const url = `${this.baseUrl}/adopciones/registro/${idDuenio}`;
    return this.http.post<Adopcion>(url, mascota).pipe(
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
