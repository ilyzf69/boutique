export default function SectionTitle({ children, sub }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">{children}</h2>
      {sub && <p className="text-gray-600 mt-1">{sub}</p>}
    </div>
  );
}
