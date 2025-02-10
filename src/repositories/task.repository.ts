import prisma from '@/lib/prisma';
import {
  BaseRepository,
  Task,
  TaskRepositoryParams,
  CreateTaskData,
  UpdateTaskData,
} from '@/types';

const taskRepository: BaseRepository<Task, CreateTaskData, UpdateTaskData> = {
  findById: async (id: string) => {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) return null;

    return task;
  },

  findMany: async (params?: TaskRepositoryParams) => {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: params?.projectId,
        createdById: params?.createdById,
        assignedToId: params?.assignedToId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tasks;
  },

  create: async (data: CreateTaskData & { createdById: string }) => {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: data.dueDate,
        projectId: data.projectId,
        createdById: data.createdById,
        assignedToId: data.assignedToId,
      },
    });

    return task;
  },

  update: async (id: string, data: UpdateTaskData) => {
    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.status && { status: data.status }),
        ...(data.priority && { priority: data.priority }),
        ...(data.dueDate !== undefined && {
          dueDate: data.dueDate,
        }),
        ...(data.assignedToId !== undefined && {
          assignedToId: data.assignedToId,
        }),
      },
    });

    return task;
  },

  delete: async (id: string) => {
    await prisma.task.delete({
      where: { id },
    });
    return true;
  },
};

export { taskRepository };
