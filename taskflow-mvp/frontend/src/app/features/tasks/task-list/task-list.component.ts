import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { UserService } from '../../../core/services/user.service';
import { Task, TaskFilters, TaskPriority, TaskStatus } from '../../../core/models/task.model';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit {
  private service = inject(TaskService);
  private userService = inject(UserService);
  private router = inject(Router);

  tasks: Task[] = [];
  users: User[] = [];
  loading = false;
  filters: TaskFilters = {
    status: '',
    assignedToUserId: '',
    priority: '',
    dueFrom: '',
    dueTo: ''
  };

  readonly statuses: { value: TaskStatus; label: string }[] = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'IN_PROGRESS', label: 'En progreso' },
    { value: 'DONE', label: 'Completada' }
  ];

  readonly priorities: { value: TaskPriority; label: string }[] = [
    { value: 'LOW', label: 'Baja' },
    { value: 'MEDIUM', label: 'Media' },
    { value: 'HIGH', label: 'Alta' }
  ];

  ngOnInit(): void {
    this.loadUsers();
    this.load();
  }

  load() {
    this.loading = true;
    this.service.getAll(this.filters).subscribe({
      next: tasks => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.tasks = [];
        this.loading = false;
      }
    });
  }

  loadUsers() {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  applyFilters() {
    this.load();
  }

  clearFilters() {
    this.filters = {
      status: '',
      assignedToUserId: '',
      priority: '',
      dueFrom: '',
      dueTo: ''
    };
    this.load();
  }

  statusLabel(status: TaskStatus) {
    return this.statuses.find(item => item.value === status)?.label ?? status;
  }

  priorityLabel(priority?: TaskPriority) {
    if (!priority) return 'Sin prioridad';
    return this.priorities.find(item => item.value === priority)?.label ?? priority;
  }

  isOverdue(task: Task) {
    if (!task.dueDate || task.status === 'DONE') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(`${task.dueDate}T00:00:00`) < today;
  }

  edit(task: Task) { this.router.navigate(['/tasks', task.id, 'edit']); }

  remove(task: Task) {
    if (!task.id) return;
    this.service.remove(task.id).subscribe(() => this.load());
  }
}
