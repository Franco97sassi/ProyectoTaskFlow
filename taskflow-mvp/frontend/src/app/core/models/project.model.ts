export interface Project {
  id: number;
  name: string;
  description?: string;
  ownerId?: number;
  createdAt?: string;
}

export interface ProjectPayload {
  name: string;
  description?: string;
  ownerId: number;
}
