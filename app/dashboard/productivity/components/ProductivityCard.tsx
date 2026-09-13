"use client";

import { useState, useEffect } from "react";

export default function ProductivityCard() {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/productivity-score?workspaceId=default")
      .then((res) => res.json())
      .then((data) => setScore(data.score));
  }, []);

  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Your Productivity Score</h2>
      <p className="text-3xl font-bold">{score ?? "Loading..."}</p>
    </div>
  );
}
