package com.project.taskmanager.services;

import com.project.taskmanager.entities.Status;
import com.project.taskmanager.entities.Task;
import com.project.taskmanager.entities.TaskList;
import com.project.taskmanager.entities.TaskPriority;

import java.time.LocalDate;

public interface ITaskService {

    public Task createTask(String title, String description, LocalDate updateDate, LocalDate creationDate, TaskPriority priority, Status status, int dateLimite, TaskList taskList);
    public void deleteTask(Task task);

    public Task updateTitle(Task task, String title);

    public Task updateDescription(Task task, String description);

    public Task updatePriority(Task task, TaskPriority priority);

    public Task updateStatus(Task task, Status status);


}
