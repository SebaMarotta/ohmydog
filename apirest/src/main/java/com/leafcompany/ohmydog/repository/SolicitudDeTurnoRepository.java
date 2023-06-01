package com.leafcompany.ohmydog.repository;

import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.SolicitudDeTurno;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.HorariosTurnos;
import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface SolicitudDeTurnoRepository extends JpaRepository<SolicitudDeTurno, Long> {
    List<SolicitudDeTurno> findByUser(Long id);
    List<SolicitudDeTurno> findByMascota(Long id);
    Optional<SolicitudDeTurno> findById(Long id);
    List<SolicitudDeTurno> findByEstado(Boolean ok);
    List<SolicitudDeTurno> findByHorario(HorariosTurnos horario);
    List<SolicitudDeTurno> findByMotivo(MotivosTurnos motivo);
    List<SolicitudDeTurno> findByMascotaAndEstado(Mascota mascota, Boolean ok);
    List<SolicitudDeTurno> findByUserAndEstado(User user, Boolean ok);

}
