import { z } from 'zod';

const projectSchema = {
  create: z.object({
    title: z
      .string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title must be less than 50 characters')
      .trim(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(500, 'Description must be less than 500 characters')
      .trim(),
  }),

  update: z.object({
    id: z.string(),
    title: z
      .string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title must be less than 50 characters')
      .trim()
      .optional(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(500, 'Description must be less than 500 characters')
      .trim()
      .optional(),
    status: z.enum(['active', 'completed', 'archived']).optional(),
  }),

  delete: z.object({
    id: z.string(),
  }),
};

export default projectSchema;
