import { zustandStore } from "../../zustand/useStore";


export default function Counter() {

  const { countInStore, increment, decrement } = zustandStore();

  return (
    <div>
      <h2>React Counter</h2>
      <p>You clicked {countInStore} times</p>
      <button onClick={increment}>Click me to +1</button>
      <button onClick={decrement}>Click me to -1</button>
    </div>
  );
}