import type { WarehouseSaveRequest } from "@/models/warehouse"
import { create } from "zustand"

type WarehouseState = {
  warehouseSelected: Partial<WarehouseSaveRequest> | null
  setWarehouseSelected: (model: Partial<WarehouseSaveRequest> | null) => void
}

export const useWarehouseStore = create<WarehouseState>((set) => ({
  warehouseSelected: {},
  setWarehouseSelected: (model) => set({ warehouseSelected: model }),
}))
