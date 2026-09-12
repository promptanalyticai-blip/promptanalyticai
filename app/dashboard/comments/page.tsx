// app/dashboard/comments/page.tsx
"use client";

import { Header } from "../components/Header";
import { CommentList } from "./components/CommentList";

export default function CommentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Comentarios"
        subtitle="Revisa el feedback y las interacciones recientes"
      />

      <CommentList />
    </div>
  );
}
