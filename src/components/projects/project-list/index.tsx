import { ProjectListProps } from '@/types/components/project-list';
import ProjectCard from '../project-card';

const ProjectList = ({ projects, onDelete, onUpdate }: ProjectListProps) => {
  return (
    <div
      data-testid="project-grid"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default ProjectList;
