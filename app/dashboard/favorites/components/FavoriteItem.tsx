// app/dashboard/favorites/components/FavoriteItem.tsx
"use client";

import { Star, StarOff } from "lucide-react";

type FavoriteItemProps = {
  title: string;
  description: string;
  favorite: boolean;
};

export function FavoriteItem({ title, description, favorite }: FavoriteItemProps) {
  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-slate-100 font-semibold">{title}</p>
        <span className="text-slate-400 text-sm">{description}</span>
      </div>

      <button className="text-slate-300 hover:text-yellow-400 transition">
        {favorite ? (
          <Star className="w-6 h-6 text-yellow-400" />
        ) : (
          <StarOff className="w-6 h-6 text-slate-600" />
        )}
      </button>
    </div>
  );
}
