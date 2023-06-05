package com.leafcompany.ohmydog.controller;

import com.leafcompany.ohmydog.RequestResponse.AuthenticationRequest;
import com.leafcompany.ohmydog.RequestResponse.CheckPassword;
import com.leafcompany.ohmydog.service.AuthenticationService;
import org.hibernate.annotations.Check;
import org.springframework.http.HttpStatus;
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
   private AuthenticationService service;
  @Autowired
  private UserRepository userDao;


    @GetMapping("/{username}")
    public ResponseEntity<Optional<User>> findByDni(@PathVariable String username){
        return ResponseEntity.ok(userDao.findByDni(username));
    }

  @PostMapping("/is-password-valid")
  public ResponseEntity<Boolean> checkPassword(@RequestBody CheckPassword request){

        User user = this.userDao.getById(request.getIdUser());

       AuthenticationRequest auth = new AuthenticationRequest(user.getDni(),request.getPassword());
       var response = service.authenticate(auth);
      System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+response);
        if (response.isOk()) return ResponseEntity.status(HttpStatus.ACCEPTED).body(response.isOk());
       return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(response.isOk());
  }
}
