export default function ShippingBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-white">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="7" width="14" height="10" rx="2" stroke="#c6a564"/>
        <path d="M15 9h3l3 3v5h-6V9z" stroke="#e7a8c4"/>
        <circle cx="6" cy="19" r="2" fill="#c6a564"/><circle cx="18" cy="19" r="2" fill="#e7a8c4"/>
      </svg>
      2–5 jours ouvrés
    </div>
  );
}
