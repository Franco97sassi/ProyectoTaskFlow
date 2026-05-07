import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';

interface DashboardCard {
  label: string;
  value: number;
  detail: string;
  tone: 'total' | 'pending' | 'progress' | 'done';
}

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.scss'
})
export class DashboardHomeComponent implements OnInit {
  private service = inject(TaskService);

  total = 0;
  pending = 0;
  inProgress = 0;
  done = 0;
  highPriority = 0;
  overdue = 0;
  loading = true;

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: tasks => this.updateStats(tasks),
      error: () => {
        this.loading = false;
      }
    });
  }

  get cards(): DashboardCard[] {
    return [
      { label: 'Total', value: this.total, detail: 'Tareas registradas', tone: 'total' },
      { label: 'Pendientes', value: this.pending, detail: 'Listas para iniciar', tone: 'pending' },
      { label: 'En progreso', value: this.inProgress, detail: 'Trabajo activo', tone: 'progress' },
      { label: 'Completadas', value: this.done, detail: 'Objetivos cerrados', tone: 'done' }
    ];
  }

  get completionRate(): number {
    if (!this.total) return 0;
    return Math.round((this.done / this.total) * 100);
  }

  private updateStats(tasks: Task[]) {
    this.total = tasks.length;
    this.pending = tasks.filter(t => t.status === 'PENDING').length;
    this.inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    this.done = tasks.filter(t => t.status === 'DONE').length;
    this.highPriority = tasks.filter(t => t.priority === 'HIGH').length;
    this.overdue = tasks.filter(task => this.isOverdue(task)).length;
    this.loading = false;
  }

  private isOverdue(task: Task) {
    if (!task.dueDate || task.status === 'DONE') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(`${task.dueDate}T00:00:00`) < today;
  }
}
