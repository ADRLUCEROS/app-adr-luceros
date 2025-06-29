import { http } from "./http-service";
import type { Business } from "@/models/business";

export const getBusiness = async () => {
  return http.get<Business[]>("/empresa")
}

export const saveBusiness = async (body: Partial<Business>) => {
  if (body.idEmpresa) return http.put(`/empresa`, body) 
  return http.post('/empresa', body)
}
