import type { Rol } from "./rol";

export interface Worker {
  idPersona: number;
  nombres: string;
  apellidos: string;
  numDoc: number;
  numContacto: number;
  numWpp: number;
  fechaNac: string;
  correo: string;
  direccion: string;
  sexo: string;
  cargos: Rol;
}
