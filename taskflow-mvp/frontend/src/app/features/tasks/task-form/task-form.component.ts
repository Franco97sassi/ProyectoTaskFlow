import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
 import { Task, TaskPayload, TaskPriority, TaskStatus } from '../../../core/models/task.model';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { ProjectService } from '../../../core/services/project.servics';
import { Project } from '../../../core/models/project.model';

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
  private projectService = inject(ProjectService);
  taskId?: number;
  users: User[] = [];
  projects: Project[] = [];
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
   projectId: [0, [Validators.required, Validators.min(1)]],
    assignedToUserId: [0, [Validators.required, Validators.min(1)]]  });

  ngOnInit(): void {
    this.loadUsers();
    this.loadProjects();
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
this.userService.getAll().subscribe(users => {
      this.users = users;
      const selectedUserId = this.form.controls.assignedToUserId.value;
      if (!this.taskId && selectedUserId < 1 && users.length) {
        this.form.controls.assignedToUserId.setValue(users[0].id);
      }
    });
  }

  private loadProjects() {
    this.projectService.getAll().subscribe(projects => {
      this.projects = projects;
      const selectedProjectId = this.form.controls.projectId.value;
      if (!this.taskId && selectedProjectId < 1 && projects.length) {
        this.form.controls.projectId.setValue(projects[0].id);
      }
    });  }

  private patchForm(task: Task) {
    this.form.patchValue({
      title: task.title,
      description: task.description ?? '',
      status: task.status,
      priority: task.priority ?? 'MEDIUM',
      dueDate: task.dueDate ?? '',
       projectId: task.projectId ?? 0,
      assignedToUserId: task.assignedToUserId ?? 0

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
