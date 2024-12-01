package com.project.taskmanager.domain.dto;

public record ErrorResponse(
        int status,
        String message,
        String details
) {

}
