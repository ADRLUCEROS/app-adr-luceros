import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

import { DataTable } from "@/components/BaseDataTable"
import { AlertDialogDemo } from "@/components/alert"

import { useModalStore } from "@/hooks/useModalStore"
import { normalizeString } from '@/utils/normalizeText'
import type { Tienda, TiendaList } from "@/models/shop"
import { deleteTiendas, getTiendas } from "@/http/tienda-service"

import { TiendaSheet } from "./shopSheet"
import { columnsStore } from "./column-shop"

import { Plus, Filter } from 'lucide-react'
import { useTiendaStore } from "@/hooks/useTiendaStore"

export const ManageStore = () => {
  const { setTienda, tiendaSeleccionada } = useTiendaStore()
  const [stores, setStores] = useState<TiendaList[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [storesFilter, setStoresFilter] = useState<TiendaList[]>([])
  const { openModalId, openModal, closeModal } = useModalStore()
  
  const filteredStores = (value: string) => {
    const filtered = stores.filter(store =>
      normalizeString(store.nombreTienda).includes(normalizeString(value)) ||
      normalizeString(store.codigoTienda).includes(normalizeString(value)) ||
      normalizeString(store.observacion ?? '').includes(normalizeString(value)) ||
      normalizeString(store.direccion).includes(normalizeString(value))
    )
    setStoresFilter(filtered)
  }

  const cols = useMemo(() => columnsStore(openModal, setTienda), [openModal, setTienda])

  const fetchStores = async () => {
    setIsLoading(true)
    try {
      const { data } = await getTiendas()
      setStores(data)
      setStoresFilter(data)
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

  const deleteTienda = () => {
    if(!tiendaSeleccionada) return;

    const tienda: Partial<Tienda> = {
      ...tiendaSeleccionada,
    }

    if (tiendaSeleccionada.empresa) tienda.idEmpresa = tiendaSeleccionada.empresa.idEmpresa

    deleteTiendas(tienda)
      .then(() => {
        toast.success('Operación exitosa', {
          description: "La tienda se ha eliminado correctamente.",
          richColors: true,
          closeButton: true,
          icon: "✅",
        })
        fetchStores()
        closeModal()
      })
      .catch((error) => {
        console.error("Error deleting store:", error)
        toast.error('Error del servidor', {
          description: "No se pudo eliminar la tienda.",
          richColors: true,
          closeButton: true,
          icon: "🚨",
        })
      })
  }

  useEffect(() => {
    fetchStores()
  }, [])

  return (
    <div className="mx-4 my-2">
        <DataTable isLoading={isLoading} columns={cols} data={storesFilter}>
          <div className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-semibold">Tiendas</h1>
              <Badge className="ml-2 bg-gray-100" variant='outline'>
                <span className="rounded-full h-1 w-1 bg-gray-500"/>
                <span className="text-gray-600">{ storesFilter.length }</span>
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Buscar..."
                className="max-w-sm"
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  filteredStores(value)
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
        <TiendaSheet onSave={fetchStores} isOpen={openModalId === "sheet1"} closeSheet={closeModal} tiendaSeleccionada={tiendaSeleccionada} />
        <AlertDialogDemo
          title="¿Estas seguro que quieres eliminar esta tienda?"
          isOpen={openModalId === "dialog1"}
          closeDialog={closeModal}
          action={deleteTienda}
        />
    </div>
  )
}
