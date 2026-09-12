// app/dashboard/roles/page.tsx
"use client";

import { Header } from "../components/Header";
import { RoleList } from "./components/RoleList";

export default function RolesPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Roles"
        subtitle="Gestiona los permisos y niveles de acceso de los usuarios"
      />

      <RoleList />
    </div>
  );
}
