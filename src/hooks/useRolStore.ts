import type { Rol } from "@/models/rol"
import { create } from "zustand"

type RolState = {
  rolSelected: Partial<Rol> | null
  setRolSelected: (truck: Partial<Rol> | null) => void
}

export const useRolStore = create<RolState>((set) => ({
  rolSelected: {},
  setRolSelected: (model) => set({ rolSelected: model }),
}))
