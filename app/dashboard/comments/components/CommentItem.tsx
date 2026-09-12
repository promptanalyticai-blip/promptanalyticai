// app/dashboard/comments/components/CommentItem.tsx
"use client";

import { MessageSquare } from "lucide-react";

type CommentItemProps = {
  user: string;
  message: string;
  date: string;
};

export function CommentItem({ user, message, date }: CommentItemProps) {
  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex gap-4">
      <MessageSquare className="w-6 h-6 text-indigo-400 mt-1" />

      <div className="flex flex-col">
        <p className="text-slate-100 font-semibold">{user}</p>
        <p className="text-slate-300 text-sm">{message}</p>
        <span className="text-slate-500 text-xs mt-1">{date}</span>
      </div>
    </div>
  );
}
