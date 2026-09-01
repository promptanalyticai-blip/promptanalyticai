"use client";

import LogoutButton from "./LogoutButton";
import LineChart from "./LineChart";

export default function DashboardClient({ analyticsByDay, usersByDay }) {
  return (
    <div className="space-y-8">
      <LogoutButton />

      <LineChart
        analyticsByDay={analyticsByDay}
        usersByDay={usersByDay}
      />
    </div>
  );
}
