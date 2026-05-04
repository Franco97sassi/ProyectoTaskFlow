package com.taskflow.users;

import java.time.LocalDateTime;

public record UserRegisterResponse(
        Long id,
        String name,
        String email,
        Role role,
        LocalDateTime createdAt
) {
}
