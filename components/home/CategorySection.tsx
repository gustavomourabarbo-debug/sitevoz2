'use client';

import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  title?: string;
  category?: string;
  posts?: any[];
}

const strip=(v:any)=>typeof v==='object'&&v!==null ? String(v.rendered||'').replace(/<[^>]+>/g,'') : String(v||'').replace(/<[^>]+>/g,'');

export default function CategorySection({ title = 'Política', category = 'politica', posts = [] }: CategorySectionProps = {}) {
  const news=posts.filter((item:any)=>item?.categorySlug===category).slice(0,4);
  if (news.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-green-700 rounded-full" />
          {title}
        </h2>
        <Link href={`/categoria/${category}`} className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1 group">
          Ver mais
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {news.map((item:any) => (
          <Link key={item.id||item.slug} href={item.href||`/noticia/${item.slug}`} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="relative h-40 overflow-hidden bg-gray-100">
              <img src={item.featured_image||'/og-image.jpg'} alt={strip(item.title)} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="w-full h-full object-cover object-[50%_22%] transition-transform duration-500 group-hover:scale-105"/>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">{strip(item.title)}</h3>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Clock className="w-3 h-3" />
                <span>{new Date(item.published_at || item.created_at || item.date).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
