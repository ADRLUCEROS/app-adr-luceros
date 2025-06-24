import type { Tienda, TiendaList } from "@/models/shop";
import { http } from "./http-service";

export const getTiendas = async () => {
  return http.get<TiendaList[]>("/tienda")
}

export const saveTiendas = async (body: Partial<Tienda>) => {
  if (body.idTienda) return http.put<Tienda>("/tienda", body)
  return http.post<Tienda>("/tienda", body)
}

// export const deleteTiendas = async (id: number) => {
//   return http.delete<Tienda>(`/tienda/${id}`)
// }

export const deleteTiendas = async (body: Partial<Tienda>) => {
  return http.delete<Tienda>(`/tienda`, {
    data: body
  })
}
