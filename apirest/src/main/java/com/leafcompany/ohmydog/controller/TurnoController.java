package com.leafcompany.ohmydog.controller;



import com.leafcompany.ohmydog.RequestResponse.DeclineSolicitudRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterTurnoRequest;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.SolicitudDeTurno;
import com.leafcompany.ohmydog.entity.Turno;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.HorariosTurnos;
import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.EmailService;
import com.leafcompany.ohmydog.service.SolicitudDeTurnoService;
import com.leafcompany.ohmydog.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("/turno")
public class TurnoController {

    @Autowired
    TurnoService turnoService;

    @Autowired
    SolicitudDeTurnoService solicitudDeTurnoService;

    private final EmailService emailService;

    @Value("${spring.mail.username}")
    private String emailUsername;
    public TurnoController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/crear")
    public ResponseEntity<Turno> crearTurno(@RequestBody RegisterTurnoRequest turno) throws MiException {

       turno.setFecha(turno.getFecha().minusHours(3).withSecond(0).withNano(0));
        try {
            Turno aux = turnoService.crearTurno(turno);
            SolicitudDeTurno solicitud = this.solicitudDeTurnoService.findById(turno.getIdSolicitud().get()).get();
            User user = solicitud.getUser();
            Mascota mascota = solicitud.getMascota();
            solicitud.setEstado(false);
            solicitudDeTurnoService.edit(solicitud);
//
            String titulo = "Turno creado para " + mascota.getNombre();
            String cuerpo =
                    "Le informamos que la solicitud " + solicitud.getMotivo() + " para "+ mascota.getNombre() + " ha sido aceptada.\n\n"
                    + "Detalles del turno:\n\n"
                    + "Fecha: " + aux.getFecha().getDayOfMonth() + "/" + aux.getFecha().getMonthValue() + "/" + aux.getFecha().getYear() + "\n"
                    + "Hora: " + aux.getFecha().toLocalTime() + "\n\n"

                    + "Si necesita cancelar o reprogramar su turno, comuníquese con nosotros lo antes posible.\n\n"
                    + "Gracias por elegir nuestra veterinaria y esperamos verlo pronto.\n\n"
                    + "Saludos cordiales,\n"
                    + "Veterinaria 'Oh My Dog!'";
            emailService.send(emailUsername,user.getEmail(),titulo,cuerpo);



            return ResponseEntity.status(HttpStatus.CREATED).body(new Turno());
        } catch (DataAccessException e) {
            throw e;
        }

    }

    @PostMapping("/crear-automatico")
    public ResponseEntity<Turno> crearTurnoAutomatico(@RequestBody RegisterTurnoRequest turno) throws MiException {

        turno.setFecha(turno.getFecha().minusHours(3).withSecond(0).withNano(0));
        try {
            Turno aux = turnoService.crearTurno(turno);
            User user = aux.getCliente();
            Mascota mascota = aux.getMascota();
//
            String titulo = "Turno automatico creado para " + mascota.getNombre();
            String cuerpo =
                    "Le informamos que se generó un turno para "+ mascota.getNombre() + " para una futura dosis\n\n"
                            + "Detalles del turno:\n\n"
                            + "Motivo: "+ aux.getMotivo() + "\n"
                            + "Fecha: " + aux.getFecha().getDayOfMonth() + "/" + aux.getFecha().getMonthValue() + "/" + aux.getFecha().getYear() + "\n"
                            + "Hora: " + aux.getFecha().toLocalTime() + "\n\n"

                            + "Si necesita cancelar o reprogramar su turno, comuníquese con nosotros lo antes posible.\n\n"
                            + "Gracias por elegir nuestra veterinaria y esperamos verlo pronto.\n\n"
                            + "Saludos cordiales,\n"
                            + "Veterinaria 'Oh My Dog!'";
            emailService.send(emailUsername,user.getEmail(),titulo,cuerpo);



            return ResponseEntity.status(HttpStatus.CREATED).body(new Turno());
        } catch (DataAccessException e) {
            throw e;
        }

    }

