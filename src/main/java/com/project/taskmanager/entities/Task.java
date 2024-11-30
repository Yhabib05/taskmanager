package com.project.taskmanager.entities;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name ="id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "status", nullable = false)
    private Status status;

    @Column(name = "priority", nullable = false)
    private TaskPriority priority;

    @Column(name ="creation_date", nullable = false)
    private LocalDateTime creationDate;

    @Column(name ="update_date", nullable = false)
    private LocalDateTime updateDate;

    //the tasklist won't be loaded from the database until it is actually needed
    // Opposite to FetchType.EAGER
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_list_id") //column containing the id of the tasklist
    //WE ONLY NEED A FOREIGN KEY ON THE MANY SIDE BCS THE FOREIGN KEY TO TASKLIST IS STORED IN THE TASK TABLE
    //THE TASKLIST TABLE DOESNT need to store a foreign key.
    private TaskList taskList;


    public Task(String title, String description, LocalDateTime updateDate, LocalDateTime creationDate, TaskPriority priority, Status status, LocalDateTime dueDate, TaskList taskList) {
        this.title = title;
        this.description = description;
        this.updateDate = updateDate;
        this.creationDate = creationDate;
        this.priority = priority;
        this.status = status;
        this.dueDate = dueDate;
        this.taskList = taskList;
    }
    //Equals

    //hashcode?
}
