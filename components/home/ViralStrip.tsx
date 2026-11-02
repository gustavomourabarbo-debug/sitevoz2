'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flame, Play } from 'lucide-react';

const FEED = 'https://voz-central-ai.lovable.app/api/public/videos-virais?limit=12';
const IG_PERFIL = 'https://www.instagram.com/tvvozdebrasilia/reels/';
const linkIG = (u?: string) => {
  const limpo = ((u || '').trim().split(/\s+/)[0] || '').replace(/[),]+$/, '');
  return /^https:\/\/(www\.)?instagram\.com\/(reel|p)\/[A-Za-z0-9_-]+\/?$/i.test(limpo)
    ? limpo
    : IG_PERFIL;
};

type Viral = {
  id: string;
  titulo: string;
  video_url: string;
  thumb_url: string;
  instagram_permalink: string;
};

export default function ViralStrip() {
  const [videos, setVideos] = useState<Viral[]>([]);

  useEffect(() => {
    fetch(FEED, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) setVideos(d.videos || []);
      })
      .catch(() => {});
  }, []);

  if (videos.length === 0) return null;

  return (
    <section className="bg-gray-900 py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3" /> VIRAL
            </span>
            <h2 className="text-2xl font-black text-white">Vídeos Virais</h2>
          </div>
          <Link
            href="/videos"
            className="text-sm font-semibold text-green-400 hover:text-green-300"
          >
            Ver todos →
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {videos.map((v) => (
            <a
              key={v.id}
              href={linkIG(v.instagram_permalink)}
              target="_blank"
              rel="noreferrer"
              className="group shrink-0 w-[150px] snap-start text-left block"
            >
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
                {v.thumb_url ? (
                  <img
                    src={v.thumb_url}
                    alt={v.titulo}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : null}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/90 rounded-full p-2.5 shadow-lg">
                    <Play className="w-5 h-5 fill-green-700 text-green-700" />
                  </span>
                </span>
              </div>
              <p className="mt-2 text-xs font-semibold text-white/90 leading-snug line-clamp-2">
                {v.titulo}
              </p>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}
