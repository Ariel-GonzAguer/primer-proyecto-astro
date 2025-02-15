import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";


type Store = {
  countInStore: number
  color: string
  increment: () => void
  decrement: () => void
}

export const zustandStore = create<Store>()(
  immer(
    persist(
      (set) => ({
        countInStore: 0,
        color: 'red',
        increment: () => set((state) => ({ countInStore: state.countInStore + 1 })),
        decrement: () => set((state) => ({ countInStore: state.countInStore - 1 })),
      }),
      {
        name: 'zustand-store', // nombre de la clave en el almacenamiento persistente
      }
    )
  )
);

