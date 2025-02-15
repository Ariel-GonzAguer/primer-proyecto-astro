import { zustandStore } from "../zustand/useStore";

export function getZustandData() {
  const { color, countInStore } = zustandStore.getState();
  let num = `${countInStore+1}px`;
  return { color, num, countInStore };
}

// para poder usar data de la store de zustand en un componente puro astro DE MANERA ESTÁTICA, es decir NO SE VA ACTULIZANDO, NO SE HIDRATA, se debe crear un script dónde se extraigan los datos de la store y se exporten. Luego se importa en el componente astro y se usa como cualquier otro script:
// import { getZustandData } from "../scripts/getZustandData";
// const { color } = getZustandData();
