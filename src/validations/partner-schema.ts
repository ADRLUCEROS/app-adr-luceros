import { z } from 'zod'

export const partnerSchema = z.object({
  nombre: z.string().min(1, 'El nombre del socio es requerido'),
  razonSocial: z.string().min(1, 'La razón social es requerida'),
  direccionFiscal: z.string().min(1, 'La dirección fiscal es requerida'),
  // empresa: businessSchema,
});