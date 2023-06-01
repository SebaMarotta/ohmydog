package com.leafcompany.ohmydog.entity;

import com.leafcompany.ohmydog.enumerations.Sexo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PublicacionAdopcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User cliente;
    private String nombrePerro;
    private String edad;
    private String raza;
    private String color;
    @Enumerated(EnumType.STRING)
    private Sexo sexo;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate fecha;
    private String origen;
    private Boolean visible;

    @PrePersist
    public void prePersist() {
        setFecha(LocalDate.now());
    }
}
