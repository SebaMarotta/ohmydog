package com.leafcompany.ohmydog.repository;

import com.leafcompany.ohmydog.entity.CampanaDonacion;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CampanaDonacionRepository  extends JpaRepository<CampanaDonacion, Long> {
    @Query("SELECT c FROM CampanaDonacion c WHERE c.fecha = :fecha and c.activa = true")
    public List<CampanaDonacion> findByDateAndVisible(@Param("fecha") LocalDate fecha);

    @Query("SELECT c FROM CampanaDonacion c WHERE c.activa = true")
    public List<CampanaDonacion> findActive();
}
