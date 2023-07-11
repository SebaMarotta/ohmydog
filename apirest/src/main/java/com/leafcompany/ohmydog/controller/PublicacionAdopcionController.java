package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.RequestResponse.*;
import com.leafcompany.ohmydog.entity.*;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.EmailService;
import com.leafcompany.ohmydog.service.PublicacionAdopcionService;
import com.leafcompany.ohmydog.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/adopciones")
public class PublicacionAdopcionController {

    @Autowired
    private PublicacionAdopcionService publicacionAdopcionService;

    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    @Value("${spring.mail.username}")
    private String emailUsername;

    @PostMapping("/solicitud")
    public ResponseEntity<Boolean> solicitudAdopcion(@RequestBody SolicitudContactoAdopcion request) throws MiException {

        PublicacionAdopcion publicacion = this.publicacionAdopcionService.findById(request.getIdAdopcion()).get();
        User user = this.userService.findById(request.getIdDueño()).get();

            String titulo = "Hay una persona interesada en " + publicacion.getNombrePerro() + "!";
            String cuerpo =
                            "Una persona está interesada en adoptar a "+ publicacion.getNombrePerro() + "!\n\n"
                            + "Detalles:\n\n"
                            + "Nombre: " + request.getNombre() + "\n"
                            + "Telefono: " + request.getTelefono()  + "\n"
                            + "Email: " + request.getEmail() + "\n\n"


                            + "Gracias por elegir nuestra veterinaria, estamos complacidos de ayudar a la comunidad\n\n"
                            + "Saludos cordiales,\n"
                            + "Veterinaria 'Oh My Dog!'";
            emailService.send(emailUsername,user.getEmail(),titulo,cuerpo);

            return ResponseEntity.ok(true);
    }

    @PostMapping("/registro/{idCliente}")
    public ResponseEntity<PublicacionAdopcion> crearPublicacion(@RequestBody RegisterPublicacionAdopcion publicacion,
                                                                @PathVariable Long idCliente){

        try {
            PublicacionAdopcion aux = publicacionAdopcionService.crearPublicacion(publicacion, idCliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(aux);
        } catch (MiException ex) {
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping("/modificacion/{id}")
    public ResponseEntity<PublicacionAdopcion> modificarPublicacion(@RequestBody EditPublicacionAdopcionRequest publicacion,
                                                                    @PathVariable Long id){
        try{
            Optional<PublicacionAdopcion> respuesta = publicacionAdopcionService.findById(id);
            if (respuesta.isPresent()) {
                return ResponseEntity.ok(publicacionAdopcionService.modificarPublicacion(publicacion));
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
            Optional<PublicacionAdopcion> publicacion = publicacionAdopcionService.findById(id);
            if (publicacion.isPresent()) {
                publicacionAdopcionService.eliminarPublicacion(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex) {

            return ResponseEntity.notFound().build();

        }
    }


    @PutMapping("/deshabilitar/{id}")
    public ResponseEntity<PublicacionAdopcion> deshabilitarPublicacion(@PathVariable Long id) {
        try{
            Optional<PublicacionAdopcion> respuesta = publicacionAdopcionService.findById(id);
            if (respuesta.isPresent()) {
                this.publicacionAdopcionService.deshabilitarPublicacion(id);
                return ResponseEntity.ok(publicacionAdopcionService.findById(id).get());
            }else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex){
            return ResponseEntity.notFound().build();
        }

    }

    //METODO CONSTULA

    @GetMapping("/listar")
    public ResponseEntity<List<PublicacionAdopcion>> listarPublicaciones() {
        List<PublicacionAdopcion> publicaciones = publicacionAdopcionService.findVisible();
        if (publicaciones != null) {
            return ResponseEntity.ok(publicaciones);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listarAdmin")
    public ResponseEntity<List<PublicacionAdopcion>> listarPublicacionesAdministrador() {
        List<PublicacionAdopcion> publicaciones = publicacionAdopcionService.findAll();
        if (publicaciones != null) {
            return ResponseEntity.ok(publicaciones);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
