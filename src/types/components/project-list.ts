import { Project, ServerActionResponse, UpdateProjectData } from '../project';

export interface ProjectListProps {
  projects: Project[];
  onDelete: (id: string) => Promise<ServerActionResponse<boolean>>;
  onUpdate: (data: UpdateProjectData) => Promise<void>;
}
