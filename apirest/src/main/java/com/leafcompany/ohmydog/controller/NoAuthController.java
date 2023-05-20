package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.RequestResponse.AuthenticationRequest;
import com.leafcompany.ohmydog.RequestResponse.AuthenticationResponse;
import com.leafcompany.ohmydog.repository.UserRepository;
import com.leafcompany.ohmydog.service.AuthenticationService;
import com.leafcompany.ohmydog.RequestResponse.RegisterUserRequest;
import com.leafcompany.ohmydog.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

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
