'use client';

import { useEffect, useState } from 'react';

type Stat = {
  end: number;
  render: (n: number) => string;
  label: string;
};

const STATS: Stat[] = [
  { end: 260, render: (n) => n + '+', label: 'MIL SEGUIDORES' },
  { end: 10000, render: (n) => n.toLocaleString('pt-BR') + '+', label: 'HORAS DE TRANSMISSÃO' },
  { end: 1000, render: (n) => n.toLocaleString('pt-BR') + '+', label: 'NEGÓCIOS / ENTREVISTAS' },
  { end: 200, render: (n) => n + ' MILHÕES+', label: 'ACESSOS POR MÊS' },
];

function Counter({ stat, cycle, delay }: { stat: Stat; cycle: number; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
    let raf = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const duration = 1800;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
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
  }, [cycle, delay, stat.end]);

  return (
    <div
      className="relative min-w-0 overflow-hidden rounded-2xl px-3 py-5 text-center"
      style={{
        border:'1px solid rgba(252,211,77,.36)',
        background:'linear-gradient(135deg,rgba(255,255,255,.10),rgba(255,255,255,.035))',
        boxShadow:'0 10px 28px rgba(0,0,0,.20)'
      }}
    >
      <div
        className="whitespace-nowrap font-black leading-none"
        style={{
          color:'#fcd34d',
          fontSize:'clamp(1.65rem,2.4vw,2.75rem)',
          letterSpacing:'-0.04em',
          textShadow:'0 0 10px rgba(251,191,36,.62),0 0 24px rgba(251,191,36,.32)'
        }}
      >
        {stat.render(value)}
      </div>
      <div
        className="mt-2 text-[11px] font-black uppercase tracking-[0.12em]"
        style={{color:'#ffffff'}}
      >
        {stat.label}
      </div>
      <div className="absolute inset-y-[-30%] left-[-50%] w-[28%] -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_2.6s_linear_infinite] pointer-events-none" />
    </div>
  );
}

export default function AudienceStats() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const first = window.setTimeout(() => setCycle(1), 350);
    return () => window.clearTimeout(first);
  }, []);

  return (
    <section className="bg-white px-4 pb-5 pt-2" aria-label="Números da TV Voz de Brasília">
      <div
        className="mx-auto max-w-[1400px] overflow-hidden rounded-[26px] p-4 shadow-xl md:p-5"
        style={{
          background:'linear-gradient(90deg,#04111d 0%,#07372b 50%,#04111d 100%)',
          border:'1px solid rgba(212,175,55,.28)'
        }}
      >
        <div className="mb-4 text-center">
          <div className="text-xs font-black uppercase tracking-[0.26em]" style={{color:'#fcd34d'}}>
            TV VOZ DE BRASÍLIA · 40 ANOS
          </div>
          <div className="mt-1 text-sm font-bold" style={{color:'#ffffff'}}>
            Números que mostram a força da nossa audiência e da nossa história
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Counter key={stat.label} stat={stat} cycle={cycle} delay={i * 120} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { left:-50%; }
          100% { left:145%; }
        }
      `}</style>
    </section>
  );
}
