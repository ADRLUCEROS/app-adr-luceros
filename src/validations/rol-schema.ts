import { z } from 'zod';

export const rolSchema = z.object({
  nombre_cargo: z.string({
    required_error: 'El nombre del cargo es requerido',
  }).min(1, 'El nombre del cargo no puede estar vacío'),

  descripcion: z.string({
    required_error: 'La descripción es requerida',
  }).min(1, 'La descripción no puede estar vacía'),

  snActivo: z.enum(['S', 'N'], {
    required_error: 'El estado (snActivo) es requerido',
    invalid_type_error: 'El valor de snActivo debe ser "S" o "N"',
  }),
});
