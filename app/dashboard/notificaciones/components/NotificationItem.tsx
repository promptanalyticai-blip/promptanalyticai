// app/dashboard/notificaciones/components/NotificationItem.tsx
"use client";

import { Bell, CheckCircle } from "lucide-react";

type NotificationItemProps = {
  title: string;
  message: string;
  date: string;
  read: boolean;
};

export function NotificationItem({
  title,
  message,
  date,
  read,
}: NotificationItemProps) {
  return (
    <div
      className={`p-4 rounded-xl border shadow-md flex gap-4 ${
        read
          ? "bg-slate-800 border-slate-700"
          : "bg-slate-900 border-slate-800"
      }`}
    >
      <Bell className="w-6 h-6 text-indigo-400 mt-1" />

      <div className="flex flex-col flex-1">
        <p className="text-slate-100 font-semibold">{title}</p>
        <p className="text-slate-300 text-sm">{message}</p>
        <span className="text-slate-500 text-xs mt-1">{date}</span>
      </div>

      {read && (
        <CheckCircle className="w-5 h-5 text-green-400 self-start mt-1" />
      )}
    </div>
  );
}
