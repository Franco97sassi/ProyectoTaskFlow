package com.taskflow.projects;

import java.time.LocalDateTime;

public record ProjectResponse(
        Long id,
        String name,
        String description,
        Long ownerId,
        LocalDateTime createdAt
) {
    public static ProjectResponse from(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getOwner() != null ? project.getOwner().getId() : null,
                project.getCreatedAt()
        );
    }
}
