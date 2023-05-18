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
import com.leafcompany.ohmydog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
        try {
            Turno aux = turnoService.crearTurno(turno);
            SolicitudDeTurno solicitud = this.solicitudDeTurnoService.findById(turno.getIdSolicitud()).get();
            User user = solicitud.getUser();
            Mascota mascota = solicitud.getMascota();
            solicitud.setEstado(false);
            solicitudDeTurnoService.edit(solicitud);
//
            String titulo = "Turno creado para " + mascota.getNombre();
            String cuerpo = "El turno de " + mascota.getNombre() + " con motivo " + solicitud.getMotivo() + " fue aceptado para el dia: " + turno.getFecha();
            emailService.send(emailUsername,user.getEmail(),titulo,cuerpo);

            return ResponseEntity.status(HttpStatus.CREATED).body(aux);
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
            String cuerpo = "El turno de " + mascota.getNombre() + " con motivo " + turno.getMotivo() + " del dia " + turno.getFecha().getDayOfMonth() + '/'+ turno.getFecha().getMonth().getValue()+"/"+ turno.getFecha().getYear() + " a las " + turno.getFecha().getHour()+":"+turno.getFecha().getMinute() + " fue rechazado por el siguiente motivo: \n \n" + request.getMotivo();
            emailService.send(emailUsername,user.getEmail(),titulo,cuerpo);

            return ResponseEntity.ok(true);
        } catch (DataAccessException e) {
            throw e;
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Turno>> listarTurnos() {
        List<Turno> turnos = turnoService.findAll();
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
