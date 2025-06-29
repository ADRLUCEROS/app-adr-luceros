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

import { AlertConfirm } from "@/components/AlertConfirm"
import { useModalStore } from "@/hooks/useModalStore"
import { normalizeString } from '@/utils/normalizeText'
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Filter, Plus } from "lucide-react"
import { Link } from "react-router"
import type { Worker } from "@/models/worker"
import { getWorkers, saveWorker } from "@/http/worker-service"
import { columnsWorker } from "./columns-worker"
import { useWorkerStore } from "@/hooks/useWorkerStore"

export const ManageWorker = () => {
  const { setWorkerSelected, workerSelected } = useWorkerStore()
  const [worker, setWorker] = useState<Worker[]>([])
  const [workerFilter, setWorkerFilter] = useState<Worker[]>([])
  const [status, setStatus] = useState<string>("")
  const { openModalId, openModal, closeModal } = useModalStore()
  
  const filteredWorker = (value: string) => {
    const filtered = worker.filter(w =>
      normalizeString(w.nombres).includes(normalizeString(value)) ||
      normalizeString(w.numContacto).includes(normalizeString(value)) ||
      normalizeString(w.numDoc).includes(normalizeString(value)) ||
      normalizeString(w.numWpp).includes(normalizeString(value)) ||
      normalizeString(w.sexo).includes(normalizeString(value)) ||
      normalizeString(w.apellidos).includes(normalizeString(value)) ||
      normalizeString(w.cargos.nombre_cargo).includes(normalizeString(value)) ||
      normalizeString(w.correo).includes(normalizeString(value)) ||
      normalizeString(w.direccion).includes(normalizeString(value)) ||
      normalizeString(w.fechaNac).includes(normalizeString(value))
    )
    setWorkerFilter(filtered)
  }

  const fetchWorker = async () => {
    try {
      const { data } = await getWorkers()
      setWorker(data)
      setWorkerFilter(data)
    } catch (error) {
      console.error("Error fetching worker:", error)
      toast.error("Error del sistema", {
        description: "No se pudo obtener la información de los colaboradores",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
    }
  }

  const ChangeStatus = () => {
    if (status === "") {
      toast.error("Error", {
        description: "Debe seleccionar un cargo para el colaborador",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
      return
    }
      
    try {
      saveWorker({
        ...workerSelected,
      })
      fetchWorker()
      closeModal()
    } catch (error) {
      console.error("Error saving worker:", error)
      toast.error("Error del sistema", {
        description: "No se pudo cambiar el cargo del colaborador",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
    }
  }

  const cols = useMemo(() => columnsWorker(openModal, setWorkerSelected), [openModal, setWorkerSelected])

  useEffect(() => {
    setStatus(workerSelected?.cargos?.nombre_cargo || "")
  }, [workerSelected])

  useEffect(() => {
    fetchWorker()
  }, [])

  return (
    <div className="mx-4 my-2">
        <DataTable columns={cols} data={workerFilter}>
          <div className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-semibold">Colaboradores</h1>
              <Badge className="ml-2 bg-gray-100" variant='outline'>
                <span className="rounded-full h-1 w-1 bg-gray-500"/>
                <span className="text-gray-600">{ workerFilter.length }</span>
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Buscar..."
                className="max-w-sm"
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  filteredWorker(value)
                }}
              />
              <Button 
                variant='outline' 
                className="border-gray-700 text-gray-700 hover:text-gray-500"
                disabled
              ><Filter/>Filtros</Button>
              <Link to={`./form`}>
                <Button 
                  variant='outline' 
                  className="border-blue-700 text-blue-700 hover:text-blue-500"
                  onClick={() => setWorkerSelected(null)}
                ><Plus/>Agregar</Button>
              </Link>
            </div>
          </div>
        </DataTable>
        <AlertConfirm
          title={`Cambiar el cargo de ${workerSelected?.nombres} ${workerSelected?.apellidos}`}
          isOpen={openModalId === "colaborador-rol-dialog"}
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
        </AlertConfirm>
    </div>
  )
}