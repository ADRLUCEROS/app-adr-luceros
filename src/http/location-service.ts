import type { Department, District, Province } from "@/models/location"
import axios from "axios"

export const getDepartments = async () => {
  return axios.get<Department[]>("/src/assets/departments.json", {
    responseType: "json"
  })
}

export const getProvinces = async (departmentId: string) => {
  if(!departmentId) return []

  const provinces = await axios.get<Province[]>(`/src/assets/provinces.json`, {
    responseType: "json"
  })

  if(!provinces) return []

  return provinces.data.filter(province => province.department_id === departmentId)
}

export const getDistricts = async (provinceId: string, departmentId: string ) => {
  if(!provinceId || !departmentId) return []

  const districts = await axios.get<District[]>(`/src/assets/districts.json`, {
    responseType: "json"
  })

  if(!districts) return []

  return districts.data.filter(district => district.province_id === provinceId && district.department_id === departmentId)
}
