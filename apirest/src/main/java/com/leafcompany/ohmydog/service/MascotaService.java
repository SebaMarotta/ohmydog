package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.entity.Sexo;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.exceptions.MiException;

import io.jsonwebtoken.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.leafcompany.ohmydog.repository.MascotaRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.nio.file.Files;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MascotaService {

    @Autowired
    private MascotaRepository mascotaRepository;

    @Transactional // inicialmente era un metodo void, pero le puse el devolver mascota para que
                   // luego desde el controlador devuelva el perro creado
    public Mascota crearMascota(String nombre, String raza, String color, Sexo sexo, Date fechaNac,
            String observaciones, MultipartFile imagen) throws MiException, IOException, java.io.IOException {
        this.validarDatos(nombre, raza, color, sexo, fechaNac, imagen);

        Mascota perro = new Mascota();

        perro.setNombre(nombre);
        perro.setRaza(raza);
        perro.setColor(color);
        perro.setSexo(sexo);
        perro.setFechaDeNacimiento(fechaNac);
        perro.setObservaciones(observaciones);

        try {
            if (imagen == null || imagen.isEmpty()) {
                // Asignar imagen por defecto si no se proporciona ninguna imagen
                File imagenPorDefecto = new File("../../resources/static/img/perroDefault.png");
                byte[] imagenBytes = Files.readAllBytes(imagenPorDefecto.toPath());
                perro.setImagen(imagenBytes);
            } else {
                perro.setImagen(imagen.getBytes());
            }
        } catch (IOException ex) {
            throw ex;
        }

        mascotaRepository.save(perro);

        return perro;
    }

    @Transactional
    public void modificarMascota(long id, String nombre, String raza, String color, Sexo sexo, Date fechaNac,
            String observaciones, MultipartFile imagen) throws MiException, IOException, java.io.IOException{

        this.validarDatos(nombre, raza, color, sexo, fechaNac, imagen);
        Optional<Mascota> respuesta = mascotaRepository.findById(id);

        if (respuesta.isPresent()) {
            Mascota perro = respuesta.get();

            perro.setNombre(nombre);
            perro.setRaza(raza);
            perro.setColor(color);
            perro.setSexo(sexo);
            perro.setFechaDeNacimiento(fechaNac);
            perro.setObservaciones(observaciones);
            try {
                if (imagen == null || imagen.isEmpty()) {
                    // Asignar imagen por defecto si no se proporciona ninguna imagen
                    File imagenPorDefecto = new File("../../resources/static/img/perroDefault.png");
                    byte[] imagenBytes = Files.readAllBytes(imagenPorDefecto.toPath());
                    perro.setImagen(imagenBytes);
                } else {
                    perro.setImagen(imagen.getBytes());
                }
            } catch (IOException ex) {
                throw ex;
            }

            mascotaRepository.save(perro);
        }

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
    public Optional<Mascota> findById(long id) {
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

    private void validarDatos(String nombre, String raza, String color, Sexo sexo, Date fechaNac,
            MultipartFile imagen) throws MiException {
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
        if (fechaNac == null || fechaNac.after(new Date())) {
            throw new MiException("La fecha ingresada no puede ser nulo o Posterior al dia de la fecha actual");
        }

    }

}
