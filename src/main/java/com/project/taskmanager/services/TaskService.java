package com.project.taskmanager.services;

import com.project.taskmanager.domain.entities.Task;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskService {
    List<Task> listTasks(UUID taskListId);
    Task createTask(UUID taskList, Task task);
    Optional<Task> getTaskById(UUID taskListId, UUID taskId);
    Task updateTask(UUID taskListId, UUID taskId,Task task);
    void deleteTask(UUID taskListId, UUID taskId);

}
