package com.project.taskmanager.domain.dto;

import com.project.taskmanager.domain.entities.Status;
import com.project.taskmanager.domain.entities.TaskPriority;

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
