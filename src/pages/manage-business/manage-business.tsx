import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
// import { AlertDialogDemo } from "@/components/alert"

// import { useModalStore } from "@/hooks/useModalStore"
import { normalizeString } from '@/utils/normalizeText'
// import type { Tienda, TiendaList } from "@/models/store"
// import { deleteTiendas, getTiendas } from "@/http/tienda-service"

// import { TiendaSheet } from "./business-sheet"

import { Plus, Filter } from 'lucide-react'
// import { useTiendaStore } from "@/hooks/useTiendaStore"
import type { Business } from "@/models/business"
import { getBusiness } from "@/http/business-service"
import { Skeleton } from "@/components/ui/skeleton"
import { BusinessSheet } from "./business-sheet"
import { useBusinessStore } from "@/hooks/useBusinessStore"
import { useModalStore } from "@/hooks/useModalStore"

export const ManageBusiness = () => {
  const { businessSelected, setBusinessSelected } = useBusinessStore()
  const [business, setBusiness] = useState<Business[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [businessFilter, setBusinessFilter] = useState<Business[]>([])
  const { openModalId, openModal, closeModal } = useModalStore()
  
  const filteredStores = (value: string) => {
    const filtered = business.filter(b =>
      normalizeString(b.ruc).includes(normalizeString(value)) ||
      normalizeString(b.razonSocial).includes(normalizeString(value))
    )
    setBusinessFilter(filtered)
  }

  const fetchBusiness = async () => {
    setIsLoading(true)
    try {
      const { data } = await getBusiness()
      setBusiness(data)
      setBusinessFilter(data)
    } catch {
      toast.error("Error del servidor", {
        description: "No se pudo obtener la información de las empresas",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openBusinessSheet = (item?: Partial<Business>) => {
    setBusinessSelected(item || {})
    openModal("business-sheet-form")
  }

  useEffect(() => {
    fetchBusiness()
  }, [])

  return (
    <div className="mx-4 my-2">
      <div className="flex items-center gap-2 w-full justify-between">
        <Input
          placeholder="Buscar..."
          className="max-w-sm bg-white"
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            filteredStores(value)
          }}
        />
        <div className="flex items-center gap-2">
          <Button 
            variant='outline' 
            className="border-gray-700 text-gray-700 hover:text-gray-500"
            disabled
          ><Filter/>Filtrar</Button>
          <Button 
            variant='outline' 
            className="border-blue-700 text-blue-700 hover:text-blue-500" 
            onClick={() => openBusinessSheet()}
          ><Plus/>Agregar</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {
          isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={`card-business-${index}`} className="h-70 w-full border border-white" />
            ))
          ) : (
            businessFilter.length === 0 ? (
              <h2 className="text-center text-gray-500 text-2xl my-10 sm:col-start-1 sm:col-end-3 md:col-end-4 lg:col-end-5">
                No se encontraron empresas
              </h2>
            ) : (
              businessFilter.map((b) => (
                <article key={b.ruc} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-2xl font-semibold mb-2">{b.razonSocial}</h3>
                  <p className="mb-2">RUC: <strong>{b.ruc}</strong></p>
                  <Button variant='outline' className="ml-full" onClick={() => openBusinessSheet(b)}>Editar</Button>
                </article>
              ))
            )
          )
        }
      </div>
      <BusinessSheet onSave={fetchBusiness} isOpen={openModalId === "business-sheet-form"} closeSheet={closeModal} itemSelected={businessSelected} />
    </div>
  )
}
