import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  Mascota,
  RegisterMascotaRequest,
} from '../mascotas/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getMascotasUser(id: Number): Observable<Mascota[]> {
    const url = `${this.baseUrl}/mascota/listar/${id}`;
    return this.http.get<Mascota[]>(url);
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
    return this.http.post<Mascota>(url, mascota);
  }

  editar(mascota: Mascota): Observable<Mascota> {
    const url = `${this.baseUrl}/mascota/modificacion/${mascota.duenio}`;
      return this.http.put<Mascota>(url,mascota)
  }
}
