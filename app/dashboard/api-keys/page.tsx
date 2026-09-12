// app/dashboard/api-keys/page.tsx
"use client";

import { Header } from "../components/Header";
import { ApiKeyList } from "./components/ApiKeyList";

export default function ApiKeysPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="API Keys"
        subtitle="Gestiona tus claves de acceso para integraciones externas"
      />

      <ApiKeyList />
    </div>
  );
}
