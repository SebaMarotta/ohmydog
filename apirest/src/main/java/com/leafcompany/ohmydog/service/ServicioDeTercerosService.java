package com.leafcompany.ohmydog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leafcompany.ohmydog.entity.ServicioDeTerceros;
import com.leafcompany.ohmydog.enumerations.TipoServicio;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.repository.ServicioDeTercerosRepository;

import jakarta.transaction.Transactional;

@Service
public class ServicioDeTercerosService {

    @Autowired
    private ServicioDeTercerosRepository servicioDeTercerosRepository;


    @Transactional // inicialmente era un metodo void, pero le puse el devolver mascota para que
                   // luego desde el controlador devuelva el perro creado
    public ServicioDeTerceros crearServicioDeTerceros(ServicioDeTerceros cuidador_paseador) throws MiException {

        this.validarDatos(cuidador_paseador.getNombre(), cuidador_paseador.getApellido(), cuidador_paseador.getTelefono(),
            cuidador_paseador.getEmail(), cuidador_paseador.getTipo(), cuidador_paseador.getRangohorario(), cuidador_paseador.getDias());

        servicioDeTercerosRepository.save(cuidador_paseador);
        return cuidador_paseador;
    }

    // @Transactional
    // public ServicioDeTerceros crearServicioDeTerceros(@RequestBody ServicioDeTerceros servicioDeTerceros) throws MiException {

    //     this.validarDatos(nombre, apellido, telefono, email, tipo, rangoHorario, dias);

    //     ServicioDeTerceros cuidador_paseador = new ServicioDeTerceros();

    //     cuidador_paseador.setNombre(nombre);
    //     cuidador_paseador.setApellido(apellido);
    //     cuidador_paseador.setTelefono(telefono);
    //     cuidador_paseador.setEmail(email);
    //     cuidador_paseador.setTipo(tipo);
    //     cuidador_paseador.setRangohorario(rangoHorario);
    //     cuidador_paseador.setDias(dias);
    //     cuidador_paseador.setDisponible(true);

    //     servicioDeTercerosRepository.save(cuidador_paseador);

    //     return cuidador_paseador;
    // }

    @Transactional
    public void modificarServicioDeTerceros(Long id, String nombre, String apellido, String telefono,
            String email, TipoServicio tipo, String rangoHorario, List<String> dias, Boolean disponible)
            throws MiException {

        this.validarDatos(nombre, apellido, telefono, email, tipo, rangoHorario, dias);

        Optional<ServicioDeTerceros> respuesta = servicioDeTercerosRepository.findById(id);

        if (respuesta.isPresent()) {
            ServicioDeTerceros cuidador_paseador = respuesta.get();

            cuidador_paseador.setNombre(nombre);
            cuidador_paseador.setApellido(apellido);
            cuidador_paseador.setTelefono(telefono);
            cuidador_paseador.setEmail(email);
            cuidador_paseador.setTipo(tipo);
            cuidador_paseador.setRangohorario(rangoHorario);
            cuidador_paseador.setDias(dias);
            cuidador_paseador.setDisponible(disponible);
            
            servicioDeTercerosRepository.save(cuidador_paseador);

        }

    }


    @Transactional
    public void eliminarServicioDeTerceros(Long id) throws MiException{
        if (id == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Optional<ServicioDeTerceros> respuesta =  servicioDeTercerosRepository.findById(id);
        if(respuesta.isPresent()){
            ServicioDeTerceros perro = respuesta.get();
            servicioDeTercerosRepository.delete(perro);
        }
    }





    // METODOS PARA CONSULTAS O BUSQUEDAS
    public List<ServicioDeTerceros> findByType(String tipo){
        List<ServicioDeTerceros> resultado = servicioDeTercerosRepository.findByType(tipo);
        return (!resultado.isEmpty()) ? resultado : null;
    }

    public List<ServicioDeTerceros> findByName(String nombre) {
        List<ServicioDeTerceros> resultado = servicioDeTercerosRepository.findByName(nombre);
        return (!resultado.isEmpty()) ? resultado : null;
    }

    public List<ServicioDeTerceros> findAll(){
        return servicioDeTercerosRepository.findAll();
    }


    public Optional<ServicioDeTerceros> findById(Long id){
        return servicioDeTercerosRepository.findById(id);
    }
    

    private void validarDatos(String nombre, String apellido, String telefono, String email, TipoServicio tipo,
            String rangoHorario, List<String> dias) throws MiException {

        if (nombre == null || nombre.isEmpty()) {
            throw new MiException("El nombre ingresado no puede ser nulo o estar vacio");
        }
        if (apellido == null || apellido.isEmpty()) {
            throw new MiException("LA raza ingresado no puede ser nulo o estar vacio");
        }
        if (telefono == null || telefono.isEmpty()) {
            throw new MiException("El telefono ingresado no puede ser nulo o estar vacio");
        }
        if (email == null || email.isEmpty()) {
            throw new MiException("El email ingresado no puede ser nulo o estar vacio");
        }
        if (tipo == null) {
            throw new MiException("El tipo ingresado no puede ser nulo o estar vacio");
        }
        if (rangoHorario == null || rangoHorario.isEmpty()) {
            throw new MiException("El rango horario ingresado no puede ser nulo o Posterior al dia de la fecha actual");
        }
        if (dias == null || dias.isEmpty()) {
            throw new MiException("Los dias ingresados de disponibilidad no pueden ser nulos o estar vacios");
        }

    }

}
