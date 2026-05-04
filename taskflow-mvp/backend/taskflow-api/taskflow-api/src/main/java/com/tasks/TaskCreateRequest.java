package com.taskflow.tasks;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record TaskCreateRequest(
        @NotBlank String title,
        String description,
        @NotNull TaskStatus status,
        TaskPriority priority,
        LocalDate dueDate,
        @NotNull Long projectId,
        @NotNull Long assignedToUserId
) {
}
