import type { Business } from "./business";

export interface Partner {
  idClienteCorporativo: number;
  nombre: string;
  razonSocial: string;
  direccionFiscal: string;
  empresa: Business;
}

export interface PartnerSaveRequest {
  idClienteCorporativo: number;
  nombre: string;
  razonSocial: string;
  direccionFiscal: string;
  empresaId: number;
}
