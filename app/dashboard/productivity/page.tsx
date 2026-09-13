import ProductivityCard from "./components/ProductivityCard";

export default function ProductivityPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productivity Score</h1>
      <ProductivityCard />
    </div>
  );
}
