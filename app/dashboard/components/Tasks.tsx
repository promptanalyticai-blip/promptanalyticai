"use client";

export default function Tasks({ tasks = [] }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between"
        >
          <div>
            <h3 className="text-slate-100 font-semibold">{task.title}</h3>
            <p className="text-slate-400 text-sm">{task.description}</p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs ${
              task.completed
                ? "bg-green-600/20 text-green-300 border border-green-700"
                : "bg-yellow-600/20 text-yellow-300 border border-yellow-700"
            }`}
          >
            {task.completed ? "Completado" : "Pendiente"}
          </span>
        </div>
      ))}
    </div>
  );
}
