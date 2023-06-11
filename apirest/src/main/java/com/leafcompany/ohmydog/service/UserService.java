package com.leafcompany.ohmydog.service;

import com.leafcompany.ohmydog.RequestResponse.EditUserRequest;
import com.leafcompany.ohmydog.RequestResponse.RegisterUserRequest;
import com.leafcompany.ohmydog.enumerations.Role;
import com.leafcompany.ohmydog.entity.User;
import com.leafcompany.ohmydog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public User register(RegisterUserRequest request){
        User user;
        if (request.getImagen() != null) {
            user = User.builder()
                    .nombre(request.getNombre())
                    .apellido(request.getApellido())
                    .dni(request.getDni())
                    .email(request.getEmail())
                    .telefono(request.getTelefono())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .imagen(request.getImagen().getOriginalFilename())
                    .cambioContraseña(false)
                    .saldo(BigDecimal.ZERO)
                    .build();
        } else {
            user = User.builder()
                    .nombre(request.getNombre())
                    .apellido(request.getApellido())
                    .dni(request.getDni())
                    .email(request.getEmail())
                    .telefono(request.getTelefono())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .cambioContraseña(false)
                    .saldo(BigDecimal.ZERO)
                    .build();
        }
        return userRepository.save(user);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id){
        return userRepository.findById(id);
    }
    public User editUser(EditUserRequest user) {
        User aux = userRepository.findById(user.getId()).get();
        aux.setNombre(user.getNombre());
        aux.setApellido(user.getApellido());
        aux.setEmail(user.getEmail());
        aux.setTelefono(user.getTelefono());
        aux.setImagen(user.getImagen().getOriginalFilename());
        return userRepository.save(aux);
    }

    public User editPassword(String password, Long id) {
        User aux = userRepository.findById(id).get();
        aux.setPassword(passwordEncoder.encode(password));
        aux.setCambioContraseña(true);
        return userRepository.save(aux);
    }

}
