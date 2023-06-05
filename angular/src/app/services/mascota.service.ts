import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  Mascota,
  Razas,
  RegisterMascotaRequest,
} from '../mascotas/interfaces/interfaces';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private baseUrl: string = environment.baseUrl;
  private refresh$ = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) {}

  get refresh() {
    return this.refresh$;
  }

  getMascotasUser(id: Number): Observable<Mascota[]> {
    const url = `${this.baseUrl}/mascota/listar/${id}`;
    return this.http.get<Mascota[]>(url);
  }

  getRazas(): Observable<String[]> {
    const url = `${this.baseUrl}/mascota/listar-razas`;
    return this.http.get<String[]>(url);
  }

  findById(id: Number): Observable<Mascota> {
    const url = `${this.baseUrl}/mascota/${id}`;
    return this.http.get<Mascota>(url);
  }

  register(
    mascota: RegisterMascotaRequest,
    idDuenio: Number
  ): Observable<Mascota> {
    const url = `${this.baseUrl}/mascota/registro/${idDuenio}`;
    return this.http.post<Mascota>(url, mascota).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  editar(mascota: Mascota): Observable<Mascota> {
    const url = `${this.baseUrl}/mascota/modificacion/${mascota.duenio}`;
    return this.http.put<Mascota>(url, mascota);
  }
}
