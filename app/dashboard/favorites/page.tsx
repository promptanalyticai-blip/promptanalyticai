// app/dashboard/favorites/page.tsx
"use client";

import { Header } from "../components/Header";
import { FavoriteList } from "./components/FavoriteList";

export default function FavoritesPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Favorites"
        subtitle="Quick access to your most important items"
      />

      <FavoriteList />
    </div>
  );
}
