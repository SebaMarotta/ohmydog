package com.leafcompany.ohmydog.dao;

import com.leafcompany.ohmydog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByDni(String dni);

    @Query("SELECT u FROM User u WHERE u.nombre = :nombre")
    public User findByName(@Param("nombre") String nombre);
}
