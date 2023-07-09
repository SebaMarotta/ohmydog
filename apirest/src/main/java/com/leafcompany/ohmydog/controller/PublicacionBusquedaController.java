package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.enumerations.TipoBusqueda;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

import com.leafcompany.ohmydog.RequestResponse.*;
import com.leafcompany.ohmydog.entity.*;
import com.leafcompany.ohmydog.service.EmailService;
import com.leafcompany.ohmydog.service.UserService;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/busquedas")
public class PublicacionBusquedaController {

    @Autowired
    private PublicacionBusquedaService publicacionBusquedaService;

    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    @Value("${spring.mail.username}")
    private String emailUsername;

//    @PostMapping("/solicitud")
//    public ResponseEntity<Boolean> solicitudAdopcion(@RequestBody SolicitudContactoAdopcion request) throws MiException {
//
//        PublicacionBusqueda publicacion = this.publicacionBusquedaService.findById(request.getIdAdopcion()).get();
//        User user = this.userService.findById(request.getIdDueño()).get();
//
//        String titulo = "Hay una persona interesada en " + publicacion.getNombrePerro() + "!";
//        String cuerpo =
//                "Una persona está interesada en adoptar a "+ publicacion.getNombrePerro() + "!\n\n"
//                        + "Detalles:\n\n"
//                        + "Nombre: " + request.getNombre() + "\n"
//                        + "Telefono: " + request.getTelefono()  + "\n"
//                        + "Email: " + request.getEmail() + "\n\n"
//
//
//                        + "Gracias por elegir nuestra veterinaria, estamos complacidos de ayudar a la comunidad\n\n"
//                        + "Saludos cordiales,\n"
//                        + "Veterinaria 'Oh My Dog!'";
//        emailService.send(emailUsername,user.getEmail(),titulo,cuerpo);
//
//        return ResponseEntity.ok(true);
//    }

    @PostMapping("/registro/{idCliente}")
    public ResponseEntity<PublicacionBusqueda> crearPublicacion(@ModelAttribute RegisterPublicacionBusqueda publicacion, BindingResult result, @PathVariable Long idCliente) throws IOException {


        Map<String,Object> errores = new HashMap<String,Object>();
        Path directorioImagenes = Paths.get("src//main//resources//static/busqueda_picture");
        Files.createDirectories(directorioImagenes);
        String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();

        try {
            if(publicacion.getImagen() != null && !publicacion.getImagen().isEmpty()) {
                try {
                    byte[] bytesImg = publicacion.getImagen().getBytes();
                    Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + publicacion.getImagen().getOriginalFilename());
                    Files.write(rutaCompleta, bytesImg);

                } catch (java.io.IOException e) {
                    e.printStackTrace();
                }
            }
            PublicacionBusqueda aux = publicacionBusquedaService.crearPublicacion(publicacion, idCliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(aux);
        } catch (MiException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/modificacion/{id}")
    public ResponseEntity<PublicacionBusqueda> modificarPublicacion(@ModelAttribute EditPublicacionBusqueda publicacion, BindingResult result) throws IOException, MiException {

        Path directorioImagenes = Paths.get("src//main//resources//static/busqueda_picture");
        Files.createDirectories(directorioImagenes);
        String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();

        Optional<PublicacionBusqueda> respuesta = publicacionBusquedaService.findById(publicacion.getId());
        if (publicacion.getImagen() instanceof String) {
            return ResponseEntity.ok(publicacionBusquedaService.modificarPublicacion(publicacion));
        }

        try{
            MultipartFile imagen = (MultipartFile) publicacion.getImagen();
            if (imagen.getOriginalFilename() != respuesta.get().getImagen()) {
                if (publicacion.getImagen() != null && !imagen.isEmpty()) {
                    try {
                        byte[] bytesImg = imagen.getBytes();
                        Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + imagen.getOriginalFilename());
                        Files.write(rutaCompleta, bytesImg);

                    } catch (java.io.IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            if (respuesta.isPresent()) {
                return ResponseEntity.ok(publicacionBusquedaService.modificarPublicacion(publicacion));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/borrar/{id}")
    public ResponseEntity<Void> eliminarPublicacion(@PathVariable Long id){

        try {
            Optional<PublicacionBusqueda> publicacion = publicacionBusquedaService.findById(id);
            if (publicacion.isPresent()) {
                publicacionBusquedaService.eliminarPublicacion(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex) {

            return ResponseEntity.notFound().build();

        }
    }


    @PutMapping("/deshabilitar/{id}")
    public ResponseEntity<PublicacionBusqueda> deshabilitarPublicacion(@PathVariable Long id) {
        try{
            Optional<PublicacionBusqueda> respuesta = publicacionBusquedaService.findById(id);
            if (respuesta.isPresent()) {
                this.publicacionBusquedaService.deshabilitarPublicacion(id);
                return ResponseEntity.ok(publicacionBusquedaService.findById(id).get());
            }else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex){
            return ResponseEntity.notFound().build();
        }

    }

    //METODO CONSTULA

    @GetMapping("/listar")
    public ResponseEntity<?> listarPublicaciones() {
        Map<String,Object> errors = new HashMap<String,Object>();
        List<PublicacionBusqueda> publicaciones = publicacionBusquedaService.findAll();
        if (publicaciones != null && publicaciones.size() > 0) {
            return ResponseEntity.ok(publicaciones);
        } else {
            errors.put("message", "La lista está vacia");
            return ResponseEntity.ok(errors);
        }
    }

    @GetMapping("/listarAdmin")
    public ResponseEntity<List<PublicacionBusqueda>> listarPublicacionesAdministrador() {
        List<PublicacionBusqueda> publicaciones = publicacionBusquedaService.findAll();
        if (publicaciones != null) {
            return ResponseEntity.ok(publicaciones);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<PublicacionBusqueda> listarPublicacionesAdministrador(@PathVariable Long id) {
      PublicacionBusqueda publicacion = publicacionBusquedaService.findById(id).get();
        if (publicacion != null) {
            return ResponseEntity.ok(publicacion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listar-tipos")
    public ResponseEntity<TipoBusqueda []> listarTipoBusqueda() {
        return ResponseEntity.ok(TipoBusqueda.values());
    }



}
