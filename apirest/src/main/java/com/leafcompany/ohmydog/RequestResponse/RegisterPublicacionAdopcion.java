package com.leafcompany.ohmydog.RequestResponse;

import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.Sexo;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterPublicacionAdopcion {

    private String nombrePerro;
    private Long cliente;
    private Integer edad;
    private String raza;
    private String color;
    private Sexo sexo;
    private String fecha;
    private String origen;
    private Boolean visible;

}
