import type { Tienda } from "@/models/store";
import { http } from "./http-service";

export const getTiendas = async () => {
  return http.get<Tienda[]>("/tienda")
}
