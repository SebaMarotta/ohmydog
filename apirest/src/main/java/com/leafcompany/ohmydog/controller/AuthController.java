package com.leafcompany.ohmydog.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leafcompany.ohmydog.repository.UserRepository;
import com.leafcompany.ohmydog.entity.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


// <<<<<<< Updated upstream
// >>>>>>> ab6c6c0 (Principio de login  y autenticacion)
// =======
// >>>>>>> Stashed changes

@RestController
@RequestMapping("/auth")
public class AuthController {
   
  @Autowired
  private UserRepository userDao;


    @GetMapping("/{username}")
    public ResponseEntity<Optional<User>> findByDni(@PathVariable String username){
        return ResponseEntity.ok(userDao.findByDni(username));
    }
}
