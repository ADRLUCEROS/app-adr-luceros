import type { Partner } from "./partner";

export interface Storehouse {
  idAlmacen: number;
  nombreAlmacen: string;
  direccion: string;
  id_locacion_peru: number;
  clienteCorporativo: Partner;
  snActivo: string;
}