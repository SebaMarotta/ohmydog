package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.RequestResponse.RegisterPerroAdoptivoRequest;
import com.leafcompany.ohmydog.entity.PerroAdoptivo;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.PerroAdoptivoService;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

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

    @PostMapping("/crear/{idCliente}")
    public ResponseEntity<?> crear(@RequestBody RegisterPerroAdoptivoRequest request, @PathVariable Long idCliente)
        throws MiException, IOException, java.io.IOException {

        Map<String, Object> errores = new HashMap<>();

        try {
            Path directorioImagenes = Paths.get("src//main//resources//static/adopted_pictures");
            Files.createDirectories(directorioImagenes);
            String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();


            try {
                byte[] bytesImg = request.getImagen().getBytes();
                Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + request.getImagen().getOriginalFilename());
                Files.write(rutaCompleta, bytesImg);

            } catch (java.io.IOException e) {
                e.printStackTrace();
            }
            return ResponseEntity.ok(perroAdoptivoService.crear(request, idCliente));
        } catch (DataAccessException e){
            errores.put("mensaje","Error en el servidor");
            errores.put("error",e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errores);
        }
    }


    @PostMapping("/borrar/{id}")
    public ResponseEntity<Void> eliminarPerroAdoptivo(@PathVariable Long id) {

        try {
            Optional<PerroAdoptivo> perro = perroAdoptivoService.findById(id);
            if (perro.isPresent()) {
                perroAdoptivoService.eliminarPerroAdoptivo(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex) {

            return ResponseEntity.notFound().build();

        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<PerroAdoptivo>> informacionPerro(@PathVariable long id) {
        Optional<PerroAdoptivo> perro = perroAdoptivoService.findById(id);
        if (perro.isPresent()) {
            return ResponseEntity.ok(perro);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
