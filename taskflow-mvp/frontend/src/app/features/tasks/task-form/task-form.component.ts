





import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { Task, TaskPayload, TaskPriority, TaskStatus } from '../../../core/models/task.model';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(TaskService);

  taskId?: number;
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
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.taskId = Number(id);
        this.service.getById(this.taskId).subscribe(task => this.patchForm(task));
  }

  save() {
    if (this.form.invalid) return;
    const payload = this.toPayload();
        const req = this.taskId
      ? this.service.update(this.taskId, payload)
      : this.service.create(payload);

    req.subscribe(() => this.router.navigateByUrl('/tasks'));
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
