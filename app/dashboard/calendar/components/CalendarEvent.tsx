// app/dashboard/calendar/components/CalendarEvent.tsx
"use client";

type CalendarEventProps = {
  title: string;
  date: string;
};

export function CalendarEvent({ title, date }: CalendarEventProps) {
  return (
    <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 shadow-sm">
      <p className="text-slate-100 font-medium">{title}</p>
      <span className="text-slate-400 text-xs">{date}</span>
    </div>
  );
}
