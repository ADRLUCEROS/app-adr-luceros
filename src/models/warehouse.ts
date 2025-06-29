import type { Partner } from "./partner";
import type { SnActivo } from "./sn_activo";

export interface Warehouse {
  idAlmacen: number;
  nombreAlmacen: string;
  direccion: string;
  id_locacion_peru: number;
  clienteCorporativo: Partner;
  snActivo: SnActivo;
}

export interface WarehouseSaveRequest {
  idAlmacen: number;
  nombreAlmacen: string;
  direccion: string;
  id_locacion_peru: number;
  clienteCorporativoId: number | null;
  snActivo: SnActivo;
}