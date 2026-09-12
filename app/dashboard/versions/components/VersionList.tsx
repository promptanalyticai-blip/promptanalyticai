// app/dashboard/versions/components/VersionList.tsx
"use client";

import { VersionItem } from "./VersionItem";

export function VersionList() {
  const versions = [
    {
      version: "v1.4.2",
      date: "02 Sep 2026",
      status: "stable" as const,
    },
    {
      version: "v1.4.0",
      date: "28 Ago 2026",
      status: "stable" as const,
    },
    {
      version: "v1.3.5-beta",
      date: "20 Ago 2026",
      status: "beta" as const,
    },
    {
      version: "v1.3.0",
      date: "10 Ago 2026",
      status: "stable" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {versions.map((v, index) => (
        <VersionItem
          key={index}
          version={v.version}
          date={v.date}
          status={v.status}
        />
      ))}
    </div>
  );
}
