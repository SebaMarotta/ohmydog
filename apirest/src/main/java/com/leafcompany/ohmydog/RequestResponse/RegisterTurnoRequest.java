package com.leafcompany.ohmydog.RequestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterTurnoRequest {
    private Long idMascota;
    private Long idUser;
    private Long idSolicitud;
    private LocalDateTime fecha;
    private String motivo;


}
