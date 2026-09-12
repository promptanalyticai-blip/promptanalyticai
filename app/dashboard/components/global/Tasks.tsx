export default function Tasks({ tasks = [] }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-gray-500">Sin tareas</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task, i) => (
            <li key={i} className="p-2 border rounded-lg dark:border-gray-700">
              {task}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
