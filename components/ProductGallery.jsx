"use client";
import { useState } from "react";

export default function ProductGallery({ images }) {
  const pics = (images && images.length ? images : []).filter(Boolean);
  const [idx, setIdx] = useState(0);
  const current = pics[idx] ?? "";

  return (
    <div className="space-y-3">
      <div className="aspect-square w-full overflow-hidden rounded-3xl border">
        {current ? (
          <img src={current} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
      </div>
      {pics.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {pics.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`aspect-square overflow-hidden rounded-xl border ${i===idx ? "ring-2 ring-[var(--brand-gold)]" : ""}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
