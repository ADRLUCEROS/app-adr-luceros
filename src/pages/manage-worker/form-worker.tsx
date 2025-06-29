import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTruckStore } from "@/hooks/useTruckStore"
import { saveCamion } from "@/http/camion-service"
import type { TruckStatus, Truck as TruckType } from "@/models/truck"
import { truckSchema } from "@/validations/truck-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, CircleUserRound, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm, type FieldValues } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"

export function FormWorker() {
  const navigate = useNavigate();
  const { truckSelected } = useTruckStore()
  const [status, setStatus] = useState<TruckStatus>("activo")

  const { register, handleSubmit, formState: {errors}, setValue, reset } = useForm({
    resolver: zodResolver(truckSchema)
  })

  const setForm = (truck: Partial<TruckType>) => {
    setStatus(truck.estado || "activo")
    console.log(status)
    setValue("altura", (truck?.altura || '').toString())
    setValue("ancho", (truck?.ancho || '').toString())
    setValue("anoFab", (truck?.anoFab || '').toString())
    setValue("codTarjCircu", truck?.codTarjCircu || "")
    setValue("estado", truck?.estado || "activo")
    setValue("longitud", (truck?.longitud || '').toString())
    setValue("metroCubico", (truck?.metroCubico || '').toString())
    setValue("pesoBruto", (truck?.pesoBruto || '').toString())
    setValue("pesoNeto", (truck?.pesoNeto || '').toString())
    setValue("pesoUtil", (truck?.pesoUtil || '').toString())
    setValue("placa", truck?.placa || "")
  }

  const handleSubmitForm = async (data: FieldValues) => {
    const body: Partial<TruckType> = {
      ...truckSelected,
      ...data,
      altura: parseFloat(data.altura),
      ancho: parseFloat(data.ancho),
      anoFab: parseInt(data.anoFab),
      longitud: parseFloat(data.longitud),
      metroCubico: parseFloat(data.metroCubico),
      pesoBruto: parseFloat(data.pesoBruto),
      pesoNeto: parseFloat(data.pesoNeto),
      pesoUtil: parseFloat(data.pesoUtil),
    }
    try {
      saveCamion(body)
      console.log(body)
      reset()
      toast.success("Unidad guardada correctamente", {
        description: "La información de la unidad se ha guardado exitosamente",
        richColors: true,
        closeButton: true,
        icon: "✅",
      })
      navigate('/manage-truck')
    } catch (error) {
      console.error("Error saving truck:", error)
      toast.error("Error del sistema", {
        description: "No se pudo guardar la información de la unidad",
        richColors: true,
        closeButton: true,
        icon: "🚨",
      })
    }
  }

  useEffect(() => {
    setForm(truckSelected || {})
    return () => {
      reset()
    }
  }, [truckSelected])

  return (
    <div className="min-h-screen bg-accent overflow-y-auto overflow-x-hidden">
      <form className="max-w-3xl mx-auto p-4" onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
        <header className="flex justify-between items-end pb-2">
          <div className="flex items-end gap-2">
            <Link to={"/manage-worker"}>
              <Button 
                variant='outline' 
                className="py-5 px-2 hover:bg-white hover:border-blue-600 hover:text-blue-600"
              >
                <ArrowLeft className="size-6"/>
              </Button>
            </Link>
            <div className="grid">
              <span className="text-gray-600">Back to List</span>
              <h1 className="text-2xl font-semibold -mt-2">Registrar Colaborador</h1>
            </div>
          </div>
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
            Añadir Colaborador <CircleUserRound/>
          </Button>
        </header>
        <main className="grid gap-2">
          <article className="bg-white shadow-md rounded-lg px-6 py-4">
            <h2 className="text-xl font-semibold">Información del colaborador</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Nombres
                </Label>
                <Input className={` ${errors.placa && 'border-red-500'}`} {...register("placa")} />
                {errors.placa && <p className='text-red-800 text-sm'>{errors.placa.message}</p>}
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Apellidos
                </Label>
                <Input className={` ${errors.codTarjCircu && 'border-red-500'}`} {...register("codTarjCircu")} />
                {errors.codTarjCircu && <p className='text-red-800 text-sm'>{errors.codTarjCircu.message}</p>}
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Cargo
                </Label>
                <Select value={status} onValueChange={(value) => setStatus(value as TruckStatus)}>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baja">baja</SelectItem>
                    <SelectItem value="mantenimiento">mantenimiento</SelectItem>
                    <SelectItem value="activo">activo</SelectItem>
                  </SelectContent>
                </Select>
                {/* {errors.placa && <p className='text-red-800 text-sm'>{errors.placa.message}</p>} */}
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Fecha de nacimiento
                </Label>
                <Input type="date"/>
                {/* {errors.codTarjCircu && <p className='text-red-800 text-sm'>{errors.codTarjCircu.message}</p>} */}
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  N° de WhatsApp
                </Label>
                <Input type="number" className={` ${errors.anoFab && 'border-red-500'}`} {...register("anoFab")} />
                {errors.anoFab && <p className='text-red-800 text-sm'>{errors.anoFab.message}</p>}
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  N° de contacto
                </Label>
                <Input type="number" />
                {/* {errors.anoFab && <p className='text-red-800 text-sm'>{errors.anoFab.message}</p>} */}
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Correo
                </Label>
                <Input type="email" />
                {/* {errors.anoFab && <p className='text-red-800 text-sm'>{errors.anoFab.message}</p>} */}
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Sexo
                </Label>
                <Select value={status} onValueChange={(value) => setStatus(value as TruckStatus)}>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baja">baja</SelectItem>
                    <SelectItem value="mantenimiento">mantenimiento</SelectItem>
                    <SelectItem value="activo">activo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Dirección
                </Label>
                <Input type="email" />
                {/* {errors.anoFab && <p className='text-red-800 text-sm'>{errors.anoFab.message}</p>} */}
              </div>
            </div>
          </article>

          <article className="bg-white shadow-md rounded-lg px-6 py-4">
            <h2 className="text-xl font-semibold">Información del DNI</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Tipo de documento
                </Label>
                <Input type="text" className="col-span-3" />
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  N° de documento
                </Label>
                <Input type="text" className="col-span-3" />
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Adjuntar Documento
                </Label>
                <Input type="file" className="col-span-3" />
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Fecha de Vencimiento
                </Label>
                <Input type="date" className="col-span-3" />
              </div>
            </div>
          </article>

          <article className="bg-white shadow-md rounded-lg px-6 py-4">
            <h2 className="text-xl font-semibold">Licencia de Conducir</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Adjuntar Documento
                </Label>
                <Input type="file" className="col-span-3" />
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Fecha de Vencimiento
                </Label>
                <Input type="date" className="col-span-3" />
              </div>
            </div>
          </article>

          <article className="bg-white shadow-md rounded-lg px-6 py-4">
            <h2 className="text-xl font-semibold">Certificados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Adjuntar Documento
                </Label>
                <Input type="file" className="col-span-3" />
              </div>
              <div className="grid items-center gap-2">
                <Label className="text-right">
                  Fecha de Vencimiento
                </Label>
                <Input type="date" className="col-span-3" />
              </div>
            </div>
            <Button className="mt-2 w-full" variant="outline">
              <Plus className="size-5"/>
            </Button>
          </article>
        </main>
      </form>
    </div>
  )
}
