package com.project.taskmanager.dto;

import com.project.taskmanager.entities.Status;
import com.project.taskmanager.entities.TaskPriority;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskDto(
    UUID id,
    String title,
    String description,
    Status status,
    LocalDateTime dueDate,
    TaskPriority priority
) {
}
