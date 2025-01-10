import { useState, useEffect } from "preact/hooks";

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  useEffect(() => {
    count === 6 ? alert(666) : null;
  })

  return (
    <div>
      <h2>Preact Counter</h2>

      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me to +1</button>
      <button onClick={() => setCount(count - 1)}>Click me to -1</button>
    </div>
  );
}