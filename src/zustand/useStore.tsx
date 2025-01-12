import { create } from 'zustand'


type Store = {
  countInStore: number
  increment: () => void
  decrement: () => void
}

export const useStore = create<Store>((set) => ({
  countInStore: 0,
  increment: () => set((state) => ({ countInStore: state.countInStore + 1 })),
  decrement: () => set((state) => ({ countInStore: state.countInStore - 1 })),
}))

