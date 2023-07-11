package com.leafcompany.ohmydog.RequestResponse;

import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.Razas;
import com.leafcompany.ohmydog.enumerations.Sexo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EditMascotaRequest {
    private Long id;
    private String nombre;
    private String raza;
    private String color;
    private String observaciones;
    private String fechaCelo;
    private Long duenio;
    private Sexo sexo;
    private String fechaDeNacimiento;
    private MultipartFile imagen;
    private boolean cruza;
    private boolean castrada;

}
