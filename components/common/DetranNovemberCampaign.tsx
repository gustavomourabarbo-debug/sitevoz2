'use client';
import { useEffect, useState } from 'react';

/** Detran-DF | PI 385630 | 03–09/11/2026 | topo home e internas | peça fornecida 728×90 */
export default function DetranNovemberCampaign() {
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const check = () => {
      const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Sao_Paulo', year:'numeric', month:'2-digit', day:'2-digit'}).format(new Date());
      setActive(parts >= '2026-11-03' && parts <= '2026-11-09');
    };
    check();
    const interval = window.setInterval(check, 60000);
    return () => window.clearInterval(interval);
  }, []);
  if (!active) return null;
  return <div className="mx-auto my-2 w-full max-w-[728px]" style={{display:loaded?'block':'none'}} aria-label="Publicidade Detran-DF — segurança do motociclista">
    <a href="https://youtu.be/fjB2Y963Sj4" target="_blank" rel="noopener noreferrer" aria-label="Campanha Detran-DF segurança do motociclista 2026">
      {/* GIF oficial recebido por email: arquivo mantido separado, nunca substituir por arte recriada. */}
      <img src="/anuncios/detran-pi-385630-728x90.gif" width={728} height={90} alt="Detran-DF — Segurança do Motociclista 2026" style={{width:'100%',height:'auto'}} onLoad={()=>setLoaded(true)} onError={()=>setLoaded(false)}/>
    </a>
  </div>;
}
