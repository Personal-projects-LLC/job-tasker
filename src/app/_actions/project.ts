'use server';

import {
  CreateProjectData,
  Project,
  ServerActionResponse,
} from '@/types/project';
import projectSchema from '@/lib/validations/project';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

interface UpdateProjectData {
  id: string;
  title?: string;
  description?: string;
  status?: 'active' | 'completed' | 'archived';
}

const createProject = async (
  data: CreateProjectData
): Promise<ServerActionResponse<Project>> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Not authenticated' };
    }

    // Валидация данных
    const validatedData = await projectSchema.create.parseAsync(data);

    // Создание проекта в базе данных
    const project = await prisma.project.create({
      data: {
        ...validatedData,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return { data: project };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Failed to create project' };
  }
};

const deleteProject = async (
  id: string
): Promise<ServerActionResponse<boolean>> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Not authenticated' };
    }

    // Валидация id проекта
    await projectSchema.delete.parseAsync({ id });

    // Проверяем, принадлежит ли проект пользователю
    const project = await prisma.project.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!project) {
      return { error: 'Project not found' };
    }

    if (project.userId !== session.user.id) {
      return { error: 'Not authorized' };
    }

    // Удаление проекта из базы данных
    await prisma.project.delete({
      where: { id },
    });

    return { data: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: `Failed to delete project ${id}` };
  }
};

const updateProject = async (
  data: UpdateProjectData
): Promise<ServerActionResponse<Project>> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Not authenticated' };
    }

    // Валидация данных
    await projectSchema.update.parseAsync(data);

    // Проверяем, принадлежит ли проект пользователю
    const existingProject = await prisma.project.findUnique({
      where: { id: data.id },
      select: { userId: true },
    });

    if (!existingProject) {
      return { error: 'Project not found' };
    }

    if (existingProject.userId !== session.user.id) {
      return { error: 'Not authorized' };
    }

    // Обновление проекта в базе данных
    const updatedProject = await prisma.project.update({
      where: { id: data.id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.status && { status: data.status }),
      },
    });

    return { data: updatedProject };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Failed to update project' };
  }
};

export { createProject, deleteProject, updateProject };
