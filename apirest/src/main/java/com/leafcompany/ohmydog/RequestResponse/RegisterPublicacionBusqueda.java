package com.leafcompany.ohmydog.RequestResponse;

import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.Razas;
import com.leafcompany.ohmydog.enumerations.Sexo;
import com.leafcompany.ohmydog.enumerations.TipoBusqueda;
import com.leafcompany.ohmydog.enumerations.Zona;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterPublicacionBusqueda {
    private String nombre;
    private String edad;
    private Razas raza;
    private String color;
    private Sexo sexo;
    private String origen;
    private String observaciones;
    private String estado;
    private Zona zona;
    private String telefono;
    private String email;
    private TipoBusqueda tipo;
    private String fecha;
    private MultipartFile imagen;
}
