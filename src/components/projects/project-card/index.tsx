'use client';

import Button from '@/components/button';
import Link from 'next/link';
import DeleteProjectDialog from '../delete-project-dialog';
import EditProjectDialog from '../edit-project-dialog';
import {
  ProjectCardProps,
  statusColors,
} from '@/types/components/project-card';

const ProjectCard = ({
  id,
  title,
  description,
  status,
  tasksCount,
  updatedAt,
  createdAt,
  userId,
  onDelete,
  onUpdate,
}: ProjectCardProps) => {
  const date = new Date(updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 space-y-4 relative animate-fade-in">
      <div className="flex items-center justify-between">
        <Link href={`/projects/${id}`} className="hover:underline">
          <h3 className="font-semibold text-xl gradient-text">{title}</h3>
        </Link>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
          <span className="text-sm text-muted-foreground">{status}</span>
        </div>
      </div>
      <p className="text-muted-foreground">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {tasksCount} {tasksCount === 1 ? 'task' : 'tasks'}
        </span>
        <span className="text-sm text-muted-foreground">Updated {date}</span>
      </div>
      <div className="flex items-center justify-end gap-2">
        <EditProjectDialog
          project={{
            id,
            title,
            description,
            status,
            tasksCount,
            updatedAt,
            createdAt,
            userId,
          }}
          onUpdate={onUpdate}
          trigger={<Button variant="ghost">Edit</Button>}
        />
        <DeleteProjectDialog
          projectId={id}
          projectTitle={title}
          onDelete={onDelete}
          trigger={<Button variant="ghost">Delete</Button>}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
