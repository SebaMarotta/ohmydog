package com.leafcompany.ohmydog.controller;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.leafcompany.ohmydog.RequestResponse.EditMascotaRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterMascotaRequest;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.Razas;
import com.leafcompany.ohmydog.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.enumerations.Sexo;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.MascotaService;

import io.jsonwebtoken.io.IOException;

@RestController
@RequestMapping("/mascota")
public class MascotaController {

    @Autowired
    MascotaService mascotaService;

    @Autowired
    UserService userService;



    @PostMapping("/registro/{idDuenio}")
    public ResponseEntity<?> crearPerro(@ModelAttribute RegisterMascotaRequest mascota, BindingResult result, @PathVariable Long idDuenio)
            throws MiException, IOException, java.io.IOException {
        Map<String,Object> errores = new HashMap<String,Object>();
        try {
            if(mascota.getImagen() != null && !mascota.getImagen().isEmpty()) {


                Path directorioImagenes = Paths.get("src//main//resources//static/dog_picture");
                Files.createDirectories(directorioImagenes);
                String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();


                try {
                    byte[] bytesImg = mascota.getImagen().getBytes();
                    Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + mascota.getImagen().getOriginalFilename());
                    Files.write(rutaCompleta, bytesImg);

                } catch (java.io.IOException e) {
                    e.printStackTrace();
                }
            }
            Mascota aux = mascotaService.crearMascota(mascota, idDuenio);
            return ResponseEntity.status(HttpStatus.CREATED).body(aux);
        } catch (MiException ex) {
            errores.put("mensaje", ex.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(errores);
        }

    }

    @PutMapping("/modificacion/{id}")
    public ResponseEntity<?> modificarPerro(@ModelAttribute EditMascotaRequest mascota, BindingResult result, @PathVariable Long id) {
        Map<String,Object> errores = new HashMap<String,Object>();
        try{
            System.out.println(mascota);
            if (mascota.getDuenio().equals(id)) {
                if(mascota.getImagen() != null && !mascota.getImagen().isEmpty()) {
                    Path directorioImagenes = Paths.get("src//main//resources//static/dog_picture");
                    String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
                    try {
                        byte[] bytesImg = mascota.getImagen().getBytes();
                        Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + mascota.getImagen().getOriginalFilename());
                        Files.write(rutaCompleta, bytesImg);
                    } catch (java.io.IOException e) {
                        e.printStackTrace();
                    }
                }
                return ResponseEntity.ok(mascotaService.modificarMascota(mascota));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch(MiException ex){
            errores.put("mensaje", ex.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(errores);
        }
    }

    @PostMapping("/borrar/{id}")
    public ResponseEntity<Void> eliminarPerro(@PathVariable Long id) {

        try {
            Optional<Mascota> perro = mascotaService.findById(id);
            if (perro.isPresent()) {
                mascotaService.eliminarMascota(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex) {

            return ResponseEntity.notFound().build();

        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Mascota>> informacionPerro(@PathVariable long id) {
        Optional<Mascota> perro = mascotaService.findById(id);
        if (perro.isPresent()) {
            return ResponseEntity.ok(perro);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listar/{idDuenio}")
    public ResponseEntity<List<Mascota>> listarPerrosDeCliente(@PathVariable Long idDuenio) {
        List<Mascota> perros = mascotaService.findByUser(idDuenio);
        if (perros != null) {
            return ResponseEntity.ok(perros);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping("/listar-razas")
    public ResponseEntity<Razas[]> listarRazas() {
            return ResponseEntity.ok(mascotaService.listarRazas());
    }

//    @GetMapping("/listar/{nombre}")
//    public ResponseEntity<List<Mascota>> listarPerrosPorNombre(@PathVariable String nombre) {
//        List<Mascota> perros = mascotaService.findByName(nombre);
//        if (perros != null) {
//            return ResponseEntity.ok(perros);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @GetMapping("/listar/{raza}")
//    public ResponseEntity<List<Mascota>> listarPerrosPorRaza(@PathVariable String raza) {
//        List<Mascota> perros = mascotaService.findByType(raza);
//        if (perros != null) {
//            return ResponseEntity.ok(perros);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @GetMapping("/listar/{sexo}")
//    public ResponseEntity<List<Mascota>> listarPerrosPorSexo(@PathVariable Sexo sexo) {
//        List<Mascota> perros = mascotaService.findByGender(sexo);
//        if (perros != null) {
//            return ResponseEntity.ok(perros);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

}
