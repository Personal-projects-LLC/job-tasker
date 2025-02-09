'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { CreateTaskData, Task, UpdateTaskData } from '@/types/task';
import { ServerActionResponse } from '@/types/project';

const createTask = async (
  data: CreateTaskData
): Promise<ServerActionResponse<Task>> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Not authenticated' };
    }

    const task = await prisma.task.create({
      data: {
        ...data,
        createdById: session.user.id,
      },
    });

    // Обновляем счетчик задач в проекте
    await prisma.project.update({
      where: { id: data.projectId },
      data: {
        tasksCount: {
          increment: 1,
        },
      },
    });

    // Преобразуем даты в строки для соответствия типу Task
    return {
      data: {
        ...task,
        dueDate: task.dueDate?.toISOString() ?? null,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Failed to create task' };
  }
};

const updateTask = async (
  data: UpdateTaskData
): Promise<ServerActionResponse<Task>> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Not authenticated' };
    }

    // Проверяем, что задача существует и принадлежит к проекту пользователя
    const existingTask = await prisma.task.findUnique({
      where: { id: data.id },
      include: {
        project: true,
      },
    });

    if (!existingTask) {
      return { error: 'Task not found' };
    }

    if (existingTask.project.userId !== session.user.id) {
      return { error: 'Not authorized' };
    }

    const task = await prisma.task.update({
      where: { id: data.id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.status && { status: data.status }),
        ...(data.priority && { priority: data.priority }),
        ...(data.dueDate !== undefined && { dueDate: data.dueDate }),
        ...(data.assignedToId !== undefined && {
          assignedToId: data.assignedToId,
        }),
      },
    });

    // Преобразуем даты в строки
    return {
      data: {
        ...task,
        dueDate: task.dueDate?.toISOString() ?? null,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Failed to update task' };
  }
};

const deleteTask = async (
  id: string
): Promise<ServerActionResponse<boolean>> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Not authenticated' };
    }

    // Проверяем, что задача существует и принадлежит к проекту пользователя
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
      },
    });

    if (!task) {
      return { error: 'Task not found' };
    }

    if (task.project.userId !== session.user.id) {
      return { error: 'Not authorized' };
    }

    await prisma.$transaction([
      // Удаляем задачу
      prisma.task.delete({
        where: { id },
      }),
      // Уменьшаем счетчик задач в проекте
      prisma.project.update({
        where: { id: task.projectId },
        data: {
          tasksCount: {
            decrement: 1,
          },
        },
      }),
    ]);

    return { data: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Failed to delete task' };
  }
};

const getProjectTasks = async (
  projectId: string
): Promise<ServerActionResponse<Task[]>> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Not authenticated' };
    }

    // Проверяем, что проект принадлежит пользователю
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    });

    if (!project) {
      return { error: 'Project not found' };
    }

    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    // Преобразуем даты в строки для каждой задачи
    return {
      data: tasks.map((task) => ({
        ...task,
        dueDate: task.dueDate?.toISOString() ?? null,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      })),
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Failed to fetch tasks' };
  }
};

export { createTask, updateTask, deleteTask, getProjectTasks };
