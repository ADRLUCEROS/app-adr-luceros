import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

import { DataTable } from "@/components/BaseDataTable"

import { useModalStore } from "@/hooks/useModalStore"
import { normalizeString } from '@/utils/normalizeText'

import { columnsRol } from "./column-rol"

import { Plus, Filter } from 'lucide-react'
import { useRolStore } from "@/hooks/useRolStore"
import type { Rol } from "@/models/rol"
import { getRoles } from "@/http/rol-service"
import { AlertConfirm } from "@/components/AlertConfirm"
import { RolSheet } from "./rolSheet"

export const ManageRol = () => {
  const { setRolSelected, rolSelected } = useRolStore()
  const [rol, setRol] = useState<Rol[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [rolFilter, setRolFilter] = useState<Rol[]>([])
  const { openModal, closeModal, openModalId } = useModalStore()
  
  const filteredRol = (value: string) => {
    const filtered = rol.filter(r =>
      normalizeString(r.nombre_cargo).includes(normalizeString(value)) ||
      normalizeString(r.descripcion).includes(normalizeString(value))
    )
    setRolFilter(filtered)
  }

  const cols = useMemo(() => columnsRol(openModal, setRolSelected), [openModal, setRolSelected])

  const fetchRol = async () => {
    setIsLoading(true)
    try {
      const { data } = await getRoles()
      setRol(data)
      setRolFilter(data)
    } catch {
      toast.error("Error del servidor", {
        description: "No se pudo obtener la información de las tiendas",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openSheetRol = () => {
    setRolSelected(null)
    openModal("rol-sheet-form")
  }

  useEffect(() => {
    fetchRol()
  }, [])

  return (
    <div className="mx-4 my-2">
        <DataTable isLoading={isLoading} columns={cols} data={rolFilter}>
          <div className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-semibold">Cargos</h1>
              <Badge className="ml-2 bg-gray-100" variant='outline'>
                <span className="rounded-full h-1 w-1 bg-gray-500"/>
                <span className="text-gray-600">{ rolFilter.length }</span>
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Buscar..."
                className="max-w-sm"
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  filteredRol(value)
                }}
              />
              <Button 
                variant='outline' 
                className="border-gray-700 text-gray-700 hover:text-gray-500"
                disabled
              ><Filter/>Filtrar</Button>
              <Button 
                variant='outline' 
                className="border-blue-700 text-blue-700 hover:text-blue-500" 
                onClick={openSheetRol}
              ><Plus/>Agregar</Button>
            </div>
          </div>
        </DataTable>
        <RolSheet 
          onSave={fetchRol}
          isOpen={openModalId === "rol-sheet-form"}
          closeSheet={closeModal}
          itemSelected={rolSelected}
        />
        <AlertConfirm
          title="¿Estas seguro que quieres eliminar esta tienda?"
          isOpen={openModalId === "rol-dialog-delete"}
          closeDialog={closeModal}
          variant="destructive"
          action={() => {}}
        />
    </div>
  )
}
