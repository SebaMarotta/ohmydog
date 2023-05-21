package com.leafcompany.ohmydog.RequestResponse;

import com.leafcompany.ohmydog.enumerations.DisponibilidadSemana;
import com.leafcompany.ohmydog.enumerations.TipoServicio;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterServicioDeTercerosRequest {

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
