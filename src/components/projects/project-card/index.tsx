import { ProjectCardProps } from '@/types/components/project-card';
import { ProjectStatus } from '@/types/project';
import Link from 'next/link';
import DeleteProjectDialog from '../delete-project-dialog';
import EditProjectDialog from '../edit-project-dialog';

const getStatusColor = (status: ProjectStatus): string => {
  switch (status) {
    case ProjectStatus.active:
      return 'bg-success';
    case ProjectStatus.completed:
      return 'bg-info';
    case ProjectStatus.archived:
      return 'bg-warning';
    default:
      return 'bg-muted';
  }
};

const ProjectCard = ({ project, onDelete, onUpdate }: ProjectCardProps) => {
  const formattedDate = new Date(project.updatedAt).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  );

  return (
    <div className="bg-card border-[1px] border-border rounded-lg p-6 space-y-4 relative animate-fade-in transition-all hover:shadow-md group [data-theme=dark]:hover:shadow-accent/10">
      <div className="flex items-center justify-between">
        <Link
          href={`/projects/${project.id}`}
          className="group-hover:text-primary transition-colors"
        >
          <h3 className="font-semibold text-xl gradient-text">
            {project.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <div
            className={`
              w-2
              h-2
              rounded-full
              ${getStatusColor(project.status)}
              transition-colors
              group-hover:ring-2
              ring-background
            `}
          />
          <span className="text-sm text-muted-foreground">
            {project.status}
          </span>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">
        {project.description}
      </p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {project.tasksCount} {project.tasksCount === 1 ? 'task' : 'tasks'}
        </span>
        <span className="text-muted-foreground">Updated {formattedDate}</span>
      </div>
      <div className="flex items-center justify-end gap-2">
        <EditProjectDialog
          projectId={project.id}
          projectTitle={project.title}
          projectDescription={project.description}
          trigger={<button>Edit</button>}
          onUpdate={onUpdate}
        />
        <DeleteProjectDialog
          projectId={project.id}
          projectTitle={project.title}
          onDelete={onDelete}
          trigger={<button>Delete</button>}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
