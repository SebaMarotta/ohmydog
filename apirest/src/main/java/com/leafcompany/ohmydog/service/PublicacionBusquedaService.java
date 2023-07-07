package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.RequestResponse.*;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.PublicacionAdopcion;
import com.leafcompany.ohmydog.entity.PublicacionBusqueda;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.*;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.repository.PublicacionAdopcionRepository;
import com.leafcompany.ohmydog.repository.PublicacionBusquedaRepository;
import com.leafcompany.ohmydog.repository.UserRepository;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class PublicacionBusquedaService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PublicacionBusquedaRepository publicacionBusquedaRepository;

    @Transactional
    public PublicacionBusqueda crearPublicacion(RegisterPublicacionBusqueda publicacion, Long idCliente) throws MiException{


        System.out.println(publicacion);
        User cliente = userRepository.findById(idCliente).get();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        var fecha = LocalDate.parse(publicacion.getFecha().toString(),formatter);

        PublicacionBusqueda aux;
        if (publicacion.getImagen() != null ) {

            aux = PublicacionBusqueda.builder()
                    .duenio(cliente)
                    .nombre(publicacion.getNombre())
                    .raza(publicacion.getRaza())
                    .color(publicacion.getColor())
                    .sexo(publicacion.getSexo())
                    .zona(publicacion.getZona())
                    .edad(publicacion.getEdad())
                    .telefono(publicacion.getTelefono())
                    .email(publicacion.getEmail())
                    .fecha(fecha)
                    .imagen(publicacion.getImagen().getOriginalFilename())
                    .observaciones(publicacion.getObservaciones())
                    .estado(publicacion.getEstado())
                    .tipo(publicacion.getTipo())
                    .activo(true)
                    .build();

        } else {
            aux = PublicacionBusqueda.builder()
                    .duenio(cliente)
                    .nombre(publicacion.getNombre())
                    .raza(publicacion.getRaza())
                    .color(publicacion.getColor())
                    .sexo(publicacion.getSexo())
                    .zona(publicacion.getZona())
                    .edad(publicacion.getEdad())
                    .telefono(publicacion.getTelefono())
                    .email(publicacion.getEmail())
                    .fecha(fecha)
                    .observaciones(publicacion.getObservaciones())
                    .estado(publicacion.getEstado())
                    .tipo(publicacion.getTipo())
                    .activo(true)
                    .build();

        }
        return publicacionBusquedaRepository.save(aux);
    }


    @Transactional
    public PublicacionBusqueda modificarPublicacion(EditPublicacionBusqueda publicacion) throws MiException{

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        var fecha = LocalDate.parse(publicacion.getFecha().toString(),formatter);
        var user = this.userRepository.findById(publicacion.getIdCliente()).get();
        var busqueda = this.publicacionBusquedaRepository.findById(publicacion.getId()).get();

                busqueda.setDuenio(user);
                busqueda.setNombre(publicacion.getNombre());
                busqueda.setEdad(publicacion.getEdad());
                busqueda.setRaza(publicacion.getRaza());
                busqueda.setColor(publicacion.getColor());
                busqueda.setSexo(publicacion.getSexo());
                busqueda.setFecha(fecha);
                busqueda.setActivo(publicacion.isActivo());
                busqueda.setImagen(publicacion.getImagen().getOriginalFilename());

        return publicacionBusquedaRepository.save(busqueda);
    }


    @Transactional
    public void deshabilitarPublicacion(Long id) throws MiException{
        if (id == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Optional<PublicacionBusqueda> respuesta =  publicacionBusquedaRepository.findById(id);
        if(respuesta.isPresent()){
            PublicacionBusqueda publicacionBusqueda = respuesta.get();
            publicacionBusqueda.setActivo(false);
            publicacionBusquedaRepository.save(publicacionBusqueda);
        }
    }


    @Transactional
    public void eliminarPublicacion(Long id) throws MiException{
        if (id == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Optional<PublicacionBusqueda> respuesta =  publicacionBusquedaRepository.findById(id);
        if(respuesta.isPresent()){
            PublicacionBusqueda publicacion = respuesta.get();
            publicacionBusquedaRepository.delete(publicacion);
        }
    }


    //METODOS PARA LISTAR Y CONSULTAS


    public List<PublicacionBusqueda> findAll() {
        return publicacionBusquedaRepository.findAll();
    }

//    public List<PublicacionBusqueda> findByDateAndVisible(LocalDate fecha){
//        return publicacionBusquedaRepository.findByDateAndVisible(fecha);
//    }

    public Optional<PublicacionBusqueda> findById(Long id){
        return publicacionBusquedaRepository.findById(id);
    }

    public List<PublicacionBusqueda> findActivo(){
        return publicacionBusquedaRepository.findByActivo(true);
    }


    private void validarDatos(String nombreDePerro, String raza, String color, String edad, Sexo sexo,
                              LocalDate fecha, String origen, Boolean activo, Long cliente) throws MiException {

        if (nombreDePerro == null || nombreDePerro.isEmpty()) {
            throw new MiException("El nombre ingresado no puede ser nulo o estar vacio");
        }
        if (raza == null || raza.isEmpty()) {
            throw new MiException("LA raza ingresado no puede ser nulo o estar vacio");
        }
        if (color == null || color.isEmpty()) {
            throw new MiException("El color ingresado no puede ser nulo o estar vacio");
        }
        if (edad == null) {
            throw new MiException("La edad ingresada no puede ser nulo");
        }
        if (sexo == null || sexo.toString().isEmpty()) {
            throw new MiException("El sexo ingresado no puede ser nulo o estar vacio");
        }
        if (origen == null || origen.isEmpty()) {
            throw new MiException("El origen  ingresado no puede ser nulo o estar vacio");
        }
        if(fecha.isAfter(LocalDate.now())){
            throw new MiException("La fecha de publicacion ingresada no puede ser posterior a la del dia de hoy");
        }
//        if (visible == null) {
//            throw new MiException("La disponibilidad de visualizacion no puede ser nula");
//        }
        if(cliente == null){
            throw new MiException("el cliente ingresado no puede ser nulo");
        }

    }

    private void validarDatos(String nombreDePerro, String raza, String color, String edad, Sexo sexo,
                              String origen, Long cliente) throws MiException {

        if (nombreDePerro == null || nombreDePerro.isEmpty()) {
            throw new MiException("El nombre ingresado no puede ser nulo o estar vacio");
        }
        if (raza == null || raza.isEmpty()) {
            throw new MiException("LA raza ingresado no puede ser nulo o estar vacio");
        }
        if (color == null || color.isEmpty()) {
            throw new MiException("El color ingresado no puede ser nulo o estar vacio");
        }
        if (edad == null) {
            throw new MiException("La edad ingresada no puede ser nulo");
        }
        if (sexo == null || sexo.toString().isEmpty()) {
            throw new MiException("El sexo ingresado no puede ser nulo o estar vacio");
        }
        if (origen == null || origen.isEmpty()) {
            throw new MiException("El origen  ingresado no puede ser nulo o estar vacio");
        }

        if(cliente == null){
            throw new MiException("el cliente ingresado no puede ser nulo");
        }

    }
}
