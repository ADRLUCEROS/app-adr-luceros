import { z } from 'zod'

export const businessSchema = z.object({
  razonSocial: z.string().min(1, 'La razón social es requerida'),
  ruc: z.string().length(11, 'El RUC debe tener 11 dígitos').regex(/^[0-9]+$/, 'El RUC solo debe contener números'),
});