package com.leafcompany.ohmydog.RequestResponse;

import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterPracticaRequest {
    private String motivo;
    private String observaciones;
    private String fecha;
    private BigDecimal monto;

    private String peso;

}
