package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.RequestResponse.RegisterPerroAdoptivoRequest;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.PerroAdoptivo;
import com.leafcompany.ohmydog.entity.PracticaMedica;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.repository.PerroAdoptivoRepository;
import com.leafcompany.ohmydog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PerroAdoptivoService {

    @Autowired
    private PerroAdoptivoRepository perroAdoptivoRepository;

    @Autowired
    private UserService userService;

    public Optional<PerroAdoptivo> findByPerro (Long idPerro){
        return perroAdoptivoRepository.findById(idPerro);
    }
    public List<PerroAdoptivo> findByDueño (Long idPerro){

        return perroAdoptivoRepository.findByDueño(idPerro);
    }

    public List<PerroAdoptivo> findAllActivos (){
        return perroAdoptivoRepository.findByActivo(true);
    }

    public PerroAdoptivo crear (RegisterPerroAdoptivoRequest request){
        try{
            User dueño = this.userService.findById(request.getIdDueño()).get();
            var perro = PerroAdoptivo
                    .builder()
                    .dueño(dueño)
                    .color(request.getColor())
                    .sexo(request.getSexo())
                    .raza(request.getRaza())
                    .activo(true)
                    .edad(request.getEdad())
                    .nombre(request.getNombre())
                    .build();

            return perroAdoptivoRepository.save(perro);
        } catch (DataAccessException e){
            throw e;
        }
    }

}
