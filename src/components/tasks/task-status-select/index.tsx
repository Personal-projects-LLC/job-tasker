'use client';

import { useState } from 'react';
import { TaskStatus } from '@/types/models/task';
import {
  TaskStatusSelectProps,
  statusOptions,
} from '@/types/components/task-status-select';

const TaskStatusSelect = ({
  status,
  onStatusChange,
  disabled = false,
}: TaskStatusSelectProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const currentStatus = statusOptions.find((option) => option.value === status);

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (newStatus === status || isUpdating || disabled) return;

    setIsUpdating(true);
    try {
      await onStatusChange(newStatus);
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative">
      <select
        value={status}
        onChange={(e) => void handleStatusChange(e.target.value as TaskStatus)}
        disabled={disabled || isUpdating}
        className={`pl-6 pr-8 py-1 rounded border ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${isUpdating ? 'animate-pulse' : ''}`}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div
        className={`absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
          currentStatus?.color
        }`}
      />
    </div>
  );
};

export default TaskStatusSelect;
