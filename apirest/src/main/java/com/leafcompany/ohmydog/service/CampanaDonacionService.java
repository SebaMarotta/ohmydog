package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.RequestResponse.EditCampanaDonacion;

import com.leafcompany.ohmydog.RequestResponse.RegisterCampanaDonacion;

import com.leafcompany.ohmydog.entity.CampanaDonacion;

import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.exceptions.MiException;
import com.leafcompany.ohmydog.repository.CampanaDonacionRepository;

import com.leafcompany.ohmydog.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CampanaDonacionService {

    @Autowired
    private CampanaDonacionRepository campanaDonacionRepository;

    @Autowired
    private UserService userService;


    @Transactional
    public CampanaDonacion crearCampana(RegisterCampanaDonacion campana) throws MiException{

//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
//        var fecha = LocalDate.parse(campana.getFechaVencimiento(),formatter);

        var aux = CampanaDonacion.builder()
                .nombre(campana.getNombre())
                .descripcion(campana.getDescripcion())
                .objetivo(campana.getObjetivo())
                .montoAlcanzado(0.0)
                .fechaVencimiento(campana.getFechaVencimiento())
                .activa(true)
                .build();

        return campanaDonacionRepository.save(aux);
    }


    @Transactional
    public CampanaDonacion modificarCampana (EditCampanaDonacion request, CampanaDonacion campana ) throws MiException{

//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");



//        var fecha = LocalDate.parse(campana.getFecha(),formatter);



//        CampanaDonacion aux = CampanaDonacion.builder()
//                .nombre(campana.getNombre())
//                .descripcion(campana.getDescripcion())
//                .objetivo(campana.getObjetivo())
//                .montoAlcanzado(campana.getMontoAlcanzado())
//                .activa(campana.getActiva())
//                .fecha(LocalDate.parse(campana.getFecha(),formatter))
//                .build();

//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
//        var fecha = LocalDate.parse(request.getFechaVencimiento(),formatter);

        campana.setNombre(request.getNombre());
        campana.setDescripcion(request.getDescripcion());
        campana.setObjetivo(request.getObjetivo());
        campana.setActiva(request.getActiva());
        campana.setFechaVencimiento(request.getFechaVencimiento());

        return campanaDonacionRepository.save(campana);
    }


    @Transactional
    public void deshabilitarCampana(Long id) throws MiException{
        if (id == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Optional<CampanaDonacion> respuesta =  campanaDonacionRepository.findById(id);
        if(respuesta.isPresent()){
            CampanaDonacion campanaDonacion = respuesta.get();
            campanaDonacion.setActiva(false);
            campanaDonacionRepository.save(campanaDonacion);
        }
    }


    @Transactional
    public void eliminarCampana(Long id) throws MiException{
        if (id == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Optional<CampanaDonacion> respuesta =  campanaDonacionRepository.findById(id);
        if(respuesta.isPresent()){
            CampanaDonacion campanaDonacion = respuesta.get();
            campanaDonacionRepository.delete(campanaDonacion);
        }
    }

    @Transactional
    public void actualizarCampanasActivas() throws MiException{
        List<CampanaDonacion> campanasActivas = campanaDonacionRepository.findActive();
        for (CampanaDonacion campana: campanasActivas) {
            if(campana.getFechaVencimiento().isBefore(LocalDate.now())){
                this.deshabilitarCampana(campana.getId());
            }
        }
    }


    //METODOS PARA LISTAR Y CONSULTAS


    public List<CampanaDonacion> findAll() {
        return campanaDonacionRepository.findAll();
    }

    public List<CampanaDonacion> findByDateAndVisible(LocalDate fecha){
        return campanaDonacionRepository.findByDateAndVisible(fecha);
    }

    public Optional<CampanaDonacion> findById(Long id){
        return campanaDonacionRepository.findById(id);
    }

    public List<CampanaDonacion> findActive(){
        return campanaDonacionRepository.findActive();
    }



    /// METODOS PARA REGISTRAR DONACIONES UNA VEZ CREADAS LAS CAMPANAS

    public Map<String, BigDecimal> registrarDonacion(Long idCampana, Long idCliente, Double monto) throws MiException{
        if (idCliente == null || idCampana == null){
            throw new MiException("El ID ingresado no puede ser nulo");
        }
        Map<String,BigDecimal> response = new HashMap<String,BigDecimal>();

        CampanaDonacion campana = campanaDonacionRepository.findById(idCampana).get();
        campana.setMontoAlcanzado(campana.getMontoAlcanzado() + monto);
        if (idCliente != 0){
            var saldoAnterior = userService.findById(idCliente).get().getSaldo();
            userService.registrarSaldoAFavorDonacion(idCliente,monto*0.2);
            campanaDonacionRepository.save(campana);
            var saldoActual = userService.findById(idCliente).get().getSaldo();
            response.put("saldoAnterior",saldoAnterior);
            response.put("saldoActual",saldoActual);
            return response;
        } else {
            campanaDonacionRepository.save(campana);
            response.put("Mensaje", BigDecimal.ZERO);
            return response;
        }
    }


}
