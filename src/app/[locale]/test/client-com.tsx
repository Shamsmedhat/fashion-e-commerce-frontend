"use client";

import { useState } from "react";

export default function ClientCom() {
  const [step, setStep] = useState(0);
  return (
    <div>
      <p>{step}</p>
      <button onClick={() => setStep((prev) => prev + 1)}>Add new step</button>
    </div>
  );
}
