import { Button } from "@/components/ui/button"
import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, MoreVertical } from "lucide-react"
import type { Truck } from "@/models/truck"
import { Badge } from "@/components/ui/badge"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router"

export const columnsTruck = (onOpenModal: (id: string) => void, set: (tienda: Partial<Truck>) => void): ColumnDef<Truck>[] => [
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
    accessorKey: "placa",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Placa
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("placa")}</div>,
  },
  {
    accessorKey: "codTarjCircu",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tarjeta de circulación
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("codTarjCircu")}</div>,
  },
  {
    accessorKey: "anoFab",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Año de fabricación
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("anoFab")}</div>,
  },
  {
    accessorKey: "dimensiones",
    accessorFn: row =>  `${row.altura}m(alt) x ${row.longitud}m(lon) x ${row.ancho}m(ancho)`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dimensiones
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("dimensiones")}</div>,
  },
  {
    accessorKey: "pesoUtil",
    accessorFn: row =>  `${row.pesoUtil / 100} T`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Peso útil
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("pesoUtil")}</div>,
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
      const classByState = (value: string) => {
        switch (value) {
          case "activo":
            return "text-green-800 bg-green-100"
          case "baja":
            return "text-red-800 bg-red-100"
          case "mantenimiento":
            return "text-yellow-800 bg-yellow-100"
          default:
            return "text-gray-800 bg-gray-100"
        }
      }
      return <div className={`lowercase`}><Badge className={classByState(estado)}>{estado}</Badge></div>
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
            <Link to='/form-truck'>
              <DropdownMenuItem
                onClick={() => {
                  set(row.original)
                }}
              >
                Editar
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                set(row.original)
                onOpenModal("camion-estado-dialog")
              }}
            >
              Cambiar estado
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]