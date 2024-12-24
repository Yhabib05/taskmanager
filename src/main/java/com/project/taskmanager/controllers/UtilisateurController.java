package com.project.taskmanager.controllers;


import com.project.taskmanager.domain.entities.Utilisateur;
import com.project.taskmanager.services.UtilisateurService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path="/utilisateurs")
public class UtilisateurController {
    private final UtilisateurService utilisateurService;

    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @GetMapping
    public List<Utilisateur> listUtilisateurs(){
        return utilisateurService.listUtilisateurs();
    }

    @PostMapping
    public Utilisateur addUtilisateur(@RequestBody Utilisateur utilisateur){
        return utilisateurService.createUtilisateur(utilisateur);
    }

    @GetMapping(path="/{utilisateur_id}")
    public Optional<Utilisateur> getUtilisateurById(@PathVariable("utilisateur_id") UUID id){
        return utilisateurService.getUtilisateurById(id);
    }

    @PutMapping(path="/{utilisateur_id}")
    public Utilisateur updateUtilisateur(
            @PathVariable("utilisateur_id") UUID id,
            @RequestBody Utilisateur utilisateur){
        return utilisateurService.updateUtilisateur(id, utilisateur);
    }

    @DeleteMapping(path="/{utilisateur_id}")
    public void deleteUtilisateur(@PathVariable("utilisateur_id") UUID id){
        utilisateurService.deleteUtilisateur(id);
    }

}
