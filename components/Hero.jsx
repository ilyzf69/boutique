import Link from "next/link";
export default function Hero(){
  return (
    <section className="rounded-3xl border"
      style={{background:"linear-gradient(90deg,#fff0f5 0%,#fff8f0 50%,#fff0fa 100%)"}}
    >
      <div className="mx-auto max-w-screen-xl grid md:grid-cols-2 gap-6 p-8 md:p-12">
        <div className="order-2 md:order-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold">5 univers musc <span className="text-brand-rose">&</span> lentilles</h1>
          <p className="mt-3 text-gray-700">Nouveautés parfumées & lentilles cosmétiques.</p>
          <Link href="#best" className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-white">Je craque</Link>
        </div>
        <img className="order-1 md:order-2 h-[360px] md:h-[420px] w-full rounded-2xl object-cover border"
             src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop" alt="Hero"/>
      </div>
    </section>
  );
}
