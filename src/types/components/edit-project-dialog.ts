import { ReactElement } from 'react';
import { UpdateProjectData } from '../project';

export interface EditProjectDialogProps {
  projectId: string;
  projectTitle: string;
  projectDescription: string;
  trigger: ReactElement;
  onUpdate: (data: UpdateProjectData) => Promise<void>;
}
