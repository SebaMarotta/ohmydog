package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.PracticaMedica;
import com.leafcompany.ohmydog.repository.PracticaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PracticaService {

    @Autowired
    private PracticaRepository practicaRepository;

    public List<PracticaMedica> findByMascota (Long idMascota){
        return practicaRepository.findByMascotaId(idMascota);
    }

    public PracticaMedica crear (PracticaMedica practica){
        return practicaRepository.save(practica);
    }
}
