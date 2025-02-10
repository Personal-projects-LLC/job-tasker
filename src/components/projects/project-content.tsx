'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Task } from '@/types/task';
import { Project } from '@/types/project';
import { getProjectTasks, updateTask } from '@/app/_actions/task';
import { getProject } from '@/app/_actions/project';
import TaskList from '@/components/tasks/task-list';
import CreateTaskButton from '@/components/tasks/create-task-button';
import { ProjectContentProps } from '@/types/components/project-content';

const ProjectContent = ({ id }: ProjectContentProps) => {
  const { status } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  const loadProjectData = useCallback(async () => {
    try {
      setIsLoading(true);

      const [projectResult, tasksResult] = await Promise.all([
        getProject(id),
        getProjectTasks(id),
      ]);

      if (projectResult.data) {
        setProject(projectResult.data);
      }

      if (tasksResult.data) {
        setTasks(tasksResult.data);
      }
    } catch (error) {
      console.error('Failed to load project data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (status === 'authenticated') {
      void loadProjectData();
    }
  }, [status, loadProjectData]);

  const handleTaskCreated = () => {
    void loadProjectData();
  };

  const handleTaskStatusChange = async (
    taskId: string,
    status: Task['status']
  ) => {
    const result = await updateTask({
      id: taskId,
      status,
    });

    if (result.data) {
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, status } : task))
      );
    }
  };

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="text-center">Loading project data...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container py-6">
        <div className="text-center">Project not found</div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{project.title}</h1>
            {project.description && (
              <p className="text-muted-foreground mt-1">
                {project.description}
              </p>
            )}
          </div>
          <CreateTaskButton projectId={id} onTaskCreated={handleTaskCreated} />
        </div>
        <TaskList tasks={tasks} onTaskStatusChange={handleTaskStatusChange} />
      </div>
    </div>
  );
};

export default ProjectContent;
