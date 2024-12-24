package com.project.taskmanager.services;


import com.project.taskmanager.domain.entities.TaskList;
import com.project.taskmanager.domain.entities.Utilisateur;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UtilisateurService {


    List<Utilisateur> listUtilisateurs();


    /*New Method*/
    Utilisateur getUtilisateurByEmail(String email);

    Optional<Utilisateur> getUtilisateurById(UUID id);

    /*New method*/
    List<Utilisateur> getMembersOfProject(TaskList taskList);

    //create users
    Utilisateur createUtilisateur(Utilisateur utilisateur);


    Utilisateur updateUtilisateur(UUID id, Utilisateur utilisateur);
    void deleteUtilisateur(UUID id);

    /*New methods*/
    void addUserToTaskList(Utilisateur utilisateur, TaskList taskList);
    void removeUserFromTaskList(Utilisateur utilisateur, TaskList taskList);

}
