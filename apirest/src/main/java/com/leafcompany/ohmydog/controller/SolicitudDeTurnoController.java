package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.RequestResponse.DeclineSolicitudRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterSolicitudRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterTurnoRequest;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.SolicitudDeTurno;
import com.leafcompany.ohmydog.entity.Turno;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.EmailService;
import com.leafcompany.ohmydog.service.SolicitudDeTurnoService;
import com.leafcompany.ohmydog.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/solicitud-turno")
public class SolicitudDeTurnoController {
    @Autowired
    SolicitudDeTurnoService service;

    @Autowired
    EmailService emailService;
    @Value("${spring.mail.username}")
    private String emailUsername;

    @PostMapping("/crear")
    public ResponseEntity<SolicitudDeTurno> create(@RequestBody RegisterSolicitudRequest request){
        System.out.println("aaaaaaa  " + request);
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/rechazar")
    public ResponseEntity<Boolean> rechazarSolicitud(@RequestBody DeclineSolicitudRequest turno) throws MiException {
        try {
            SolicitudDeTurno solicitud = this.service.findById(turno.getIdSolicitud()).get();
            solicitud.setEstado(false);
            this.service.edit(solicitud);

            User user = solicitud.getUser();
            Mascota mascota = solicitud.getMascota();

            String titulo = "Solicitud de turno rechazada de " + mascota.getNombre();
            String cuerpo =
                    "Lamentamos informarle que su solicitud con el motivo " + solicitud.getMotivo() + " para " + solicitud.getMascota().getNombre() + " ha sido rechazada.\n\n"
                    + "El motivo es el siguiente: \n\n"
                    + turno.getMotivo() + "\n\n"
                    + "Lamentamos las molestias que esto pueda causar y agradecemos su comprensión.\n\n"
                    + "Saludos cordiales,\n"
                    + "Veterinaria 'Oh My Dog!'";
            emailService.send(emailUsername,user.getEmail(),titulo,cuerpo);

            return ResponseEntity.ok(true);
        } catch (DataAccessException e) {
            throw e;
        }

    }

    @GetMapping("/listado")
    public ResponseEntity<List<SolicitudDeTurno>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<SolicitudDeTurno> findById(@PathVariable Long id){
        return ResponseEntity.ok(service.findById(id).get());
    }
    @GetMapping("/mascota/{id}")
    public ResponseEntity<List<SolicitudDeTurno>> findByMascota(@PathVariable Long id){
        return ResponseEntity.ok(service.findByMascota(id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<SolicitudDeTurno>> findByUser(@PathVariable Long id){
        return ResponseEntity.ok(service.findByUser(id));
    }

    @GetMapping("/estado/{id}")
    public ResponseEntity<List<SolicitudDeTurno>> findByEstado(@PathVariable Long id){
        return ResponseEntity.ok(service.findByMascota(id));
    }
    @GetMapping("/mascota-estado/{id}")
    ResponseEntity<List<SolicitudDeTurno>> findByMascotaAndEstado(@RequestBody Boolean ok, @PathVariable Long id){
        return  ResponseEntity.ok(service.findByMascotaAndEstado(id,ok));
    }

    @GetMapping("/user-estado/{id}")
    ResponseEntity<List<SolicitudDeTurno>> findByUserAndEstado(@RequestBody Boolean ok, @PathVariable Long id){
        return  ResponseEntity.ok(service.findByMascotaAndEstado(id,ok));
    }

}
