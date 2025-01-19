import { useState } from "preact/hooks";


export default function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h2>Preact Counter</h2>

      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me to +1</button>
      <button onClick={() => setCount(count - 1)}>Click me to -1</button>
    </div>
  );
}