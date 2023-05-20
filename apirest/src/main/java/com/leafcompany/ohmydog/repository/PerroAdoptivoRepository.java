package com.leafcompany.ohmydog.repository;

import com.leafcompany.ohmydog.entity.PerroAdoptivo;
import com.leafcompany.ohmydog.entity.PracticaMedica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerroAdoptivoRepository extends JpaRepository<PerroAdoptivo,Long> {

    public List<PerroAdoptivo> findByDueño(Long id);

    public List<PerroAdoptivo> findByActivo(Boolean ok);
}
