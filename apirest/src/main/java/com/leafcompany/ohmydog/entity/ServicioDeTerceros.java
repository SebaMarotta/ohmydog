package com.leafcompany.ohmydog.entity;


import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class ServicioDeTerceros{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellido;
    private String telefono;
    private String email;
    private TipoServicio tipo;
    private String Rangohorario;
    private List<String> dias;
    private Boolean disponible;

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getApellido() {
        return apellido;
    }
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public TipoServicio getTipo() {
        return tipo;
    }
    public void setTipo(TipoServicio tipo) {
        this.tipo = tipo;
    }
    public String getRangohorario() {
        return Rangohorario;
    }
    public void setRangohorario(String rangohorario) {
        Rangohorario = rangohorario;
    }
    public List<String> getDias() {
        return dias;
    }
    public void setDias(List<String> dias) {
        this.dias = dias;
    }
    public Boolean getDisponible() {
        return disponible;
    }
    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }

    


}