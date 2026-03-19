package com.gestionale.studenti;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Studente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private int eta;
    private String corso;

    public Studente() {}

    public Studente(String nome, int eta, String corso) {
        this.nome = nome;
        this.eta = eta;
        this.corso = corso;
    }

    public Long getId() { return id != null ? id : 0L; }
    public String getNome() { return nome != null ? nome : ""; }
    public int getEta() { return eta; }
    public String getCorso() { return corso != null ? corso : ""; }
}