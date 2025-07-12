import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  uuid_user: z.string().uuid().nonempty(),
  // uuid_user_profile:
  name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  borned: z.date(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted: z.number().optional()
});

export type User = z.infer<typeof userSchema>;