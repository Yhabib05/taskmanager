package com.project.taskmanager.services.Impl;

import com.project.taskmanager.domain.entities.TaskList;
import com.project.taskmanager.repositories.TaskListRepository;
import com.project.taskmanager.services.TaskListService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskListServiceImpl implements TaskListService {
    private final TaskListRepository taskListRepository;

    @Autowired
    public TaskListServiceImpl(TaskListRepository taskListRepository) {
        this.taskListRepository = taskListRepository;
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

        LocalDate now = LocalDate.now();
        return taskListRepository.save(new TaskList(
                null,
                taskList.getTitle(),
                taskList.getDescription(),
                now,
                now,
                null
        ));
    }

    @Override
    public Optional<TaskList> getTaskList(UUID id) {
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
}

