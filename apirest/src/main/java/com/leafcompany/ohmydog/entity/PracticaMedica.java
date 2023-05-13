package com.leafcompany.ohmydog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="practica_medica")
public class PracticaMedica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Mascota mascota;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MotivosTurnos motivo;
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date fecha;
    private String observaciones;
    @Column(nullable = false)
    private BigDecimal monto;
    private String peso;
}
