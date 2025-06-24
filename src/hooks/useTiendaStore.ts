import type { TiendaList } from "@/models/shop"
import { create } from "zustand"

type TiendaState = {
  tiendaSeleccionada: Partial<TiendaList> | null
  setTienda: (tienda: Partial<TiendaList> | null) => void
}

export const useTiendaStore = create<TiendaState>((set) => ({
  tiendaSeleccionada: {},
  setTienda: (tienda) => set({ tiendaSeleccionada: tienda }),
}))
