import { Button } from "@/components/ui/button"
import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, MoreVertical } from "lucide-react"
import type { Worker } from "@/models/worker"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router"

export const columnsWorker = (onOpenModal: (id: string) => void, set: (model: Partial<Worker>) => void): ColumnDef<Worker>[] => [
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
    accessorKey: "nombre_completo",
    accessorFn: row =>  `${row.nombres} ${row.apellidos}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre Completo
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("nombre_completo")}</div>,
  },
  {
    accessorKey: "correo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Correo
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("correo")}</div>,
  },
  {
    accessorKey: "tipoDoc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo Doc
          <ArrowUpDown />
        </Button>
      )
    },
    cell: () => <div className="uppercase">DNI</div>,
  },
  {
    accessorKey: "numDoc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          N° Documento
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("numDoc")}</div>,
  },
  {
    accessorKey: "cargo_trabajo",
    accessorFn: row =>  `${row.cargos.nombre_cargo}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cargo
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("cargo_trabajo")}</div>,
  },
  {
    accessorKey: "fechaNac",
    accessorFn: row =>  {
      const [year, month, day] = row.fechaNac.split("-")
      const monthString = (month: number) => {
        switch (month) {
          case 1: return "Ene";
          case 2: return "Feb";
          case 3: return "Mar";
          case 4: return "Abr";
          case 5: return "May";
          case 6: return "Jun";
          case 7: return "Jul";
          case 8: return "Ago";
          case 9: return "Sep";
          case 10: return "Oct";
          case 11: return "Nov";
          case 12: return "Dic";
        }
      }
      return `${day} ${monthString(parseInt(month))}. ${year}`
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha Nac
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("fechaNac")}</div>,
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
            <Link to={'./form'}>
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
                onOpenModal("colaborador-rol-dialog")
              }}
            >
              Cambiar rol
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]