'use client';

import { useEffect, useRef, useState } from 'react';

type Stat = {
  end: number;
  format: (n: number) => string;
  label: string;
};

const STATS: Stat[] = [
  { end: 260, format: (n) => n + '+', label: 'MIL SEGUIDORES' },
  { end: 10000, format: (n) => n.toLocaleString('pt-BR') + '+', label: 'HORAS DE TRANSMISSÃO' },
  { end: 1000, format: (n) => n.toLocaleString('pt-BR') + '+', label: 'NEGÓCIOS / ENTREVISTAS' },
  { end: 200, format: (n) => n + ' MILHÕES+', label: 'ACESSOS POR MÊS' },
];

function StatCard({ stat, run, delay }: { stat: Stat; run: number; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
    let raf = 0;
    const timer = window.setTimeout(() => {
      const started = performance.now();
      const duration = 1200;

      const tick = (now: number) => {
        const p = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setValue(Math.round(stat.end * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setValue(stat.end);
      };

      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, delay, stat.end]);

  return (
    <div className="relative min-w-0 overflow-hidden rounded-2xl border border-amber-300/40 bg-white/[0.07] px-3 py-5 text-center shadow-[0_12px_30px_rgba(0,0,0,.22)]">
      <div className="pointer-events-none absolute -left-1/2 top-[-25%] h-[150%] w-[28%] -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-[vozStatsShine_2.4s_linear_infinite]" />
      <div className="relative z-10 whitespace-nowrap text-[clamp(1.8rem,2.7vw,2.8rem)] font-black leading-none tracking-[-0.04em] text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,.72)] animate-[vozStatsGlow_1.4s_ease-in-out_infinite_alternate]">
        {stat.format(value)}
      </div>
      <div className="relative z-10 mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-white md:text-xs">
        {stat.label}
      </div>
    </div>
  );
}

export default function AudienceStats() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let lastRun = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const now = Date.now();
          if (now - lastRun > 1800) {
            lastRun = now;
            setRun((v) => v + 1);
          }
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 pb-5 pt-2" aria-label="Números da TV Voz de Brasília">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[26px] border border-emerald-900/20 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 p-4 shadow-xl md:p-5">
        <div className="mb-4 text-center">
          <div className="text-xs font-black uppercase tracking-[0.26em] text-amber-300">
            TV VOZ DE BRASÍLIA · 40 ANOS
          </div>
          <div className="mt-1 text-sm font-semibold text-white/85">
            Números que mostram a força da nossa audiência e da nossa história
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} run={run} delay={i * 100} />
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          <div className="flex min-w-max items-center gap-8 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white/90 animate-[vozCrowdMove_16s_linear_infinite]">
            <span>🎥 Jornalismo</span><span>🎙️ Entrevistas</span><span>📡 Transmissões</span><span>📲 Redes sociais</span><span>🇧🇷 Brasília · Brasil · Mundo</span>
            <span>🎥 Jornalismo</span><span>🎙️ Entrevistas</span><span>📡 Transmissões</span><span>📲 Redes sociais</span><span>🇧🇷 Brasília · Brasil · Mundo</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes vozStatsShine {
          0% { left: -55%; }
          100% { left: 145%; }
        }
        @keyframes vozStatsGlow {
          from { filter: brightness(1); }
          to { filter: brightness(1.24); }
        }
        @keyframes vozCrowdMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
