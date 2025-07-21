import { z } from 'zod';

export const condominiumSchema = z.object({
  id: z.number().optional(),
  uuid_condominium: z.string().uuid().nonempty(),
  condominium_name: z.string().nonempty(),
  address: z.string().nonempty(),
  address_number: z.string().nonempty(),
  cep: z.string().nonempty(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted: z.number().optional()
});

export type Condominium = z.infer<typeof condominiumSchema>;