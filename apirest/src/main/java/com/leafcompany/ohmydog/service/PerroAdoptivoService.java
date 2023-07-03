package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.RequestResponse.RegisterPerroAdoptivoRequest;

import com.leafcompany.ohmydog.entity.PerroAdoptivo;

import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.repository.PerroAdoptivoRepository;

import jakarta.transaction.Transactional;
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

    public Optional<PerroAdoptivo> findById(Long idPerro){
        return perroAdoptivoRepository.findById(idPerro);
    }
    public List<PerroAdoptivo> findByDueño (Long idPerro){

        return perroAdoptivoRepository.findByDueño(idPerro);
    }

    public List<PerroAdoptivo> findAllActivos (){
        return perroAdoptivoRepository.findByActivo(true);
    }

    @Transactional
    public PerroAdoptivo crear (RegisterPerroAdoptivoRequest request, Long idCliente){
        try{
            User dueño = this.userService.findById(idCliente).get();
            var perro = PerroAdoptivo
                    .builder()
                    .dueño(dueño)
                    .color(request.getColor())
                    .sexo(request.getSexo())
                    .raza(request.getRaza())
                    .activo(true)
                    .edad(request.getEdad())
                    .nombre(request.getNombre())
                    .imagen(request.getImagen().getOriginalFilename())
                    .build();

            return perroAdoptivoRepository.save(perro);
        } catch (DataAccessException e){
            throw e;
        }
    }


    @Transactional
    public void eliminarPerroAdoptivo(Long id) throws MiException {
        if (id == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Optional<PerroAdoptivo> respuesta =  perroAdoptivoRepository.findById(id);
        if(respuesta.isPresent()){
            PerroAdoptivo perro = respuesta.get();
            perroAdoptivoRepository.delete(perro);
        }
    }

}
