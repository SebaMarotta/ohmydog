package com.leafcompany.ohmydog.repository;
import com.leafcompany.ohmydog.entity.Turno;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long>  {

    @Query("SELECT t FROM Turno t WHERE t.cliente = :idCliente")
    public List<Turno> findByClient(@Param("idCliente") Long idCliente);

    @Query("SELECT t FROM Turno t WHERE t.motivo = :motivo")
    public List<Turno> findByType(@Param("motivo") String motivo);

    @Query("SELECT t FROM Turno t WHERE t.fecha = :fecha")
    public List<Turno> findByDate(@Param("fecha") LocalDate fecha);

    public List<Turno> findAllByFechaGreaterThan(LocalDate diaActual);
    public List<Turno> findAllByFechaBetweenOrderByFecha(LocalDateTime inicioDelDia, LocalDateTime finDelDia);
    public List<Turno> findAllByOrderByFecha();
}