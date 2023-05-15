package com.leafcompany.ohmydog.controller;



import com.leafcompany.ohmydog.entity.ServicioDeTerceros;
import com.leafcompany.ohmydog.entity.Turno;
import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/registro/{idCliente}&{idMascota}")
    public ResponseEntity<Turno> crearTurno(@RequestBody Turno turno,
                                              @PathVariable Long idCliente, @PathVariable Long idMascota) throws MiException {

        try {
            Turno aux = turnoService.crearTurno(turno, idCliente, idMascota);
            return ResponseEntity.status(HttpStatus.CREATED).body(aux);
        } catch (MiException ex) {
            throw ex;
        }

    }

    @PostMapping("/cancelar/{id}")
    public ResponseEntity<Void> cancelarTurno(@PathVariable Long id) {

        try {
            Optional<Turno> turno = turnoService.findById(id);
            if (turno.isPresent()) {
                turnoService.cancelarTurno(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex) {

            return ResponseEntity.notFound().build();

        }
    }

    @GetMapping("/listar/")
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


}
