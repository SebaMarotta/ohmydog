package com.leafcompany.ohmydog.RequestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserRequest {

    private String nombre;
    private String apellido;
    private String dni;
    private String email;
    private String telefono;
    private String password;
    private BigDecimal saldo;

}
