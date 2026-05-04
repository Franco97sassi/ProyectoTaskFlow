import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(TaskService);

  taskId?: number;
  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['PENDING' as 'PENDING' | 'IN_PROGRESS' | 'DONE'],
    dueDate: ['']
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.taskId = Number(id);
    this.service.getById(this.taskId).subscribe(task => this.form.patchValue(task));
  }

  save() {
    if (this.form.invalid) return;
    const payload = this.form.getRawValue();
    const req = this.taskId
      ? this.service.update(this.taskId, payload)
      : this.service.create(payload);

    req.subscribe(() => this.router.navigateByUrl('/tasks'));
  }
}
