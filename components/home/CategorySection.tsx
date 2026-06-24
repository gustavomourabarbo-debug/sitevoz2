'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { getNewsByCategory, EnrichedNews } from '@/lib/news-service';

interface CategorySectionProps {
  title?: string;
  category?: string;
}

export default function CategorySection({ title = 'Política', category = 'politica' }: CategorySectionProps = {}) {
  const [news, setNews] = useState<EnrichedNews[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getNewsByCategory(category, 4);
        setNews(data);
      } catch (err) {
        console.error(`Error fetching category ${category} news:`, err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, [category]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-green-700 rounded-full" />
            {title}
          </h2>
        </div>
        <div className="h-40 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (news.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-green-700 rounded-full" />
          {title}
        </h2>
        <Link
          href={`/categoria/${category}`}
          className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1 group"
        >
          Ver mais
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {news.map((item) => (
          <Link
            key={item.id}
            href={`/noticia/${item.slug}`}
            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="relative h-40 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.featured_image})` }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Clock className="w-3 h-3" />
                <span>
                  {new Date(item.published_at || item.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

