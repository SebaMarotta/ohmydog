package com.leafcompany.ohmydog.models.controller;

import com.leafcompany.ohmydog.auth.AuthenticationRequest;
import com.leafcompany.ohmydog.auth.AuthenticationResponse;
import com.leafcompany.ohmydog.auth.AuthenticationService;
import com.leafcompany.ohmydog.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/noauth")
@RequiredArgsConstructor
public class NoAuthController {
    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }
    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hola desde un lugar publico");
    }
}
