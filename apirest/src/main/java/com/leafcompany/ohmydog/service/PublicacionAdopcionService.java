package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.RequestResponse.EditMascotaRequest;
import com.leafcompany.ohmydog.RequestResponse.EditPublicacionAdopcionRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterPublicacionAdopcion;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.PublicacionAdopcion;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.repository.PublicacionAdopcionRepository;
import com.leafcompany.ohmydog.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class PublicacionAdopcionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PublicacionAdopcionRepository publicacionAdopcionRepository;

    @Transactional
    public PublicacionAdopcion crearPublicacion(RegisterPublicacionAdopcion publicacionAdopcion, Long idCliente) throws MiException{

        User cliente = userRepository.findById(idCliente).get();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        var aux = PublicacionAdopcion.builder()
                .cliente(cliente)
                .nombrePerro(publicacionAdopcion.getNombrePerro())
                .edad(publicacionAdopcion.getEdad())
                .raza(publicacionAdopcion.getRaza())
                .color(publicacionAdopcion.getColor())
                .sexo(publicacionAdopcion.getSexo())
                .fecha(LocalDate.parse(publicacionAdopcion.getFecha(),formatter))
                .origen(publicacionAdopcion.getOrigen())
                .visible(publicacionAdopcion.getVisible())
                .build();

        return publicacionAdopcionRepository.save(aux);
    }


    @Transactional
    public PublicacionAdopcion modificarPublicacion(EditPublicacionAdopcionRequest publicacion){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        var fecha = LocalDate.parse(publicacion.getFecha(),formatter);
        var user = this.userRepository.findById(publicacion.getCliente()).get();
        PublicacionAdopcion aux = PublicacionAdopcion.builder()
                .id(publicacion.getId())
                .cliente(user)
                .nombrePerro(publicacion.getNombrePerro())
                .edad(publicacion.getEdad())
                .raza(publicacion.getRaza())
                .color(publicacion.getColor())
                .sexo(publicacion.getSexo())
                .fecha(LocalDate.parse(publicacion.getFecha(),formatter))
                .origen(publicacion.getOrigen())
                .visible(publicacion.getVisible())
                .build();


        return publicacionAdopcionRepository.save(aux);
    }


    @Transactional
    public void deshabilitarPublicacion(Long id) throws MiException{
        if (id == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Optional<PublicacionAdopcion> respuesta =  publicacionAdopcionRepository.findById(id);
        if(respuesta.isPresent()){
            PublicacionAdopcion publicacionAdopcion = respuesta.get();
            publicacionAdopcion.setVisible(false);
            publicacionAdopcionRepository.save(publicacionAdopcion);
        }
    }


    @Transactional
    public void eliminarPublicacion(Long id) throws MiException{
        if (id == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Optional<PublicacionAdopcion> respuesta =  publicacionAdopcionRepository.findById(id);
        if(respuesta.isPresent()){
            PublicacionAdopcion publicacion = respuesta.get();
            publicacionAdopcionRepository.delete(publicacion);
        }
    }


    //METODOS PARA LISTAR Y CONSULTAS


    public List<PublicacionAdopcion> findAll() {
        return publicacionAdopcionRepository.findAll();
    }

    public List<PublicacionAdopcion> findByDateAndVisible(LocalDate fecha){
        return publicacionAdopcionRepository.findByDateAndVisible(fecha);
    }

    public List<PublicacionAdopcion> findVisible(){
        return publicacionAdopcionRepository.findVisible();
    }


}
