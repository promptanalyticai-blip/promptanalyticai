// app/dashboard/roles/components/RoleList.tsx
"use client";

import { useState } from "react";
import { RoleItem } from "./RoleItem";

export function RoleList() {
  const [users, setUsers] = useState([
    { user: "usuario1@example.com", role: "admin" },
    { user: "usuario2@example.com", role: "editor" },
    { user: "usuario3@example.com", role: "viewer" },
  ]);

  function updateRole(index: number, newRole: string) {
    const updated = [...users];
    updated[index].role = newRole;
    setUsers(updated);
  }

  return (
    <div className="flex flex-col gap-4">
      {users.map((u, index) => (
        <RoleItem
          key={index}
          user={u.user}
          role={u.role}
          onChangeRole={(newRole) => updateRole(index, newRole)}
        />
      ))}
    </div>
  );
}

