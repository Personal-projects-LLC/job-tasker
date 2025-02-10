import {
  CreateProjectData,
  Project,
  ServerActionResponse,
} from '@/types/project';

export interface CreateProjectButtonProps {
  onCreateProject: (
    data: CreateProjectData
  ) => Promise<ServerActionResponse<Project>>;
}
