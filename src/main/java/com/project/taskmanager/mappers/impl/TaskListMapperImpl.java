package com.project.taskmanager.mappers.impl;

import com.project.taskmanager.domain.dto.TaskListDto;
import com.project.taskmanager.domain.entities.Status;
import com.project.taskmanager.domain.entities.Task;
import com.project.taskmanager.domain.entities.TaskList;
import com.project.taskmanager.mappers.TaskListMapper;
import com.project.taskmanager.mappers.TaskMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class TaskListMapperImpl implements TaskListMapper {

    private final TaskMapper taskMapper;

    public TaskListMapperImpl(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskList fromDto(TaskListDto taskListDto) {
        return new TaskList(
                taskListDto.id(),
                taskListDto.title(),
                taskListDto.description(),
                null,
                null,
                Optional.ofNullable(taskListDto.tasks())
                        .map(tasks -> tasks.stream()
                                .map(taskMapper::fromDto)
                                .toList())
                        .orElse(null)
                );
    }

    @Override
    public TaskListDto toDto(TaskList taskList) {
        return new TaskListDto(
                taskList.getId(),
                taskList.getTitle(),
                taskList.getDescription(),
                Optional.ofNullable(taskList.getTasks())
                        .map(List::size)
                        .orElse(0),
                calculateTaskListProgress(taskList.getTasks()),
                Optional.ofNullable(taskList.getTasks())
                        .map(tasks-> tasks.stream()
                                        .map(taskMapper::toDto)
                                        .toList())
                        .orElse(null)
                );
    }

    public Double calculateTaskListProgress(List<Task> tasks){
        if (null==tasks){
            return null;
        }
        long closedTaskCount = tasks.stream().filter(
                task -> Status.CLOSED==task.getStatus())
                .count();
        return (double) closedTaskCount/tasks.size();
    }
}
