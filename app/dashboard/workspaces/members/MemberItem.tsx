// app/dashboard/workspaces/[id]/members/MemberItem.tsx
"use client";

type MemberItemProps = {
  email: string;
  role: string;
  onChangeRole: (newRole: string) => void;
};

export function MemberItem({ email, role, onChangeRole }: MemberItemProps) {
  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-slate-100 font-semibold">{email}</span>
        <span className="text-slate-400 text-sm">Rol: {role}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onChangeRole("admin")}
          className={`px-3 py-1 rounded-lg text-sm ${
            role === "admin"
              ? "bg-indigo-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Admin
        </button>

        <button
          onClick={() => onChangeRole("editor")}
          className={`px-3 py-1 rounded-lg text-sm ${
            role === "editor"
              ? "bg-green-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Editor
        </button>

        <button
          onClick={() => onChangeRole("viewer")}
          className={`px-3 py-1 rounded-lg text-sm ${
            role === "viewer"
              ? "bg-gray-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Viewer
        </button>
      </div>
    </div>
  );
}
