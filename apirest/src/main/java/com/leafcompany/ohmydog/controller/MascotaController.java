package com.leafcompany.ohmydog.controller;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import com.leafcompany.ohmydog.RequestResponse.EditMascotaRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterMascotaRequest;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.enumerations.Sexo;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.MascotaService;

import io.jsonwebtoken.io.IOException;

@Controller
@RequestMapping("/mascota")
public class MascotaController {

    @Autowired
    MascotaService mascotaService;

    @Autowired
    UserService userService;

    // @GetMapping("/registrar") // localhost4200:/mascota/registrar ---> a
    // confirmar como se va a interactuar con el frontend
    // public String registrarMascota(ModelMap modelo){
    // List<String> sexos = new ArrayList<String>();
    // sexos.add(Sexo.MACHO.toString());
    // sexos.add(Sexo.HEMBRA.toString());

    // modelo.addAttribute("sexos", sexos);
    // return "mascota_form";
    // }

    @PostMapping("/registro/{idDuenio}") // recibe del formulario que tiene este action . Usar el required=false es
                              // porque si ingresa un valor
                              // nulo al controlador, ni se ejecuta, entonces de esta manera hacemos que si
                              // hay un nulo
                              // o vacio , entre igual y manejemos el error desde la excepcion creada en el
                              // servicio
    public ResponseEntity<Mascota> crearPerro(@RequestBody RegisterMascotaRequest mascota, @PathVariable Long idDuenio)
            throws MiException, IOException, java.io.IOException {

        try {

            Mascota aux = mascotaService.crearMascota(mascota, idDuenio);
            // apartado para simular que devuelvo el perro que acabo de crear//
            // Mascota perro = mascotaService.findByName(nombre);
            // Crear un objeto ResponseEntity con el objeto Perro creado y el código de
            // estado HTTP 201 (creado)
            return ResponseEntity.status(HttpStatus.CREATED).body(aux);
        } catch (MiException ex) {
            throw ex;
        }

    }

    @PutMapping("/modificacion/{id}")
    public ResponseEntity<Mascota> modificarPerro(@RequestBody EditMascotaRequest mascota, @PathVariable Long id) {
        try{
            if (mascota.getDuenio().equals(id)) {
                return ResponseEntity.ok(mascotaService.modificarMascota(mascota));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch(MiException ex){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/borrar/{id}")
    public ResponseEntity<Void> eliminarPerro(@PathVariable Long id) {

        try {
            Optional<Mascota> perro = mascotaService.findById(id);
            if (perro.isPresent()) {
                mascotaService.eliminarMascota(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex) {

            return ResponseEntity.notFound().build();

        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Mascota>> informacionPerro(@PathVariable long id) {
        Optional<Mascota> perro = mascotaService.findById(id);
        if (perro.isPresent()) {
            return ResponseEntity.ok(perro);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listar/{idDuenio}")
    public ResponseEntity<List<Mascota>> listarPerrosDeCliente(@PathVariable Long idDuenio) {
        List<Mascota> perros = mascotaService.findByUser(idDuenio);
        if (perros != null) {
            return ResponseEntity.ok(perros);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    @GetMapping("/listar/{nombre}")
//    public ResponseEntity<List<Mascota>> listarPerrosPorNombre(@PathVariable String nombre) {
//        List<Mascota> perros = mascotaService.findByName(nombre);
//        if (perros != null) {
//            return ResponseEntity.ok(perros);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @GetMapping("/listar/{raza}")
//    public ResponseEntity<List<Mascota>> listarPerrosPorRaza(@PathVariable String raza) {
//        List<Mascota> perros = mascotaService.findByType(raza);
//        if (perros != null) {
//            return ResponseEntity.ok(perros);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @GetMapping("/listar/{sexo}")
//    public ResponseEntity<List<Mascota>> listarPerrosPorSexo(@PathVariable Sexo sexo) {
//        List<Mascota> perros = mascotaService.findByGender(sexo);
//        if (perros != null) {
//            return ResponseEntity.ok(perros);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

}
