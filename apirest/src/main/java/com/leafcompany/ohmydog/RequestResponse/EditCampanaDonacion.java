package com.leafcompany.ohmydog.RequestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class EditCampanaDonacion {

    private String nombre;
    private String descripcion;
    private Double objetivo;
    private Boolean activa;
    private LocalDate fechaVencimiento;


}
