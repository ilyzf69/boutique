export default function Stars({ value=5 }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i=>(
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i<=value ? "gold" : "none"} stroke="gold">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}
