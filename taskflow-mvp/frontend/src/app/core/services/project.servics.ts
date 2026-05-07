import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Project, ProjectPayload } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private base = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<Project[]>(this.base); }
  getById(id: number) { return this.http.get<Project>(`${this.base}/${id}`); }
  create(project: ProjectPayload) { return this.http.post<Project>(this.base, project); }
  update(id: number, project: ProjectPayload) { return this.http.put<Project>(`${this.base}/${id}`, project); }
  remove(id: number) { return this.http.delete<void>(`${this.base}/${id}`); }
}
