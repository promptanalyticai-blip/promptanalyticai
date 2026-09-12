// app/dashboard/workspaces/[id]/members/MemberList.tsx
"use client";

import { useState } from "react";
import { MemberItem } from "./MemberItem";

type Props = {
  workspaceId: string;
};

export function MemberList({ workspaceId }: Props) {
  const [members, setMembers] = useState([
    { email: "usuario1@example.com", role: "admin" },
    { email: "usuario2@example.com", role: "editor" },
    { email: "usuario3@example.com", role: "viewer" },
  ]);

  function updateRole(index: number, newRole: string) {
    const updated = [...members];
    updated[index].role = newRole;
    setMembers(updated);
  }

  return (
    <div className="flex flex-col gap-4">
      {members.map((m, index) => (
        <MemberItem
          key={index}
          email={m.email}
          role={m.role}
          onChangeRole={(newRole) => updateRole(index, newRole)}
        />
      ))}
    </div>
  );
}
