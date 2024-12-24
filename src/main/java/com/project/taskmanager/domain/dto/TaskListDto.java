package com.project.taskmanager.domain.dto;

import com.project.taskmanager.domain.entities.Utilisateur;

import java.util.List;
import java.util.UUID;

public record TaskListDto(
        UUID id,
        String title,
        String description,
        Utilisateur author,
        List<Utilisateur> utilisateurs,
        Integer count,
        Double progress,
        List<TaskDto> tasks
) {
}
