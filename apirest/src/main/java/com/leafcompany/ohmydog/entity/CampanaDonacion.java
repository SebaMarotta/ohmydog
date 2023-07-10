package com.leafcompany.ohmydog.entity;

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
@Entity
public class CampanaDonacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    private Double objetivo;
    private Double montoAlcanzado;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate fechaVencimiento;
    private Boolean activa;



}
