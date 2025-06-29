import type { Business } from "@/models/business"
import { create } from "zustand"

type BusinessState = {
  businessSelected: Partial<Business> | null
  setBusinessSelected: (truck: Partial<Business> | null) => void
}

export const useBusinessStore = create<BusinessState>((set) => ({
  businessSelected: {},
  setBusinessSelected: (model) => set({ businessSelected: model }),
}))
