package com.leafcompany.ohmydog.entity;

import com.leafcompany.ohmydog.enumerations.HorariosTurnos;
import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SolicitudDeTurno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Mascota mascota;
    @ManyToOne
    private User user;
    private String observaciones;

    @Enumerated(EnumType.STRING)
    private HorariosTurnos horario;
    @Enumerated(EnumType.STRING)
    private MotivosTurnos motivo;
    private boolean estado;
}
