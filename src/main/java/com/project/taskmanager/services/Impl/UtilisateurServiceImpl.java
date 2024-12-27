package com.project.taskmanager.services.Impl;

import com.project.taskmanager.domain.entities.LoginUser;
import com.project.taskmanager.domain.entities.TaskList;
import com.project.taskmanager.domain.entities.Utilisateur;
import com.project.taskmanager.repositories.LoginUserRepository;
import com.project.taskmanager.repositories.TaskListRepository;
import com.project.taskmanager.repositories.UtilisateurRepository;
import com.project.taskmanager.services.UtilisateurService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    private final UtilisateurRepository utilisateurRepository;
    private final TaskListRepository taskListRepository;
    private final LoginUserRepository loginUserRepository;

    @Autowired
    public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository, TaskListRepository taskListRepository, LoginUserRepository loginUserRepository) {
        this.utilisateurRepository = utilisateurRepository;
        this.taskListRepository = taskListRepository;
        this.loginUserRepository = loginUserRepository;
    }

    @Override
    public List<Utilisateur> listUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @Override
    public Utilisateur getUtilisateurByEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    @Override
    public Optional<LoginUser> getLoginUserByEmail(String email) {
        return loginUserRepository.findById(email);
    }

    @Override
    public Utilisateur createUtilisateur(Utilisateur utilisateur) {
        if (null!=utilisateur.getId()){
            throw new IllegalArgumentException("Utilisateur already have an id you shouldn't enter an ID");
        }
        if (null==utilisateur.getNom() || utilisateur.getNom().isBlank()){
            throw new IllegalArgumentException("Utilisateur does not have a valid name");
        }
        if (null==utilisateur.getEmail() || utilisateur.getEmail().isBlank()){
            throw new IllegalArgumentException("Utilisateur does not have a valid email");
        }

        //verifying if the user already exists
        if (utilisateurRepository.findByEmail(utilisateur.getEmail())!=null ){
            throw new IllegalArgumentException("email already exists");
        }

        return utilisateurRepository.save(new Utilisateur(
                utilisateur.getNom(),
                utilisateur.getEmail()
        ));
    }

    @Override
    public Optional<Utilisateur> getUtilisateurById(UUID id) {
        return utilisateurRepository.findById(id);
    }

    @Override
    public List<Utilisateur> getMembersOfProject(TaskList taskList) {
        return taskList.getUtilisateurs();
    }

    @Transactional
    @Override
    public Utilisateur updateUtilisateur(UUID id, Utilisateur utilisateur) {
        /*if (null==utilisateur.getId()){
            throw new IllegalArgumentException("User needs to have an ID");
        }
        if (!Objects.equals(utilisateur.getId(), id)){
            throw new IllegalArgumentException("User's Id shouldn't change");
        }*/
        Utilisateur oldUser = utilisateurRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("User does not exist"));
        oldUser.setNom(utilisateur.getNom());
        oldUser.setEmail(utilisateur.getEmail());

        return utilisateurRepository.save(oldUser);
    }

    @Override
    public void deleteUtilisateur(UUID id) {
        utilisateurRepository.deleteById(id);

    }

    @Override
    public void addUserToTaskList(Utilisateur utilisateur, TaskList taskList) {
        Utilisateur existingUser = utilisateurRepository.findByEmail(utilisateur.getEmail());
        if (existingUser==null){
            throw new IllegalArgumentException("User does not exist");
        }
        taskList.getUtilisateurs().add(existingUser);
        taskListRepository.save(taskList);
    }

    @Override
    public void removeUserFromTaskList(Utilisateur utilisateur, TaskList taskList) {
        utilisateur.quitProject(taskList);
        //we save only from the owning side (here it's tasklist)
        taskListRepository.save(taskList);
        utilisateurRepository.save(utilisateur);
    }

}
