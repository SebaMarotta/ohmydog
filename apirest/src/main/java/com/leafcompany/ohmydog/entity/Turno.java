package com.leafcompany.ohmydog.entity;


import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@Entity
public class Turno{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User cliente;

    @ManyToOne
    private Mascota mascota;

    @Enumerated(EnumType.STRING)
    private MotivosTurnos motivo;

    private String comentarios;

    private Boolean activo;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime fecha;

    public Turno(){

    }

    public Turno(User cliente, Mascota mascota, MotivosTurnos motivo, String comentarios, LocalDateTime fecha){
        this.cliente = cliente;
        this.mascota = mascota;
        this.motivo = motivo;
        this.comentarios = comentarios;
        this.activo = true;
        this.fecha = fecha;
    }

    public User getCliente() {
        return cliente;
    }
    public void setCliente(User cliente) {
        this.cliente = cliente;
    }
    public Mascota getMascota() {
        return mascota;
    }
    public void setMascota(Mascota mascota) {
        this.mascota = mascota;
    }
    public String getComentarios() {
        return comentarios;
    }
    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public MotivosTurnos getMotivo() {
        return motivo;
    }

    public void setMotivo(MotivosTurnos motivo) {
        this.motivo = motivo;
    }

    public Boolean isActivo() {
        return activo;
    }

    public void desactivarTurno() {
        this.activo = false;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}