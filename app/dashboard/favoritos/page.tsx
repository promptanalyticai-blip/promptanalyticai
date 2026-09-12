// app/dashboard/favoritos/page.tsx
"use client";

import { Header } from "../components/Header";
import { FavoriteList } from "./components/FavoriteList";

export default function FavoritosPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Favoritos"
        subtitle="Accesos rápidos a tus elementos más importantes"
      />

      <FavoriteList />
    </div>
  );
}
