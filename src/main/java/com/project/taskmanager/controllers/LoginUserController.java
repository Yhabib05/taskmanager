package com.project.taskmanager.controllers;

import com.project.taskmanager.domain.entities.LoginUser;
import com.project.taskmanager.domain.entities.Utilisateur;
import com.project.taskmanager.services.UtilisateurService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginUserController {
    private final UtilisateurService utilisateurService;

    public LoginUserController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @PostMapping(path="/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginUser loginUser) {
        Utilisateur utilisateur = utilisateurService.getUtilisateurByEmail(loginUser.getEmail());

        if (utilisateur == null) {
            throw new IllegalArgumentException("No user found with this email");
        }


        if (!"aze".equals(loginUser.getPassword())) {
            throw new IllegalArgumentException("Wrong password");
        }

        // Return a response with the user's email
        Map<String, String> response = new HashMap<>();
        response.put("email", utilisateur.getEmail());

        return ResponseEntity.ok(response); // HTTP 200 with response body
    }

}
