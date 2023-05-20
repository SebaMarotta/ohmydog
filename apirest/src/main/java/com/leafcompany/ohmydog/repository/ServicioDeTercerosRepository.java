package com.leafcompany.ohmydog.repository;

import com.leafcompany.ohmydog.entity.ServicioDeTerceros;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ServicioDeTercerosRepository extends JpaRepository<ServicioDeTerceros, Long>  {

    @Query("SELECT s FROM ServicioDeTerceros s WHERE s.nombre LIKE %:nombre%")
    public List<ServicioDeTerceros> findByName(@Param("nombre") String nombre);

    @Query("SELECT s FROM ServicioDeTerceros s WHERE s.tipo = :tipo")
    public List<ServicioDeTerceros> findByType(@Param("tipo") String tipo);

}
