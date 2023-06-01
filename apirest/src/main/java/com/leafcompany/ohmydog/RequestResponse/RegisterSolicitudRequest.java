package com.leafcompany.ohmydog.RequestResponse;

import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.enumerations.HorariosTurnos;
import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterSolicitudRequest {
    private Long mascota;
    private Long user;
    private String motivo;
    private String horario;

}
