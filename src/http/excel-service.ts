import { http } from "./http-service";

export const importExcel = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return http.post("/v1/programacion-preeliminar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};