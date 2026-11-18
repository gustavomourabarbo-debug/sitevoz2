'use client';

import { useEffect, useRef, useState } from 'react';

type SourceMode = 'local' | 'drive' | 'missing';

const CREATIVES = [
  { slug: 'cafe', name: 'Café', fileId: '1AyWaZ3o1fZIPUBcMCl95s3GyVYd9_PDm' },
  { slug: 'vaso', name: 'Vaso', fileId: '1S7JN_0oVHYFaSs3zc4dhcIVn-FiC2yMH' },
  { slug: 'oleo', name: 'Óleo', fileId: '1_6zUYCqdRxZz3EdNpXb5842gcfzPCYPh' },
] as const;

function brasiliaDate(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

export default function CaesbCampaignBanner() {
  const [date, setDate] = useState('');
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<SourceMode>('local');
  const [fallbackIndex, setFallbackIndex] = useState(-1);
  const countedRef = useRef<string>('');

  useEffect(() => {
    const update = () => setDate(brasiliaDate());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % CREATIVES.length), 11_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setMode('local');
  }, [index]);

  const isActive = date >= '2026-11-18' && date <= '2026-11-25';
  if (!isActive) return null;

  const current = CREATIVES[index];
  const localSrc = '/publicidade/caesb-46319/' + current.slug + '.mp4';
  const driveSrc = 'https://drive.google.com/uc?export=download&id=' + current.fileId;
  const src = mode === 'drive' ? driveSrc : localSrc;

  const countImpression = () => {
    const token = current.slug + ':' + index + ':' + mode;
    if (countedRef.current === token) return;
    countedRef.current = token;
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'caesb_pi_46319_impression', {
        campaign_id: '46319',
        campaign_name: 'Uso Correto da Rede de Esgoto 2026',
        creative: current.slug,
        placement: 'home_728x90',
        non_interaction: true,
      });
    }
  };

  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-3" aria-label="Publicidade CAESB PI 46319">
      <div className="mx-auto w-full max-w-[728px]">
        <div className="mb-1 text-center text-[10px] uppercase tracking-wide text-gray-500">
          Publicidade · CAESB · PI 46319
        </div>
        <a
          href="https://www.caesb.df.gov.br/"
          target="_blank"
          rel="noopener noreferrer sponsored"
          title={'Campanha CAESB — ' + current.name}
          className="relative block w-full overflow-hidden rounded-md border border-gray-200 bg-white"
          style={{ aspectRatio: '728 / 90' }}
        >
          {mode === 'missing' ? (
            <span className="flex h-full items-center justify-center px-3 text-center text-sm font-semibold text-blue-900">
              CAESB — Uso correto da rede de esgoto. Saiba mais no site oficial.
            </span>
          ) : (
            <video
              key={current.slug + ':' + mode}
              src={src}
              poster={'https://drive.google.com/thumbnail?id=' + current.fileId + '&sz=w728'}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              aria-label={'Anúncio CAESB — tema ' + current.name}
              className="pointer-events-none block h-full w-full object-cover"
              onPlaying={countImpression}
              onError={() => setMode((previous) => previous === 'local' ? 'drive' : 'missing')}
            />
          )}
        </a>
        <span className="sr-only">
          Campanha CAESB Uso Correto da Rede de Esgoto 2026 de 18 a 25 de novembro de 2026.
          O tema Chuva aguarda mídia no formato contratado 728 por 90 pixels.
        </span>
      </div>
    </section>
  );
}
