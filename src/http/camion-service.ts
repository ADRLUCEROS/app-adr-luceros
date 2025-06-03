import { http } from "./http-service";
import type { Truck } from "@/models/truck";

export const getCamion = async () => {
  return http.get<Truck[]>("/unidad")
}

export const saveCamion = async (body: Partial<Truck>) => {
  if (body.idUnidad) return http.put(`/unidad`, body) 
  return http.post('/unidad', body)
}
