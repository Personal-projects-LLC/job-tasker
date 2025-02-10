'use client';

import { formatDistanceToNow } from 'date-fns';
import TaskStatusSelect from '../task-status-select';
import { Task } from '@/types/models/task';
import { TaskCardProps, priorityColors } from '@/types/components/task-card';

const TaskCard = ({
  id,
  title,
  description,
  status,
  priority,
  dueDate,
  createdAt,
  onStatusChange,
}: TaskCardProps) => {
  const handleStatusChange = async (newStatus: Task['status']) => {
    await onStatusChange(id, newStatus);
  };

  const formattedDueDate = dueDate
    ? formatDistanceToNow(new Date(dueDate), { addSuffix: true })
    : null;

  return (
    <div className="bg-card rounded-lg shadow-sm p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">{title}</h3>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${priorityColors[priority]}`}
            title={`Priority: ${priority}`}
          />
          <TaskStatusSelect
            status={status}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Created{' '}
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </div>
        {formattedDueDate && (
          <div className="flex items-center gap-1">
            <span>Due {formattedDueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
