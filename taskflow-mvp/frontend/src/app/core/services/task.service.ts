import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Task, TaskFilters, TaskPayload } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private base = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getAll(filters: TaskFilters = {}) {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.http.get<Task[]>(this.base, { params });
  }

  getById(id: number) { return this.http.get<Task>(`${this.base}/${id}`); }
  create(task: TaskPayload) { return this.http.post<Task>(this.base, task); }
  update(id: number, task: TaskPayload) { return this.http.put<Task>(`${this.base}/${id}`, task); }
  remove(id: number) { return this.http.delete<void>(`${this.base}/${id}`); }
}
