'use client';

import { useEffect, useRef, useState } from 'react';

type Stat = {
  target: number;
  final: string;
  label: string;
};

const STATS: Stat[] = [
  { target: 260, final: '260+', label: 'mil seguidores' },
  { target: 10000, final: '10 mil+', label: 'horas de transmissão' },
  { target: 1000, final: '1.000+', label: 'negócios / entrevistas' },
  { target: 200, final: '200 milhões+', label: 'acessos por mês' },
];

function Counter({ stat }: { stat: Stat }) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 950;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.floor(stat.target * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [stat.target]);

  const current =
    stat.target >= 1000 ? value.toLocaleString('pt-BR') : value.toString();

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-amber-300/25 bg-white/[0.055] px-4 py-5 text-center shadow-[0_10px_32px_rgba(0,0,0,.18)]">
      <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-[statsShine_2.5s_linear_infinite]" />
      <div className="relative z-10">
        <div className="text-[clamp(2rem,3.7vw,3.2rem)] font-black leading-none tracking-tight text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,.55)]">
          {done ? stat.final : current}
        </div>
        <div className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/90 md:text-xs">
          {stat.label}
        </div>
      </div>
    </div>
  );
}

export default function AudienceStats() {
  return (
    <section className="bg-white px-4 pb-5 pt-2" aria-label="Números da TV Voz de Brasília">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[26px] border border-emerald-900/15 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 p-4 shadow-xl md:p-5">
        <div className="mb-4 text-center">
          <div className="text-xs font-black uppercase tracking-[0.26em] text-amber-300">
            TV Voz de Brasília · 40 anos
          </div>
          <div className="mt-1 text-sm font-semibold text-white/80">
            Números que mostram a força da nossa audiência e da nossa história
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map((stat) => (
            <Counter key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes statsShine {
          0% { left: -55%; }
          100% { left: 155%; }
        }
      `}</style>
    </section>
  );
}
