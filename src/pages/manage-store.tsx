import { DataTable } from "@/components/BaseDataTable"
import { Button } from "@/components/ui/button"
import type { Tienda } from "@/models/store"
import { useEffect, useMemo, useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, Edit2, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TiendaSheet } from "@/components/TiendaSheet"
import { AlertDialogDemo } from "@/components/alert"
import { useModalStore } from "@/hooks/useModalStore"
import { getTiendas } from "@/http/tienda-service"
import { normalize } from '@/utils/normalizeText'

const columns = (onOpenModal: (id: string) => void): ColumnDef<Tienda>[] => [
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
          Nombre
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("nombreTienda")}</div>,
  },
  {
    accessorKey: "horario",
    accessorFn: row => {
      const formatTime = (time: string) => {
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
      }
      return `${formatTime(row.horarioInicio)} - ${formatTime(row.horarioFin)}`
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Horario
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("horario")}</div>,
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
      const empresa: any[] = row.getValue("empresa")
      if(empresa.length === 0) return <div className="lowercase">N/A</div>
      return <div className="lowercase">{empresa[0].razonSocial}</div>
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("observacion")}</div>,
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


export const ManageStore = () => {
  const [stores, setStores] = useState<Tienda[]>([])
  const [storesFilter, setStoresFilter] = useState<Tienda[]>([])
  const { openModalId, openModal, closeModal } = useModalStore()
  
  const filteredStores = (value: string) => {
    const filtered = stores.filter(store =>
      normalize(store.nombreTienda).includes(normalize(value)) ||
      normalize(store.codigoTienda).includes(normalize(value)) ||
      normalize(store.observacion ?? '').includes(normalize(value)) ||
      normalize(store.direccion).includes(normalize(value))
    )
    setStoresFilter(filtered)
  }

  const cols = useMemo(() => columns(openModal), [openModal])

  useEffect(() => {
    const fetchStores = async () => {
      const { data } = await getTiendas()
      setStores(data)
      setStoresFilter(data)
    }

    fetchStores()
  }, [])

  return (
    <div className="mx-4 my-2">
        <div className="mb-4 flex items-center justify-between">
          <Input
            placeholder="Buscar..."
            className="max-w-sm"
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              filteredStores(value)
            }}
          />
          <Button onClick={() => openModal("sheet1")}>Agregar tienda</Button>
        </div>
        <DataTable columns={cols} data={storesFilter} />
        <TiendaSheet onSave={() => {}} isOpen={openModalId === "sheet1"} closeSheet={closeModal} />
        <AlertDialogDemo
          title="¿Estas seguro que quieres eliminar esta tienda?"
          isOpen={openModalId === "dialog1"}
          closeDialog={closeModal}
          action={() => {
            console.log("Delete action triggered")
            closeModal()
          }}
        />
    </div>
  )
}
