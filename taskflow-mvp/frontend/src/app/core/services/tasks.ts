import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private base = `${environment.apiUrl}/tasks`;
  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<Task[]>(this.base); }
  getById(id: number) { return this.http.get<Task>(`${this.base}/${id}`); }
  create(task: Task) { return this.http.post<Task>(this.base, task); }
  update(id: number, task: Task) { return this.http.put<Task>(`${this.base}/${id}`, task); }
  remove(id: number) { return this.http.delete<void>(`${this.base}/${id}`); }
}
