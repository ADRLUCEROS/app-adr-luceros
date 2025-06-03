import { DataTable } from "@/components/BaseDataTable"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { AlertDialogDemo } from "@/components/alert"
import { useModalStore } from "@/hooks/useModalStore"
import { normalizeString } from '@/utils/normalizeText'
import type { Truck } from "@/models/truck"
import { getCamion } from "@/http/camion-service"
import { toast } from "sonner"
import { TruckSheet } from "./TruckSheet"

import { columnsTruck } from "./columns-truck"

export const ManageTruck = () => {
  const [truck, setTruck] = useState<Truck[]>([])
  const [truckFilter, setTruckFilter] = useState<Truck[]>([])
  const { openModalId, openModal, closeModal } = useModalStore()
  
  const filteredTruck = (value: string) => {
    const filtered = truck.filter(t =>
      normalizeString(t.placa).includes(normalizeString(value)) ||
      normalizeString(t.codTarjCircu).includes(normalizeString(value))
    )
    setTruckFilter(filtered)
  }

  const cols = useMemo(() => columnsTruck(openModal), [openModal])

  useEffect(() => {
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

    fetchTruck()
  }, [])

  return (
    <div className="mx-4 my-2">
        <div className="mb-4 flex items-center justify-between">
          <Input
            placeholder="Buscar..."
            className="max-w-sm"
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              filteredTruck(value)
            }}
          />
          <Button onClick={() => openModal("sheet1")}>Agregar camión</Button>
        </div>
        <DataTable columns={cols} data={truckFilter} />
        <TruckSheet onSave={() => {}} isOpen={openModalId === "sheet1"} closeSheet={closeModal} />
        <AlertDialogDemo
          title="¿Estas seguro que quieres eliminar el camión?"
          isOpen={openModalId === "dialog1"}
          closeDialog={closeModal}
          action={() => {
            console.log("Delete action triggered")
            closeModal()
          }}
        />
    </div>
  )
}