package com.leafcompany.ohmydog.RequestResponse;

import com.leafcompany.ohmydog.entity.User;
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
public class RegisterPerroAdoptivoRequest {
    private Long idDueño;
    private String nombre;
    private String edad;
    private String raza;
    private String color;
    private String sexo;
    private String origen;
    private MultipartFile imagen;
}