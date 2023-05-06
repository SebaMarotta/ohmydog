package com.leafcompany.ohmydog.repository;
import com.leafcompany.ohmydog.entity.Turno;

import java.util.List;

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

}