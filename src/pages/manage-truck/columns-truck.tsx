import { Button } from "@/components/ui/button"
import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, Edit2, Trash2 } from "lucide-react"
import type { Truck } from "@/models/truck"
import { Badge } from "@/components/ui/badge"

export const columnsTruck = (onOpenModal: (id: string) => void): ColumnDef<Truck>[] => [
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
    accessorKey: "añoFab",
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
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("añoFab")}</div>,
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
      return <div className={`lowercase text-center`}><Badge className={classByState(estado)}>{estado}</Badge></div>
    },
  },
  {
    accessorKey: "_",
    header: () => {
      return (
        <div>Acción</div>
      )
    },
    cell: ({ row }) => <div className="flex gap-1">
      <Button
        variant="outline"
        onClick={() => {
          onOpenModal("sheet1")
        }}
      >
        <Edit2/>
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          onOpenModal("dialog1")
          console.log("Delete", row.original)
        }}
      >
        <Trash2/>
      </Button>
    </div>,
  },
]