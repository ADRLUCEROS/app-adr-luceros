import type { SnActivo } from "./sn_activo"

export interface Rol {
  idCargo: number
  nombre_cargo: string
  descripcion: string
  snActivo: SnActivo
}