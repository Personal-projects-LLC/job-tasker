'use client';

import Button from '@/components/button';
import Link from 'next/link';
import DeleteProjectDialog from '../delete-project-dialog';
import EditProjectDialog from '../edit-project-dialog';
import {
  ProjectCardProps,
  statusColors,
  statusLabels,
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
}: Readonly<ProjectCardProps>) => {
  const date = new Date(updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="
      bg-card 
      border-[1px] 
      border-border 
      rounded-lg 
      p-6 
      space-y-4 
      relative 
      animate-fade-in 
      transition-all
      hover:shadow-md
      group
      [data-theme=dark]:hover:shadow-accent/10
    "
    >
      <div className="flex items-center justify-between">
        <Link
          href={`/projects/${id}`}
          className="group-hover:text-primary transition-colors"
        >
          <h3 className="font-semibold text-xl gradient-text">{title}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <div
            className={`
              w-2 
              h-2 
              rounded-full 
              ${statusColors[status]}
              transition-colors
              group-hover:ring-2
              ring-background
            `}
          />
          <span className="text-sm text-muted-foreground">
            {statusLabels[status]}
          </span>
        </div>
      </div>
      <p
        className="
        text-muted-foreground 
        leading-relaxed
        group-hover:text-foreground/90
        transition-colors
      "
      >
        {description}
      </p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {tasksCount} {tasksCount === 1 ? 'task' : 'tasks'}
        </span>
        <span className="text-muted-foreground">Updated {date}</span>
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
          trigger={
            <Button variant="ghost" className="hover:bg-muted">
              Edit
            </Button>
          }
        />
        <DeleteProjectDialog
          projectId={id}
          projectTitle={title}
          onDelete={onDelete}
          trigger={
            <Button
              variant="ghost"
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              Delete
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default ProjectCard;
