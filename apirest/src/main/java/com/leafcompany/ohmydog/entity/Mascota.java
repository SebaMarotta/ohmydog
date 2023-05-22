package com.leafcompany.ohmydog.entity;



import java.time.LocalDate;
import java.util.Date;

import com.leafcompany.ohmydog.enumerations.Sexo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.springframework.format.annotation.DateTimeFormat;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Mascota{


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String raza;
    private String color;
    @Lob
    @Column(columnDefinition = "CLOB")
    private String observaciones;
    @ManyToOne
    private User duenio;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    private LocalDate fechaDeNacimiento;

    @Lob
    private byte[] imagen;

    private boolean cruza;

}