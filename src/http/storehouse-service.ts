import type { Storehouse } from "@/models/storehouse";
import { http } from "./http-service";

export const getStorehouses = async () => {
  return http.get<Storehouse[]>("/almacen")
}

export const saveStorehouse = async (body: Partial<Storehouse>) => {
  if (body.idAlmacen) return http.put<Storehouse>("/almacen", body)
  return http.post<Storehouse>("/almacen", body)
}

// export const deleteStorehouse = async (id: number) => {
//   return http.delete<Storehouse>(`/almacen/${id}`)
// }

export const deleteStorehouse = async (body: Partial<Storehouse>) => {
  return http.delete<Storehouse>(`/almacen`, {
    data: body
  })
}
