import type { Partner } from "@/models/partner"
import { create } from "zustand"

type PartnerState = {
  partnerSelected: Partial<Partner> | null
  setPartnerSelected: (truck: Partial<Partner> | null) => void
}

export const usePartnerStore = create<PartnerState>((set) => ({
  partnerSelected: {},
  setPartnerSelected: (model) => set({ partnerSelected: model }),
}))
