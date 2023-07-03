package com.leafcompany.ohmydog.entity;

import com.leafcompany.ohmydog.enumerations.Razas;
import com.leafcompany.ohmydog.enumerations.Sexo;
import com.leafcompany.ohmydog.enumerations.TipoBusqueda;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BusquedaMascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private User duenio;
    private String nombre;
    private Razas raza;
    private String color;
    private String observaciones;
    private String estado;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;
    @Enumerated(EnumType.STRING)
    private TipoBusqueda tipo;
    
    private String fecha;
    private String imagen;
    private boolean activo;


}




