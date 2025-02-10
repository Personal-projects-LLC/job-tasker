import prisma from '@/lib/prisma';
import {
  BaseRepository,
  CreateProjectParams,
  ProjectRepositoryParams,
  Project,
  CreateProjectData,
  UpdateProjectData,
} from '@/types';

const projectRepository: BaseRepository<
  Project,
  CreateProjectData,
  UpdateProjectData,
  CreateProjectParams
> = {
  findById: async (id: string) => {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) return null;

    return project;
  },

  findMany: async (params?: ProjectRepositoryParams) => {
    const projects = await prisma.project.findMany({
      where: {
        userId: params?.userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return projects;
  },

  create: async (data: {
    title: string;
    description: string;
    userId: string;
  }) => {
    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });

    return project;
  },

  update: async (id: string, data: UpdateProjectData) => {
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.status && { status: data.status }),
      },
    });

    return project;
  },

  delete: async (id: string) => {
    await prisma.project.delete({
      where: { id },
    });
    return true;
  },
};

export { projectRepository };
