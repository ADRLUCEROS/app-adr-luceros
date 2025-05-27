export interface Truck {
  idUnidad: string;
  placa: string;
  anoFabricacion: number;
  altura: number;
  ancho: number;
  longitud: number;
  pesoNeto: number;
  pesoUtil: number;
  pesoBruto: number;
  metroCubico: number;
  codTarjCircu: string;
  estado: "Activo" | "Inactivo" | "En Mantenimiento";
}