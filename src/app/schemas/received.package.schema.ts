import { z } from 'zod';

export const receivedPackageSchema = z.object({
  id: z.number().int().optional(),
  uuid_package: z.string().uuid().nonempty(),
  uuid_user_profile_receiver: z.string().uuid().nonempty(),
  uuid_user_profile_owner: z.string().uuid().nonempty(),
  status_package: z.string().nonempty(),
  created_at: z.date(),
  updated_at: z.date().optional(),
  deleted: z.number().optional(),
});