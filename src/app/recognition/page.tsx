"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";

const awards = [
  { year: "2026", title: "Team website deployment", description: "Our team website has been created with Next.JS and deployed on Vercel. Hooray!", organization: "Super AI engineer season 6 Team EXP", type: "trophy" },
];

const icons: Record<string, React.ReactNode> = {
  trophy: (
    <svg className="w-7 h-7 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21h8m-4-4v4M5 3h14M5 3a7 7 0 004 6.32V13h6V9.32A7 7 0 0019 3H5z" />
    </svg>
  ),
  shield: (
    <svg className="w-7 h-7 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  star: (
    <svg className="w-7 h-7 text-accent transition-transform duration-500 group-hover:scale-125 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  medal: (
    <svg className="w-7 h-7 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15a6 6 0 100-12 6 6 0 000 12zm0 0v6m-3-3h6" />
    </svg>
  ),
};

const years = [...new Set(awards.map((a) => a.year))].sort((a, b) => Number(b) - Number(a));
const totalOrgs = new Set(awards.map((a) => a.organization)).size;

function useVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AwardCard({ award, delay }: { award: typeof awards[0]; delay: number }) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const { ref: wrapRef, visible } = useVisible(0.1);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    el.style.transition = "transform 0.1s ease";
  };

  const onMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 0.5s ease";
  };

  return (
    <div
      ref={wrapRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div
        ref={tiltRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="liquid-glass rounded-2xl p-6 flex gap-6 group hover:shadow-[0_0_30px_rgba(255,166,48,0.08)] cursor-default"
        style={{ willChange: "transform" }}
      >
        <div className="flex-shrink-0 w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center border border-accent/30 group-hover:border-accent/60 group-hover:bg-accent/15 transition-colors duration-300">
          {icons[award.type]}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3 className="font-anton text-lg uppercase">{award.title}</h3>
            <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded font-medium">{award.year}</span>
          </div>
          <p className="font-mono text-sm text-space-cream/60 mb-1">{award.description}</p>
          <p className="font-mono text-xs text-space-cream/40">Awarded by: {award.organization}</p>
        </div>
      </div>
    </div>
  );
}

function YearSection({ year }: { year: string }) {
  const { ref, visible } = useVisible(0.1);
  const yearAwards = awards.filter((a) => a.year === year);

  return (
    <div ref={ref} className="mb-20">
      {/* Year marker */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
        className="flex items-center gap-6 mb-10"
      >
        <div className="relative">
          <span className="font-anton text-[56px] md:text-[72px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-space-cream/30 to-space-cream/5 select-none">
            {year}
          </span>
          <div className="absolute bottom-0 left-0 h-[3px] w-2/3 bg-gradient-to-r from-accent/60 to-transparent rounded-full" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
      </div>

      {/* Cards grid */}
      <div
        className="relative pl-6"
        style={{ borderLeft: "2px solid", borderImageSlice: 1, borderImageSource: "linear-gradient(to bottom, rgba(255,166,48,0.4), rgba(255,166,48,0))" }}
      >
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.5)",
            transition: "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s",
          }}
          className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(255,166,48,0.8)]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {yearAwards.map((award, i) => (
            <AwardCard key={award.title} award={award} delay={i * 120} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatNumber({ value, delay }: { value: number; delay: number }) {
  const { ref, visible } = useVisible(0.3);

  return (
    <div ref={ref}>
      <p
        className="font-anton text-4xl text-accent stat-animate"
        style={{ animationDelay: `${delay}ms`, animationPlayState: visible ? "running" : "paused" }}
      >
        {value}
      </p>
    </div>
  );
}

export default function RecognitionPage() {
  return (
    <div className="bg-space-bg text-space-cream pt-20">

      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 stars-layer opacity-30" />
        <div className="absolute inset-0 stars-layer-2 opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-cursive text-accent text-3xl md:text-5xl block mb-2 opacity-90 mix-blend-exclusion">
            our achievements
          </span>
          <h1 className="font-anton text-[40px] sm:text-[60px] md:text-[75px] uppercase">Recognition</h1>
          <p className="font-mono text-sm md:text-base uppercase text-space-cream/60 max-w-2xl mx-auto mt-4">
            Awards and achievements that reflect our commitment to excellence.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="pb-12">
        <div className="max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass rounded-2xl px-8 py-6 flex flex-wrap justify-center gap-8 md:gap-20 text-center relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div>
              <StatNumber value={awards.length} delay={0} />
              <p className="font-mono text-xs uppercase text-space-cream/50 mt-1 tracking-widest">Awards</p>
            </div>
            <div className="w-px bg-white/10 hidden md:block" />
            <div>
              <StatNumber value={years.length} delay={150} />
              <p className="font-mono text-xs uppercase text-space-cream/50 mt-1 tracking-widest">Years</p>
            </div>
            <div className="w-px bg-white/10 hidden md:block" />
            <div>
              <StatNumber value={totalOrgs} delay={300} />
              <p className="font-mono text-xs uppercase text-space-cream/50 mt-1 tracking-widest">Organizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-16">
        <div className="absolute inset-0">
          <div className="stars-layer absolute inset-0 opacity-20" />
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 lg:px-8">
          {years.map((year) => (
            <YearSection key={year} year={year} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
