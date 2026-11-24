'use client';
import { useEffect, useState } from 'react';
const href = 'https://agenciabrasilia.df.gov.br/w/programa-viva-flor-amplia-protecao-a-mulheres-em-situacao-de-violencia-no-df';
const image = '/publicidade/gdf-145080/banner.gif';
export default function GdfCampaignBanner({ placement = 'sitewide' }: { placement?: 'sitewide' | 'middle' | 'footer' }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const update = () => {
      const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
      setActive(parts >= '2026-11-21' && parts <= '2026-12-06');
    };
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, []);
  // Pausa temporária solicitada pelo responsável do portal; preservar a campanha.
  const temporarilyPaused = true;
  if (temporarilyPaused || !active) return null;
  return (
    <section className="relative z-0 mx-auto w-full max-w-[1400px] px-4 py-3" aria-label="Publicidade GDF - PI 145080">
      <div className="mx-auto w-full max-w-[900px]">
        <a href={href} target="_blank" rel="noopener noreferrer sponsored" title="GDF - Entregas 2026 - Viva Flor" className="block w-full">
          <img src={image} width={728} height={90} alt="GDF - Entregas 2026 - Proteção às Mulheres - Programa Viva Flor" className="block h-auto w-full" loading={placement === 'middle' ? 'lazy' : 'eager'} onLoad={() => {
            if (typeof (window as any).gtag === 'function') (window as any).gtag('event','gdf_pi_145080_impression',{campaign_id:'145080',placement,non_interaction:true});
          }} />
        </a>
      </div>
    </section>
  );
}
