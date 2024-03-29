package com.leafcompany.ohmydog.repository;

import com.leafcompany.ohmydog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByDni(String dni);
    Optional<User> findById(Long id);

    @Query("SELECT u FROM User u WHERE u.nombre = :nombre")
    public User findByName(@Param("nombre") String nombre);
}
