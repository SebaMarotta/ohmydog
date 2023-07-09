package com.leafcompany.ohmydog.repository;

import com.leafcompany.ohmydog.entity.PracticaMedica;
import com.leafcompany.ohmydog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface PracticaRepository extends JpaRepository<PracticaMedica, Long> {
    public List<PracticaMedica> findByMascotaIdOrderByFechaDesc(Long id);


}
