package com.leafcompany.ohmydog.RequestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterTurnoRequest {
    private Long idMascota;
    private Long idUser;
    private Optional<Long> idSolicitud;
    private LocalDateTime fecha;
    private String motivo;


}
