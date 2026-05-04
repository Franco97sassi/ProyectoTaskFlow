package com.taskflow.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRegisterRequest(
        @NotBlank String name,
        @Email @NotBlank String email,
        @Size(min = 6) String password
) {
}
