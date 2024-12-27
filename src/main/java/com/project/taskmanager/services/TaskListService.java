package com.project.taskmanager.services;


import com.project.taskmanager.domain.entities.TaskList;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskListService {
    List<TaskList> listTaskLists();
    TaskList createTaskList(TaskList taskList);
    Optional<TaskList> getTaskListById(UUID id);
    TaskList updateTaskList(UUID id, TaskList taskList);
    void deleteTaskList(UUID id);

    List<TaskList> getTaskListByMember(UUID memberId);
    List<TaskList> getTaskListByAuthor(UUID authorId);
}
