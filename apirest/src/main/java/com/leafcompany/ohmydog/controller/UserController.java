package com.leafcompany.ohmydog.controller;


import com.leafcompany.ohmydog.RequestResponse.AuthenticationResponse;
import com.leafcompany.ohmydog.RequestResponse.EditMascotaRequest;
import com.leafcompany.ohmydog.RequestResponse.EditUserRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterUserRequest;
import com.leafcompany.ohmydog.entity.Mascota;
import com.leafcompany.ohmydog.service.AuthenticationService;
import com.leafcompany.ohmydog.service.EmailService;
import com.leafcompany.ohmydog.service.JwtService;
import com.leafcompany.ohmydog.service.UserService;
import org.springframework.beans.factory.annotation.Value;
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

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/user")
public class UserController {
  @Autowired
  private UserService userService;

  @Autowired
  private  EmailService emailService;

  @Value("${spring.mail.username}")
  private String emailUsername;
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
      String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      StringBuilder sb = new StringBuilder();
      for (int i = 0; i < 8; i++) {
        int index = (int) (Math.random() * chars.length());
        sb.append(chars.charAt(index));
      }
      request.setPassword(sb.toString());
      if(request.getImagen() != null && !request.getImagen().isEmpty()) {
        Path directorioImagenes = Paths.get("src//main//resources//static/user_picture");
        String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();


        try {
          byte[] bytesImg = request.getImagen().getBytes();
          Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + request.getImagen().getOriginalFilename());
          Files.write(rutaCompleta, bytesImg);

        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      var aux = userService.register(request);

      String titulo = "Fuiste registrado en la veterinaria Oh My Dog!";
      String cuerpo = "Estimado " + request.getNombre() + ",\n\n"
              + "¡Le damos la bienvenida a nuestra veterinaria! Su registro ha sido exitoso.\n\n"
              + "Hemos generado una contraseña aleatoria para su cuenta que le recomendamos cambiar después de iniciar sesión en nuestro sitio web\n\n"
              + "Contraseña: " + sb.toString() + "\n\n"

              + "Al iniciar sesión por primera vez, se le pedirá que obligatoriamente cambie dicha contraseña por alguna de su elección\n"
              + "Gracias por elegir nuestra veterinaria y esperamos poder atender a sus mascotas en el futuro.\n\n"
              + "Saludos cordiales,\n"
              + "Veterinaria 'Oh my Dog!'";

      emailService.send(emailUsername, request.getEmail(), titulo,cuerpo);
      return ResponseEntity.ok(aux);
    } catch (DataAccessException e) {
      response.put("mensaje", "Error al crear el usuario");
      response.put("error", e.getMostSpecificCause().getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

  }
  @PutMapping("/edit/{id}")
  public ResponseEntity<User> modificar(@RequestBody EditUserRequest user, @PathVariable Long id) {
    if (user.getId().equals(id)) {

      Path directorioImagenes = Paths.get("src//main//resources//static/user_picture");
      String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();

      try {
        byte[] bytesImg = user.getImagen().getBytes();
        Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + user.getImagen().getOriginalFilename());
        Files.write(rutaCompleta, bytesImg);

      } catch (IOException e) {
        e.printStackTrace();
      }

      return ResponseEntity.ok(userService.editUser(user));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PutMapping("/edit-password/{id}")
  public ResponseEntity<?> modificarPassword(@RequestBody String password, @PathVariable Long id) {
    try{
    userService.editPassword(password, id);
    return ResponseEntity.ok(userService.editPassword(password, id));
  } catch (DataAccessException e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
    }
  }

}
