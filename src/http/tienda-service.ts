import { http } from "./http-service";

export const getTiendas = async () => {
  return http.get()
}
