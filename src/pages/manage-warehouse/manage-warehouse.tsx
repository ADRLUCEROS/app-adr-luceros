import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

import { DataTable } from "@/components/BaseDataTable"

import { useModalStore } from "@/hooks/useModalStore"
import { normalizeString } from '@/utils/normalizeText'

import { columnsWarehouse } from "./column-warehouse"

import { Plus, Filter } from 'lucide-react'
import { useWarehouseStore } from "@/hooks/useWarehouseStore"
import type { Warehouse } from "@/models/warehouse"
import { getWarehouses } from "@/http/warehouse-service"
import { WarehouseSheet } from "./warehouseSheet"
import { AlertConfirm } from "@/components/AlertConfirm"

export const ManageWarehouse = () => {
  const { setWarehouseSelected, warehouseSelected } = useWarehouseStore()
  const [warehouse, setWarehouse] = useState<Warehouse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [warehouseFilter, setWarehouseFilter] = useState<Warehouse[]>([])
  const { openModalId, openModal, closeModal } = useModalStore()
  
  const filteredStorehouse = (value: string) => {
    const filtered = warehouse.filter(r =>
      normalizeString(r.nombreAlmacen).includes(normalizeString(value)) ||
      normalizeString(r.clienteCorporativo.nombre).includes(normalizeString(value)) ||
      normalizeString(r.direccion).includes(normalizeString(value))
    )
    setWarehouseFilter(filtered)
  }

  const cols = useMemo(() => columnsWarehouse(openModal, setWarehouseSelected), [openModal, setWarehouseSelected])

  const fetchWarehouse = async () => {
    setIsLoading(true)
    try {
      const { data } = await getWarehouses()
      setWarehouse(data)
      setWarehouseFilter(data)
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

  const onOpenModal = () => {
    setWarehouseSelected(null)
    openModal("warehouse-sheet-form")
  }

  useEffect(() => {
    fetchWarehouse()
  }, [])

  return (
    <div className="mx-4 my-2">
        <DataTable isLoading={isLoading} columns={cols} data={warehouseFilter}>
          <div className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-semibold">Cargos</h1>
              <Badge className="ml-2 bg-gray-100" variant='outline'>
                <span className="rounded-full h-1 w-1 bg-gray-500"/>
                <span className="text-gray-600">{ warehouseFilter.length }</span>
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
                onClick={onOpenModal}
              ><Plus/>Agregar</Button>
            </div>
          </div>
        </DataTable>
        <WarehouseSheet onSave={fetchWarehouse} isOpen={openModalId === "warehouse-sheet-form"} closeSheet={closeModal} WarehouseSelected={warehouseSelected} />
        <AlertConfirm
          title="Eliminar almacén"
          description="¿Estás seguro de que deseas eliminar este almacén? Perderás todos los datos asociados."
          isOpen={openModalId === "warehouse-dialog-delete"}
          closeDialog={closeModal}
          variant="destructive"
          action={() => {}}
        />
    </div>
  )
}
