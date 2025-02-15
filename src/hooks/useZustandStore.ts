import { zustandStore } from "../zustand/useStore";

export const useZustandStore = () => {
  const { countInStore, increment, decrement } = zustandStore.getState();
  return { countInStore, increment, decrement };
};