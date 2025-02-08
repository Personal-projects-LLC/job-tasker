'use client';

import { useState } from 'react';
import { CreateProjectButton } from '@/components/projects/create-project-button';
import { ProjectList } from '@/components/projects/project-list';
import { randomBytes } from 'crypto';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  tasksCount: number;
  updatedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const handleCreateProject = async (data: {
    title: string;
    description: string;
  }) => {
    const newProject: Project = {
      id: randomBytes(32).toString('hex'),
      ...data,
      status: 'active',
      tasksCount: 0,
      updatedAt: new Date().toISOString(),
    };

    setProjects((prev) => [newProject, ...prev]);
  };

  const handleDeleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h1>Projects</h1>
      <CreateProjectButton onCreateProject={handleCreateProject} />
      <ProjectList projects={projects} onDelete={handleDeleteProject} />
    </div>
  );
}
