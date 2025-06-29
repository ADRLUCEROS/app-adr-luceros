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
import { getBusiness } from '@/http/business-service'
import { zodResolver } from '@hookform/resolvers/zod'
import type { WarehouseSaveRequest } from '@/models/warehouse'
import { saveWarehouse } from '@/http/warehouse-service'
import { toast } from 'sonner'
import { useWarehouseStore } from '@/hooks/useWarehouseStore'
import { warehouseSaveRequestSchema } from '@/validations/warehouse-schema'

interface WarehouseSheetProps {
  onSave: () => void
  isOpen: boolean
  closeSheet: () => void
  WarehouseSelected?: Partial<WarehouseSaveRequest> | null
}

export function WarehouseSheet({ onSave, isOpen, closeSheet, WarehouseSelected }: WarehouseSheetProps) {
  const { setWarehouseSelected } = useWarehouseStore()
  const [business, setBusiness] = useState<ItemCombobox[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState<string | number>("")

  const [departments, setDepartments] = useState<Department[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState<string | number>("")
  
  const [provinces, setProvinces] = useState<Province[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string | number>("")
  
  const [districts, setDistricts] = useState<District[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string | number>("")

  const { register, handleSubmit, formState: {errors}, setValue, reset } = useForm({
    resolver: zodResolver(warehouseSaveRequestSchema),
  })

  useEffect(() => {
    if (WarehouseSelected) {
      setValue("clienteCorporativoId", (WarehouseSelected.clienteCorporativoId || '').toString())
      setValue("direccion", WarehouseSelected.direccion || '')
      setValue("id_locacion_peru", (WarehouseSelected.id_locacion_peru || '').toString())
      setValue("nombreAlmacen", WarehouseSelected.nombreAlmacen || '')
    } else {
      reset();
    }
  }, [WarehouseSelected, setValue, reset]);

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
        console.error('Error fetching business', error)
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
    const body: Partial<WarehouseSaveRequest> = {
      ...WarehouseSelected, 
      ...data,
    }

    if (typeof selectedBusiness  === 'number') {
      const idEmpresa = selectedBusiness
      body.clienteCorporativoId = idEmpresa
    }

    saveWarehouse(body).then(() => {
      closed()
      onSave()
      toast.success('Operación exitosa', {
        description: "La Warehouse se ha guardado correctamente.",
        richColors: true,
        closeButton: true,
        icon: "✅",
      })
    })
    .catch((error) => {
      console.error("Error saving store:", error)
      toast.error('Error del servidor', {
        description: "No se pudo guardar la Warehouse.",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
    })
  }

  const closed = () => {
    setWarehouseSelected(null)
    closeSheet()
  }

  return (
    <BaseSheet title={WarehouseSelected ? "Editar Warehouse" : "Registrar Warehouse"} isOpen={isOpen} closeSheet={closed}>
      <form onSubmit={handleSubmit((data) => handleStoreSubmit(data))}>
       <div className="grid gap-4 px-4">
          <div className="grid items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Nombre de Warehouse
            </Label>
            <Input 
              id="name" 
              className={` ${errors.nombreAlmacen && 'border-red-500'}`} 
              {...register('nombreAlmacen')}
            />
            {errors.nombreAlmacen && <p className='text-red-800 text-sm'>{errors.nombreAlmacen.message}</p>}
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
