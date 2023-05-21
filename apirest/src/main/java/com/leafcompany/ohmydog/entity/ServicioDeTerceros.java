package com.leafcompany.ohmydog.entity;


import java.util.List;

import com.leafcompany.ohmydog.enumerations.DisponibilidadSemana;
import com.leafcompany.ohmydog.enumerations.TipoServicio;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServicioDeTerceros{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellido;
    private String telefono;
    private String email;
    private TipoServicio tipo;
    private String rangoHorario;
    @Enumerated(EnumType.STRING)
    private DisponibilidadSemana dias;
    private Boolean disponible;



    


}