package com.leafcompany.ohmydog.controller;


import com.leafcompany.ohmydog.RequestResponse.EditCampanaDonacion;

import com.leafcompany.ohmydog.RequestResponse.EditPublicacionBusqueda;
import com.leafcompany.ohmydog.RequestResponse.RegisterCampanaDonacion;

import com.leafcompany.ohmydog.RequestResponse.RegisterTurnoRequest;
import com.leafcompany.ohmydog.entity.CampanaDonacion;

import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.service.CampanaDonacionService;
import com.leafcompany.ohmydog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/campanas")
public class CampanaDonacionController {

    @Autowired
    private CampanaDonacionService campanaDonacionService;

    @Autowired
    private UserService userService;

    @PostMapping("/registro")
    public ResponseEntity<CampanaDonacion> crearCampana(@RequestBody RegisterCampanaDonacion campana , BindingResult result){

        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAA: "+ campana);
        try {
            CampanaDonacion aux = campanaDonacionService.crearCampana(campana);
            return ResponseEntity.status(HttpStatus.CREATED).body(aux);
        } catch (MiException ex) {
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping("/modificacion/{id}")
    public ResponseEntity<CampanaDonacion> modificarCampana(@RequestBody EditCampanaDonacion campana,@PathVariable Long id){
        try{
            Optional<CampanaDonacion> respuesta = campanaDonacionService.findById(id);
            if (respuesta.isPresent()) {
                return ResponseEntity.ok(campanaDonacionService.modificarCampana(campana, respuesta.get()));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/borrar/{id}")
    public ResponseEntity<Void> eliminarCampana(@PathVariable Long id){

        try {
            Optional<CampanaDonacion> publicacion = campanaDonacionService.findById(id);
            if (publicacion.isPresent()) {
                campanaDonacionService.eliminarCampana(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex) {

            return ResponseEntity.notFound().build();

        }
    }


    @PutMapping("/deshabilitar/{id}")
    public ResponseEntity<CampanaDonacion> deshabilitarCampana(@PathVariable Long id) {
        try{
            Optional<CampanaDonacion> respuesta = campanaDonacionService.findById(id);
            if (respuesta.isPresent()) {
                this.campanaDonacionService.deshabilitarCampana(id);
                return ResponseEntity.ok(campanaDonacionService.findById(id).get());
            }else {
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex){
            return ResponseEntity.notFound().build();
        }

    }

//    @GetMapping("/listar")
//    public ResponseEntity<List<CampanaDonacion>> listarPublicaciones() {
//        Map<String,Object> errores = new HashMap<String,Object>();
//        try{
//            campanaDonacionService.actualizarCampanasActivas();
//        } catch (MiException ex){
//            errores.put("mensaje", ex.getMessage());
//        }
//        List<CampanaDonacion> publicaciones = campanaDonacionService.findActive();
//        if (publicaciones != null) {
//            return ResponseEntity.ok(publicaciones);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @GetMapping("/listarPorId/{id}")
    public ResponseEntity<List<CampanaDonacion>> listarPublicaciones(@PathVariable Long id) {
        Map<String,Object> errores = new HashMap<String,Object>();

        List<CampanaDonacion> publicaciones = campanaDonacionService.findActive();
        if (publicaciones != null) {
            return ResponseEntity.ok(publicaciones);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<CampanaDonacion>> listarPublicacionesAdministrador() {
        List<CampanaDonacion> publicaciones = campanaDonacionService.findAll();
        if (publicaciones != null) {
            return ResponseEntity.ok(publicaciones);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/registrarDonacion/{idCampana}-{idCliente}")
    public ResponseEntity<Map<String,BigDecimal>> registrarDonacion(@PathVariable Long idCampana,
                                                        @PathVariable Long idCliente, @RequestBody Double monto){
        Map<String, BigDecimal> map;
        try{
            if (monto != null && monto != 0){
                Optional<CampanaDonacion> respuesta = campanaDonacionService.findById(idCampana);
                map = this.campanaDonacionService.registrarDonacion(idCampana, idCliente, monto);
                return ResponseEntity.ok(map);
            } else{
                return ResponseEntity.notFound().build();
            }
        } catch (MiException ex){
            return ResponseEntity.notFound().build();
        }

    }
}
