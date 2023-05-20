package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.RequestResponse.RegisterPracticaRequest;
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
    @GetMapping("/buscar-mascota/{id}")
    public ResponseEntity<List<PracticaMedica>> findByMascota(@PathVariable Long id){
        List<PracticaMedica> practicas = practicaService.findByMascota(id);
        return ResponseEntity.ok(practicas);
    }

    @PostMapping("/crear/{id}")
    public ResponseEntity<PracticaMedica> crear(@RequestBody PracticaMedica request, @PathVariable Long id){

        Mascota mascota = mascotaService.findById(id).get();
        return ResponseEntity.ok(practicaService.crear(request,mascota));
    }
}
