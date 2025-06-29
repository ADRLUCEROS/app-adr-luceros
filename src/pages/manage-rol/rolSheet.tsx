import { useForm, type FieldValues } from 'react-hook-form'
import { SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BaseSheet } from "@/components/BaseSheet"
import { useEffect } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { saveRol } from '@/http/rol-service'
import { toast } from 'sonner'
import { useRolStore } from '@/hooks/useRolStore'
import type { Rol } from '@/models/rol'
import { rolSchema } from '@/validations/rol-schema'
import { Textarea } from '@/components/ui/textarea'

interface RolSheetProps {
  onSave: () => void
  isOpen: boolean
  closeSheet: () => void
  itemSelected?: Partial<Rol> | null
}

export function RolSheet({ onSave, isOpen, closeSheet, itemSelected }: RolSheetProps) {
  const { setRolSelected, rolSelected } = useRolStore()

  const { register, handleSubmit, formState: {errors}, setValue, reset } = useForm({
    resolver: zodResolver(rolSchema),
  })

  useEffect(() => {
    if (itemSelected) {
      setValue("nombre_cargo", itemSelected.nombre_cargo || '')
      setValue("descripcion", itemSelected.descripcion || '')
      return
    }
    reset();
  }, [itemSelected, setValue, reset]);

  const handleStoreSubmit = (data: FieldValues) => {
    const body: Partial<Rol> = {
      ...itemSelected, 
      ...data,
    }

    saveRol(body).then(() => {
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
    setRolSelected(null)
    closeSheet()
  }

  return (
    <BaseSheet title={rolSelected ? "Editar Storehouse" : "Registrar Storehouse"} isOpen={isOpen} closeSheet={closed}>
      <form onSubmit={handleSubmit((data) => handleStoreSubmit(data))}>
       <div className="grid gap-4 px-4">
          <div className="grid items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input 
              id="name" 
              className={` ${errors.nombre_cargo && 'border-red-500'}`} 
              {...register('nombre_cargo')}
            />
            {errors.nombre_cargo && <p className='text-red-800 text-sm'>{errors.nombre_cargo.message}</p>}
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="Descripción" className="text-right">
              Descripción
            </Label>
            <Textarea 
              id="Descripción" 
              placeholder="Type your message here."
              className={` ${errors.descripcion && 'border-red-500'}`} 
              {...register('descripcion')}
            />
            {errors.descripcion && <p className='text-red-800 text-sm'>{errors.descripcion.message}</p>}
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
