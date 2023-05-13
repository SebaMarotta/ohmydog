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
    http: return this.http.get<Mascota[]>(url);
  }

  findById(id: Number): Observable<Mascota> {
    const url = `${this.baseUrl}/mascota/${id}`;
    http: return this.http.get<Mascota>(url);
  }

  register(
    mascota: RegisterMascotaRequest,
    idDuenio: Number
  ): Observable<Mascota> {
    const url = `${this.baseUrl}/mascota/registro/${idDuenio}`;
    http: return this.http.post<Mascota>(url, mascota);
  }
}
