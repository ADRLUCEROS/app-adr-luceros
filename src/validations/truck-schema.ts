import { z } from "zod";

export const truckSchema = z.object({
  placa: z.string().min(1, "La placa es requerida"),
  anoFab: z.string()
    .refine((val) => /^\d{4}$/.test(val), "El año debe tener 4 dígitos")
    .refine((val) => parseInt(val) >= 1900 && parseInt(val) <= new Date().getFullYear(), "El año debe estar entre 1900 y el año actual"),
  altura: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0 ,"La altura debe ser mayor que cero"),
  ancho: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0 ,"La ancho debe ser mayor que cero"),
  longitud: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0 ,"La longitud debe ser mayor que cero"),
  pesoNeto: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0 ,"La peso neto debe ser mayor que cero"),
  pesoUtil: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0 ,"La peso util debe ser mayor que cero"),
  pesoBruto: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0 ,"La peso bruto debe ser mayor que cero"),
  metroCubico: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0 ,"La metro cubico debe ser mayor que cero"),
  codTarjCircu: z.string().min(1, "El código de tarjeta de circulación es requerido"),
  estado: z.enum(["activo", "baja", "mantenimiento"]),
});
