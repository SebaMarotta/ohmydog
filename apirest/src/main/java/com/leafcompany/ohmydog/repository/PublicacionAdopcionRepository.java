package com.leafcompany.ohmydog.repository;


import com.leafcompany.ohmydog.entity.PublicacionAdopcion;
import com.leafcompany.ohmydog.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface PublicacionAdopcionRepository extends JpaRepository<PublicacionAdopcion, Long> {


    @Query("SELECT p FROM PublicacionAdopcion p WHERE p.fecha = :fecha and p.visible = true")
    public List<PublicacionAdopcion> findByDateAndVisible(@Param("fecha") LocalDate fecha);

    @Query("SELECT p FROM PublicacionAdopcion p WHERE p.visible = true")
    public List<PublicacionAdopcion> findVisible();

}
