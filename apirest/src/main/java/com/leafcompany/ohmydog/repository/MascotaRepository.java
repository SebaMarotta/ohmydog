package com.leafcompany.ohmydog.repository;

import com.leafcompany.ohmydog.entity.Mascota;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long>  {

    @Query("SELECT m FROM Mascota m WHERE m.nombre = :nombre")
    public List<Mascota> findByName(@Param("nombre") String nombre);

    @Query("SELECT m FROM Mascota m WHERE m.raza = :raza")
    public List<Mascota> findByType(@Param("raza") String raza);


    @Query("SELECT m FROM Mascota m WHERE m.sexo = :sexo")
    public List<Mascota> findByGender(@Param("sexo") String sexo);

    @Query("SELECT m FROM Mascota m WHERE m.duenio.id = :idDuenio")
    public List<Mascota> findByUser(@Param("idDuenio") long idDuenio);

}
