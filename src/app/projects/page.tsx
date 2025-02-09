'use client';

import { useState } from 'react';
import CreateProjectButton from '@/components/projects/create-project-button';
import ProjectList from '@/components/projects/project-list';
import {
  createProject,
  deleteProject,
  updateProject,
} from '@/app/_actions/project';
import {
  CreateProjectData,
  Project,
  ServerActionResponse,
} from '@/types/project';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

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
