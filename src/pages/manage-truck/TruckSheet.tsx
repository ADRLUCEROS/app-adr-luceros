import {
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BaseSheet } from "@/components//BaseSheet"

interface TruckSheetProps {
  onSave: () => void
  isOpen: boolean
  closeSheet: () => void
}

export function TruckSheet({ onSave, isOpen, closeSheet }: TruckSheetProps) {

  return (
    <BaseSheet title="Registrar Camión" isOpen={isOpen} closeSheet={closeSheet}>
      <>
       <div className="grid gap-4 py-4 px-4">
          <div className="grid items-center gap-2">
            <Label htmlFor="placa" className="text-right">
              Placa
            </Label>
            <Input id="placa" className="col-span-3" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="tarjeta" className="text-right">
              Tarjeta de circulación
            </Label>
            <Input id="tarjeta" className="col-span-3" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="añoFabricacion" className="text-right">
              Año de fabricación
            </Label>
            <Input id="añoFabricacion" className="col-span-3" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="longitud" className="text-right">
              Dimensiones
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center gap-1 ">
                <Input id="longitud" name="longitud" type="number" />
                <span>Long.</span>
              </div>
              <div className="flex items-center gap-1 ">
                <Input id="altura" name="altura" type="number" />
                <span>Alt.</span>
              </div>
              <div className="flex items-center gap-1 ">
                <Input id="ancho" name="ancho" type="number" />
                <span>Ancho</span>
              </div>
            </div>
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="peso" className="text-right">
              Peso útil
            </Label>
            <Input id="peso" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => {}}
            >
              Cancelar
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              type="button"
              onClick={() => {
                onSave()
              }}
            >
              Guardar
            </Button>
          </SheetClose>
        </SheetFooter>
      </>
    </BaseSheet>
  )
}
