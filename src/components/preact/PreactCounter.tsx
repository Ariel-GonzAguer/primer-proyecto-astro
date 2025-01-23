import { useState, useEffect } from "preact/hooks";
import { zustandStore } from "../../zustand/useStore";

export default function Counter() {
  const [count, setCount] = useState(zustandStore.getState().countInStore);

  // para mantener actualizado el estado local con el estado de zustand
  useEffect(() => {
    // zustandStore.subscribe() crea un "listener" para el cambio de estado
    const unsubscribe = zustandStore.subscribe(
      // Cada vez que la store cambia, ejecuta la función que actualiza el estado local con setCount
      state => setCount(state.countInStore)
    );
    return () => unsubscribe();
    // El arreglo vacío indica que este efecto solo se ejecuta una vez cuando el componente se monta, y se limpia cuando se desmonta, evitando así múltiples suscripciones innecesarias.
  }, []);

  const handleIncrement = () => {
    zustandStore.setState((state) => ({ countInStore: state.countInStore + 1 }));
  };

  const handleDecrement = () => {
    zustandStore.setState((state) => ({ countInStore: state.countInStore - 1 }));
  };

  return (
    <div>
      <h2>Preact Counter</h2>
      <p>You clicked {count} times</p>
      <button onClick={handleIncrement}>Click me to +1</button>
      <button onClick={handleDecrement}>Click me to -1</button>
    </div>
  );
}
