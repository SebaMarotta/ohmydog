package com.leafcompany.ohmydog.RequestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserRequest {
    private String dni;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String password;

}
