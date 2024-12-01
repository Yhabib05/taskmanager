package com.project.taskmanager.mappers.impl;

import com.project.taskmanager.domain.dto.TaskDto;
import com.project.taskmanager.domain.entities.Task;
import com.project.taskmanager.mappers.TaskMapper;
import org.springframework.stereotype.Component;

@Component
public class TaskMapperImpl implements TaskMapper {
    @Override
    public Task fromDto(TaskDto taskDto) {
        return new Task(
                taskDto.id(),
                taskDto.title(),
                taskDto.description(),
                taskDto.dueDate(),
                taskDto.status(),
                taskDto.priority(),
                null,
                null,
                null
        );
    }

    @Override
    public TaskDto toDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getDueDate(),
                task.getPriority()
        );
    }
}
