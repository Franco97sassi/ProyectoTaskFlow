package com.taskflow.projects;

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
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ProjectResponse> findAll() {
        return projectRepository.findAll().stream().map(ProjectResponse::from).toList();
    }

    @Transactional
    public ProjectResponse create(ProjectCreateRequest request) {
        User owner = userRepository.findById(request.ownerId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Owner user not found"));
        Project saved = projectRepository.save(Project.builder()
                .name(request.name())
                .description(request.description())
                .owner(owner)
                .build());
        return ProjectResponse.from(saved);
    }
}
