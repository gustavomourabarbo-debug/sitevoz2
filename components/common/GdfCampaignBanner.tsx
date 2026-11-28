'use client';
import { useEffect, useState } from 'react';

const themes = [
  {id:'casa-da-mulher', src:'/publicidade/gdf-145080/banner.gif', alt:'GDF - Entregas 2026 - Casa da Mulher / Viva Flor', href:'https://agenciabrasilia.df.gov.br/w/programa-viva-flor-amplia-protecao-a-mulheres-em-situacao-de-violencia-no-df'},
  {id:'cameras', src:'/publicidade/gdf-145080/cameras.gif', alt:'GDF - Entregas 2026 - Câmeras', href:null},
] as const;

export default function GdfCampaignBanner({ placement = 'sitewide' }: { placement?: 'sitewide' | 'middle' | 'footer' }) {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const update = () => {
      const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
      const get = (type: string) => parts.find(p => p.type === type)?.value;
      const date = get('year') + '-' + get('month') + '-' + get('day');
      setActive(date >= '2026-11-21' && date <= '2026-12-06');
    };
    update();
    setIndex(Math.random() < 0.5 ? 0 : 1);
    const calendar = window.setInterval(update, 60000);
    const rotation = window.setInterval(() => setIndex(i => (i + 1) % themes.length), 20000);
    return () => {window.clearInterval(calendar); window.clearInterval(rotation);};
  }, []);
  if (!active) return null;
  const theme = themes[index];
  const img = <img key={theme.id} src={theme.src} width={728} height={90} alt={theme.alt} className="block h-auto w-full" style={{ filter: 'brightness(1.12)' }} loading={placement === 'middle' ? 'lazy' : 'eager'} onLoad={() => {
    if (typeof (window as any).gtag === 'function') (window as any).gtag('event','gdf_pi_145080_impression',{campaign_id:'145080',placement,creative:theme.id,non_interaction:true});
  }} />;
  return (
    <section className="relative z-0 mx-auto w-full max-w-[1400px] px-4 py-3" aria-label="Publicidade GDF - PI 145080" data-creative={theme.id}>
      <div className="mx-auto w-full max-w-[728px]">
        {theme.href ? <a href={theme.href} target="_blank" rel="noopener noreferrer sponsored" title={theme.alt} className="block w-full">{img}</a> : img}
      </div>
    </section>
  );
}
