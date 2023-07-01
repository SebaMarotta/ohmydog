package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.RequestResponse.RegisterMascotaRequest;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.exceptions.MiException;
import io.jsonwebtoken.io.IOException;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

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

    @GetMapping("/pdf")
    @ResponseBody
    public ResponseEntity<UrlResource> servirPDF() throws IOException, MalformedURLException {
        // Directorio donde se encuentran las imágenes
        Path directorioPdf = Paths.get("src//main//resources//static/PDF/");

        // Ruta completa de la imagen
        String rutaPDF = directorioPdf + "/turnos.pdf";

        // Cargar el archivo como recurso
        Path path = Paths.get(rutaPDF);
        UrlResource pdf = new UrlResource(path.toUri());

        // Verificar si el archivo existe
        if (pdf.exists()) {
            // Devolver la imagen como respuesta
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF) // o el tipo de contenido correspondiente
                    .body(pdf);
        } else {
            // Devolver una respuesta de error si el archivo no existe
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/pdf/agregar")
    public ResponseEntity<?> agregarPDF(@ModelAttribute MultipartFile archivo)
            throws MiException, IOException, java.io.IOException {
        Map<String,Object> errores = new HashMap<String,Object>();
        Path directorioPDF = Paths.get("src//main//resources//static/PDF");
        Files.createDirectories(directorioPDF);
        String rutaAbsoluta = directorioPDF.toFile().getAbsolutePath();

        Path path = Paths.get(rutaAbsoluta);
        UrlResource pdf = new UrlResource(path.toUri() + "/turnos.pdf");

        // Verificar si el archivo existe
        if (pdf.exists()) {
            pdf.getFile().delete();
        }
        byte[] bytesImg = archivo.getBytes();
        Path rutaCompleta = Paths.get(rutaAbsoluta + "//turnos.pdf");
        Files.write(rutaCompleta, bytesImg);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}
