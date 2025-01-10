import { useState } from "preact/hooks";


// En TypeScript, cuando defines las props de un componente, necesitas especificar el tipo de las props de manera explícita. La sintaxis ({ messages }: { messages: string[] }) desestructura las props y al mismo tiempo define el tipo de messages como un arreglo de strings (string[]).

// La razón por la que no puedes escribir simplemente ({ messages: string[] }) es porque TypeScript necesita saber que messages es una propiedad del objeto de props y cuál es su tipo. La sintaxis correcta para hacer esto es proporcionar un objeto de tipo que describa la estructura de las props. En este caso, el objeto de tipo es { messages: string[] }.

interface GreetingProps {
  messages: string[];
}

export default function Greeting({ messages }: GreetingProps) {
  const randomMessage = (): string =>
    messages[Math.floor(Math.random() * messages.length)];

  const [greeting, setGreeting] = useState<string>(messages[0]);

  return (
    <div>
      <h3>{greeting}! Thank you for visiting!</h3>
      <button onClick={() => setGreeting(randomMessage())}>New Greeting</button>
    </div>
  );
}
