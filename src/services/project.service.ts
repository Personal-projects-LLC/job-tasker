import { auth } from '@/auth';
import { BaseService } from './base.service';
import { projectRepository } from '@/repositories';
import {
  Project,
  CreateProjectData,
  UpdateProjectData,
  ServerActionResponse,
} from '@/types';

const projectService: BaseService<
  Project,
  CreateProjectData,
  UpdateProjectData
> = {
  get: async (id: string): Promise<ServerActionResponse<Project>> => {
    try {
      const session = await auth();
      if (!session?.user?.id) {
        return { error: 'Not authenticated' };
      }

      const project = await projectRepository.findById(id);

      if (!project) {
        return { error: 'Project not found' };
      }

      if (project.userId !== session.user.id) {
        return { error: 'Not authorized' };
      }

      return { data: project };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: 'Failed to get project' };
    }
  },

  getAll: async (): Promise<ServerActionResponse<Project[]>> => {
    try {
      const session = await auth();
      if (!session?.user?.id) {
        return { error: 'Not authenticated' };
      }

      const projects = await projectRepository.findMany({
        userId: session.user.id,
      });

      return { data: projects };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: 'Failed to get projects' };
    }
  },

  create: async (
    data: CreateProjectData
  ): Promise<ServerActionResponse<Project>> => {
    try {
      const session = await auth();
      if (!session?.user?.id) {
        return { error: 'Not authenticated' };
      }

      const project = await projectRepository.create({
        ...data,
        userId: session.user.id,
      });

      return { data: project };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: 'Failed to create project' };
    }
  },

  update: async (
    id: string,
    data: UpdateProjectData
  ): Promise<ServerActionResponse<Project>> => {
    try {
      const session = await auth();
      if (!session?.user?.id) {
        return { error: 'Not authenticated' };
      }

      const existingProject = await projectRepository.findById(id);
      if (!existingProject) {
        return { error: 'Project not found' };
      }

      if (existingProject.userId !== session.user.id) {
        return { error: 'Not authorized' };
      }

      const project = await projectRepository.update(id, data);
      return { data: project };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: 'Failed to update project' };
    }
  },

  delete: async (id: string): Promise<ServerActionResponse<boolean>> => {
    try {
      const session = await auth();
      if (!session?.user?.id) {
        return { error: 'Not authenticated' };
      }

      const existingProject = await projectRepository.findById(id);
      if (!existingProject) {
        return { error: 'Project not found' };
      }

      if (existingProject.userId !== session.user.id) {
        return { error: 'Not authorized' };
      }

      await projectRepository.delete(id);
      return { data: true };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: 'Failed to delete project' };
    }
  },
};

export default projectService;
