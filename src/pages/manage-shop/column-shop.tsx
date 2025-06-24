import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Clock, MoreVertical } from "lucide-react"

import type { Company } from "@/models/company"
import type { TiendaList } from "@/models/shop"

export const columnsStore = (onOpenModal: (id: string) => void, set: (tienda: Partial<TiendaList>) => void): ColumnDef<TiendaList>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nombreTienda",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre de Tienda
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("nombreTienda")}</div>,
  },
  {
    accessorKey: "ubicacion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ubicación
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("ubicacion")}</div>,
  },
  {
    accessorKey: "direccion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dirección
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase truncate max-w-[150px]">{row.getValue("direccion")}</div>,
  },
  {
    accessorKey: "horario",
    accessorFn: row => {
      const formatTime = (time: string) => {
        if (!time) return "N/A";
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
      }
      return `${formatTime(row.horarioInicio)} - ${formatTime(row.horarioFin)}`;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Horario de Atención
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const horario: string = row.getValue("horario");
      const [horarioInicio, horarioFin] = horario.split(" - ");
      const [horaInicio] = horarioInicio.split(":").map(Number);
      const [horaFin] = horarioFin.split(":").map(Number);

      const classByHours = (inicio: number, fin: number) => {
        if (inicio <= 10 && fin <= 10) {
          return "bg-red-50 text-red-800 border-red-500";
        } 
        if (inicio >= 10 && fin <= 12) {
          return "bg-amber-50 text-amber-800 border-amber-500";
        }
        return "bg-emerald-50 text-emerald-800 border-emerald-500";
      }

      const getClass = classByHours(horaInicio, horaFin)

      return (
        <div className="lowercase">
          <Badge className={`text-xs ${getClass}`}>
            <Clock/>{horarioInicio}
          </Badge>
          <span className="px-1 text-gray-500 text-xl">-</span>
          <Badge className={`text-xs ${getClass}`}>
            <Clock/>{horarioFin}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "observacion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Observación
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase truncate max-w-[150px]">{row.getValue("observacion")}</div>,
  },
  {
    accessorKey: "empresa",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Empresa
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const empresa: Company = row.getValue("empresa")
      if(!empresa) return <div className="lowercase"><Badge className="bg-orange-50 text-orange-800">N/A</Badge></div>
      return <div className="lowercase"><Badge className="bg-sky-50 text-sky-800">{empresa.razonSocial}</Badge></div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem disabled>
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onOpenModal("sheet1")
                set(row.original)
              }}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            variant="destructive"
              onClick={() => {
                set(row.original)
                onOpenModal("dialog1")
              }}
            >
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]