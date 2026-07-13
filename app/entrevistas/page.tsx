'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Play, Clock, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function EntrevistasPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInterviews() {
      // 1. Load static fallback data first
      let staticInterviews: any[] = [];
      try {
        const localNews = require('@/public/data/news.json');
        staticInterviews = localNews.filter((news: any) => 
          news.categorySlug === 'entrevista' || 
          news.categorySlug === 'entrevistas' || 
          news.category === 'Agenda Voz'
        ).map((news: any) => ({
          id: news.id,
          slug: news.slug,
          title: news.title,
          content: news.content,
          excerpt: news.excerpt,
          date: new Date(news.published_at || news.created_at).toLocaleDateString('pt-BR'),
          featured_image: news.featured_image || 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
          author: news.author || 'TV Voz de Brasília'
        }));
        setInterviews(staticInterviews);
      } catch (err) {
        console.error('Error loading static interviews:', err);
      }

      // 2. Fetch live interviews from Supabase
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('news')
            .select('*')
            .or('categoryslug.eq.entrevista,categoryslug.eq.entrevistas,category.eq.Agenda Voz,category.eq.Entrevista')
            .order('published_at', { ascending: false });

          if (!error && data && data.length > 0) {
            const formatted = data.map((item: any) => ({
              id: item.id,
              slug: item.slug,
              title: item.title,
              content: item.content,
              excerpt: item.excerpt,
              date: new Date(item.published_at || item.created_at).toLocaleDateString('pt-BR'),
              featured_image: item.featured_image || 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
              author: item.author || 'TV Voz de Brasília'
            }));

            // Merge dynamic and static, removing duplicates by slug
            const merged = [...formatted];
            const slugs = new Set(merged.map(p => p.slug));
            staticInterviews.forEach(p => {
              if (!slugs.has(p.slug)) {
                merged.push(p);
              }
            });

            setInterviews(merged);
          }
        } catch (e) {
          console.warn('Error loading live interviews from Supabase:', e);
        }
      }
      setIsLoading(false);
    }

    loadInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Entrevistas</h1>
                <p className="text-gray-600 mt-1">Conversas aprofundadas com especialistas e autoridades</p>
              </div>
            </div>
          </div>

          {isLoading && interviews.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {interviews.map((interview: any) => {
                const titulo = interview.title || '';
                const imagem = interview.featured_image;
                const autor = interview.author;
                const data = interview.date;

                return (
                  <Link
                    key={interview.id}
                    href={`/entrevista/${interview.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
                  >
                    <div className="relative overflow-hidden">
                      <div
                        className="w-full h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${imagem})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                          </div>
                        </div>

                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                          <Play className="w-3 h-3 fill-white" />
                          AO VIVO
                        </div>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h3 className="font-bold text-gray-900 text-sm mb-3 line-clamp-2 group-hover:text-green-600 transition-colors leading-tight">
                        {titulo}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <User className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm font-semibold text-gray-700 truncate">{autor}</p>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{data}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}