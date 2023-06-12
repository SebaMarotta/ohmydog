package com.leafcompany.ohmydog.entity;


import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@Entity
public class Turno{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User cliente;

    @ManyToOne
    private Mascota mascota;

    @Enumerated(EnumType.STRING)
    private MotivosTurnos motivo;

    private String observaciones;

    private Boolean activo;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime fecha;

    public Turno(){

    }

    public Turno(User cliente, Mascota mascota, MotivosTurnos motivo, String observaciones, LocalDateTime fecha){
        this.cliente = cliente;
        this.mascota = mascota;
        this.motivo = motivo;
        this.observaciones = observaciones;
        this.activo = true;
        this.fecha = fecha;
    }

}