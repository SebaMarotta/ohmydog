package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.RequestResponse.AuthenticationRequest;
import com.leafcompany.ohmydog.RequestResponse.AuthenticationResponse;
import com.leafcompany.ohmydog.service.AuthenticationService;
import com.leafcompany.ohmydog.RequestResponse.RegisterRequest;
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
}
