'use client';

import { useEffect, useRef, useState } from 'react';

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

function StatCard({ stat, run, delay }: { stat: Stat; run: number; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
    if (run === 0) return;

    let raf = 0;
    const timer = window.setTimeout(() => {
      const started = performance.now();
      const duration = 2600;

      const tick = (now: number) => {
        const p = Math.min((now - started) / duration, 1);
        const eased = Math.pow(p, 0.58);
        setValue(Math.min(stat.end, Math.round(stat.end * eased)));

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [run, setRun] = useState(0);
  const lastRunRef = useRef(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const now = Date.now();
        if (now - lastRunRef.current < 4500) return;
        lastRunRef.current = now;
        setRun((v) => v + 1);
      },
      { threshold: 0.45 }
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
          <div className="mt-1 text-sm font-semibold text-white/80">
            Números que mostram a força da nossa audiência e da nossa história
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} run={run} delay={1100 + i * 160} />
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05]">
          <div className="flex min-w-max items-center gap-8 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white/90 animate-[vozCrowdMove_14s_linear_infinite]">
            <span>👥 Gente conectada</span><span>🎥 Jornalismo</span><span>🎙️ Entrevistas</span><span>📡 Transmissões</span><span>📲 Redes sociais</span><span>🇧🇷 Brasília · Brasil · Mundo</span>
            <span>👥 Gente conectada</span><span>🎥 Jornalismo</span><span>🎙️ Entrevistas</span><span>📡 Transmissões</span><span>📲 Redes sociais</span><span>🇧🇷 Brasília · Brasil · Mundo</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .voz-stat-card{
          position:relative;
          min-width:0;
          overflow:hidden;
          border-radius:18px;
          border:1px solid rgba(252,211,77,.32);
          background:linear-gradient(135deg,rgba(255,255,255,.075),rgba(255,255,255,.025));
          padding:22px 10px 20px;
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
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.42),transparent);
          animation:vozStatsShine 2.7s linear infinite;
          pointer-events:none;
        }
        .voz-stat-value{
          position:relative;
          z-index:1;
          min-width:0;
          white-space:nowrap;
          font-size:clamp(1.72rem,2.15vw,2.55rem);
          line-height:1;
          font-weight:950;
          letter-spacing:-.045em;
          color:#fcd34d;
          font-variant-numeric:tabular-nums;
          text-shadow:0 0 10px rgba(251,191,36,.55),0 0 24px rgba(251,191,36,.28);
          animation:vozStatsGlow 1.5s ease-in-out infinite alternate;
        }
        .voz-stat-suffix{
          font-size:.58em;
          letter-spacing:-.02em;
        }
        .voz-stat-label{
          position:relative;
          z-index:1;
          margin-top:10px;
          font-size:11px;
          line-height:1.2;
          font-weight:900;
          text-transform:uppercase;
          letter-spacing:.12em;
          color:#fff;
        }
        @keyframes vozStatsShine{
          0%{left:-55%}
          100%{left:145%}
        }
        @keyframes vozStatsGlow{
          from{filter:brightness(1)}
          to{filter:brightness(1.22)}
        }
        @keyframes vozCrowdMove{
          0%{transform:translateX(0)}
          100%{transform:translateX(-50%)}
        }
      `}</style>
    </section>
  );
}
