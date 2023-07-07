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
import { BusquedaMascota } from '../mascotas-busqueda/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  getServicios(): any {
    throw new Error('Method not implemented.');
  }
  private baseUrl: string = environment.baseUrl;
  private refresh$ = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) {}

  get refresh() {
    return this.refresh$;
  }


  getBusquedas(): Observable<BusquedaMascota[]> {
    const url = `${this.baseUrl}/busquedas/listar`;
    return this.http.get<BusquedaMascota[]>(url);
  }

  getMascotasUser(id: Number): Observable<Mascota[]> {
    const url = `${this.baseUrl}/busquedas/listar/${id}`;
    return this.http.get<Mascota[]>(url);
  }

  getRazas(): Observable<String[]> {
    const url = `${this.baseUrl}/mascota/listar-razas`;
    return this.http.get<String[]>(url);
  }
  getZonas(): Observable<String[]> {
    const url = `${this.baseUrl}/servicioDeTerceros/listar/all-zonas`;
    return this.http.get<String[]>(url);
  }

  getTipoBusqueda(): Observable<String[]> {
    const url = `${this.baseUrl}/busquedas/listar-tipos`;
    return this.http.get<String[]>(url);
  }

  findById(id: Number): Observable<Mascota> {
    const url = `${this.baseUrl}/busquedas/${id}`;
    return this.http.get<Mascota>(url);
  }

  register(
    busqueda: BusquedaMascota
  ): Observable<BusquedaMascota> {
    const uploadData = new FormData();
    uploadData.append('idCliente', busqueda.idCliente.toString());
    uploadData.append('nombre', busqueda.nombre);
    uploadData.append('activo', JSON.stringify(busqueda.activo));
    uploadData.append('color', busqueda.color);
    uploadData.append('edad', busqueda.edad);
    uploadData.append('email', busqueda.email);
    uploadData.append('estado', busqueda.estado);
    uploadData.append('fecha', busqueda.fecha.toString());
    uploadData.append('imagen', busqueda.imagen);
    uploadData.append('sexo', busqueda.sexo);
    uploadData.append('observaciones', busqueda.observaciones);
    uploadData.append('raza', busqueda.raza);
    uploadData.append('telefono', busqueda.telefono);
    uploadData.append('zona', busqueda.zona);
    uploadData.append('tipo', busqueda.tipo);

    const url = `${this.baseUrl}/busquedas/registro/${busqueda.idCliente}`;
    return this.http.post<BusquedaMascota>(url, uploadData).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  editar(mascota: BusquedaMascota): Observable<BusquedaMascota> {
    const uploadData = new FormData();
    uploadData.append('id', mascota.id.toString());
    uploadData.append('idCliente', mascota.idCliente.toString());
    uploadData.append('nombre', mascota.nombre);
    uploadData.append('activo', JSON.stringify(mascota.activo));
    uploadData.append('color', mascota.color);
    uploadData.append('edad', mascota.edad);
    uploadData.append('email', mascota.email);
    uploadData.append('estado', mascota.estado);
    uploadData.append('fecha', mascota.fecha.toString());
    uploadData.append('imagen', mascota.imagen);
    uploadData.append('sexo', mascota.sexo);
    uploadData.append('observaciones', mascota.observaciones);
    uploadData.append('raza', mascota.raza);
    uploadData.append('telefono', mascota.telefono);
    uploadData.append('zona', mascota.zona);
    uploadData.append('tipo', mascota.tipo);

    const url = `${this.baseUrl}/busquedas/modificacion/${mascota.id}`;
    return this.http.put<BusquedaMascota>(url, uploadData);
  }

  getImage(imagen: string) {
    return this.http.get(`http://localhost:8080/imagenes/busqueda/${imagen}`, {
      responseType: 'blob',
    });
  }
}
