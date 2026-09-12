// app/dashboard/search/components/SearchBar.tsx
"use client";

type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
};

export function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
        className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-4 py-2"
      />
    </div>
  );
}
