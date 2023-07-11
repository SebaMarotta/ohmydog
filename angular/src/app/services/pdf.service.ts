import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient, private router: Router) {}

  getPDF() {
    return this.http.get(`http://localhost:8080/imagenes/pdf`, {
      responseType: 'blob',
    });
  }

  setPDF(pdf: File) {
    const uploadData = new FormData();
    uploadData.append('archivo', pdf );
    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');
    return this.http.post<File>(`http://localhost:8080/imagenes/pdf/agregar`,uploadData);
  }
}
