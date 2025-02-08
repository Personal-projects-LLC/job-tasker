'use server';

import {
  CreateProjectData,
  Project,
  ServerActionResponse,
} from '@/types/project';
import projectSchema from '@/lib/validations/project';
import prisma from '@/lib/prisma';

const createProject = async (
  data: CreateProjectData
): Promise<ServerActionResponse<Project>> => {
  try {
    // Валидация данных
    const validatedData = await projectSchema.create.parseAsync(data);
    const userId = 'actual-user-id'; // Замените на фактический идентификатор пользователя

    // Создание проекта в базе данных
    const project = await prisma.project.create({
      data: {
        ...validatedData,
        user: {
          connect: {
            id: userId,
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
    // Валидация id проекта
    await projectSchema.delete.parseAsync({ id });

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

export { createProject, deleteProject };
