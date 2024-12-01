package com.project.taskmanager.mappers;

import com.project.taskmanager.domain.dto.TaskDto;
import com.project.taskmanager.domain.dto.TaskListDto;
import com.project.taskmanager.domain.entities.Task;
import com.project.taskmanager.domain.entities.TaskList;

public interface TaskMapper {
    Task fromDto(TaskDto taskDto);

    TaskDto toDto(Task task);

    interface TaskListMapper {
        TaskList fromDto(TaskListDto taskListDto);

        TaskListDto toDto(TaskList taskList);
    }
}
