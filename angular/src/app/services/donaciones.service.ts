import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Observable, Subject, tap } from 'rxjs';
import { CrearDonacion, Donacion, EditarDonacion } from '../donaciones/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class DonacionesService {

  getServicios(): any {
    throw new Error('Method not implemented.');
  }
  private baseUrl: string = environment.baseUrl;
  private refresh$ = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) {}

  get refresh() {
    return this.refresh$;
  }


  getDonaciones(): Observable<Donacion[]> {
    const url = `${this.baseUrl}/campanas/listar`;
    return this.http.get<Donacion[]>(url);
  }

  // findById(id: Number): Observable<Donacion> {
  //   const url = `${this.baseUrl}/campanas/${id}`;
  //   return this.http.get<Donacion>(url);
  // }

  register(
    campaña: CrearDonacion
  ): Observable<Donacion> {
    const uploadData = new FormData();
    uploadData.append('nombre', campaña.nombre);
    uploadData.append('descripcion', campaña.descripcion);
    uploadData.append('objetivo', campaña.objetivo.toString());

    const url = `${this.baseUrl}/campanas/registro`;
    return this.http.post<Donacion>(url, uploadData).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  registerDonacion(
    idCampana: number,
    idCliente: number,
    monto: number
  ): Observable<Donacion> {

    if (idCliente == undefined) idCliente = 0;


    const url = `${this.baseUrl}/campanas/registrarDonacion/${idCampana}-${idCliente}`;
    return this.http.post<Donacion>(url, monto).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  editar(campaña: EditarDonacion): Observable<Donacion> {
    const uploadData = new FormData();
    uploadData.append('nombre', campaña.nombre);
    uploadData.append('descripcion', campaña.descripcion);
    uploadData.append('objetivo', campaña.objetivo.toString());
    uploadData.append('activa', JSON.stringify(campaña.activa));


    const url = `${this.baseUrl}/campanas/modificacion/${campaña.id}`;
    return this.http.put<Donacion>(url, uploadData);
  }

  getImage(imagen: string) {
    return this.http.get(`http://localhost:8080/imagenes/busqueda/${imagen}`, {
      responseType: 'blob',
    });
  }
}
