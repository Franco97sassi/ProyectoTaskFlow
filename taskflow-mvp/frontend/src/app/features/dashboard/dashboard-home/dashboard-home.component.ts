import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';

interface DashboardCard {
  label: string;
  value: number;
  detail: string;
  tone: 'total' | 'pending' | 'progress' | 'done';
}

interface StatusDistribution {
  label: string;
  value: number;
  percentage: number;
  tone: 'pending' | 'progress' | 'done';
}

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
  errorMessage = '';

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: tasks => this.updateStats(tasks),
      error: () => {
        this.loading = false;
        this.errorMessage = 'No pudimos actualizar las métricas. Intentá nuevamente.';
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

  get activeTasks(): number {
    return this.pending + this.inProgress;
  }

  get statusDistribution(): StatusDistribution[] {
    return [
      { label: 'Pendientes', value: this.pending, percentage: this.percentage(this.pending), tone: 'pending' },
      { label: 'En progreso', value: this.inProgress, percentage: this.percentage(this.inProgress), tone: 'progress' },
      { label: 'Completadas', value: this.done, percentage: this.percentage(this.done), tone: 'done' }
    ];
  }

  get todayLabel(): string {
    return new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  }

  get healthMessage(): string {
    if (!this.total) return 'Creá la primera tarea para comenzar a medir el progreso.';
    if (this.overdue) return `${this.overdue} ${this.overdue === 1 ? 'tarea requiere' : 'tareas requieren'} atención por vencimiento.`;
    if (this.completionRate >= 70) return 'El equipo mantiene un ritmo de entrega excelente.';
    return 'El trabajo avanza sin tareas vencidas.';
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

  private percentage(value: number): number {
    return this.total ? Math.round((value / this.total) * 100) : 0;
  }

  private isOverdue(task: Task) {
    if (!task.dueDate || task.status === 'DONE') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(`${task.dueDate}T00:00:00`) < today;
  }
}
