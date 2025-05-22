import { DataTable } from "@/components/dataTable"
import { Button } from "@/components/ui/button"
import type { Tienda } from "@/models/store"
import { useEffect, useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, Edit2, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ReusableSheet } from "@/components/ReusableSheet"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AlertDialogDemo } from "@/components/alert"

async function getData(): Promise<Tienda[]> {
  return [
  {
    "id": 1,
    "nombre": "ABASTECEDORA ALIMENTICIA SAC",
    "codigo_tienda": 161566,
    "codigo_entrada": "P100",
    "departamento": "Lima",
    "distrito": "Lima Cercado",
    "direccion": "Jr. Huanuco 925 - Cercado de Lima",
    "observacion": "",
    "hora_inicio": "9:00 a.m.",
    "hora_fin": "11:00 a.m."
  },
  {
    "id": 2,
    "nombre": "H010 - METRO COLONIAL",
    "codigo_tienda": 161566,
    "codigo_entrada": "P101",
    "departamento": "Lima",
    "distrito": "Lima Cercado",
    "direccion": "Jr. Huanuco 925 - Cercado de Lima",
    "observacion": "",
    "hora_inicio": "9:00 a.m.",
    "hora_fin": "11:00 a.m."
  },
  {
    "id": 3,
    "nombre": "REPRESENTACIONES JHOSEP SAC-MAYNAS",
    "codigo_tienda": 161566,
    "codigo_entrada": "P102",
    "departamento": "Lima",
    "distrito": "Lima Cercado",
    "direccion": "Jr. Huanuco 925 - Cercado de Lima",
    "observacion": "",
    "hora_inicio": "9:00 a.m.",
    "hora_fin": "11:00 a.m."
  }
  ]
}

export const columns: ColumnDef<Tienda>[] = [
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "codigo_tienda",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("codigo_tienda")}</div>,
  },
  {
    accessorKey: "codigo_entrada",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PsEx
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("codigo_entrada")}</div>,
  },
  // {
  //   accessorKey: "departamento",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Departamento
  //         <ArrowUpDown />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => <div className="lowercase">{row.getValue("departamento")}</div>,
  // },
  {
    accessorKey: "distrito",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Distrito
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("distrito")}</div>,
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
    accessorKey: "_",
    header: () => {
      return (
        <div>Acción</div>
      )
    },
    cell: ({ row }) => <div className="flex gap-1">
      <SheetTrigger>
      <Button
        variant="outline"
        onClick={() => {
          console.log("Edit", row.original)
        }}
      >
        <Edit2/>
      </Button>
      </SheetTrigger>
      <AlertDialogTrigger>
      <Button
        variant="destructive"
        onClick={() => {
          console.log("Delete", row.original)
        }}
      >
        <Trash2/>
      </Button>
      </AlertDialogTrigger>
    </div>,
  },
]


export const ManageStore = () => {
  const [stores, setStores] = useState<Tienda[]>([])
  
  useEffect(() => {
    const fetchStores = async () => {
      const response = await getData()
      setStores(response)
    }

    fetchStores()
  }, [])

  return (
    <div className="mx-4 my-2">
      <AlertDialog>
      <Sheet>
      <div className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Buscar..."
          className="max-w-sm"
        />
        <SheetTrigger>
          <Button>Agregar camión</Button>
        </SheetTrigger>
      </div>
      <DataTable columns={columns} data={stores} />
      <ReusableSheet title="Registrar tienda" description="" onSave={() => {}}/>
      <AlertDialogDemo/>
      </Sheet>
      </AlertDialog>
    </div>
  )
}
