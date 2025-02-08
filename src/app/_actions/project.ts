'use server';

import {
  CreateProjectData,
  Project,
  ServerActionResponse,
} from '@/types/project';
import projectSchema from '@/lib/validations/project';

const createProject = async (
  data: CreateProjectData
): Promise<ServerActionResponse<Project>> => {
  try {
    // Валидация данных
    const validatedData = await projectSchema.create.parseAsync(data);

    // В будущем здесь будет сохранение в базу данных
    // Пока просто имитируем задержку и возвращаем данные
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const project: Project = {
      id: Date.now().toString(),
      title: validatedData.title,
      description: validatedData.description,
      status: 'active',
      tasksCount: 0,
      updatedAt: new Date().toISOString(),
    };

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

    // В будущем здесь будет удаление из базы данных
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { data: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: `Failed to delete project ${id}` };
  }
};

export { createProject, deleteProject };
