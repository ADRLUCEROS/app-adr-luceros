import type { Warehouse } from "@/models/warehouse";
import { http } from "./http-service";

export const getWarehouses = async () => {
  return http.get<Warehouse[]>("/almacen")
}

export const saveWarehouse = async (body: Partial<Warehouse>) => {
  if (body.idAlmacen) return http.put<Warehouse>("/almacen", body)
  return http.post<Warehouse>("/almacen", body)
}

// export const deleteWarehouse = async (id: number) => {
//   return http.delete<Warehouse>(`/almacen/${id}`)
// }

export const deleteWarehouse = async (body: Partial<Warehouse>) => {
  return http.delete<Warehouse>(`/almacen`, {
    data: body
  })
}
