package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.RequestResponse.EditMascotaRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterMascotaRequest;
import com.leafcompany.ohmydog.enumerations.Sexo;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.exceptions.MiException;

import io.jsonwebtoken.io.IOException;

import org.springframework.stereotype.Service;

import com.leafcompany.ohmydog.repository.MascotaRepository;
import com.leafcompany.ohmydog.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MascotaService {

    @Autowired
    private MascotaRepository mascotaRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional // inicialmente era un metodo void, pero le puse el devolver mascota para que
                   // luego desde el controlador devuelva el perro creado
    public Mascota crearMascota(RegisterMascotaRequest mascota, Long idDueño) throws MiException, IOException, java.io.IOException {

        User dueño = userRepository.findById(idDueño).get();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        var fecha = LocalDate.parse(mascota.getFechaDeNacimiento(),formatter);
        var aux = Mascota.builder()
        .nombre(mascota.getNombre())
        .color(mascota.getColor())
        .raza(mascota.getRaza())
        .cruza(mascota.isCruza())
        .duenio(dueño)
        .fechaDeNacimiento(LocalDate.parse(mascota.getFechaDeNacimiento(),formatter))
        .imagen(mascota.getImagen())
        .sexo(mascota.getSexo())
        .observaciones(mascota.getObservaciones())
        .build();

        return mascotaRepository.save(aux);
    }

    @Transactional
    public Mascota modificarMascota(EditMascotaRequest mascota){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        var fecha = LocalDate.parse(mascota.getFechaDeNacimiento(),formatter);
        var user = this.userRepository.findById(mascota.getDuenio()).get();
        Mascota aux = Mascota
                .builder()
                .duenio(user)
                .raza(mascota.getRaza())
                .id(mascota.getId())
                .nombre(mascota.getNombre())
                .color(mascota.getColor())
                .cruza(mascota.isCruza())
                .duenio(user)
                .fechaDeNacimiento(fecha)
                .imagen(mascota.getImagen())
                .observaciones(mascota.getObservaciones())
                .sexo(mascota.getSexo())
                .build();


        return mascotaRepository.save(aux);
        }


    @Transactional
    public void eliminarMascota(Long id) throws MiException{
        if (id == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Optional<Mascota> respuesta =  mascotaRepository.findById(id);
        if(respuesta.isPresent()){
            Mascota perro = respuesta.get();
            mascotaRepository.delete(perro);
        }
    }


    // METODOS PARA CONSULTAS Y BUSQUEDAS 
    public List<Mascota> findByUser (Long idDueño){
        return mascotaRepository.findByUser(idDueño);
    }

       public Optional<Mascota> findById(Long id) {

        return mascotaRepository.findById(id);
    }
    public List<Mascota> findByName(String nombre) {
        List<Mascota> resultado = mascotaRepository.findByName(nombre);
        return (!resultado.isEmpty()) ? resultado : null;
    }

    public List<Mascota> findByType(String raza) {
        List<Mascota> resultado = mascotaRepository.findByType(raza);
        return (!resultado.isEmpty()) ? resultado : null;
    }

    public List<Mascota> findByGender(Sexo sexo) {
        List<Mascota> resultado = mascotaRepository.findByGender(sexo.toString());
        return (!resultado.isEmpty()) ? resultado : null;
    }

    public List<Mascota> findAll() {
        return mascotaRepository.findAll();
    }



    private void validarDatos(String nombre, String raza, String color, Sexo sexo, Date fechaNac, Long idDueño) throws MiException {
        if (nombre == null || nombre.isEmpty()) {
            throw new MiException("El nombre ingresado no puede ser nulo o estar vacio");
        }
        if (raza == null || raza.isEmpty()) {
            throw new MiException("LA raza ingresado no puede ser nulo o estar vacio");
        }
        if (color == null || color.isEmpty()) {
            throw new MiException("El color ingresado no puede ser nulo o estar vacio");
        }
        if (sexo == null) {
            throw new MiException("El sexo ingresado no puede ser nulo o estar vacio");
        }

        if(idDueño == null){
            throw new MiException("El id del dueño de la mascota no puede ser nulo");
        }

    }

}
