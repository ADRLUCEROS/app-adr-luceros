import { z } from 'zod'

export const shopSchema = z.object({
  nombreTienda: z.string().min(1,'el nombre de tienda es requerido'),
  horarioInicio: z.string().min(1, 'la ventana horaria es requerido'),
  horarioFin: z.string().min(1, 'la ventana horaria es requerido'),
  // idTiendaUbi: z.string().refine(val => {
  //   if(!val) return true
  //   return !isNaN(parseInt(val))
  // }, 'el formato del id ubicación es invalida'),
  direccion: z.string().min(1, 'la dirección es requerido'),
  observacion: z.string().optional().nullable(),
  // idEmpresa: z.string().refine(val => {
  //   if(!val) return true
  //   return !isNaN(parseInt(val))
  // }, 'el formato del id empresa es invalida'),
}).refine(obj => {
  const [hourStart, minuteStart] = obj.horarioInicio.split(':').map(Number)
  const [hourEnd, minuteEnd] = obj.horarioFin.split(':').map(Number)

  return !(hourStart > hourEnd || (hourStart === hourEnd && minuteStart >= minuteEnd))
}, {
  message: 'la hora de inicio debe ser menor que la hora de fin',
  path: ['horarioInicio'],
})
