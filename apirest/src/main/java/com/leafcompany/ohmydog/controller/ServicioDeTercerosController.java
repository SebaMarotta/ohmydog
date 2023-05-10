package com.leafcompany.ohmydog.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.leafcompany.ohmydog.entity.ServicioDeTerceros;
import com.leafcompany.ohmydog.enumerations.TipoServicio;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.ServicioDeTercerosService;

@Controller
@RequestMapping("/servicioDeTerceros")
public class ServicioDeTercerosController {

    @Autowired
    ServicioDeTercerosService servicioDeTercerosService;

    @PostMapping("/registro")
    public ResponseEntity<ServicioDeTerceros> guardarPerro(@RequestBody ServicioDeTerceros cuidador_paseador) throws MiException {

     
        try {
            ServicioDeTerceros aux = servicioDeTercerosService.crearServicioDeTerceros(cuidador_paseador);
            return ResponseEntity.status(HttpStatus.CREATED).body(aux);
        } catch (MiException ex) {
            throw ex;
        }

    }

    @GetMapping("/modificacion/{id}")
    public ResponseEntity<Optional<ServicioDeTerceros>> modificarPerro(@PathVariable Long id) {
        Optional<ServicioDeTerceros> cuidador_paseador = servicioDeTercerosService.findById(id);
        if (cuidador_paseador.isPresent()) {
            return ResponseEntity.ok(cuidador_paseador);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/modificar/{id}")
    public ResponseEntity<Optional<ServicioDeTerceros>> modificar(@PathVariable long id, @RequestParam("nombre") String nombre,
            @RequestParam("apellido") String apellido, @RequestParam("telefono") String telefono,@RequestParam("email") String email,
            @RequestParam("tipo") TipoServicio tipo,@RequestParam("rangoHorario") String rangoHorario,
            @RequestParam("dias")List<String> dias,@RequestParam("disponible") Boolean disponible) throws MiException {
        try {
            servicioDeTercerosService.modificarServicioDeTerceros(id, nombre, apellido, telefono, email, tipo, rangoHorario, dias, disponible);;
            return ResponseEntity.ok().body(servicioDeTercerosService.findById(id));
        } catch (MiException ex) {

            return ResponseEntity.badRequest().body(servicioDeTercerosService.findById(id));
        }
    }

    @PostMapping("/borrar/{id}")
    public ResponseEntity<Void> eliminarPerro(@PathVariable Long id) {

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

}
