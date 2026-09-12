"use client";

export default function Tags({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-indigo-600/20 text-indigo-300 border border-indigo-700 rounded-full text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
