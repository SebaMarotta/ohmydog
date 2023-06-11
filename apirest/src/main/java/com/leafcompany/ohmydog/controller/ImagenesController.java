package com.leafcompany.ohmydog.controller;

import io.jsonwebtoken.io.IOException;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
@RestController
@RequestMapping("/imagenes")
public class ImagenesController {
    @GetMapping("/{nombreImagen}")
    @ResponseBody
    public ResponseEntity<UrlResource> servirImagen(@PathVariable String nombreImagen) throws IOException, MalformedURLException {
        // Directorio donde se encuentran las imágenes
        Path directorioImagenes = Paths.get("src//main//resources//static/dog_picture/");

        // Ruta completa de la imagen
        String rutaImagen = directorioImagenes + "/" + nombreImagen;

        System.out.println("asdasdasdasd   "+rutaImagen);
        // Cargar el archivo como recurso
        Path path = Paths.get(rutaImagen);
        UrlResource imagen = new UrlResource(path.toUri());

        // Verificar si el archivo existe
        if (imagen.exists()) {
            // Devolver la imagen como respuesta
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // o el tipo de contenido correspondiente
                    .body(imagen);
        } else {
            // Devolver una respuesta de error si el archivo no existe
            return ResponseEntity.notFound().build();
        }
    }
}
