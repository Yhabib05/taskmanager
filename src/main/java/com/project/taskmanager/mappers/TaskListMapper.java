package com.project.taskmanager.mappers;

import com.project.taskmanager.domain.dto.TaskListDto;
import com.project.taskmanager.domain.entities.TaskList;

public interface TaskListMapper {
    TaskList fromDto(TaskListDto taskListDto);
    TaskListDto toDto(TaskList taskList);
}
