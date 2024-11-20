package com.project.taskmanager.services;

import com.project.taskmanager.entities.Status;
import com.project.taskmanager.entities.Task;
import com.project.taskmanager.entities.TaskList;
import com.project.taskmanager.entities.TaskPriority;
import com.project.taskmanager.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class TaskService implements ITaskService {

    TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository theTaskRepository) {
        taskRepository = theTaskRepository;
    }

    @Override
    public Task createTask(String title, String description, LocalDate updateDate, LocalDate creationDate, TaskPriority priority, Status status, int dateLimite, TaskList taskList) {
        Task task = new Task(title,description,updateDate,creationDate,priority,status,dateLimite,taskList);

        taskRepository.save(task);

        return task;
    }

    @Override
    public void deleteTask(Task task) {

    }

    @Override
    public Task updateTitle(Task task, String title) {
        return null;
    }

    @Override
    public Task updateDescription(Task task, String description) {
        return null;
    }

    @Override
    public Task updatePriority(Task task, TaskPriority priority) {
        return null;
    }

    @Override
    public Task updateStatus(Task task, Status status) {
        return null;
    }
}