    @PostMapping("/rechazar")
    public ResponseEntity<Boolean> cancelarTurno(@RequestBody DeclineSolicitudRequest request) {
        try {
           Turno turno = this.turnoService.findById(request.getIdSolicitud()).get();
            turno.setActivo(false);
            this.turnoService.editar(turno);

            User user = turno.getCliente();
            Mascota mascota = turno.getMascota();

            String titulo = "Turno rechazado de " + mascota.getNombre();
            String cuerpo =
                    "Lamentamos informarle que el siguiente turno ha sido rechazado \n\n"
                            + "Mascota: " + turno.getMascota().getNombre() + "\n"
                            + "Motivo: " + turno.getMotivo()+ "\n"
                            + "Fecha: " + turno.getFecha().getDayOfMonth() + "/" + turno.getFecha().getMonthValue() + "/" + turno.getFecha().getYear() + "\n"
                            + "Hora: " + turno.getFecha().toLocalTime() + "\n\n"

                            + "El motivo es el siguiente: \n\n"
                            + request.getMotivo() + "\n\n"
                            + "Lamentamos las molestias que esto pueda causar y agradecemos su comprensión.\n\n"
                            + "Saludos cordiales,\n"
                            + "Veterinaria 'Oh My Dog!'";
            emailService.send(emailUsername,user.getEmail(),titulo,cuerpo);
            return ResponseEntity.ok(true);
        } catch (DataAccessException e) {
            throw e;
        }
    }

    //Sirve para cuando se rellena la planilla, esto solamente da de baja el turno que ya fue completado
    @PostMapping("/aceptado")
    public ResponseEntity<Boolean> turnoAceptado(@RequestBody Long idTurno) {
        try {
            Turno turno = this.turnoService.findById(idTurno).get();
            turno.setActivo(false);
            this.turnoService.editar(turno);
            return ResponseEntity.ok(true);
        } catch (DataAccessException e) {
            throw e;
        }
    }
    @GetMapping("/listar")
    public ResponseEntity<List<Turno>> listarTurnos() {
        List<Turno> turnos = turnoService.findAllByOrderByFecha();
        if (turnos != null) {
            return ResponseEntity.ok(turnos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/listarDia")
    public ResponseEntity<List<Turno>> listarTurnosDia() {
        LocalDateTime fechaInicio = LocalDateTime.of(1, 1,1, 0,0);
        LocalDateTime fechaFin = LocalDateTime.of(LocalDate.now().getYear(), LocalDate.now().getMonthValue(),LocalDate.now().getDayOfMonth(), 23,59);


        List<Turno> turnos = turnoService.findAllByFechaBetweenOrderByFecha(fechaInicio,fechaFin);
        if (turnos != null) {
            return ResponseEntity.ok(turnos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listarFuturos")
    public ResponseEntity<List<Turno>> listarTurnosFuturos() {
        LocalDateTime fechaInicio = LocalDateTime.of(LocalDate.now().getYear(), LocalDate.now().getMonthValue(),LocalDate.now().getDayOfMonth(), 23,59);
        LocalDateTime fechaFin = LocalDateTime.of(9999, 1,1, 23,59);


        List<Turno> turnos = turnoService.findAllByFechaBetweenOrderByFecha(fechaInicio,fechaFin);
        if (turnos != null) {
            return ResponseEntity.ok(turnos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listar/{idCliente}")
    public ResponseEntity<List<Turno>> listarTurnosPorCliente(@PathVariable Long idCliente) {
        List<Turno> turnos = turnoService.findByClient(idCliente);
        if (turnos != null) {
            return ResponseEntity.ok(turnos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listar/{tipo}")
    public ResponseEntity<List<Turno>> listarTurnosPorCliente(@PathVariable String tipo) {
        List<Turno> turnos = turnoService.findByType(tipo);
        if (turnos != null) {
            return ResponseEntity.ok(turnos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Esto es para poder listar los motivos en la planilla del historial clinico
    @GetMapping("/motivos")
    public ResponseEntity<MotivosTurnos[]> motivosDeTurnos() {
        return ResponseEntity.ok(MotivosTurnos.values());
    }

    @GetMapping("/horarios")
    public ResponseEntity<HorariosTurnos[]> horariosDeTurnos() {
        return ResponseEntity.ok(HorariosTurnos.values());
    }


}
