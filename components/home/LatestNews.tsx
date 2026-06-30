'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Clock, TrendingUp } from 'lucide-react';
import { getLatestNews, EnrichedNews } from '@/lib/news-service';
import { supabase } from '@/lib/supabase';

interface LatestNewsProps {
  posts?: any[];
}

export default function LatestNews({ posts = [] }: LatestNewsProps) {
  const [offset, setOffset] = useState(0);
  const [latestNews, setLatestNews] = useState<any[]>(posts);
  const [isLoading, setIsLoading] = useState(!posts || posts.length === 0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    async function loadNews() {
      // Set static posts first
      if (posts && posts.length > 0) {
        setLatestNews(posts);
        setIsLoading(false);
      }

      // Try to fetch live news from Supabase
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('published_at', { ascending: false });

          if (!error && data && data.length > 0 && active) {
            const formatted = data.map((item: any) => ({
              id: item.id,
              slug: item.slug,
              title: { rendered: item.title },
              content: { rendered: item.content },
              excerpt: { rendered: item.excerpt },
              date: item.published_at || item.created_at,
              category: item.category,
              categorySlug: item.categorySlug,
              categoryColor: item.categoryColor,
              featured_image: item.featured_image
            }));

            // Merge live posts with fallback posts
            const merged = [...formatted];
            const slugs = new Set(merged.map(p => p.slug));
            posts.forEach(p => {
              if (!slugs.has(p.slug)) {
                merged.push(p);
              }
            });

            setLatestNews(merged);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.warn("Supabase load error, using fallbacks:", e);
        }
      }

      // Fallback if Supabase not configured or returns empty
      if ((!posts || posts.length === 0) && active) {
        try {
          const data = await getLatestNews(10);
          setLatestNews(data);
        } catch (err) {
          console.error('Error fetching latest news:', err);
        } finally {
          setIsLoading(false);
        }
      }
    }

    loadNews();
    return () => { active = false; };
  }, [posts]);

  useEffect(() => {
    if (latestNews.length === 0) return;
    const interval = setInterval(() => {
      setOffset((prev) => {
        const maxOffset = latestNews.length * 280;
        return (prev + 1) % maxOffset;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [latestNews.length]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">Últimas Notícias</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-red-600 to-transparent" />
        </div>
        <div className="h-40 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (latestNews.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-red-600" />
        <h2 className="text-2xl font-bold text-gray-900">Últimas Notícias</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-red-600 to-transparent" />
      </div>

      <div className="relative overflow-hidden" ref={containerRef}>
        <div
          className="flex gap-4 transition-transform"
          style={{
            transform: `translateX(-${offset}px)`,
            width: `${latestNews.length * 2 * 280}px`,
          }}
        >
          {[...latestNews, ...latestNews].map((news, index) => (
            <Link
              key={`${news.id}-${index}`}
              href={`/noticia/${news.slug}`}
              className="group flex-shrink-0 w-[260px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-40 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${news.featured_image})` }}
                />
                <span className={`absolute top-2 left-2 ${news.categoryColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                  {news.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {typeof news.title === 'object' && news.title !== null ? (news.title.rendered || '').replace(/<[^>]+>/g, '') : news.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>
                    {new Date(news.published_at || news.created_at || news.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

