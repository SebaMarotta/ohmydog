package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.RequestResponse.RegisterSolicitudRequest;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.PracticaMedica;
import com.leafcompany.ohmydog.entity.SolicitudDeTurno;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.HorariosTurnos;
import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import com.leafcompany.ohmydog.repository.MascotaRepository;
import com.leafcompany.ohmydog.repository.SolicitudDeTurnoRepository;
import com.leafcompany.ohmydog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolicitudDeTurnoService {
    @Autowired
    SolicitudDeTurnoRepository solicitudRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MascotaRepository mascotaRepository;


public SolicitudDeTurno register (RegisterSolicitudRequest request){
    User user = userRepository.findById(request.getUser()).get();
    Mascota mascota =  mascotaRepository.findById(request.getMascota()).get();


    SolicitudDeTurno aux = SolicitudDeTurno
            .builder()
            .mascota(mascota)
            .user(user)
            .motivo(MotivosTurnos.valueOf(request.getMotivo()))
            .horario(HorariosTurnos.valueOf(request.getHorario()))
            .observaciones(request.getObservaciones())
            .estado(true)
            .build();

    return solicitudRepository.save(aux);
}

    public SolicitudDeTurno edit (SolicitudDeTurno request){
        return solicitudRepository.save(request);
    }
    public List<SolicitudDeTurno> findByMascota (Long idMascota){
        return solicitudRepository.findByMascota(idMascota);
    }
    public List<SolicitudDeTurno> findAll (){
        return solicitudRepository.findAll();
    }

    public Optional<SolicitudDeTurno> findById (Long id){
        return solicitudRepository.findById(id);
    }

    public List<SolicitudDeTurno> findByUser (Long idUser){
        return solicitudRepository.findByUser(idUser);
    }

    public List<SolicitudDeTurno> findByEstado (Boolean ok){
        return solicitudRepository.findByEstado(ok);
    }

    public List<SolicitudDeTurno> findByHorario (HorariosTurnos horario){
        return solicitudRepository.findByHorario(horario);
    }

    public List<SolicitudDeTurno> findByMotivo (MotivosTurnos motivo){
        return solicitudRepository.findByMotivo(motivo);
    }

    public List<SolicitudDeTurno> findByMascotaAndEstado(Long idmascota, Boolean ok){
        Mascota mascota = mascotaRepository.findById(idmascota).get();
        return solicitudRepository.findByMascotaAndEstado(mascota,ok);
    }
    public List<SolicitudDeTurno> findByUserAndEstado(Long id, Boolean ok){
        User user = userRepository.findById(id).get();
        return solicitudRepository.findByUserAndEstado(user,ok);
    }
}
