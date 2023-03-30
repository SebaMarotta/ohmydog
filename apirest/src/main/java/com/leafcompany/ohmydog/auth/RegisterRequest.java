package com.leafcompany.ohmydog.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String dni;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String password;

}
