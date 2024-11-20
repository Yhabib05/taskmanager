package com.project.taskmanager.entities;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
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

    @Column(name = "data_limite")
    private int dateLimite;


    @Column(name = "status", nullable = false)
    private Status status;

    @Column(name = "priority", nullable = false)
    private TaskPriority priority;

    //the tasklist won't be loaded from the database until it is actually needed
    // Opposite to FetchType.EAGER
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_list_id")
    //WE ONLY NEED A FOREIGN KEY ON THE MANY SIDE BCS THE FOREIGN KEY TO TASKLIST IS STORED IN THE TASK TABLE
    //THE TASKLIST TABLE DOESNT need to store a foreign key.
    private TaskList taskList;

    @Column(name ="creation_date", nullable = false)
    private LocalDate creationDate;

    @Column(name ="update_date", nullable = false)
    private LocalDate updateDate;


    public Task(String title, String description, LocalDate updateDate, LocalDate creationDate, TaskPriority priority, Status status, int dateLimite, TaskList taskList) {
        this.title = title;
        this.description = description;
        this.updateDate = updateDate;
        this.creationDate = creationDate;
        this.priority = priority;
        this.status = status;
        this.dateLimite = dateLimite;
        this.taskList = taskList;
    }
    //Equals

    //hashcode?
}
