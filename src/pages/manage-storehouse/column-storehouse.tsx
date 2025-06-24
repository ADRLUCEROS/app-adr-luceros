import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreVertical } from "lucide-react"

import type { Storehouse } from "@/models/storehouse"
import { Badge } from "@/components/ui/badge"

export const columnsStorehouse = (onOpenModal: (id: string) => void, set: (model: Partial<Storehouse>) => void): ColumnDef<Storehouse>[] => [
  {
    id: "#",
    header: () => (
      <div></div>
    ),
    cell: ({ row }) => (
      <span>{ row.index + 1 }</span>
    ),
  },
  {
    accessorKey: "nombreAlmacen",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("nombreAlmacen")}</div>,
  },
  {
    accessorKey: "nombreCliente",
    accessorFn: row => `${row.clienteCorporativo.nombre}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">
      <Badge className="text-sky-800 bg-sky-100">{row.getValue("nombreCliente")}</Badge>
    </div>,
  },
  {
    accessorKey: "ubicación",
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
    cell: () => <div>Lima</div>,
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("direccion")}</div>,
  },
  {
    accessorKey: "snActivo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const estado: string = row.getValue("snActivo")
      const objectState = (value: string) => {
        const normalizado = value.toUpperCase()
        switch (normalizado) {
          case "S":
            return { className: "text-green-800 bg-green-100", nombre: "Activo" }
          case "N":
            return { className: "text-red-800 bg-red-100", nombre: "Inactivo" }
          default:
            return { className: "text-gray-800 bg-gray-100", nombre: "Desconocido" }
        }
      }
      const { className, nombre } = objectState(estado)
      return <div className={`lowercase`}><Badge className={className}>{nombre}</Badge></div>
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
                onOpenModal("storehouse-sheet")
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
                onOpenModal("storehouse-dialog")
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