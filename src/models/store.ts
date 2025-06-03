import type { Business } from "./business";

export interface Tienda {
  idTienda: number;
  nombreTienda: string;
  codigoTienda: number;
  codigoEntrada: string;
  idTiendaUbi: number;
  direccion: string;
  observacion?: string;
  horarioInicio: string;
  horarioFin: string;
  idEmpresa?: number;
  sn: string;
}

export interface TiendaList {
  idTienda: number;
  nombreTienda: string;
  codigoTienda: number;
  codigoEntrada: string;
  idTiendaUbi: number;
  direccion: string;
  observacion?: string;
  horarioInicio: string;
  horarioFin: string;
  empresa: Business;
  sn: string;
} 
