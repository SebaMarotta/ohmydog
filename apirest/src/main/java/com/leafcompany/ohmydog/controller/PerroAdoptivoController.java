package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.RequestResponse.RegisterPerroAdoptivoRequest;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.PerroAdoptivo;
import com.leafcompany.ohmydog.entity.PracticaMedica;
import com.leafcompany.ohmydog.service.MascotaService;
import com.leafcompany.ohmydog.service.PerroAdoptivoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/adopcion")
public class PerroAdoptivoController {

    @Autowired
    private PerroAdoptivoService perroAdoptivoService;
    @GetMapping("/listar")
    public ResponseEntity<List<PerroAdoptivo>> findAll(){
        List<PerroAdoptivo> perros = perroAdoptivoService.findAllActivos();
        return ResponseEntity.ok(perros);
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crear(@RequestBody RegisterPerroAdoptivoRequest request){

        Map<String, Object> errores = new HashMap<>();

        try {
        return ResponseEntity.ok(perroAdoptivoService.crear(request));
        } catch (DataAccessException e){
            errores.put("mensaje","Error en el servidor");
            errores.put("error",e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errores);
        }
    }
}
