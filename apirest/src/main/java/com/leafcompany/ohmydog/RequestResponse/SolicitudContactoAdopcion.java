package com.leafcompany.ohmydog.RequestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SolicitudContactoAdopcion {

    private Long idDueño;
    private Long idAdopcion;
    private String email;
    private String telefono;
    private String nombre;

}