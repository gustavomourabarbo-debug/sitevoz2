'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function TrendingBar({ posts = [] as any[] }) {
  const items = (posts || []).slice(0, 8);
  if (!items.length) return null;
  const loop = [...items, ...items];
  return (
    <div className="w-full bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 text-white shadow-md">
      <div className="max-w-[1400px] mx-auto flex items-center gap-3 px-4 py-2 overflow-hidden">
        <div className="flex items-center gap-1.5 shrink-0 bg-red-600 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
          <Zap className="w-3 h-3" /> Em alta
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex gap-8 whitespace-nowrap animate-[marquee_45s_linear_infinite] will-change-transform"
            style={{
              animation: 'vozMarquee 45s linear infinite',
            }}
          >
            {loop.map((p: any, idx: number) => (
              <Link
                key={idx}
                href={`/noticia/${p.slug}`}
                className="text-sm font-medium hover:text-yellow-200 transition-colors"
              >
                <span className="opacity-70 mr-2">•</span>
                {(p.title?.rendered || p.title || '').replace(/&#8217;/g, "'")}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes vozMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
