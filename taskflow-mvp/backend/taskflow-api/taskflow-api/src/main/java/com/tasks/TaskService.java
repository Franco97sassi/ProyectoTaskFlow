package com.taskflow.tasks;

import com.taskflow.projects.Project;
import com.taskflow.projects.ProjectRepository;
import com.taskflow.users.User;
import com.taskflow.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<TaskResponse> findAll() {
        return taskRepository.findAll().stream().map(TaskResponse::from).toList();
    }

    @Transactional
    public TaskResponse create(TaskCreateRequest request) {
        Project project = projectRepository.findById(request.projectId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Project not found"));
        User user = userRepository.findById(request.assignedToUserId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Assigned user not found"));

        Task saved = taskRepository.save(Task.builder()
                .title(request.title())
                .description(request.description())
                .status(request.status())
                .priority(request.priority())
                .dueDate(request.dueDate())
                .project(project)
                .assignedTo(user)
                .build());
        return TaskResponse.from(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResponseStatusException(NOT_FOUND, "Task not found");
        }
        taskRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<TaskResponse> findByUser(Long userId) {
        return taskRepository.findByAssignedToId(userId).stream().map(TaskResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<TaskResponse> findByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId).stream().map(TaskResponse::from).toList();
    }
}
