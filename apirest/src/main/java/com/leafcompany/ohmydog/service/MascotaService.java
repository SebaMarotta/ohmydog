package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.entity.Sexo;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.exceptions.MiException;

import io.jsonwebtoken.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.leafcompany.ohmydog.dao.MascotaRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class MascotaService {

    @Autowired
    private MascotaRepository mascotaRepository;

    @Transactional
    public void crearMascota(String nombre, String raza, String color, Sexo sexo, Date fechaNac,
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

    }

    public Mascota findByName(String nombre){
        List<Mascota> resultado = new ArrayList<Mascota>();
        resultado = mascotaRepository.findByName(nombre);
        return resultado.get(0);
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
