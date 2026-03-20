package com.gestionale.studenti;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/studenti")
@CrossOrigin(origins = "http://localhost:5173")
public class StudenteController {

    private final StudenteRepository repository;

    public StudenteController(StudenteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Studente> getStudenti() {
        return repository.findAll();
    }

    @PostMapping
    public Studente aggiungiStudente(@RequestBody Studente studente) {
        return repository.save(studente);
    }

    @DeleteMapping("/{id}")
    public void eliminaStudente(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Studente modificaStudente(@PathVariable Long id, @RequestBody Studente datiNuovi) {
        Studente studente = repository.findById(id).orElseThrow();
        studente.setNome(datiNuovi.getNome());
        studente.setCognome(datiNuovi.getCognome());
        studente.setDataNascita(datiNuovi.getDataNascita());
        studente.setClasse(datiNuovi.getClasse());
        studente.setVoti(datiNuovi.getVoti());
        return repository.save(studente);
    }
}