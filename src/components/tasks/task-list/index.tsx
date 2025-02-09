'use client';

import { Task } from '@/types/task';
import TaskCard from '../task-card';
import { useState } from 'react';

interface TaskListProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, status: Task['status']) => Promise<void>;
}

type SortKey = 'priority' | 'status' | 'dueDate' | 'createdAt';

const TaskList = ({
  tasks: initialTasks,
  onTaskStatusChange,
}: TaskListProps) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [sortBy, setSortBy] = useState<SortKey>('createdAt');

  const sortTasks = (key: SortKey) => {
    setSortBy(key);
    const sorted = [...tasks].sort((a, b) => {
      switch (key) {
        case 'priority': {
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
          return (
            priorityOrder[a.priority as keyof typeof priorityOrder] -
            priorityOrder[b.priority as keyof typeof priorityOrder]
          );
        }
        case 'status': {
          const statusOrder = {
            todo: 0,
            in_progress: 1,
            done: 2,
            cancelled: 3,
          };
          return (
            statusOrder[a.status as keyof typeof statusOrder] -
            statusOrder[b.status as keyof typeof statusOrder]
          );
        }
        case 'dueDate': {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        case 'createdAt': {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        default:
          return 0;
      }
    });
    setTasks(sorted);
  };

  const handleTaskStatusChange = async (
    taskId: string,
    status: Task['status']
  ) => {
    await onTaskStatusChange(taskId, status);
    // После успешного обновления статуса обновляем сортировку
    if (sortBy === 'status') {
      sortTasks('status');
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
        <p className="text-muted-foreground">
          Create your first task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <div className="flex gap-2">
          {(['priority', 'status', 'dueDate', 'createdAt'] as const).map(
            (key) => (
              <button
                key={key}
                onClick={() => sortTasks(key)}
                className={`px-3 py-1 text-sm rounded-full ${
                  sortBy === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {key
                  .replace(/([A-Z])/g, ' $1')
                  .toLowerCase()
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </button>
            )
          )}
        </div>
      </div>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onStatusChange={handleTaskStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
