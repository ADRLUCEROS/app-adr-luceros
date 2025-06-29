import { z } from 'zod'

export const warehouseSaveRequestSchema = z.object({
  nombreAlmacen: z.string({
    required_error: 'El nombre del almacén es requerido',
  }).min(1, 'El nombre del almacén no puede estar vacío'),

  direccion: z.string({
    required_error: 'La dirección es requerida',
  }).min(1, 'La dirección no puede estar vacía'),

  id_locacion_peru: z.string().refine(val => {
    if(!val) return true
    const num = parseInt(val)
    return !isNaN(num) && num > 0
  }, 'el formato de la ubicación es invalida'),

  clienteCorporativoId: z.string().refine(val => {
    if(!val) return true
    const num = parseInt(val)
    return !isNaN(num) && num > 0
  }, 'el formato del cliente corporativo es invalida'),
});