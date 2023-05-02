package com.leafcompany.ohmydog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.leafcompany.ohmydog.entity.ServicioDeTerceros;
import com.leafcompany.ohmydog.entity.TipoServicio;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.ServicioDeTercerosService;

@Controller
@RequestMapping("/servicioDeTerceros")
public class ServicioDeTercerosController {

    @Autowired
    ServicioDeTercerosService servicioDeTercerosService;

    @PostMapping("/registro")
    public ResponseEntity<ServicioDeTerceros> guardarPerro(@RequestParam("nombre") String nombre,
            @RequestParam("apellido") String apellido,
            @RequestParam("telefono") String telefono,
            @RequestParam("email") String email,
            @RequestParam("tipo") TipoServicio tipo,
            @RequestParam("rangoHorario") String rangoHorario,
            @RequestParam("dias") List<String> dias) throws MiException {

        // Crear objeto Mascota con los parámetros recibidos y hacerlo persisitir en la
        // base de datos
        ServicioDeTerceros cuidador_paseador;
        try {
            cuidador_paseador = servicioDeTercerosService.crearServicioDeTerceros(nombre, apellido, telefono, email,
                    tipo, rangoHorario, dias);
            return ResponseEntity.status(HttpStatus.CREATED).body(cuidador_paseador);
        } catch (MiException ex) {
            throw ex;
        }

    }

}
