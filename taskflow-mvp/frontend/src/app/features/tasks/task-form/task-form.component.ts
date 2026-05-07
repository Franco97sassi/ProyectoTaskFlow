import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
 import { Task, TaskPayload, TaskPriority, TaskStatus } from '../../../core/models/task.model';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.scss'
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(TaskService);
  private userService = inject(UserService);

  taskId?: number;
  users: User[] = [];

  readonly statuses: { value: TaskStatus; label: string }[] = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'IN_PROGRESS', label: 'En progreso' },
    { value: 'DONE', label: 'Completada' }
  ];

  readonly priorities: { value: TaskPriority; label: string; hint: string }[] = [
    { value: 'LOW', label: 'Baja', hint: 'Puede esperar' },
    { value: 'MEDIUM', label: 'Media', hint: 'Importancia normal' },
    { value: 'HIGH', label: 'Alta', hint: 'Atención inmediata' }
  ];

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    status: ['PENDING' as TaskStatus, Validators.required],
    priority: ['MEDIUM' as TaskPriority, Validators.required],
    dueDate: [''],
    projectId: [1, [Validators.required, Validators.min(1)]],
    assignedToUserId: [1, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.loadUsers();

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.taskId = Number(id);
    this.service.getById(this.taskId).subscribe(task => this.patchForm(task));
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.toPayload();
    const req = this.taskId
      ? this.service.update(this.taskId, payload)
      : this.service.create(payload);

    req.subscribe(() => this.router.navigateByUrl('/tasks'));
  }

  private loadUsers() {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  private patchForm(task: Task) {
    this.form.patchValue({
      title: task.title,
      description: task.description ?? '',
      status: task.status,
      priority: task.priority ?? 'MEDIUM',
      dueDate: task.dueDate ?? '',
      projectId: task.projectId ?? 1,
      assignedToUserId: task.assignedToUserId ?? 1
    });
  }

  private toPayload(): TaskPayload {
    const raw = this.form.getRawValue();
    return {
      ...raw,
      description: raw.description || undefined,
      dueDate: raw.dueDate || undefined
    };
  }
}
