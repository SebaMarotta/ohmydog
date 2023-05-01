package com.leafcompany.ohmydog.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.Sexo;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.MascotaService;

import io.jsonwebtoken.io.IOException;

@Controller
@RequestMapping("/mascota")
public class MascotaController {

    @Autowired
    MascotaService mascotaService;

    // @GetMapping("/registrar") // localhost4200:/mascota/registrar ---> a
    // confirmar como se va a interactuar con el frontend
    // public String registrarMascota(ModelMap modelo){
    // List<String> sexos = new ArrayList<String>();
    // sexos.add(Sexo.MACHO.toString());
    // sexos.add(Sexo.HEMBRA.toString());

    // modelo.addAttribute("sexos", sexos);
    // return "mascota_form";
    // }

    @PostMapping("/registro") // recibe del formulario que tiene este action . Usar el required=false es
                              // porque si ingresa un valor
                              // nulo al controlador, ni se ejecuta, entonces de esta manera hacemos que si
                              // hay un nulo
    // // o vacio , entre igual y manejemos el error desde la excepcion creada en el
    // servicio
    public ResponseEntity<Mascota> guardarPerro(@RequestParam("nombre") String nombre,
            @RequestParam("raza") String raza,
            @RequestParam("color") String color,
            @RequestParam("sexo") Sexo sexo,
            @RequestParam("fechaNacimiento") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fechaNacimiento,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen,
            @RequestParam(value = "observaciones", required = false) String observaciones)
            throws MiException, IOException, java.io.IOException {

        // Crear objeto Mascota con los parámetros recibidos y hacerlo persisitir en la
        // base de datos
        Mascota perro;
        try {
            perro = mascotaService.crearMascota(nombre, raza, color, sexo, fechaNacimiento, observaciones, imagen);
        } catch (MiException ex) {
            throw ex;
        }

        // apartado para simular que devuelvo el perro que acabo de crear//
        // Mascota perro = mascotaService.findByName(nombre);
        // Crear un objeto ResponseEntity con el objeto Perro creado y el código de
        // estado HTTP 201 (creado)
        return ResponseEntity.status(HttpStatus.CREATED).body(perro);
    }

    @GetMapping("/modificar/{id}")
    public ResponseEntity<Optional<Mascota>> modificarPerro(@PathVariable Long id) {
        Optional<Mascota> perro = mascotaService.findById(id);
        if (perro.isPresent()) {
            return ResponseEntity.ok(perro);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/modificar/{id}")
    public ResponseEntity<Optional<Mascota>> modificar(@PathVariable long id, @RequestParam("nombre") String nombre,
            @RequestParam("raza") String raza,
            @RequestParam("color") String color,
            @RequestParam("sexo") Sexo sexo,
            @RequestParam("fechaNacimiento") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fechaNacimiento,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen,
            @RequestParam(value = "observaciones", required = false) String observaciones)
            throws MiException, IOException, java.io.IOException {
        try {
            mascotaService.modificarMascota(id, nombre, raza, color, sexo, fechaNacimiento, observaciones, imagen);
            return ResponseEntity.ok().body(mascotaService.findById(id));
        } catch (MiException ex) {
            
            return ResponseEntity.badRequest().body(mascotaService.findById(id));
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

    @GetMapping("/{nombre}")
    public ResponseEntity<List<Mascota>> listarPerrosPorNombre(@PathVariable String nombre) {
        List<Mascota> perros = mascotaService.findByName(nombre);
        if (perros != null) {
            return ResponseEntity.ok(perros);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Mascota>> listarPerros() {
        List<Mascota> perros = mascotaService.findAll();
        if (perros != null) {
            return ResponseEntity.ok(perros);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{raza}")
    public ResponseEntity<List<Mascota>> listarPerrosPorRaza(@PathVariable String raza) {
        List<Mascota> perros = mascotaService.findByType(raza);
        if (perros != null) {
            return ResponseEntity.ok(perros);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{sexo}")
    public ResponseEntity<List<Mascota>> listarPerrosPorSexo(@PathVariable Sexo sexo) {
        List<Mascota> perros = mascotaService.findByGender(sexo);
        if (perros != null) {
            return ResponseEntity.ok(perros);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}