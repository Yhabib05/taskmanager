package com.project.taskmanager.controllers;


import com.project.taskmanager.domain.dto.TaskListDto;
import com.project.taskmanager.domain.entities.TaskList;
import com.project.taskmanager.domain.entities.Utilisateur;
import com.project.taskmanager.mappers.TaskListMapper;
import com.project.taskmanager.services.TaskListService;
import com.project.taskmanager.services.UtilisateurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
//@RequestMapping(path = "/task-lists")
public class TaskListController {
    private final TaskListService taskListService;
    private final TaskListMapper taskListMapper;
    private final UtilisateurService utilisateurService;

    public TaskListController(TaskListService taskListService, TaskListMapper taskListMapper, UtilisateurService utilisateurService) {
        this.taskListService = taskListService;
        this.taskListMapper = taskListMapper;
        this.utilisateurService = utilisateurService;
    }

    @GetMapping(path = "/task-lists")
    public List<TaskListDto> listTaskLists() {
        return taskListService.listTaskLists()
                .stream()
                .map(taskListMapper::toDto)
                .toList();
    }

    @PostMapping(path = "/task-lists")
    public TaskListDto createTaskList(@RequestBody TaskListDto taskListDto) {
        TaskList taskList = taskListService.createTaskList(taskListMapper.fromDto(taskListDto));
        return taskListMapper.toDto(taskList);
    }

    @GetMapping(path = "/task-lists/{task_list_id}")
    public Optional<TaskListDto> getTaskList(@PathVariable("task_list_id") UUID taskListId) {
        return taskListService.getTaskListById(taskListId).map(taskListMapper::toDto);
    }

    /* NEW Method*/
    @GetMapping(path="/task-lists/{task_list_id}/members")
    public List<Utilisateur> getTaskListMembers(@PathVariable("task_list_id") UUID taskListId) {
        TaskList taskList = taskListService.getTaskListById(taskListId)
                .orElseThrow(()->new IllegalArgumentException("tasklist not found with Id"+ taskListId));
        return utilisateurService.getMembersOfProject(taskList);
    }

    @PutMapping(path = "/task-lists/{task_list_id}")
    public TaskListDto updateTaskList(
            @PathVariable("task_list_id") UUID taskListId,
            @RequestBody TaskListDto taskListDto) {
        TaskList newTaskList = taskListService.updateTaskList(
                taskListId,
                taskListMapper.fromDto(taskListDto));
        return taskListMapper.toDto(newTaskList);
    }
    @DeleteMapping(path ="/task-lists/{task_list_id}")
    public ResponseEntity<Map<String,String>> deleteTaskList(@PathVariable("task_list_id") UUID taskListId) {
        taskListService.deleteTaskList(taskListId);

        Map<String,String> response = new HashMap<>();
        response.put("message", "tasklist deleted successfully");
        response.put("taskListId", taskListId.toString());
        return ResponseEntity.ok(response);
    }

    /*New Method*/
    @GetMapping(path="/task-lists/author/{user_email}")
    public List<TaskListDto> getTaskListByAuthor(@PathVariable("user_email") String userEmail){
        Utilisateur utilisateur = utilisateurService.getUtilisateurByEmail(userEmail);
        return taskListService.getTaskListByAuthor(utilisateur.getId())
                .stream()
                .map(taskListMapper::toDto)
                .toList();
    }

    /*New Method*/
    @PostMapping(path="/task-lists/{task_list_id}/members")
    public ResponseEntity<Map<String,String>> addUserToTaskList(@PathVariable("task_list_id") UUID taskListId, @RequestBody Utilisateur utilisateur ){
        TaskList taskList = taskListService.getTaskListById(taskListId)
                .orElseThrow(()->new IllegalArgumentException("tasklist not found with Id"+ taskListId));

        if (utilisateurService.getUtilisateurByEmail(utilisateur.getEmail()) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist");
        }
        utilisateurService.addUserToTaskList(utilisateur, taskList);

        Map<String,String> response = new HashMap<>();
        response.put("message", "Member added to tasklist successfully");
        response.put("taskListId", taskListId.toString());

        return ResponseEntity.ok(response);
    }
    /*New Method*/
    @DeleteMapping(path="/task-lists/{task_list_id}/members/{member_id}")
    public ResponseEntity<Map<String,String>> DeleteUserFromTaskList(@PathVariable("task_list_id") UUID taskListId,@PathVariable("member_id") UUID utilisateurId ){
        TaskList taskList = taskListService.getTaskListById(taskListId)
                .orElseThrow(()->new IllegalArgumentException("tasklist not found with Id"+ taskListId));

        Utilisateur utilisateur = utilisateurService.getUtilisateurById(utilisateurId)
                .orElseThrow(()->new IllegalArgumentException("User not found with Id"+ utilisateurId));;
        utilisateurService.removeUserFromTaskList(utilisateur, taskList);

        Map<String,String> response = new HashMap<>();
        response.put("message", "Member deleted from tasklist successfully");
        response.put("taskListId", taskListId.toString());

        return ResponseEntity.ok(response);
    }
    /*New Method*/
    @GetMapping(path="/task-lists/member/{member_email}")
    public List<TaskListDto> getTaskListByMember(@PathVariable("member_email") String member_email){
        Utilisateur utilisateur = utilisateurService.getUtilisateurByEmail(member_email);
        return taskListService.getTaskListByMember(utilisateur.getId())
                .stream()
                .map(taskListMapper::toDto)
                .toList();
    }

}
