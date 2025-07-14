import { z } from 'zod';

export const userAccessSchema = z.object({
  id: z.number().optional(),
  uuid_user_access: z.string().uuid().nonempty(),
  // uuid_user_profile_fk:
  status: z.string().nonempty(),
  password: z.string().nonempty(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted: z.number().optional()
});

export type UserAccess = z.infer<typeof userAccessSchema>;