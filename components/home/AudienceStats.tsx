type Stat = { value: string; label: string };

const STATS: Stat[] = [
  { value: '260+', label: 'mil seguidores' },
  { value: '10.000+', label: 'horas de transmissão' },
  { value: '1.000+', label: 'negócios / entrevistas' },
  { value: '200 milhões+', label: 'acessos por mês' },
];

function RollingValue({ value }: { value: string }) {
  let digitIndex = 0;

  return (
    <div className="voz-number" aria-label={value}>
      {Array.from(value).map((char, i) => {
        if (!/\d/.test(char)) {
          return <span key={i} className="voz-static">{char}</span>;
        }

        const digit = Number(char);
        const steps = digit === 0 ? 10 : digit;
        const delay = digitIndex++ * 55;

        return (
          <span
            key={i}
            className="voz-digit"
            style={{ ['--steps' as any]: steps, ['--delay' as any]: `${delay}ms` }}
          >
            <span className="voz-reel" aria-hidden="true">
              {['0','1','2','3','4','5','6','7','8','9','0'].map((n, idx) => (
                <span key={idx}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
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
            <div key={stat.label} className="voz-stat-card">
              <RollingValue value={stat.value} />
              <div className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/90 md:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .voz-stat-card{
          position:relative;
          overflow:hidden;
          border-radius:1rem;
          border:1px solid rgba(252,211,77,.28);
          background:rgba(255,255,255,.055);
          padding:1.25rem 1rem;
          text-align:center;
          box-shadow:0 10px 32px rgba(0,0,0,.18);
        }
        .voz-stat-card::before{
          content:"";
          position:absolute;
          top:-25%;
          left:-55%;
          width:28%;
          height:150%;
          transform:skewX(-14deg);
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.40),transparent);
          animation:vozShine 2.6s linear infinite;
        }
        .voz-number{
          position:relative;
          z-index:1;
          display:flex;
          justify-content:center;
          align-items:flex-end;
          min-height:1.05em;
          font-size:clamp(2rem,3.7vw,3.2rem);
          line-height:1;
          font-weight:900;
          letter-spacing:-.035em;
          color:#fcd34d;
          font-variant-numeric:tabular-nums;
          text-shadow:0 0 10px rgba(251,191,36,.5),0 0 22px rgba(251,191,36,.28);
          animation:vozGlow 1.7s ease-in-out infinite alternate;
        }
        .voz-digit{
          display:inline-block;
          position:relative;
          width:.61em;
          height:1em;
          overflow:hidden;
        }
        .voz-reel{
          display:flex;
          flex-direction:column;
          line-height:1em;
          transform:translateY(0);
          animation:vozRoll .9s cubic-bezier(.12,.9,.18,1) forwards;
          animation-delay:var(--delay);
        }
        .voz-reel>span{
          display:block;
          height:1em;
          line-height:1em;
          flex:0 0 1em;
        }
        .voz-static{
          display:inline-block;
          padding:0 .025em;
        }
        @keyframes vozRoll{
          from{transform:translateY(0)}
          to{transform:translateY(calc(-1em * var(--steps)))}
        }
        @keyframes vozShine{
          0%{left:-55%}
          100%{left:145%}
        }
        @keyframes vozGlow{
          from{text-shadow:0 0 8px rgba(251,191,36,.42),0 0 18px rgba(251,191,36,.18)}
          to{text-shadow:0 0 14px rgba(251,191,36,.72),0 0 30px rgba(251,191,36,.34)}
        }
        @media (prefers-reduced-motion: reduce){
          .voz-reel{animation-duration:.01ms;animation-delay:0ms}
          .voz-stat-card::before,.voz-number{animation:none}
        }
      `}</style>
    </section>
  );
}
