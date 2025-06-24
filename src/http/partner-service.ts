import type { Partner } from "@/models/partner";
import { http } from "./http-service";

export const getPartners = async () => {
  return http.get<Partner[]>("/cliente-corporativo")
}

export const savePartner = async (body: Partial<Partner>) => {
  if (body.idClienteCorporativo) return http.put<Partner>("/cliente-corporativo", body)
  return http.post<Partner>("/cliente-corporativo", body)
}

// export const deletePartner = async (id: number) => {
//   return http.delete<Partner>(`/cliente-corporativo/${id}`)
// }

export const deletePartner = async (body: Partial<Partner>) => {
  return http.delete<Partner>(`/cliente-corporativo`, {
    data: body
  })
}
