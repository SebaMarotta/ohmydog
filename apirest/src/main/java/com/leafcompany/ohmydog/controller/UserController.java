package com.leafcompany.ohmydog.controller;


import com.leafcompany.ohmydog.service.AuthenticationService;
import com.leafcompany.ohmydog.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leafcompany.ohmydog.repository.UserRepository;
import com.leafcompany.ohmydog.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/auth")
public class UserController {
   
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtService jwtService;

  @Autowired
  private UserDetailsService userDetailsService;
  @Autowired
  private AuthenticationService authService;
    @GetMapping("/users/{id}")
    public ResponseEntity<Optional<User>> findByDni(@PathVariable String id){
      Optional<User> user = userRepository.findByDni(id);
      return ResponseEntity.ok(userRepository.findByDni(id));
    }

  @GetMapping("/users")
  public ResponseEntity<List<User>> getUsers(){
    List<User> user = userRepository.findAll();
    return ResponseEntity.ok(user);
  }


}
