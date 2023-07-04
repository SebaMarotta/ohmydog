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

    private Long id;
    private String nombre;
    private String descripcion;
    private Double objetivo;
    private Double montoAlcanzado;
    private String fecha;
    private Boolean activa;


}
