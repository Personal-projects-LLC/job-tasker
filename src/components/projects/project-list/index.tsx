'use client';

import ProjectCard from '../project-card';
import { Project, ServerActionResponse } from '@/types/project';

interface ProjectListProps {
  readonly projects?: Project[];
  readonly onDelete: (id: string) => Promise<ServerActionResponse<boolean>>;
}

const ProjectList = ({ projects = [], onDelete }: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No projects found</h3>
        <p className="text-muted-foreground">
          Create your first project to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ProjectList;
