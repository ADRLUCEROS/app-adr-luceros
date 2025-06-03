import type { Truck } from "@/models/truck"
import { create } from "zustand"

type TruckState = {
  truckSelected: Partial<Truck> | null
  setTruckSelected: (truck: Partial<Truck> | null) => void
}

export const useTruckStore = create<TruckState>((set) => ({
  truckSelected: {},
  setTruckSelected: (truck) => set({ truckSelected: truck }),
}))
