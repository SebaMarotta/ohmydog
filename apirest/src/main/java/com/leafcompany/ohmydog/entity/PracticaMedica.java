package com.leafcompany.ohmydog.entity;

import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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



    private LocalDateTime fecha;
    private String observaciones;
    @Column(nullable = false)
    private BigDecimal monto;
    private String peso;
    private int cantidad;

    @PrePersist
    public void prePersist () {
        this.setFecha(LocalDateTime.now());
    }
}
