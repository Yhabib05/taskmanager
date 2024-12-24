package com.project.taskmanager.domain.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "task_lists")
public class TaskList {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name ="id", unique = true, updatable = false,nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "utilisateurs_id", nullable = false)
    //@Column(name="author")
    private Utilisateur author;

    @ManyToMany
    @JoinTable(name = "tasklist_members")
    private List<Utilisateur> utilisateurs= new ArrayList <>();

    @Column(name ="creation_date", nullable = false)
    private LocalDate creationDate;

    @Column(name ="update_date", nullable = false)
    private LocalDate updateDate;

    /*
    *mapped by says look for the column tasklist on Task to find the tasklist
     */
    @OneToMany(mappedBy = "taskList", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Task> tasks;

}
