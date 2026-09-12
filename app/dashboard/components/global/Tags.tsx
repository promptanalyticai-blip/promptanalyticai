export default function Tags({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.length === 0 ? (
        <p className="text-gray-500">Sin etiquetas</p>
      ) : (
        tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full dark:bg-blue-900 dark:text-blue-300"
          >
            {tag}
          </span>
        ))
      )}
    </div>
  );
}
