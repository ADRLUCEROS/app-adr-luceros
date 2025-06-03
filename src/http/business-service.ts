import { http } from "./http-service";
import type { Business } from "@/models/business";

export const getBusiness = async () => {
  return http.get<Business[]>("/empresa")
}
