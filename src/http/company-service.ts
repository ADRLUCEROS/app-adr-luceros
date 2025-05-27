import { http } from "./http-service";
import type { Truck } from "@/models/truck";

export const getCompanies = async () => {
  return http.get<Truck[]>("/empresa")
}
