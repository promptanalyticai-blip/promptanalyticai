// app/dashboard/search/page.tsx
"use client";

import { Header } from "../components/Header";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Buscar"
        subtitle="Encuentra archivos, análisis, automatizaciones y más"
      />

      <SearchBar query={query} setQuery={setQuery} />
      <SearchResults query={query} />
    </div>
  );
}
