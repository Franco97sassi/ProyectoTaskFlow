export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  projectId?: number;
  projectName?: string;
  assignedToUserId?: number;
  assignedToName?: string;
  createdAt?: string;
}

export interface TaskPayload {
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  projectId: number;
  assignedToUserId: number;
}

export interface TaskFilters {
  status?: TaskStatus | '';
  assignedToUserId?: number | '';
  priority?: TaskPriority | '';
  dueFrom?: string;
  dueTo?: string;
}
