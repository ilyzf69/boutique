"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const slides = [
  { img: "https://picsum.photos/seed/slide1/1600/650", title: "Musc signature", href: "/product?slug=musc-blanc" },
  { img: "https://picsum.photos/seed/slide2/1600/650", title: "Autobronzant corps", href: "/product?slug=autobronzant-medium" },
  { img: "https://picsum.photos/seed/slide3/1600/650", title: "Accessoires pro", href: "/categories" },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const timer = useRef(null);
  useEffect(()=>{ timer.current = setInterval(()=>setI(v=>(v+1)%slides.length), 4500); return ()=>clearInterval(timer.current)},[]);
  return (
    <div className="relative overflow-hidden rounded-2xl border-gold">
      {slides.map((s,idx)=>(
        <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ${i===idx?'opacity-100':'opacity-0'}`}>
          <img src={s.img} alt="" className="w-full h-[360px] md:h-[520px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <div className="text-2xl md:text-4xl font-bold drop-shadow">{s.title}</div>
            <Link href={s.href} className="mt-3 inline-flex items-center rounded-full px-5 py-2.5 bg-white text-black">
              Découvrir
            </Link>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {slides.map((_,idx)=>(
          <button key={idx} onClick={()=>setI(idx)} className={`w-2.5 h-2.5 rounded-full ${i===idx?'bg-white':'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}
