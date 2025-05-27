import { http } from "./http-service";
import type { Truck } from "@/models/truck";

export const getCamion = async () => {
  return http.get<Truck[]>("/unidad")
}
