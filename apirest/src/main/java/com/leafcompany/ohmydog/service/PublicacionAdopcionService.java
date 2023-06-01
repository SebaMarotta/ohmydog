package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.RequestResponse.EditMascotaRequest;
import com.leafcompany.ohmydog.RequestResponse.EditPublicacionAdopcionRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterPublicacionAdopcion;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.entity.PublicacionAdopcion;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.DisponibilidadSemana;
import com.leafcompany.ohmydog.enumerations.Sexo;
import com.leafcompany.ohmydog.enumerations.TipoServicio;
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
    public PublicacionAdopcion crearPublicacion(RegisterPublicacionAdopcion publicacion, Long idCliente) throws MiException{

        this.validarDatos(publicacion.getNombrePerro(),publicacion.getRaza(),publicacion.getColor(), publicacion.getEdad(),
                publicacion.getSexo(),publicacion.getOrigen(), idCliente);

        User cliente = userRepository.findById(idCliente).get();

        var aux = PublicacionAdopcion.builder()
                .cliente(cliente)
                .nombrePerro(publicacion.getNombrePerro())
                .edad(publicacion.getEdad())
                .raza(publicacion.getRaza())
                .color(publicacion.getColor())
                .sexo(publicacion.getSexo())
                .origen(publicacion.getOrigen())
                .visible(true)
                .build();

        return publicacionAdopcionRepository.save(aux);
    }


    @Transactional
    public PublicacionAdopcion modificarPublicacion(EditPublicacionAdopcionRequest publicacion) throws MiException{

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        this.validarDatos(publicacion.getNombrePerro(),publicacion.getRaza(),publicacion.getColor(), publicacion.getEdad(),
                            publicacion.getSexo(),LocalDate.parse(publicacion.getFecha(),formatter),publicacion.getOrigen(),
                            publicacion.getVisible(), publicacion.getCliente());


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

    public Optional<PublicacionAdopcion> findById(Long id){
        return publicacionAdopcionRepository.findById(id);
    }

    public List<PublicacionAdopcion> findVisible(){
        return publicacionAdopcionRepository.findVisible();
    }


    private void validarDatos(String nombreDePerro, String raza, String color, String edad, Sexo sexo,
                              LocalDate fecha, String origen, Boolean visible, Long cliente) throws MiException {

        if (nombreDePerro == null || nombreDePerro.isEmpty()) {
            throw new MiException("El nombre ingresado no puede ser nulo o estar vacio");
        }
        if (raza == null || raza.isEmpty()) {
            throw new MiException("LA raza ingresado no puede ser nulo o estar vacio");
        }
        if (color == null || color.isEmpty()) {
            throw new MiException("El color ingresado no puede ser nulo o estar vacio");
        }
        if (edad == null) {
            throw new MiException("La edad ingresada no puede ser nulo");
        }
        if (sexo == null || sexo.toString().isEmpty()) {
            throw new MiException("El sexo ingresado no puede ser nulo o estar vacio");
        }
        if (origen == null || origen.isEmpty()) {
            throw new MiException("El origen  ingresado no puede ser nulo o estar vacio");
        }
        if(fecha.isAfter(LocalDate.now())){
            throw new MiException("La fecha de publicacion ingresada no puede ser posterior a la del dia de hoy");
        }
        if (visible == null) {
            throw new MiException("La disponibilidad de visualizacion no puede ser nula");
        }
        if(cliente == null){
            throw new MiException("el cliente ingresado no puede ser nulo");
        }

    }

    private void validarDatos(String nombreDePerro, String raza, String color, String edad, Sexo sexo,
                              String origen, Long cliente) throws MiException {

        if (nombreDePerro == null || nombreDePerro.isEmpty()) {
            throw new MiException("El nombre ingresado no puede ser nulo o estar vacio");
        }
        if (raza == null || raza.isEmpty()) {
            throw new MiException("LA raza ingresado no puede ser nulo o estar vacio");
        }
        if (color == null || color.isEmpty()) {
            throw new MiException("El color ingresado no puede ser nulo o estar vacio");
        }
        if (edad == null) {
            throw new MiException("La edad ingresada no puede ser nulo");
        }
        if (sexo == null || sexo.toString().isEmpty()) {
            throw new MiException("El sexo ingresado no puede ser nulo o estar vacio");
        }
        if (origen == null || origen.isEmpty()) {
            throw new MiException("El origen  ingresado no puede ser nulo o estar vacio");
        }

        if(cliente == null){
            throw new MiException("el cliente ingresado no puede ser nulo");
        }

    }
}
