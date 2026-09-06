package com.taskflow.tasks;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record TaskCreateRequest(
        @NotBlank @Size(max = 120) String title,
        @Size(max = 2000) String description,
        @NotNull TaskStatus status,
        TaskPriority priority,
        LocalDate dueDate,
        @NotNull @Positive Long projectId,
        @NotNull @Positive Long assignedToUserId
) {
}
