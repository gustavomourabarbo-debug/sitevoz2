'use client';

import Link from 'next/link';
import { Clock } from 'lucide-react';

function stripHtml(s: string) {
  return String(s || '').replace(/<[^>]+>/g, '').replace(/&#8217;/g, "'").trim();
}

export default function MosaicHighlights({ posts = [] as any[] }) {
  const items = (posts || []).slice(5, 11);
  if (items.length < 4) return null;
  const [big, ...rest] = items;
  const smalls = rest.slice(0, 4);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-green-700 font-black mb-1">
              Editorial
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Em Destaque Agora</h2>
          </div>
          <Link
            href="/categoria/distrito-federal"
            className="hidden md:inline text-sm font-bold text-green-700 hover:text-green-900"
          >
            Ver tudo →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <Link
            href={big.href || `/noticia/${big.slug}`}
            className="group md:row-span-2 md:col-span-2 rounded-2xl overflow-hidden bg-gray-900 shadow-lg flex flex-col"
          >
            <div className="relative h-[220px] md:h-[380px] overflow-hidden bg-gray-900">
              <img
                src={big.featured_image || big._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                alt={stripHtml(big.title?.rendered || big.title)}
                className="absolute inset-0 w-full h-full object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                {big.category || 'Destaque'}
              </span>
            </div>
            <div className="p-5 md:p-6 text-white">
              <h3 className="font-bold text-lg md:text-2xl leading-snug line-clamp-2">
                {stripHtml(big.title?.rendered || big.title)}
              </h3>
              <p className="hidden md:block mt-2 text-sm text-gray-300 line-clamp-2 max-w-2xl">
                {stripHtml(big.excerpt?.rendered || big.excerpt)}
              </p>
            </div>
          </Link>

          {smalls.map((p: any, i: number) => (
            <Link
              key={i}
              href={p.href || `/noticia/${p.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={p.featured_image || p._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                  alt={stripHtml(p.title?.rendered || p.title)}
                  className="absolute inset-0 w-full h-full object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-black/70 backdrop-blur text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded">
                  {p.category || 'Notícia'}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-green-700 transition-colors">
                  {stripHtml(p.title?.rendered || p.title)}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-2">
                  <Clock className="w-3 h-3" />
                  {new Date(p.date || p.published_at).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
