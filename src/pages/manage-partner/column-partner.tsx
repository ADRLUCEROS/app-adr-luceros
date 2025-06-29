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

import type { Partner } from "@/models/partner"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export const columnsPartner = (onOpenModal: (id: string) => void, set: (model: Partial<Partner>) => void): ColumnDef<Partner>[] => [
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
    accessorKey: "nombre",
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
    cell: ({ row }) => <div className="capitalize">{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "razonSocial",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Razón Social
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("razonSocial")}</div>,
  },
  {
    accessorKey: "direccionFiscal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dirección Fiscal
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("direccionFiscal")}</div>,
  },
  {
    accessorKey: "estado",
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
      const estado: string = row.getValue("estado")
      const objectState = (value: string) => {
        if(!value) return { className: "text-gray-800 bg-gray-100", nombre: "Desconocido" }
        const normalizado = value.toUpperCase()
        switch (normalizado) {
          case "S":
            return { className: "text-green-800 bg-green-100", nombre: "Activo" }
          case "N":
            return { className: "text-red-800 bg-red-100", nombre: "Inactivo" }
          case "M":
            return { className: "text-yellow-800 bg-yellow-100", nombre: "Mantenimiento" }
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
                onOpenModal("partner-sheet-form")
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
                onOpenModal("partner-dialog-delete")
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