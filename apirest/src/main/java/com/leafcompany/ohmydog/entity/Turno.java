package com.leafcompany.ohmydog.entity;


import com.leafcompany.ohmydog.enumerations.MotivosTurnos;
import jakarta.persistence.*;

import java.util.Date;


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

    @Temporal(TemporalType.DATE)
    private Date fecha;

    public Turno(){

    }

    public Turno(User cliente, Mascota mascota, MotivosTurnos motivo, String comentarios, Date fecha){
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

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }
}