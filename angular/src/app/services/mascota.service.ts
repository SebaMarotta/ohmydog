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
    const uploadData = new FormData();
    uploadData.append('nombre', mascota.nombre);
    uploadData.append('raza', mascota.raza);
    uploadData.append('sexo', mascota.sexo);
    uploadData.append(
      'fechaDeNacimiento',
      mascota.fechaDeNacimiento.toString()
    );
    uploadData.append('imagen', mascota.imagen);
    uploadData.append('fechaCelo', mascota.fechaCelo);

    uploadData.append('observaciones', mascota.observaciones);
    uploadData.append('color', mascota.color);
    uploadData.append('cruza', JSON.stringify(mascota.cruza));
    uploadData.append('castrada', JSON.stringify(mascota.castrada));
    const url = `${this.baseUrl}/mascota/registro/${idDuenio}`;
    return this.http.post<Mascota>(url, uploadData).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  editar(mascota: Mascota): Observable<Mascota> {
    const uploadData = new FormData();
    uploadData.append('id', mascota.id.toString());
    uploadData.append('nombre', mascota.nombre);
    uploadData.append('raza', mascota.raza);
    uploadData.append('sexo', mascota.sexo);
    uploadData.append(
      'fechaDeNacimiento',
      mascota.fechaDeNacimiento.toString()
    );
    uploadData.append('imagen', mascota.imagen);
    uploadData.append('fechaCelo', mascota.fechaCelo);
    uploadData.append('observaciones', mascota.observaciones);
    uploadData.append('color', mascota.color);
    uploadData.append('cruza', JSON.stringify(mascota.cruza));
    uploadData.append('castrada', JSON.stringify(mascota.castrada));
    uploadData.append('duenio', mascota.duenio.toString());

    console.log(uploadData);

    const url = `${this.baseUrl}/mascota/modificacion/${mascota.duenio}`;
    return this.http.put<Mascota>(url, uploadData);
  }

  getImage(imagen: string) {
    return this.http.get(`http://localhost:8080/imagenes/mascota/${imagen}`, {
      responseType: 'blob',
    });
  }

  getMascotasRazaSexo(mascota: Mascota): Observable<Mascota[]> {
    const url = `${this.baseUrl}/mascota/listar-sexoOpuesto-activo/${mascota.id}`;
    return this.http.get<Mascota[]>(url);
  }

  cambiarCruza(mascota: Mascota): Observable<Mascota> {
    const url = `${this.baseUrl}/mascota/editar-cruza/${mascota.id}-${mascota.cruza}`;
    return this.http.get<Mascota>(url);
  }
}
