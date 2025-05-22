export interface Tienda {
  id: number;
  nombre: string;
  codigo_tienda: number;
  codigo_entrada: string;
  departamento: string;
  distrito: string;
  direccion: string;
  observacion?: string;
  hora_inicio: string;
  hora_fin: string;
}
