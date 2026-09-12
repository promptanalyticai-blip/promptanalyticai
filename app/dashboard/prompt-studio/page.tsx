// app/dashboard/prompt-studio/page.tsx
"use client";

import { Header } from "../components/Header";
import { PromptEditor } from "./components/PromptEditor";
import { PromptOutput } from "./components/PromptOutput";
import { useState } from "react";

export default function PromptStudioPage() {
  const [output, setOutput] = useState<string>("");

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Prompt Studio"
        subtitle="Crea, prueba y perfecciona tus prompts"
      />

      <PromptEditor onRun={setOutput} />

      {output && <PromptOutput text={output} />}
    </div>
  );
}
