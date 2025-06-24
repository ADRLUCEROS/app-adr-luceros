import type { Storehouse } from "@/models/storehouse"
import { create } from "zustand"

type StorehouseState = {
  storehouseSelected: Partial<Storehouse> | null
  setStorehouseSelected: (truck: Partial<Storehouse> | null) => void
}

export const useStorehouseStore = create<StorehouseState>((set) => ({
  storehouseSelected: {},
  setStorehouseSelected: (model) => set({ storehouseSelected: model }),
}))
