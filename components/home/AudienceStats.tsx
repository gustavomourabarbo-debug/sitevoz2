'use client';

import { useEffect, useRef, useState } from 'react';

type Stat = {
  end: number;
  display: (n: number) => string;
  label: string;
};

const STATS: Stat[] = [
  { end: 260, display: (n) => n + '+', label: 'mil seguidores' },
  { end: 10000, display: (n) => n.toLocaleString('pt-BR') + '+', label: 'horas de transmissão' },
  { end: 1000, display: (n) => n.toLocaleString('pt-BR') + '+', label: 'negócios / entrevistas' },
  { end: 200, display: (n) => n + '+', label: 'milhões de acessos / mês' },
];

function Counter({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    setValue(0);
    let raf = 0;
    let timeout = 0;

    timeout = window.setTimeout(() => {
      const duration = 1450;
      const started = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(Math.round(stat.end * eased));

        if (progress < 1) raf = requestAnimationFrame(tick);
        else setValue(stat.end);
      };

      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [active, delay, stat.end]);

  return (
    <div className="voz-stat-card">
      <div className="voz-stat-value">{stat.display(value)}</div>
      <div className="voz-stat-label">{stat.label}</div>
    </div>
  );
}

export default function AudienceStats() {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white px-4 pb-5 pt-2" aria-label="Números da TV Voz de Brasília">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[26px] border border-emerald-900/15 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 p-4 shadow-xl md:p-5">
        <div className="mb-4 text-center">
          <div className="text-xs font-black uppercase tracking-[0.26em] text-amber-300">
            TV Voz de Brasília · 40 anos
          </div>
          <div className="mt-1 text-sm font-semibold text-white/80">
            Números que mostram a força da nossa audiência e da nossa história
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat, i) => (
            <Counter key={stat.label} stat={stat} active={active} delay={i * 90} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .voz-stat-card{
          position:relative;
          min-width:0;
          overflow:hidden;
          border-radius:18px;
          border:1px solid rgba(252,211,77,.30);
          background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.025));
          padding:22px 14px 20px;
          text-align:center;
          box-shadow:0 12px 30px rgba(0,0,0,.18);
        }
        .voz-stat-card::before{
          content:"";
          position:absolute;
          top:-30%;
          left:-55%;
          width:30%;
          height:165%;
          transform:skewX(-16deg);
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.42),transparent);
          animation:vozCardShine 2.7s linear infinite;
          pointer-events:none;
        }
        .voz-stat-value{
          position:relative;
          z-index:1;
          min-width:0;
          white-space:nowrap;
          font-size:clamp(2rem,3vw,3rem);
          line-height:1;
          font-weight:950;
          letter-spacing:-.04em;
          color:#fcd34d;
          font-variant-numeric:tabular-nums;
          text-shadow:0 0 10px rgba(251,191,36,.55),0 0 24px rgba(251,191,36,.28);
          animation:vozNumberGlow 1.5s ease-in-out infinite alternate;
        }
        .voz-stat-label{
          position:relative;
          z-index:1;
          margin-top:10px;
          font-size:12px;
          line-height:1.2;
          font-weight:900;
          text-transform:uppercase;
          letter-spacing:.14em;
          color:rgba(255,255,255,.92);
        }
        @keyframes vozCardShine{
          0%{left:-55%}
          100%{left:145%}
        }
        @keyframes vozNumberGlow{
          from{text-shadow:0 0 8px rgba(251,191,36,.42),0 0 18px rgba(251,191,36,.16)}
          to{text-shadow:0 0 16px rgba(251,191,36,.76),0 0 32px rgba(251,191,36,.34)}
        }
        @media (max-width:1279px){
          .voz-stat-value{font-size:clamp(2.2rem,5vw,3rem)}
        }
        @media (max-width:639px){
          .voz-stat-value{font-size:2.65rem}
        }
      `}</style>
    </section>
  );
}
