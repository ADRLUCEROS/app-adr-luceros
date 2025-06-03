export interface Truck {
  idUnidad: number;
  placa: string;
  anoFab: number;
  altura: number;
  ancho: number;
  longitud: number;
  pesoNeto: number;
  pesoUtil: number;
  pesoBruto: number;
  metroCubico: number;
  codTarjCircu: string;
  estado: TruckStatus;
  idTienda: number;
}

export type TruckStatus = "activo" | "baja" | "mantenimiento";
