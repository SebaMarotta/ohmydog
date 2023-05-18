package com.leafcompany.ohmydog.service;

import java.util.List;
import java.util.Optional;

import com.leafcompany.ohmydog.RequestResponse.RegisterTurnoRequest;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.SolicitudDeTurno;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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

    @Autowired
    private MascotaService mascotaService;
    @Autowired
    private UserService userService;

    @Autowired
    private SolicitudDeTurnoService solicitudDeTurnoService;



    @Transactional // inicialmente era un metodo void, pero le puse el devolver mascota para que
                   // luego desde el controlador devuelva el turno creado
    public Turno crearTurno(RegisterTurnoRequest request) throws MiException {
        Mascota mascota = this.mascotaService.findById(request.getIdMascota()).get();
        User user = this.userService.findById(request.getIdUser()).get();

        try {
            var turno = Turno
                    .builder()
                    .mascota(mascota)
                    .cliente(user)
                    .activo(true)
                    .fecha(request.getFecha())
                    .motivo(MotivosTurnos.valueOf(request.getMotivo()))
                    .build();
            return this.turnoRepository.save(turno);
        } catch (DataAccessException e){
            throw(e);
        }
    }

    public Turno editar (Turno request){
        return turnoRepository.save(request);
    }

    @Transactional
    public void cancelarTurno(Long id) throws MiException{
        if (id == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Optional<Turno> respuesta =  turnoRepository.findById(id);
        if(respuesta.isPresent()){
            Turno turno = respuesta.get();
            if (turno.isActivo()) {
                turno.desactivarTurno();
                turnoRepository.save(turno);
            }
        }
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
    public List<Turno> findByType(String motivo){
        List<Turno> resultado = turnoRepository.findByType(motivo);
        return (!resultado.isEmpty()) ? resultado : null;
    }

    public List<Turno> findByClient(Long idCliente){
        List<Turno> resultado = turnoRepository.findByClient(idCliente);
        return (!resultado.isEmpty()) ? resultado : null;
    }

    public List<Turno> findAll(){
        return turnoRepository.findAll();
    }
    public List<Turno> findAllByOrderByFecha(){
        return turnoRepository.findAllByOrderByFecha();
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