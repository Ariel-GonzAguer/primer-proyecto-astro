import { useState, useEffect } from "react";

export default function Counter() {
  const [countR, setCountR] = useState<number>(0);

  useEffect(() => {
    document.title = `React ${countR}`;
  }, [countR]);

  return (
    <div>
      <h2>React Counter</h2>
      <p>You clicked {countR} times</p>
      <button onClick={() => setCountR(countR + 1)}>Click me to +1</button>
      <button onClick={() => setCountR(countR - 1)}>Click me to -1</button>
    </div>
  );
}