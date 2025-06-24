import type { Worker } from "@/models/worker"
import { create } from "zustand"

type WorkerState = {
  workerSelected: Partial<Worker> | null
  setWorkerSelected: (truck: Partial<Worker> | null) => void
}

export const useWorkerStore = create<WorkerState>((set) => ({
  workerSelected: {},
  setWorkerSelected: (model) => set({ workerSelected: model }),
}))
