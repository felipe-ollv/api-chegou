import { z } from "zod";

export const userProfileSchema = z.object({
  id: z.number().optional(),
  uuid_user_profile: z.string().uuid().nonempty(),
  uuid_user_fk: z.string().uuid().nonempty(),
  uuid_condominium_fk: z.string().uuid().nonempty(),
  apartment_block: z.string().nonempty(),
  apartment: z.number().nonnegative(),
  phone_number: z.string().nonempty(),
  type_profile: z.string().nonempty(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted: z.number().optional()
});

export type UserProfile = z.infer<typeof userProfileSchema>;