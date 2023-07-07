package com.leafcompany.ohmydog.RequestResponse;

import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.Razas;
import com.leafcompany.ohmydog.enumerations.Sexo;
import com.leafcompany.ohmydog.enumerations.TipoBusqueda;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EditPublicacionBusqueda {
    private Long id;
    private String nombre;
    private Long idCliente;
    private String edad;
    private Razas raza;
    private String color;
    private Sexo sexo;
    private User duenio;
    private String observaciones;
    private String estado;
    private TipoBusqueda tipo;
    private String fecha;
    private MultipartFile imagen;
    private boolean activo;
}