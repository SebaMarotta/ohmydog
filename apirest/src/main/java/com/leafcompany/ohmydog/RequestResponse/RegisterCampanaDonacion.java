package com.leafcompany.ohmydog.RequestResponse;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCampanaDonacion {

    private String nombre;
    private String descripcion;
    private Double objetivo;
    private LocalDate fechaVencimiento;

}
