import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

type DataTableProps<T> = {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading?: boolean
  pagination?: boolean
  initialState?: Partial<{
    sorting: SortingState
    columnFilters: ColumnFiltersState
    columnVisibility: VisibilityState
    rowSelection: RowSelectionState
  }>
  children?: React.ReactNode
}

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  pagination = false,
  initialState = {},
  children,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>(
    initialState.sorting ?? []
  )
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initialState.columnFilters ?? []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    initialState.columnVisibility ?? {}
  )
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState.rowSelection ?? {}
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
  })

  return (
    <div className="w-full">
      <div className="rounded-md border bg-white shadow-sm">
        { children }
        <Table className="table-auto">
          <TableHeader className="bg-slate-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {
              isLoading ? (
                [...Array(5)].map((_, i) => 
                <TableRow key={`loading-row-${i}`}>
                {
                  [...Array(columns.length)].map((_, j) => (
                    <TableCell key={`loading-cell-${i}-${j}`}>
                      <Skeleton className="h-4 min-w-2 w-full mb-2" />
                    </TableCell>
                  ))
                }
                </TableRow>)
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={`row-${row.id}`}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={`cell-${cell.id}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
