import { Project, ServerActionResponse, UpdateProjectData } from '../project';

export interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => Promise<ServerActionResponse<boolean>>;
  onUpdate: (data: UpdateProjectData) => Promise<void>;
}
