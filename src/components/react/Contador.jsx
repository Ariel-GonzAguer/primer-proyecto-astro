import React from "react";
import { zustandStore } from "../../zustand/useStore";

export default function Contador() {
  const { countInStore } = zustandStore();

  return <span>{countInStore}</span>;
}
