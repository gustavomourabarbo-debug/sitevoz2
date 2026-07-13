'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Clock, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface InterviewsSectionProps {
  posts: any[];
}

export default function InterviewsSection({
  posts,
}: InterviewsSectionProps) {
  const [interviews, setInterviews] = useState<any[]>([]);

  useEffect(() => {
    // 1. Format and load initial static posts passed as props
    const formattedStatic = posts.map((post) => ({
      id: post.id,
      title: post.title?.rendered || post.title || 'Sem título',
      guest: post.author || 'TV Voz de Brasília',
      role: 'Entrevista Exclusiva',
      image: post.featured_image || (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) || 'https://via.placeholder.com/600x400?text=Entrevista',
      duration: 'AO VIVO',
      date: post.date || new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR'),
      slug: post.slug || '',
    }));
    setInterviews(formattedStatic);

    // 2. Fetch live interviews from Supabase at runtime
    async function loadLiveInterviews() {
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('news')
            .select('*')
            .or('categoryslug.eq.entrevista,categoryslug.eq.entrevistas,category.eq.Agenda Voz,category.eq.Entrevista')
            .order('published_at', { ascending: false });

          if (!error && data && data.length > 0) {
            const formattedLive = data.map((item: any) => ({
              id: item.id,
              title: item.title,
              guest: item.author || 'TV Voz de Brasília',
              role: 'Entrevista Exclusiva',
              image: item.featured_image || 'https://via.placeholder.com/600x400?text=Entrevista',
              duration: 'AO VIVO',
              date: new Date(item.published_at || item.created_at).toLocaleDateString('pt-BR'),
              slug: item.slug,
            }));

            // Merge and de-duplicate by slug
            const merged = [...formattedLive];
            const slugs = new Set(merged.map(p => p.slug));
            formattedStatic.forEach(p => {
              if (!slugs.has(p.slug)) {
                merged.push(p);
              }
            });

            setInterviews(merged.slice(0, 40));
          }
        } catch (e) {
          console.warn('Error loading live interviews from Supabase:', e);
        }
      }
    }

    loadLiveInterviews();
  }, [posts]);

  if (!interviews.length) {
    return <div>Nenhuma entrevista encontrada.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Últimas Entrevistas
          </h2>
        </div>

        <Link
          href="/entrevistas"
          className="text-green-600 hover:text-green-700 font-semibold transition-colors hidden md:block"
        >
          Ver todas as entrevistas
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {interviews.slice(0, 5).map((interview) => (
          <Link
            key={interview.id}
            href={`/entrevista/${interview.slug}`}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
          >
            <div className="relative overflow-hidden">
              <div
                className="w-full h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${interview.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-semibold">
                  {interview.duration}
                </div>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3
                className="font-bold text-gray-900 text-sm mb-3 line-clamp-2 group-hover:text-green-600 transition-colors leading-tight"
                dangerouslySetInnerHTML={{ __html: interview.title }}
              />

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {interview.guest}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {interview.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{interview.date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center md:hidden">
        <Link
          href="/entrevistas"
          className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all"
        >
          Ver todas as entrevistas
        </Link>
      </div>
    </div>
  );
}