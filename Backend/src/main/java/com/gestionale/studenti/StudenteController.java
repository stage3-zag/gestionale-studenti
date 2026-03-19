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
        repository.findById(id).orElseThrow();
        Studente studente = new Studente(datiNuovi.getNome(), datiNuovi.getEta(), datiNuovi.getCorso());
        return repository.save(studente);
    }
}