import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  uuid_user: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  borned: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) {
      const date = new Date(arg);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return undefined;
  }, z.date()),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted: z.number().optional()
});

export type User = z.infer<typeof userSchema>;