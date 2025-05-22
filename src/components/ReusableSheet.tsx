import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ReusableSheetProps {
  title: string
  description: string
  onSave: () => void
}

export function ReusableSheet({ title, description, onSave }: ReusableSheetProps) {

  return (
      <SheetContent>
        <SheetHeader>
          <SheetTitle><span className="text-2xl">{title}</span></SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
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
              onClick={() => {
                onSave()
                close()
              }}
            >
              Cancelar
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              type="button"
              onClick={() => {
                onSave()
                close()
              }}
            >
              Guardar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
  )
}
