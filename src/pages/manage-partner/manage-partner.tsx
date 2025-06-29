import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

import { DataTable } from "@/components/BaseDataTable"

import { useModalStore } from "@/hooks/useModalStore"
import { normalizeString } from '@/utils/normalizeText'

import { columnsPartner } from "./column-partner"

import { Plus, Filter } from 'lucide-react'
import { usePartnerStore } from "@/hooks/usePartnerStore"
import type { Partner } from "@/models/partner"
import { getPartners } from "@/http/partner-service"
import { PartnerSheet } from "./partnerSheet"
import { AlertConfirm } from "@/components/AlertConfirm"

export const ManagePartner = () => {
  const { setPartnerSelected, partnerSelected } = usePartnerStore()
  const [partner, setPartner] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [partnerFilter, setPartnerFilter] = useState<Partner[]>([])
  const { openModal, closeModal, openModalId } = useModalStore()
  
  const filteredPartner = (value: string) => {
    const filtered = partner.filter(p =>
      normalizeString(p.nombre).includes(normalizeString(value)) ||
      normalizeString(p.razonSocial).includes(normalizeString(value)) ||
      normalizeString(p.direccionFiscal).includes(normalizeString(value))
      // normalizeString(p.empresa.razonSocial).includes(normalizeString(value))
    )
    setPartnerFilter(filtered)
  }

  const cols = useMemo(() => columnsPartner(openModal, setPartnerSelected), [openModal, setPartnerSelected])

  const fetchPartner = async () => {
    setIsLoading(true)
    try {
      const { data } = await getPartners()
      setPartner(data)
      setPartnerFilter(data)
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

  const openModalSheet = () => {
    setPartnerSelected(null)
    openModal("partner-sheet-form")
  }

  useEffect(() => {
    fetchPartner()
  }, [])

  return (
    <div className="mx-4 my-2">
        <DataTable isLoading={isLoading} columns={cols} data={partnerFilter}>
          <div className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-semibold">Clientes corporativos</h1>
              <Badge className="ml-2 bg-gray-100" variant='outline'>
                <span className="rounded-full h-1 w-1 bg-gray-500"/>
                <span className="text-gray-600">{ partnerFilter.length }</span>
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Buscar..."
                className="max-w-sm"
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  filteredPartner(value)
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
                onClick={openModalSheet}
              ><Plus/>Agregar</Button>
            </div>
          </div>
        </DataTable>
        <PartnerSheet
          onSave={fetchPartner}
          isOpen={openModalId === "partner-sheet-form"}
          closeSheet={closeModal}
          itemSelected={partnerSelected}
        />
        <AlertConfirm
          title="¿Estas seguro que quieres eliminar esta tienda?"
          isOpen={openModalId === "partner-dialog-delete"}
          variant="destructive"
          closeDialog={closeModal}
          action={() => {}}
        />
    </div>
  )
}
