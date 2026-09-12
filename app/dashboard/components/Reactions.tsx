"use client";

export default function Reactions({ likes = 0, dislikes = 0 }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-green-400 text-xl">👍</span>
        <span className="text-slate-300">{likes}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-red-400 text-xl">👎</span>
        <span className="text-slate-300">{dislikes}</span>
      </div>
    </div>
  );
}
