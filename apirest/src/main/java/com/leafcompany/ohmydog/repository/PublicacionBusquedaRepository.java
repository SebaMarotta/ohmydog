package com.leafcompany.ohmydog.repository;

import com.leafcompany.ohmydog.entity.PublicacionAdopcion;
import com.leafcompany.ohmydog.entity.PublicacionBusqueda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PublicacionBusquedaRepository extends JpaRepository<PublicacionBusqueda,Long> {
    public List<PublicacionBusqueda> findByActivo(boolean activo);
}
