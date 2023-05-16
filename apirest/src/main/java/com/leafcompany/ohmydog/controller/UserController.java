package com.leafcompany.ohmydog.controller;


import com.leafcompany.ohmydog.RequestResponse.AuthenticationResponse;
import com.leafcompany.ohmydog.RequestResponse.EditMascotaRequest;
import com.leafcompany.ohmydog.RequestResponse.EditUserRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterUserRequest;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.service.AuthenticationService;
import com.leafcompany.ohmydog.service.JwtService;
import com.leafcompany.ohmydog.service.UserService;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/user")
public class UserController {
  @Autowired
  private UserService userService;



  @GetMapping("/{id}")
  public ResponseEntity<Optional<User>> findById(@PathVariable Long id){
    Optional<User> user = userService.findById(id);
    return ResponseEntity.ok(user);
  }

  @GetMapping("/list")
  public ResponseEntity<List<User>> getUsers(){
    List<User> user = userService.findAll();
    return ResponseEntity.ok(user);
  }

  @PostMapping("/register")
  public ResponseEntity<?> register (
          @RequestBody RegisterUserRequest request
  ){

    Map<String, Object> response = new HashMap<>();

    try{
      return ResponseEntity.ok(userService.register(request));
    } catch (DataAccessException e) {

      response.put("mensaje", "Error al crear el usuario");
      response.put("error", e.getMostSpecificCause().getMessage());
      System.out.println(e.getMostSpecificCause().getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

  }
  @PutMapping("/edit/{id}")
  public ResponseEntity<User> modificar(@RequestBody EditUserRequest user, @PathVariable Long id) {
    if (user.getId().equals(id)) {
      return ResponseEntity.ok(userService.editUser(user));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PutMapping("/edit-password/{id}")
  public ResponseEntity<Boolean> modificarPassword(@RequestBody String password, @PathVariable Long id) {
    try{
    userService.editPassword(password, id);
    return ResponseEntity.ok(true);
  } catch (DataAccessException e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
    }
  }

}
