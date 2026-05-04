package com.taskflow.projects;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProjectCreateRequest(
        @NotBlank String name,
        String description,
        @NotNull Long ownerId
) {
}
