package com.taskflow.tasks;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TaskStatus {

PENDING("PENDING"),
IN_PROGRESS("IN_PROGRESS"),
COMPLETED("DONE");

private final String apiValue;

TaskStatus(String apiValue) {
    this.apiValue = apiValue;
}

@JsonCreator
public static TaskStatus fromValue(String value) {
    if (value == null) {
        return null;
    }

    return switch (value.trim().toUpperCase()) {
        case "PENDING" -> PENDING;
        case "IN_PROGRESS" -> IN_PROGRESS;
        case "DONE", "COMPLETED" -> COMPLETED;
        default -> throw new IllegalArgumentException("Unknown task status: " + value);
    };
}

@JsonValue
public String getApiValue() {
    return apiValue;
}
}