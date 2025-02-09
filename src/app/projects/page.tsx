'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CreateProjectButton from '@/components/projects/create-project-button';
import ProjectList from '@/components/projects/project-list';
import {
  createProject,
  deleteProject,
  updateProject,
  getProjects,
} from '@/app/_actions/project';
import {
  CreateProjectData,
  Project,
  ServerActionResponse,
} from '@/types/project';

const ProjectsPage = () => {
  const { status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      void getProjects().then((result: ServerActionResponse<Project[]>) => {
        if (result.data) {
          setProjects(result.data);
        }
      });

      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const handleCreateProject = async (
    data: CreateProjectData
  ): Promise<ServerActionResponse<Project>> => {
    const result = await createProject(data);
    if (result.data) {
      setProjects((prev: Project[]) => [result.data as Project, ...prev]);
    }
    return result;
  };

  const handleUpdateProject = async (data: {
    id: string;
    title?: string;
    description?: string;
    status?: 'active' | 'completed' | 'archived';
  }): Promise<void> => {
    const result = await updateProject(data);
    if (result.data) {
      setProjects((prev: Project[]) =>
        prev.map((p) => (p.id === result.data!.id ? result.data! : p))
      );
    }
    if (result.error) {
      throw new Error(result.error);
    }
  };

  const handleDeleteProject = async (
    id: string
  ): Promise<ServerActionResponse<boolean>> => {
    const result = await deleteProject(id);
    if (result.data) {
      setProjects((prev: Project[]) => prev.filter((p) => p.id !== id));
    }
    return result;
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Projects</h1>
        <CreateProjectButton onCreateProject={handleCreateProject} />
      </div>
      <ProjectList
        projects={projects}
        onDelete={handleDeleteProject}
        onUpdate={handleUpdateProject}
      />
    </div>
  );
};

export default ProjectsPage;
