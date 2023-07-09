package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.RequestResponse.RegisterPracticaRequest;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.PracticaMedica;
import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import com.leafcompany.ohmydog.repository.MascotaRepository;
import com.leafcompany.ohmydog.repository.PracticaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PracticaService {

    @Autowired
    private PracticaRepository practicaRepository;
    @Autowired
    private MascotaRepository mascotaRepository;

    public List<PracticaMedica> findByMascota (Long idMascota){
        return practicaRepository.findByMascotaIdOrderByFechaDesc(idMascota);
    }
    public Optional<PracticaMedica> findById (Long id){
        return practicaRepository.findById(id);
    }

    public PracticaMedica crear (PracticaMedica request, Mascota id){
        request.setMascota(id);
        Mascota mascota = mascotaRepository.getReferenceById(id.getId());
        if (request.getMotivo().equals(MotivosTurnos.CASTRACION)) {
            mascota.setCastrada(true);
            mascota.setCruza(false);
        }
        mascotaRepository.save(mascota);
        return practicaRepository.save(request);
    }
}
