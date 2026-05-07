package com.taskflow.tasks;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
    List<Task> findByAssignedToId(Long userId);
    @Query("""
            select t from Task t
            where (:status is null or t.status = :status)
              and (:assignedToUserId is null or t.assignedTo.id = :assignedToUserId)
              and (:priority is null or t.priority = :priority)
              and (:dueFrom is null or t.dueDate >= :dueFrom)
              and (:dueTo is null or t.dueDate <= :dueTo)
            order by
              case when t.dueDate is null then 1 else 0 end,
              t.dueDate asc,
              t.createdAt desc
            """)
    List<Task> findWithFilters(
            @Param("status") TaskStatus status,
            @Param("assignedToUserId") Long assignedToUserId,
            @Param("priority") TaskPriority priority,
            @Param("dueFrom") LocalDate dueFrom,
            @Param("dueTo") LocalDate dueTo
    );
}