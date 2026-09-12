// app/dashboard/comments/components/CommentList.tsx
"use client";

import { CommentItem } from "./CommentItem";

export function CommentList() {
  const mockComments = [
    {
      user: "Administrador",
      message: "Tu reporte mensual está listo para revisión.",
      date: "2026-09-02 15:30",
    },
    {
      user: "Sistema",
      message: "Se completó el análisis del archivo Clientes.csv.",
      date: "2026-09-01 11:20",
    },
    {
      user: "Soporte",
      message: "Tu solicitud fue recibida y está en proceso.",
      date: "2026-08-31 09:10",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {mockComments.map((comment, index) => (
        <CommentItem
          key={index}
          user={comment.user}
          message={comment.message}
          date={comment.date}
        />
      ))}
    </div>
  );
}
