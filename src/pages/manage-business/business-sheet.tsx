import { useForm, type FieldValues } from 'react-hook-form'
import { SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BaseSheet } from "@/components/BaseSheet"
import { useEffect } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { saveBusiness } from '@/http/business-service'
import { toast } from 'sonner'
import { useBusinessStore } from '@/hooks/useBusinessStore'
import type { Business } from '@/models/business'
import { businessSchema } from '@/validations/business-schema'

interface BusinessSheetProps {
  onSave: () => void
  isOpen: boolean
  closeSheet: () => void
  itemSelected?: Partial<Business> | null
}

export function BusinessSheet({ onSave, isOpen, closeSheet, itemSelected }: BusinessSheetProps) {
  const { setBusinessSelected, businessSelected } = useBusinessStore()

  const { register, handleSubmit, formState: {errors}, setValue, reset } = useForm({
    resolver: zodResolver(businessSchema),
  })

  useEffect(() => {
    if (itemSelected) {
      setValue("razonSocial", itemSelected.razonSocial || '')
      setValue("ruc", itemSelected.ruc || '')
      return
    }
    reset();
  }, [itemSelected, setValue, reset]);

  const handleStoreSubmit = (data: FieldValues) => {
    const body: Partial<Business> = {
      ...itemSelected, 
      ...data,
    }

    saveBusiness(body).then(() => {
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
    setBusinessSelected(null)
    closeSheet()
  }

  return (
    <BaseSheet title={businessSelected ? "Editar Storehouse" : "Registrar Storehouse"} isOpen={isOpen} closeSheet={closed}>
      <form onSubmit={handleSubmit((data) => handleStoreSubmit(data))}>
       <div className="grid gap-4 px-4">
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
              RUC
            </Label>
            <Input 
              id="address" 
              className={` ${errors.ruc && 'border-red-500'}`} 
              {...register('ruc')}
            />
            {errors.ruc && <p className='text-red-800 text-sm'>{errors.ruc.message}</p>}
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
