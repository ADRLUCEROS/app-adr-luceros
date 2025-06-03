import { DataTable } from "@/components/BaseDataTable"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { AlertDialogDemo } from "@/components/alert"
import { useModalStore } from "@/hooks/useModalStore"
import { normalizeString } from '@/utils/normalizeText'
import type { Truck, TruckStatus } from "@/models/truck"
import { getCamion, saveCamion } from "@/http/camion-service"
import { toast } from "sonner"

import { columnsTruck } from "./columns-truck"
import { useTruckStore } from "@/hooks/useTruckStore"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus } from "lucide-react"
import { Link } from "react-router"

export const ManageTruck = () => {
  const { setTruckSelected, truckSelected } = useTruckStore()
  const [truck, setTruck] = useState<Truck[]>([])
  const [truckFilter, setTruckFilter] = useState<Truck[]>([])
  const [status, setStatus] = useState<string>("")
  const { openModalId, openModal, closeModal } = useModalStore()
  
  const filteredTruck = (value: string) => {
    const filtered = truck.filter(t =>
      normalizeString(t.placa).includes(normalizeString(value)) ||
      normalizeString(t.codTarjCircu).includes(normalizeString(value))
    )
    setTruckFilter(filtered)
  }

  const fetchTruck = async () => {
    try {
      const { data } = await getCamion()
      setTruck(data)
      setTruckFilter(data)
    } catch (error) {
      console.error("Error fetching trucks:", error)
      toast.error("Error del sistema", {
        description: "No se pudo obtener la información de las unidades",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
    }
  }

  const ChangeStatus = () => {
    if (status === "") {
      toast.error("Error", {
        description: "Debe seleccionar un estado para el camión",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
      return
    }
      
    try {
      saveCamion({
        ...truckSelected,
        estado: status as TruckStatus
      })
      fetchTruck()
      closeModal()
    } catch (error) {
      console.error("Error saving truck status:", error)
      toast.error("Error del sistema", {
        description: "No se pudo cambiar el estado del camión",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
    }
  }

  const cols = useMemo(() => columnsTruck(openModal, setTruckSelected), [openModal, setTruckSelected])

  useEffect(() => {
    setStatus(truckSelected?.estado || "")
  }, [truckSelected])

  useEffect(() => {
    fetchTruck()
  }, [])

  return (
    <div className="mx-4 my-2">
        <DataTable columns={cols} data={truckFilter}>
          <div className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-semibold">Tiendas</h1>
              <Badge className="ml-2 bg-gray-100" variant='outline'>
                <span className="rounded-full h-1 w-1 bg-gray-500"/>
                <span className="text-gray-600">{ truckFilter.length }</span>
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Buscar..."
                className="max-w-sm"
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  filteredTruck(value)
                }}
              />
              <Button 
                variant='outline' 
                className="border-gray-700 text-gray-700 hover:text-gray-500"
                disabled
              ><Filter/>Filters</Button>
              <Link to="/form-truck">
                <Button 
                  variant='outline' 
                  className="border-blue-700 text-blue-700 hover:text-blue-500"
                  onClick={() => setTruckSelected(null)}
                ><Plus/>Add Unidad</Button>
              </Link>
            </div>
          </div>
        </DataTable>
        <AlertDialogDemo
          title={`Cambiar estado del camión ${truckSelected?.placa}`}
          isOpen={openModalId === "camion-estado-dialog"}
          closeDialog={closeModal}
          btnName="Guardar"
          action={ChangeStatus}
        >
          <Select value={status} onValueChange={(value) => {
            setStatus(value)
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baja">baja</SelectItem>
              <SelectItem value="mantenimiento">mantenimiento</SelectItem>
              <SelectItem value="activo">activo</SelectItem>
            </SelectContent>
          </Select>
        </AlertDialogDemo>
    </div>
  )
}