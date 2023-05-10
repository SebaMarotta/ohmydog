package com.leafcompany.ohmydog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import com.leafcompany.ohmydog.entity.Turno;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.repository.TurnoRepository;

import jakarta.transaction.Transactional;

@Service
public class TurnoService {

    @Autowired
    private TurnoRepository turnoRepository;


    @Transactional // inicialmente era un metodo void, pero le puse el devolver mascota para que
                   // luego desde el controlador devuelva el turno creado
    public Turno crearTurno(Turno turno, Long idCliente, Long idMascota) throws MiException {

        this.validarDatos(turno.getMotivo().toString(), idCliente, idMascota);

        turnoRepository.save(turno);
        return turno;
    }


   
    @Transactional
    public void eliminarTurno(Long id) throws MiException{
        if (id == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Optional<Turno> respuesta =  turnoRepository.findById(id);
        if(respuesta.isPresent()){
            Turno turno = respuesta.get();
            turnoRepository.delete(turno);
        }
    }


    // METODOS PARA CONSULTAS O BUSQUEDAS
    public List<Turno> findByType(MotivosTurnos motivo){
        List<Turno> resultado = turnoRepository.findByType(motivo.toString());
        return (!resultado.isEmpty()) ? resultado : null;
    }

    public List<Turno> findByClient(Long idCliente){
        List<Turno> resultado = turnoRepository.findByClient(idCliente);
        return (!resultado.isEmpty()) ? resultado : null;
    }

    public List<Turno> findAll(){
        return turnoRepository.findAll();
    }


    public Optional<Turno> findById(Long id){
        return turnoRepository.findById(id);
    }


    private void validarDatos(String motivo, Long idCliente, Long idMascota) throws MiException{
        if (idCliente == null){
            throw new MiException("El cliente ingresado del turno no puede ser nulo");
        }
        if (motivo.isEmpty() || motivo == null){
            throw new MiException("El motivo de la consulta no puede ser nulo o estar vacio");
        }
        if (idMascota == null){
            throw new MiException("La mascota seleccionada para el turno no puede ser nula");
        }

    }

}