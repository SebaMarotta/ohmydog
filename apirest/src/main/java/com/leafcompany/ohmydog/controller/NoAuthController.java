package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.RequestResponse.AuthenticationRequest;
import com.leafcompany.ohmydog.RequestResponse.AuthenticationResponse;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.enumerations.Role;
import com.leafcompany.ohmydog.repository.UserRepository;
import com.leafcompany.ohmydog.service.AuthenticationService;
import com.leafcompany.ohmydog.RequestResponse.RegisterUserRequest;
import com.leafcompany.ohmydog.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/noauth")
@RequiredArgsConstructor
public class NoAuthController {
    private final AuthenticationService service;
    @Autowired
    private UserRepository userDao;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/register")
    public ResponseEntity<?> register (
            @RequestBody RegisterUserRequest request
    ){
        User aux = User
                .builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .dni(request.getDni())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .build();

        return ResponseEntity.ok(userDao.save(aux));

    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }
    @PostMapping("/token")
    private ResponseEntity<Boolean> isTokenValid(String token, String username){
        UserDetails user = userDetailsService.loadUserByUsername(username);
        return ResponseEntity.ok(jwtService.isTokenValid(token, user));
    }

    }
