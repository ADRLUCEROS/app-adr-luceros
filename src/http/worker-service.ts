import type { Worker } from "@/models/worker";
import { http } from "./http-service";

export const getWorkers = async () => {
  return http.get<Worker[]>("/personas")
}

export const saveWorker = async (body: Partial<Worker>) => {
  if (body.idPersona) return http.put<Worker>("/personas", body)
  return http.post<Worker>("/personas", body)
}

// export const deleteWorker = async (id: number) => {
//   return http.delete<Worker>(`/personas/${id}`)
// }

export const deleteWorker = async (body: Partial<Worker>) => {
  return http.delete<Worker>(`/personas`, {
    data: body
  })
}
