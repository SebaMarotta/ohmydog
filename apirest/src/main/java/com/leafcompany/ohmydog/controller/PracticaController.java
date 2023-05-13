package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.PracticaMedica;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.service.AuthenticationService;
import com.leafcompany.ohmydog.service.MascotaService;
import com.leafcompany.ohmydog.service.PracticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/practica")
public class PracticaController {

    @Autowired
    private PracticaService practicaService;

    @Autowired
    private MascotaService mascotaService;
    @GetMapping("/{id}-mascota")
    public ResponseEntity<List<PracticaMedica>> findByMascota(@PathVariable Long id){
        List<PracticaMedica> practicas = practicaService.findByMascota(id);
        return ResponseEntity.ok(practicas);
    }

    @PostMapping("/{id}-mascota")
    public ResponseEntity<PracticaMedica> findByMascota(PracticaMedica practica, @PathVariable Long id){
        Optional<Mascota> mascota = mascotaService.findById(id);
        practica.setMascota(mascota.get());
        return ResponseEntity.ok(practicaService.crear(practica));
    }
}
