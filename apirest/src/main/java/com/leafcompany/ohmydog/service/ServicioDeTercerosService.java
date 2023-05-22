package com.leafcompany.ohmydog.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.leafcompany.ohmydog.RequestResponse.EditServicioDeTerceroRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterServicioDeTercerosRequest;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.enumerations.DisponibilidadSemana;
import com.leafcompany.ohmydog.enumerations.Zona;
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


    @Transactional
    public ServicioDeTerceros crearServicioDeTerceros(RegisterServicioDeTercerosRequest cuidador_paseador) throws MiException {

        this.validarDatos(cuidador_paseador.getNombre(), cuidador_paseador.getApellido(), cuidador_paseador.getTelefono(),
            cuidador_paseador.getEmail(), cuidador_paseador.getTipo(), cuidador_paseador.getRangoHorario(), cuidador_paseador.getDias());

        var aux = ServicioDeTerceros.builder()
                .nombre(cuidador_paseador.getNombre())
                .apellido(cuidador_paseador.getApellido())
                .telefono(cuidador_paseador.getTelefono())
                .rangoHorario(cuidador_paseador.getRangoHorario())
                .email(cuidador_paseador.getEmail())
                .tipo(cuidador_paseador.getTipo())
                .dias(cuidador_paseador.getDias())
                .zona(cuidador_paseador.getZona())
                .disponible(cuidador_paseador.getDisponible())
                .build();

        return servicioDeTercerosRepository.save(aux);

    }



    @Transactional
    public ServicioDeTerceros modificarServicioDeTerceros(EditServicioDeTerceroRequest cuidador_paseador)
            throws MiException {

        this.validarDatos(cuidador_paseador.getNombre(), cuidador_paseador.getApellido(), cuidador_paseador.getTelefono(),
                cuidador_paseador.getEmail(), cuidador_paseador.getTipo(), cuidador_paseador.getRangoHorario(), cuidador_paseador.getDias());


        var servicio = ServicioDeTerceros.builder()
                .id(cuidador_paseador.getId())
                .nombre(cuidador_paseador.getNombre())
                .apellido(cuidador_paseador.getApellido())
                .telefono(cuidador_paseador.getTelefono())
                .email(cuidador_paseador.getEmail())
                .tipo(cuidador_paseador.getTipo())
                .rangoHorario(cuidador_paseador.getRangoHorario())
                .dias(cuidador_paseador.getDias())
                .zona(cuidador_paseador.getZona())
                .disponible(cuidador_paseador.getDisponible())
                .build();
            
            return servicioDeTercerosRepository.save(servicio);



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
    public List<ServicioDeTerceros> findAllByZona(){
        return servicioDeTercerosRepository.findAll();
    }

    public Zona[] listarZonas(){
        return Zona.values();
    }

    public TipoServicio[] listarTipos(){
        return TipoServicio.values();
    }

    public DisponibilidadSemana[] listarDias(){
        return DisponibilidadSemana.values();
    }


    public Optional<ServicioDeTerceros> findById(Long id){
        return servicioDeTercerosRepository.findById(id);
    }
    

    private void validarDatos(String nombre, String apellido, String telefono, String email, TipoServicio tipo,
            String rangoHorario, DisponibilidadSemana dias) throws MiException {

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
        if (dias == null || dias.toString().isEmpty()) {
            throw new MiException("Los dias ingresados de disponibilidad no pueden ser nulos o estar vacios");
        }

    }

}
