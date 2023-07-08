package com.leafcompany.ohmydog.RequestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class EditCampanaDonacion {

    private String nombre;
    private String descripcion;
    private Double objetivo;
    private Boolean activa;


}
