package com.leafcompany.ohmydog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PerroAdoptivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User dueño;
    private String nombre;
    private String edad;
    private String raza;
    private String color;
    private String imagen;
    private String sexo;
    private String origen;

    private boolean activo;
}
