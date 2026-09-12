// app/dashboard/favorites/components/FavoriteList.tsx
"use client";

import { FavoriteItem } from "./FavoriteItem";

export function FavoriteList() {
  const mockFavorites = [
    {
      title: "Monthly Report",
      description: "Quick access to your monthly analysis",
      favorite: true,
    },
    {
      title: "Weekly Automation",
      description: "Automatic metrics workflow",
      favorite: true,
    },
    {
      title: "Clients.csv",
      description: "Recently analyzed document",
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
