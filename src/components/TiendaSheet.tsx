import {
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BaseSheet } from "./BaseSheet"

interface TiendaSheetProps {
  onSave: () => void
  isOpen: boolean
  closeSheet: () => void
}

export function TiendaSheet({ onSave, isOpen, closeSheet }: TiendaSheetProps) {

  return (
    <BaseSheet title="Registrar tienda" isOpen={isOpen} closeSheet={closeSheet}>
      <>
       <div className="grid gap-4 py-4 px-4">
          <div className="grid items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Nombre de tienda
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="codigo_tienda" className="text-right">
              Código de Tienda
            </Label>
            <Input id="codigo_tienda" className="col-span-3" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="PsEx" className="text-right">
              PsEx
            </Label>
            <Input id="PsEx" className="col-span-3" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="departamento" className="text-right">
              Departamento
            </Label>
            <Input id="departamento" className="col-span-3" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="distrito" className="text-right">
              Distrito
            </Label>
            <Input id="distrito" className="col-span-3" />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="direccion" className="text-right">
              Dirección
            </Label>
            <Input id="direccion" className="col-span-3" />
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
