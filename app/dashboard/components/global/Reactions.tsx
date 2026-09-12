export default function Reactions({ reactions = [] }) {
  return (
    <div>
      {reactions.length === 0 ? (
        <p className="text-gray-500">Sin reacciones</p>
      ) : (
        <ul className="space-y-2">
          {reactions.map((r, i) => (
            <li key={i} className="p-2 border rounded-lg dark:border-gray-700">
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
