package com.project.taskmanager.services.Impl;

import com.project.taskmanager.domain.entities.Status;
import com.project.taskmanager.domain.entities.Task;
import com.project.taskmanager.domain.entities.TaskList;
import com.project.taskmanager.domain.entities.TaskPriority;
import com.project.taskmanager.repositories.TaskListRepository;
import com.project.taskmanager.repositories.TaskRepository;
import com.project.taskmanager.services.TaskService;
import jakarta.transaction.Transactional;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    public TaskServiceImpl(TaskRepository taskRepository, TaskListRepository taskListRepository) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    @Override
    public List<Task> listTasks(UUID taskListId) {
        return taskRepository.findByTaskListId(taskListId);
    }

    @Transactional
    @Override
    public Task createTask(UUID taskListId, Task task) {
        if (null!=task.getId()){
            throw new IllegalArgumentException("Task already have an ID, You shouldn't enter the ID ! ");
        }
        if (null==task.getTitle() || task.getTitle().isBlank()){
            throw new IllegalArgumentException("Task title should not be null !");
        }
        if (task.getDueDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Due date cannot be in the past");
        }
        TaskPriority taskPriority = Optional.ofNullable(task.getPriority()).orElse(TaskPriority.MEDIUM);

        if (task.getStatus() == null){
            task.setStatus(Status.OPEN);
        }

        TaskList taskList = taskListRepository.findById(taskListId)
                .orElseThrow(() -> new IllegalArgumentException("Tasklist does not exist !"));

        LocalDate now = LocalDate.now();
        Task newTask = new Task(
                null,
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getStatus(),
                taskPriority,
                now,
                now,
                taskList
        );
        return taskRepository.save(newTask);
    }

    @Override
    public Optional<Task> getTaskById(UUID taskListId, UUID taskId) {
        return taskRepository.findByTaskListIdAndId(taskListId, taskId);
    }

    @Transactional
    @Override
    public Task updateTask(UUID taskListId, UUID taskId, Task task) {
        if (null==task.getId()){
            throw new IllegalArgumentException("Task  must have an id !");
        }
        if (!Objects.equals(task.getId(), taskId)){
            throw new IllegalArgumentException("Task id should not change !");
        }
        if (task.getDueDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Due date cannot be in the past");
        }
/*
 *      if (!Objects.equals(task.getTaskListById().getId(), taskListId)){
  *         throw new IllegalArgumentException("TaskList id should not change !");
   *    }
*/
        if (null==task.getPriority()){
            throw new IllegalArgumentException("Task priority should not be null !");
        }
        if (null==task.getStatus()){
                throw new IllegalArgumentException("Task Status should not be null !");
        }
        Task existingTask = taskRepository.findByTaskListIdAndId(taskListId, taskId)
                .orElseThrow(()-> new IllegalArgumentException("Task does not exist !"));

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setStatus(task.getStatus());
        existingTask.setPriority(task.getPriority());

        existingTask.setUpdateDate(LocalDate.now());

        return taskRepository.save(existingTask);
    }

    @Transactional
    @Override
    public void deleteTask(UUID taskListId, UUID taskId) {
        /*
        *this one won't verify that the task belongs to the taskList
        * so we create a new method in the task repository that check both$
        * ids the task id and the tasklist id
        * */

        taskRepository.deleteByTaskListIdAndId(taskListId, taskId);
    }
}
