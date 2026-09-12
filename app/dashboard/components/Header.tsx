// app/dashboard/components/Header.tsx
export default function Header({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
    </div>
  );
}
