import { z } from "zod";

export const notificationSchema = z.object({
  id: z.number().int().optional(),
  uuid_notification: z.string().uuid().nonempty(),
  uuid_package_fk: z.string().uuid().nonempty(),
  status: z.string().nonempty(),
  created_at: z.date(),
  updated_at: z.date().optional(),
  deleted: z.number().optional(),
});
