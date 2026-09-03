"use client";

import { ReactNode } from "react";
import LogoutButton from "./LogoutButton";
import LineChart from "./LineChart";

type AnalyticsItem = {
  fecha: string;
  valor: number;
};

export default function DashboardClient({
  analyticsByDay,
  usersByDay,
}: {
  analyticsByDay: AnalyticsItem[];
  usersByDay: AnalyticsItem[];
}) {
  return (
    <div className="space-y-8">
      <LogoutButton />

      <LineChart
        title="Actividad diaria"
        data={analyticsByDay}
      />

      <LineChart
        title="Usuarios por día"
        data={usersByDay}
      />
    </div>
  );
}
