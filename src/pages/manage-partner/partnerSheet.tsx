import { useForm, type FieldValues } from 'react-hook-form'
import { SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BaseSheet } from "@/components/BaseSheet"
import { useEffect } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { savePartner } from '@/http/partner-service'
import { toast } from 'sonner'
import { usePartnerStore } from '@/hooks/usePartnerStore'
import type { PartnerSaveRequest } from '@/models/partner'
import { partnerSchema } from '@/validations/partner-schema'

interface PartnerSheetProps {
  onSave: () => void
  isOpen: boolean
  closeSheet: () => void
  itemSelected?: Partial<PartnerSaveRequest> | null
}

export function PartnerSheet({ onSave, isOpen, closeSheet, itemSelected }: PartnerSheetProps) {
  const { setPartnerSelected, partnerSelected } = usePartnerStore()

  const { register, handleSubmit, formState: {errors}, setValue, reset } = useForm({
    resolver: zodResolver(partnerSchema),
  })

  useEffect(() => {
    if (itemSelected) {
      setValue("razonSocial", itemSelected.razonSocial || '')
      setValue("nombre", itemSelected.nombre || '')
      setValue("direccionFiscal", itemSelected.direccionFiscal || '')
      return
    }
    reset();
  }, [itemSelected, setValue, reset]);

  const handleStoreSubmit = (data: FieldValues) => {
    const body: Partial<PartnerSaveRequest> = {
      ...itemSelected, 
      ...data,
    }

    savePartner(body).then(() => {
      closed()
      onSave()
      toast.success('Operación exitosa', {
        description: "La Storehouse se ha guardado correctamente.",
        richColors: true,
        closeButton: true,
        icon: "✅",
      })
    })
    .catch((error) => {
      console.error("Error saving store:", error)
      toast.error('Error del servidor', {
        description: "No se pudo guardar la Storehouse.",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
    })
  }

  const closed = () => {
    setPartnerSelected(null)
    closeSheet()
  }

  return (
    <BaseSheet title={partnerSelected ? "Editar cliente corporativo" : "Registrar cliente corporativo"} isOpen={isOpen} closeSheet={closed}>
      <form onSubmit={handleSubmit((data) => handleStoreSubmit(data))}>
       <div className="grid gap-4 px-4">
        <div className="grid items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Nombre cliente corporativo
            </Label>
            <Input 
              id="name" 
              className={` ${errors.nombre && 'border-red-500'}`} 
              {...register('nombre')}
            />
            {errors.nombre && <p className='text-red-800 text-sm'>{errors.nombre.message}</p>}
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Razón Social
            </Label>
            <Input 
              id="name" 
              className={` ${errors.razonSocial && 'border-red-500'}`} 
              {...register('razonSocial')}
            />
            {errors.razonSocial && <p className='text-red-800 text-sm'>{errors.razonSocial.message}</p>}
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="address" className="text-right">
              Dirección Fiscal
            </Label>
            <Input 
              id="address" 
              className={` ${errors.direccionFiscal && 'border-red-500'}`} 
              {...register('direccionFiscal')}
            />
            {errors.direccionFiscal && <p className='text-red-800 text-sm'>{errors.direccionFiscal.message}</p>}
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">
            Guardar
          </Button>
        </SheetFooter>
      </form>
    </BaseSheet>
  )
}
