package com.leafcompany.ohmydog.controller;

import java.util.List;
import java.util.Optional;

import com.leafcompany.ohmydog.RequestResponse.EditServicioDeTerceroRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterServicioDeTercerosRequest;
import com.leafcompany.ohmydog.RequestResponse.SolicitudContactoAdopcion;
import com.leafcompany.ohmydog.RequestResponse.SolicitudContactoServicio;
import com.leafcompany.ohmydog.entity.PublicacionAdopcion;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.DisponibilidadSemana;
import com.leafcompany.ohmydog.enumerations.Zona;
import com.leafcompany.ohmydog.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.leafcompany.ohmydog.entity.ServicioDeTerceros;
import com.leafcompany.ohmydog.enumerations.TipoServicio;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.ServicioDeTercerosService;

import javax.swing.text.html.Option;

@Controller
@RequestMapping("/servicioDeTerceros")
public class ServicioDeTercerosController {

    @Autowired
    ServicioDeTercerosService servicioDeTercerosService;

    @Autowired
    private EmailService emailService;

    @Value("${spring.mail.username}")
    private String emailUsername;


    @PostMapping("/solicitud")
    public ResponseEntity<Boolean> solicitudServicio(@RequestBody SolicitudContactoServicio request) throws MiException {

        ServicioDeTerceros publicacion = this.servicioDeTercerosService.findById(request.getIdServicio()).get();

        String titulo = "Hay una persona interesada en tu servicio de " + publicacion.getTipo() + "!";
        String cuerpo = "Buenas noticias " + publicacion.getNombre() + "!. Una persona esta interesada en tus servicios de " + publicacion.getTipo() + "\n\n"
                        + "Su informacion es:\n\n"
                        + "Nombre: " + request.getNombre() + "\n"
                        + "Telefono: " + request.getTelefono()  + "\n"
                        + "Email: " + request.getEmail() + "\n\n"
                        + "Fechas y/u horarios: " + request.getFechaYhora() + "\n"
                        + "Zona: " + publicacion.getZona() + "\n\n"

                        + "Gracias por elegir nuestra veterinaria, estamos complacidos de ayudar a la comunidad\n\n"
                        + "Saludos cordiales,\n"
                        + "Veterinaria 'Oh My Dog!'";
        emailService.send(emailUsername,publicacion.getEmail(),titulo,cuerpo);

        return ResponseEntity.ok(true);
    }
    @PostMapping("/registro")
    public ResponseEntity<ServicioDeTerceros> guardarServicio(@RequestBody RegisterServicioDeTercerosRequest cuidador_paseador) throws MiException {

     
        try {
            ServicioDeTerceros aux = servicioDeTercerosService.crearServicioDeTerceros(cuidador_paseador);
            return ResponseEntity.status(HttpStatus.CREATED).body(aux);
        } catch (MiException ex) {
            throw ex;
        }

    }

    @GetMapping("/modificacion/{id}")
    public ResponseEntity<ServicioDeTerceros> modificarServicio(@PathVariable Long id) {
        Optional<ServicioDeTerceros> cuidador_paseador = servicioDeTercerosService.findById(id);
        if (cuidador_paseador.isPresent()) {
            return ResponseEntity.ok(cuidador_paseador.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/modificar/{id}")
    public ResponseEntity<ServicioDeTerceros> modificar(@RequestBody EditServicioDeTerceroRequest cuidador_paseador,
                                                        @PathVariable Long id) throws MiException {
        
        Optional<ServicioDeTerceros> respuesta = servicioDeTercerosService.findById(id);
        try {
            if(respuesta.isPresent() && cuidador_paseador.getId().equals(id)){
                return ResponseEntity.ok(servicioDeTercerosService.modificarServicioDeTerceros(cuidador_paseador));
            }
            else{
                return ResponseEntity.notFound().build();
            }

        } catch (MiException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/borrar/{id}")
    public ResponseEntity<Void> eliminarServicio(@PathVariable Long id) {

        try {
            Optional<ServicioDeTerceros> paseador_cuidador = servicioDeTercerosService.findById(id);
            if (paseador_cuidador.isPresent()) {
                servicioDeTercerosService.eliminarServicioDeTerceros(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex) {

            return ResponseEntity.notFound().build();

        }
    }


    @GetMapping("/listar")
    public ResponseEntity<List<ServicioDeTerceros>> listarServicios() {
        List<ServicioDeTerceros> servicios = servicioDeTercerosService.findAll();
        if (servicios != null) {
            return ResponseEntity.ok(servicios);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listar/all-zonas")
    public ResponseEntity<Zona[]> listarZonas() {
            return ResponseEntity.ok(servicioDeTercerosService.listarZonas());
    }

    @GetMapping("/listar/all-tipos")
    public ResponseEntity<TipoServicio[]> listarTipos() {
        return ResponseEntity.ok(servicioDeTercerosService.listarTipos());
    }

    @GetMapping("/listar/all-dias")
    public ResponseEntity<DisponibilidadSemana[]> listarDias() {
        return ResponseEntity.ok(servicioDeTercerosService.listarDias());
    }

    @GetMapping("/listar/{nombre}")
    public ResponseEntity<List<ServicioDeTerceros>> listarServiciosPorNombre(@PathVariable String nombre) {
        List<ServicioDeTerceros> servicios = servicioDeTercerosService.findByName(nombre);
        if (servicios != null) {
            return ResponseEntity.ok(servicios);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listar/{tipo}")
    public ResponseEntity<List<ServicioDeTerceros>> listarServiciosPorTipo(@PathVariable String tipo) {
        List<ServicioDeTerceros> servicios = servicioDeTercerosService.findByType(tipo);
        if (servicios != null) {
            return ResponseEntity.ok(servicios);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
