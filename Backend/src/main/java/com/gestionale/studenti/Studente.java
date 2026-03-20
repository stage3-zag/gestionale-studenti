package com.gestionale.studenti;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Studente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cognome;
    private String dataNascita;
    private String classe;

    @ElementCollection
    @CollectionTable(name = "studente_voti")
    @MapKeyColumn(name = "materia")
    @Column(name = "voti")
    private Map<String, String> voti = new HashMap<>();

    public Studente() {}

    public Studente(String nome, String cognome, String dataNascita, String classe, Map<String, String> voti) {
        this.nome = nome;
        this.cognome = cognome != null ? cognome : "";
        this.dataNascita = dataNascita != null ? dataNascita : "";
        this.classe = classe != null ? classe : "";
        this.voti = voti != null ? voti : new HashMap<>();
    }

    public Long getId() { return id != null ? id : 0L; }
    public String getNome() { return nome != null ? nome : ""; }
    public String getCognome() { return cognome != null ? cognome : ""; }
    public String getDataNascita() { return dataNascita != null ? dataNascita : ""; }
    public String getClasse() { return classe != null ? classe : ""; }
    public Map<String, String> getVoti() { return voti; }

    public void setNome(String nome) { this.nome = nome; }
    public void setCognome(String cognome) { this.cognome = cognome; }
    public void setDataNascita(String dataNascita) { this.dataNascita = dataNascita; }
    public void setClasse(String classe) { this.classe = classe; }
    public void setVoti(Map<String, String> voti) { this.voti = voti; }
}