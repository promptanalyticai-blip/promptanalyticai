// app/dashboard/favoritos/components/FavoriteList.tsx
"use client";

import { FavoriteItem } from "./FavoriteItem";

export function FavoriteList() {
  const mockFavorites = [
    {
      title: "Reporte mensual",
      description: "Acceso rápido al análisis mensual",
      favorite: true,
    },
    {
      title: "Automatización semanal",
      description: "Flujo automático de métricas",
      favorite: true,
    },
    {
      title: "Archivo Clientes.csv",
      description: "Documento analizado recientemente",
      favorite: false,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {mockFavorites.map((fav, index) => (
        <FavoriteItem
          key={index}
          title={fav.title}
          description={fav.description}
          favorite={fav.favorite}
        />
      ))}
    </div>
  );
}
