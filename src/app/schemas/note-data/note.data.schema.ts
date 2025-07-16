import { z } from "zod";

export const noteDataSchema = z.object({
  id: z.number().optional(),
  uuid_note_data: z.string().uuid().nonempty(),
  uuid_condominium_fk: z.string().uuid().nonempty(),
  read: z.number(),
  content: z.string().nonempty(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted: z.number().optional(),
});

export type NoteData = z.infer<typeof noteDataSchema>;