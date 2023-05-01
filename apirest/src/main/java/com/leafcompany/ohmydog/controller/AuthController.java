package com.leafcompany.ohmydog.controller;

<<<<<<< Updated upstream
<<<<<<< HEAD
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
=======
=======
>>>>>>> Stashed changes
import com.leafcompany.ohmydog.dao.UserRepository;
import com.leafcompany.ohmydog.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
<<<<<<< Updated upstream
>>>>>>> ab6c6c0 (Principio de login  y autenticacion)
=======
>>>>>>> Stashed changes

@RestController
@RequestMapping("/auth")
public class AuthController {
   
  @Autowired
  private UserRepository userDao;


    @GetMapping("/users/{id}")
    public ResponseEntity<Optional<User>> findByDni(@PathVariable String id){
        return ResponseEntity.ok(userDao.findByDni(id));
    }
}
