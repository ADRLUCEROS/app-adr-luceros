import { create } from "zustand"

type ModalState = {
  openModalId: string | null
  openModal: (id: string) => void
  closeModal: () => void
  toggleModal: (id: string) => void
}

export const useModalStore = create<ModalState>((set) => ({
  openModalId: null,
  openModal: (id) => set({ openModalId: id }),
  closeModal: () => set({ openModalId: null }),
  toggleModal: (id) =>
    set((state) => ({
      openModalId: state.openModalId === id ? null : id,
    })),
}))
