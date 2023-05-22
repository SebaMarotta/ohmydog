package com.leafcompany.ohmydog.RequestResponse;

import com.leafcompany.ohmydog.enumerations.Zona;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SolicitudContactoServicio {

    private Long idServicio;
    private String email;
    private String telefono;
    private String nombre;
    private String fechaYhora;
    private Zona zona;


}