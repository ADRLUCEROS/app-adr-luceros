import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

import { DataTable } from "@/components/BaseDataTable"

import { useModalStore } from "@/hooks/useModalStore"
import { normalizeString } from '@/utils/normalizeText'

import { columnsStorehouse } from "./column-storehouse"

import { Plus, Filter } from 'lucide-react'
import { useStorehouseStore } from "@/hooks/useStorehouseStore"
import type { Storehouse } from "@/models/storehouse"
import { getStorehouses } from "@/http/storehouse-service"

export const ManageStorehouse = () => {
  const { setStorehouseSelected } = useStorehouseStore()
  const [Storehouse, setStorehouse] = useState<Storehouse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [StorehouseFilter, setStorehouseFilter] = useState<Storehouse[]>([])
  const { openModal } = useModalStore()
  
  const filteredStorehouse = (value: string) => {
    const filtered = Storehouse.filter(r =>
      normalizeString(r.nombreAlmacen).includes(normalizeString(value)) ||
      normalizeString(r.clienteCorporativo.nombre).includes(normalizeString(value)) ||
      normalizeString(r.direccion).includes(normalizeString(value))
    )
    setStorehouseFilter(filtered)
  }

  const cols = useMemo(() => columnsStorehouse(openModal, setStorehouseSelected), [openModal, setStorehouseSelected])

  const fetchStorehouse = async () => {
    setIsLoading(true)
    try {
      const { data } = await getStorehouses()
      setStorehouse(data)
      setStorehouseFilter(data)
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

  useEffect(() => {
    fetchStorehouse()
  }, [])

  return (
    <div className="mx-4 my-2">
        <DataTable isLoading={isLoading} columns={cols} data={StorehouseFilter}>
          <div className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-semibold">Cargos</h1>
              <Badge className="ml-2 bg-gray-100" variant='outline'>
                <span className="rounded-full h-1 w-1 bg-gray-500"/>
                <span className="text-gray-600">{ StorehouseFilter.length }</span>
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Buscar..."
                className="max-w-sm"
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  filteredStorehouse(value)
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
                onClick={() => openModal("sheet1")}
              ><Plus/>Agregar</Button>
            </div>
          </div>
        </DataTable>
        {/* <TiendaSheet onSave={fetchStores} isOpen={openModalId === "sheet1"} closeSheet={closeModal} tiendaSeleccionada={tiendaSeleccionada} />
        <AlertDialogDemo
          title="¿Estas seguro que quieres eliminar esta tienda?"
          isOpen={openModalId === "dialog1"}
          closeDialog={closeModal}
          action={deleteTienda}
        /> */}
    </div>
  )
}
