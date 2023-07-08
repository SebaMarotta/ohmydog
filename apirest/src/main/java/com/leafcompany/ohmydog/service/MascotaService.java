package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.RequestResponse.EditMascotaRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterMascotaRequest;
import com.leafcompany.ohmydog.enumerations.Razas;
import com.leafcompany.ohmydog.enumerations.Sexo;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.enumerations.Zona;
import com.leafcompany.ohmydog.exceptions.MiException;

import io.jsonwebtoken.io.IOException;

import org.springframework.cglib.core.Local;
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
    public Mascota crearMascota(RegisterMascotaRequest mascota, Long idDueño) throws MiException, IOException {
        Mascota aux;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        this.validarDatos(mascota.getNombre(),mascota.getColor(),mascota.getSexo(),LocalDate.parse(mascota.getFechaDeNacimiento(),formatter ) ,idDueño);
        User dueño = userRepository.findById(idDueño).get();

        var fecha = LocalDate.parse(mascota.getFechaDeNacimiento(),formatter);

        if (mascota.getImagen() != null) {
            aux = Mascota.builder()
                    .nombre(mascota.getNombre())
                    .color(mascota.getColor())
                    .raza(Razas.valueOf(mascota.getRaza()))
                    .cruza(mascota.isCruza())
                    .duenio(dueño)
                    .fechaDeNacimiento(LocalDate.parse(mascota.getFechaDeNacimiento(), formatter))
                    .imagen(mascota.getImagen().getOriginalFilename())
                    .sexo(mascota.getSexo())
                    .observaciones(mascota.getObservaciones())
                    .castrada(mascota.isCastrada())
                    .build();
        } else {
            aux = Mascota.builder()
                    .nombre(mascota.getNombre())
                    .color(mascota.getColor())
                    .raza(Razas.valueOf(mascota.getRaza()))
                    .cruza(mascota.isCruza())
                    .duenio(dueño)
                    .fechaDeNacimiento(LocalDate.parse(mascota.getFechaDeNacimiento(), formatter))
                    .sexo(mascota.getSexo())
                    .imagen("perroDefault.png")
                    .observaciones(mascota.getObservaciones())
                    .castrada(mascota.isCastrada())
                    .build();
        }

        return mascotaRepository.save(aux);
    }

    public Razas[] listarRazas(){
        return Razas.values();
    }
    @Transactional
    public Mascota modificarMascota(EditMascotaRequest mascota) throws MiException{

        Mascota original = this.mascotaRepository.findById(mascota.getId()).get();
        Mascota aux;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        this.validarDatos(mascota.getNombre(),mascota.getColor(),mascota.getSexo(),
                LocalDate.parse(mascota.getFechaDeNacimiento(),formatter ) , mascota.getDuenio());

        var fecha = LocalDate.parse(mascota.getFechaDeNacimiento(),formatter);
        var user = this.userRepository.findById(mascota.getDuenio()).get();

        System.out.println("ffffff" + mascota);
        if (mascota.getImagen() != null) {
            original.setCruza(mascota.isCruza());
            original.setCastrada(mascota.isCastrada());
            original.setColor(mascota.getColor());
            original.setImagen(mascota.getImagen().getOriginalFilename());
            original.setNombre(mascota.getNombre());
            original.setFechaDeNacimiento(LocalDate.parse(mascota.getFechaDeNacimiento(), formatter));
            original.setSexo(mascota.getSexo());
            original.setObservaciones(mascota.getObservaciones());
            original.setRaza(Razas.valueOf(mascota.getRaza()));
        } else {
            original.setCruza(mascota.isCruza());
            original.setCastrada(mascota.isCastrada());
            original.setColor(mascota.getColor());
            original.setNombre(mascota.getNombre());
            original.setFechaDeNacimiento(LocalDate.parse(mascota.getFechaDeNacimiento(), formatter));
            original.setSexo(mascota.getSexo());
            original.setObservaciones(mascota.getObservaciones());
            original.setRaza(Razas.valueOf(mascota.getRaza()));
        }
        return mascotaRepository.save(original);
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
        List<Mascota> resultado = mascotaRepository.findByType(Razas.valueOf(raza));
        return (!resultado.isEmpty()) ? resultado : null;
    }

    public List<Mascota> findByGender(Sexo sexo) {
        List<Mascota> resultado = mascotaRepository.findByGender(sexo.toString());
        return (!resultado.isEmpty()) ? resultado : null;
    }

    public List<Mascota> findAll() {
        return mascotaRepository.findAll();
    }



    private void validarDatos(String nombre, String color, Sexo sexo,
                              LocalDate fechaNac, Long idDueño) throws MiException {
        if (nombre == null || nombre.isEmpty()) {
            throw new MiException("El nombre ingresado no puede ser nulo o estar vacio");
        }
        if (color == null || color.isEmpty()) {
            throw new MiException("El color ingresado no puede ser nulo o estar vacio");
        }
        if (sexo == null) {
            throw new MiException("El sexo ingresado no puede ser nulo o estar vacio");
        }
        if(fechaNac.isAfter(LocalDate.now())){
            throw new MiException("La fecha de nacimiento ingresada no puede ser posterior a la del dia de hoy");
        }


        if(idDueño == null){
            throw new MiException("El id del dueño de la mascota no puede ser nulo");
        }

    }

}
