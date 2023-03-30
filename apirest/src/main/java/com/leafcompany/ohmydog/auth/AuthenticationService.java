package com.leafcompany.ohmydog.auth;

import com.leafcompany.ohmydog.config.JwtService;
import com.leafcompany.ohmydog.models.dao.UserRepository;
import com.leafcompany.ohmydog.models.entity.Role;
import com.leafcompany.ohmydog.models.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest request){
        var user = User.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .dni(request.getDni())
                .email(request.getEmail())
                .telefono(request.getTelefono())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(new HashMap<>(),user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = repository.findByDni(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(new HashMap<>(), user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
