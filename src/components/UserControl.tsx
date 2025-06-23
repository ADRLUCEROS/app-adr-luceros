import * as React from "react"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "./ui/avatar"

export function UserControl() {
  const [open, setOpen] = React.useState(false)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
      <div className="flex w-full flex-row items-center gap-2 justify-between px-2 py-1 border rounded-md hover:bg-slate-100 cursor-pointer">
        <div className="text-sm leading-none font-medium flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://images.steamusercontent.com/ugc/851600242208157774/7FBB64059B18F161EFADFF3C0B41F906F3D4AE2B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" />
          </Avatar>
          <p className="flex flex-col text-left">
            <span className="truncate">Moises Tapia</span>
            <span className="truncate text-xs text-blue-300">Administrador</span>
          </p>
        </div>
          <ChevronDown />
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Cerrar sesión
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
