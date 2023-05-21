package com.leafcompany.ohmydog.RequestResponse;

import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.Sexo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EditPublicacionAdopcionRequest {

    private Long id;
    private String nombrePerro;
    private Long cliente;
    private String edad;
    private String raza;
    private String color;
    private Sexo sexo;
    private String fecha;
    private String origen;
    private Boolean visible;

}
