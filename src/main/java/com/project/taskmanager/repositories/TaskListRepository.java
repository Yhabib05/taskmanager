package com.project.taskmanager.repositories;

import com.project.taskmanager.domain.entities.TaskList;
import com.project.taskmanager.domain.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskListRepository extends JpaRepository<TaskList, UUID> {
    List<TaskList> findAllTaskListsByAuthor_Id(UUID authorId);
    @Query("SELECT p FROM TaskList p JOIN p.utilisateurs m WHERE m.id = :utilisateurId")
    List<TaskList> findProjetByMemberId(@Param("utilisateurId") UUID utilisateurId);
}
