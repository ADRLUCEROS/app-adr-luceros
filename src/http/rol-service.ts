import type { Rol } from "@/models/rol";
import { http } from "./http-service";

export const getRoles = async () => {
  return http.get<Rol[]>("/cargo")
}

export const saveRol = async (body: Partial<Rol>) => {
  if (body.idCargo) return http.put<Rol>("/cargo", body)
  return http.post<Rol>("/cargo", body)
}

// export const deleteRol = async (id: number) => {
//   return http.delete<Rol>(`/cargo/${id}`)
// }

export const deleteRol = async (body: Partial<Rol>) => {
  return http.delete<Rol>(`/cargo`, {
    data: body
  })
}
