import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Mascota } from '../mascotas/interfaces/interfaces';
import { MascotaService } from '../services/mascota.service';

@Directive({
  selector: '[LazyLoadImage]'
})
export class LazyLoadImageDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private mascotaService: MascotaService
  ) {
    // Obtén la URL de la imagen de los atributos del elemento de la directiva
    const imageUrl = this.el.nativeElement.getAttribute('lazyLoadImage');

    // Realiza una solicitud HTTP GET a la API REST para obtener la imagen
    this.mascotaService.getImage(imageUrl).subscribe(
      (imageBlob: Blob) => {
        // Crea un objeto de URL a partir del blob de la imagen
        const imageUrl = URL.createObjectURL(imageBlob);

        // Crea un nuevo elemento de imagen
        const imageElement = this.renderer.createElement('img');

        // Establece la URL de la imagen
        imageElement.src = imageUrl;

        // Agrega la imagen al elemento de la directiva
        this.renderer.appendChild(this.el.nativeElement, imageElement);
      },
      (error) => {
        // Maneja el error de carga de la imagen
        console.error('Error al cargar la imagen:', error);
      }
    );
  }
}
