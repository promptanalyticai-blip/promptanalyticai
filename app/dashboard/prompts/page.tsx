"use client";

import Reactions from "../components/Reactions";

export default function PromptsPage() {
  return (
    <div className="p-6 fade-in">
      <h1 className="text-3xl font-bold mb-4">Prompts</h1>

      <Reactions reactions={["🔥", "💡", "👍"]} />
    </div>
  );
}
