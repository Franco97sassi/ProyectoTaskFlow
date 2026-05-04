import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  private service = inject(TaskService);
  private router = inject(Router);
  tasks: Task[] = [];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(tasks => this.tasks = tasks);
  }

  edit(task: Task) { this.router.navigate(['/tasks', task.id, 'edit']); }
  remove(task: Task) {
    if (!task.id) return;
    this.service.remove(task.id).subscribe(() => this.load());
  }
}
