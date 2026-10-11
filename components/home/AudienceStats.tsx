'use client';

import { useEffect, useState } from 'react';

type Stat = {
  end: number;
  format: (n: number) => string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { end: 260, format: (n) => n + '+', label: 'MIL SEGUIDORES' },
  { end: 10000, format: (n) => n.toLocaleString('pt-BR') + '+', label: 'HORAS DE TRANSMISSÃO' },
  { end: 1000, format: (n) => n.toLocaleString('pt-BR') + '+', label: 'NEGÓCIOS / ENTREVISTAS' },
  { end: 200, format: (n) => String(n), suffix: ' MILHÕES+', label: 'ACESSOS POR MÊS' },
];

function StatCard({ stat, cycle, delay }: { stat: Stat; cycle: number; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
    let raf = 0;
    const timer = window.setTimeout(() => {
      const duration = 3000;
      const started = performance.now();

      const tick = (now: number) => {
        const p = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
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
    <div className="voz-stat-card">
      <div className="voz-stat-value">
        <span>{stat.format(value)}</span>
        {stat.suffix ? <span className="voz-stat-suffix">{stat.suffix}</span> : null}
      </div>
      <div className="voz-stat-label">{stat.label}</div>
    </div>
  );
}

export default function AudienceStats() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const first = window.setTimeout(() => setCycle(1), 1200);
    const interval = window.setInterval(() => setCycle((v) => v + 1), 8000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="bg-white px-4 pb-5 pt-2" aria-label="Números da TV Voz de Brasília">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[26px] border border-emerald-900/20 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 p-4 shadow-xl md:p-5">
        <div className="mb-4 text-center">
          <div className="text-xs font-black uppercase tracking-[0.26em] text-amber-300">
            TV VOZ DE BRASÍLIA · 40 ANOS
          </div>
          <div className="mt-1 text-sm font-semibold text-white/85">
            Números que mostram a força da nossa audiência e da nossa história
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} cycle={cycle} delay={i * 140} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .voz-stat-card{
          position:relative;
          min-width:0;
          overflow:hidden;
          border-radius:18px;
          border:1px solid rgba(252,211,77,.38);
          background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.025));
          padding:22px 8px 20px;
          text-align:center;
          box-shadow:0 12px 30px rgba(0,0,0,.2);
        }
        .voz-stat-card::before{
          content:"";
          position:absolute;
          top:-30%;
          left:-55%;
          width:30%;
          height:165%;
          transform:skewX(-16deg);
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.46),transparent);
          animation:vozStatsShine 2.5s linear infinite;
          pointer-events:none;
        }
        .voz-stat-value{
          position:relative;
          z-index:1;
          min-width:0;
          white-space:nowrap;
          font-size:clamp(1.45rem,2vw,2.35rem);
          line-height:1;
          font-weight:950;
          letter-spacing:-.04em;
          color:#fcd34d;
          font-variant-numeric:tabular-nums;
          text-shadow:0 0 10px rgba(251,191,36,.58),0 0 24px rgba(251,191,36,.30);
          animation:vozStatsGlow 1.25s ease-in-out infinite alternate;
        }
        .voz-stat-suffix{font-size:.52em;letter-spacing:-.015em}
        .voz-stat-label{
          position:relative;
          z-index:1;
          margin-top:10px;
          font-size:10px;
          line-height:1.2;
          font-weight:900;
          text-transform:uppercase;
          letter-spacing:.11em;
          color:#fff;
        }
        @keyframes vozStatsShine{0%{left:-55%}100%{left:145%}}
        @keyframes vozStatsGlow{from{filter:brightness(1)}to{filter:brightness(1.28)}}
      `}</style>
    </section>
  );
}
