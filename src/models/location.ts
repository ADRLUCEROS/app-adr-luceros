export interface Department {
  id: string
  name: string
}

export interface Province {
  id: string
  name: string
  department_id: string
}

export interface District { 
  id: string
  name: string
  province_id: string
  department_id: string
}