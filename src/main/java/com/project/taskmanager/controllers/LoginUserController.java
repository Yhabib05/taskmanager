package com.project.taskmanager.controllers;

import com.project.taskmanager.domain.entities.LoginUser;
import com.project.taskmanager.domain.entities.Utilisateur;
import com.project.taskmanager.services.UtilisateurService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginUserController {
    private final UtilisateurService utilisateurService;

    public LoginUserController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @PostMapping(path="/login")
    public void login(@RequestBody LoginUser loginUser) {
        Utilisateur utilisateur = utilisateurService.getUtilisateurByEmail(loginUser.getEmail());
        if (utilisateur == null) {
            throw new IllegalArgumentException("No user found with this email");
        }
        //for testing purposes
        if (! "aze".equals(loginUser.getPassword()) ){
            throw new IllegalArgumentException("Wrong password");
        }

    }
}
