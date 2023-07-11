package com.leafcompany.ohmydog.entity;

import com.leafcompany.ohmydog.enumerations.Razas;
import com.leafcompany.ohmydog.enumerations.Sexo;
import com.leafcompany.ohmydog.enumerations.TipoBusqueda;
import com.leafcompany.ohmydog.enumerations.Zona;
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
public class PublicacionBusqueda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User duenio;
    private String nombre;

    @Enumerated(EnumType.STRING)
    private Razas raza;

    private String color;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    @Enumerated(EnumType.STRING)
    private Zona zona;

    private String edad;
    private String telefono;
    private String email;
    private LocalDate fecha;
    private String imagen;
    private String observaciones;
    private String estado;
    private boolean activo;
    @Enumerated(EnumType.STRING)
    private TipoBusqueda tipo;



}




