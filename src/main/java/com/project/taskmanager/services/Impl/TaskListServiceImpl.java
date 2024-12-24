package com.project.taskmanager.services.Impl;

import com.project.taskmanager.domain.entities.TaskList;
import com.project.taskmanager.domain.entities.Utilisateur;
import com.project.taskmanager.repositories.TaskListRepository;
import com.project.taskmanager.repositories.UtilisateurRepository;
import com.project.taskmanager.services.TaskListService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskListServiceImpl implements TaskListService {
    private final TaskListRepository taskListRepository;
    private final UtilisateurRepository utilisateurRepository;

    //@Autowired
    //the autowired is not needed as we only have one constructor
    public TaskListServiceImpl(TaskListRepository taskListRepository, UtilisateurRepository utilisateurRepository) {
        this.taskListRepository = taskListRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public List<TaskList> listTaskLists() {
        return taskListRepository.findAll();
    }

    @Override
    public TaskList createTaskList(TaskList taskList) {
        if (null!=taskList.getId()){
            throw new IllegalArgumentException("Task list already have an ID, You shouldn't enter the ID ! ");
        }
        if (null==taskList.getTitle() || taskList.getTitle().isBlank()){
            throw new IllegalArgumentException("Task list title should not be null !");
        }

        // Fetch the full Utilisateur object using the id
        Utilisateur author = utilisateurRepository.findById(taskList.getAuthor().getId())
                .orElseThrow(() -> new IllegalArgumentException("Author not found with the provided id"));

        LocalDate now = LocalDate.now();
        return taskListRepository.save(new TaskList(
                null,
                taskList.getTitle(),
                taskList.getDescription(),
                author,
                null,
                now,
                now,
                null
        ));
    }

    @Override
    public Optional<TaskList> getTaskListById(UUID id) {
        return taskListRepository.findById(id);
    }

    @Transactional
    @Override
    public TaskList updateTaskList(UUID id, TaskList taskList) {
        if (null==taskList.getId()){
            throw new IllegalArgumentException("Task list must have an id !");
        }
        if (!Objects.equals(taskList.getId(), id)){
            throw new IllegalArgumentException("Task list id should not change !");
        }
        TaskList oldTaskList = taskListRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Task list not found !"));
        oldTaskList.setTitle(taskList.getTitle());
        oldTaskList.setDescription(taskList.getDescription());
        oldTaskList.setUpdateDate(LocalDate.now());

        return taskListRepository.save(oldTaskList);

    }

    @Override
    public void deleteTaskList(UUID id) {
        taskListRepository.deleteById(id);
    }

    @Override
    public List<TaskList> getTaskListByMember(UUID memberId) {
        return List.of();
    }

    @Override
    public List<TaskList> getTaskListByAuthor(UUID authorId) {
        return taskListRepository.findAllTaskListsByAuthor_Id(authorId);
    }
}

