import { useForm, type FieldValues } from 'react-hook-form'
import { SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BaseSheet } from "@/components/BaseSheet"
import { BaseCombobox, type ItemCombobox } from "@/components/BaseCombobox"
import { useEffect, useState } from "react"
import { getDepartments, getDistricts, getProvinces } from "@/http/location-service"
import type { Department, District, Province } from "@/models/location"
import { Textarea } from "@/components/ui/textarea"
import { getBusiness } from '@/http/business-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { storeSchema } from '@/validations/store-schema'
import type { Tienda, TiendaList } from '@/models/store'
import { saveTiendas } from '@/http/tienda-service'
import { toast } from 'sonner'
import { useTiendaStore } from '@/hooks/useTiendaStore'

interface TiendaSheetProps {
  onSave: () => void
  isOpen: boolean
  closeSheet: () => void
  tiendaSeleccionada?: Partial<TiendaList> | null
}

export function TiendaSheet({ onSave, isOpen, closeSheet, tiendaSeleccionada }: TiendaSheetProps) {
  const { setTienda } = useTiendaStore()
  const [business, setBusiness] = useState<ItemCombobox[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState<string | number>("")

  const [departments, setDepartments] = useState<Department[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState<string | number>("")
  
  const [provinces, setProvinces] = useState<Province[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string | number>("")
  
  const [districts, setDistricts] = useState<District[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string | number>("")

  // const [formValues, setFormValues] = useState<FieldValues>({
  //   nombreTienda: '',
  //   direccion: '',
  //   horarioInicio: '',
  //   horarioFin: '',
  //   observacion: '',
  // })

  const { register, handleSubmit, formState: {errors}, setValue, reset } = useForm({
    resolver: zodResolver(storeSchema),
  })

  useEffect(() => {
    if (tiendaSeleccionada) {
      setValue("nombreTienda", tiendaSeleccionada.nombreTienda || '');
      setValue("direccion", tiendaSeleccionada.direccion || '');
      setValue("horarioInicio", tiendaSeleccionada.horarioInicio || '');
      setValue("horarioFin", tiendaSeleccionada.horarioFin || '');
      setValue("observacion", tiendaSeleccionada.observacion || '');
      if (tiendaSeleccionada.empresa) setSelectedBusiness(tiendaSeleccionada.empresa?.idEmpresa || '');
    } else {
      reset(); // Resetear los campos si no hay tienda seleccionada
    }
  }, [tiendaSeleccionada, setValue, reset]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments()
        setDepartments(response.data)
      } catch (error) {
        console.error("Error fetching departments:", error)
      }
    }
    const fetchBusiness = async () => {
      try {
        const response = await getBusiness()
        const businessItems: ItemCombobox[] = response.data.map((b) => ({
          id: b.idEmpresa,
          name: `${b.razonSocial} (${b.ruc})`,
        }))
        setBusiness(businessItems)
      } catch (error) {
        console.log('Error fetching business', error)
      }
    }
    fetchDepartments()
    fetchBusiness()
  },[])

  useEffect(() => {
    setSelectedProvince("")
    setSelectedDistrict("")
    const fetchProvince = async () => {
      try {
        const response = await getProvinces(selectedDepartment as string)
        setProvinces(response)
      } catch (error) {
        console.error("Error fetching departments:", error)
      }
    }
    fetchProvince()
  },[selectedDepartment])

  useEffect(() => {
    setSelectedDistrict("")
    const fetchDistricts = async () => {
      try {
        const response = await getDistricts(selectedProvince as string, selectedDepartment as string)
        setDistricts(response)
      } catch (error) {
        console.error("Error fetching departments:", error)
      }
    }
    fetchDistricts()
  },[selectedProvince, selectedDepartment])

  const handleStoreSubmit = (data: FieldValues) => {
    const body: Partial<Tienda> = {
      ...tiendaSeleccionada, 
      ...data,
    }

    if (typeof selectedBusiness  === 'number') {
      const idEmpresa = selectedBusiness
      body.idEmpresa = idEmpresa
    }

    console.log(body)
    saveTiendas(body).then(() => {
      closed()
      onSave()
      toast.success('Operación exitosa', {
        description: "La tienda se ha guardado correctamente.",
        richColors: true,
        closeButton: true,
        icon: "✅",
      })
    })
    .catch((error) => {
      console.error("Error saving store:", error)
      toast.error('Error del servidor', {
        description: "No se pudo guardar la tienda.",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
    })
  }

  const closed = () => {
    setTienda(null)
    closeSheet()
  }

  return (
    <BaseSheet title={tiendaSeleccionada ? "Editar Tienda" : "Registrar Tienda"} isOpen={isOpen} closeSheet={closed}>
      <form onSubmit={handleSubmit((data) => handleStoreSubmit(data))}>
       <div className="grid gap-4 px-4">
          <div className="grid items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Nombre de tienda
            </Label>
            <Input 
              id="name" 
              className={` ${errors.nombreTienda && 'border-red-500'}`} 
              {...register('nombreTienda')}
            />
            {errors.nombreTienda && <p className='text-red-800 text-sm'>{errors.nombreTienda.message}</p>}
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="departamento" className="text-right">
              Departamento
            </Label>
            <BaseCombobox className=" w-auto" classNameContent="w-full"
              items={departments}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              placeholder="Departamento..."
            />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="distrito" className="text-right">
              Provincia
            </Label>
            <BaseCombobox className=" w-auto" classNameContent="w-full"
              items={provinces}
              value={selectedProvince}
              onChange={setSelectedProvince}
              isDisabled={!selectedDepartment}
              placeholder="Provincia..."
            />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="distrito" className="text-right">
              Distrito
            </Label>
            <BaseCombobox className=" w-auto" classNameContent="w-full"
              items={districts}
              value={selectedDistrict}
              onChange={setSelectedDistrict}
              isDisabled={!selectedProvince || !selectedDepartment}
              placeholder="Distrito..."
            />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="address" className="text-right">
              Dirección
            </Label>
            <Input 
              id="address" 
              className={` ${errors.direccion && 'border-red-500'}`} 
              {...register('direccion')}
            />
            {errors.direccion && <p className='text-red-800 text-sm'>{errors.direccion.message}</p>}
          </div>
          <div className="grid items-center gap-2">
            <Label className="text-right">
              Horario de atención
            </Label>
            <div className=" flex items-center gap-2">
              <Input 
                type="time" 
                className={`w-fit rounded-full ${errors.horarioInicio && 'border-red-500'}`} 
                {...register('horarioInicio')}
              />
              -
              <Input 
                type="time" 
                className={`w-fit rounded-full ${errors.horarioFin && 'border-red-500'}`} 
                {...register('horarioFin')}
              />
            </div>
            {
              errors.horarioInicio ? 
              <p className='text-red-800 text-sm'>{errors.horarioInicio.message}</p> 
              : (errors.horarioFin && <p className='text-red-800 text-sm'>{errors.horarioFin.message}</p>)
            }
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="observación" className="text-right">
              Observación
            </Label>
            <Textarea 
              id="observación" 
              placeholder="Type your message here." 
              {...register('observacion')}
            />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="distrito" className="text-right">
              Empresa
            </Label>
            <BaseCombobox className=" w-auto" classNameContent="w-full"
              items={business}
              value={selectedBusiness}
              onChange={setSelectedBusiness}
              placeholder="Empresa..."
            />
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
