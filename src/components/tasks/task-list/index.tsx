'use client';

import { useState } from 'react';
import { Task } from '@/types/models/task';
import TaskCard from '../task-card';
import {
  SortKey,
  TaskListProps,
  TaskSortOrders,
} from '@/types/components/task-list';

const sortOrders: TaskSortOrders = {
  priority: { urgent: 0, high: 1, medium: 2, low: 3 },
  status: { todo: 0, in_progress: 1, done: 2, cancelled: 3 },
};

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
          return (
            sortOrders.priority[
              a.priority as keyof typeof sortOrders.priority
            ] -
            sortOrders.priority[b.priority as keyof typeof sortOrders.priority]
          );
        }
        case 'status': {
          return (
            sortOrders.status[a.status as keyof typeof sortOrders.status] -
            sortOrders.status[b.status as keyof typeof sortOrders.status]
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
