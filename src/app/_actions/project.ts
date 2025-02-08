'use server';

import {
  CreateProjectData,
  Project,
  ServerActionResponse,
} from '@/types/project';

export async function createProject(
  data: CreateProjectData
): Promise<ServerActionResponse<Project>> {
  try {
    // В будущем здесь будет сохранение в базу данных
    // Пока просто имитируем задержку и возвращаем данные
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const project: Project = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      status: 'active',
      tasksCount: 0,
      updatedAt: new Date().toISOString(),
    };

    return { data: project };
  } catch {
    return { error: 'Failed to create project' };
  }
}

export async function deleteProject(
  id: string
): Promise<ServerActionResponse<boolean>> {
  try {
    // В будущем здесь будет удаление из базы данных
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { data: true };
  } catch {
    // В будущем здесь не будет id, а будет сообщение об ошибке. Это для того чтобы прошла проверку lint
    return { error: `Failed to delete project ${id}` };
  }
}
