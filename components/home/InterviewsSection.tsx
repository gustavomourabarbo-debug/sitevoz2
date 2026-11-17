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
      image: post.featured_image || (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) || '',
      duration: 'ACERVO',
      date: post.date || new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR'),
      slug: post.slug || '',
    }));
    setInterviews(formattedStatic.filter((p) => Boolean(p.image && p.slug)));

    // 2. Fetch live interviews from Supabase at runtime
    async function loadLiveInterviews() {
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('news')
            .select('*')
            .in('category', ['Entrevista', 'Entrevistas', 'Agenda Voz'])
            .order('published_at', { ascending: false });

          if (!error && data && data.length > 0) {
            const formattedLive = data.map((item: any) => ({
              id: item.id,
              title: item.title,
              guest: item.author || 'TV Voz de Brasília',
              role: 'Entrevista Exclusiva',
              image: item.featured_image || '',
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

            setInterviews(merged.filter((p) => Boolean(p.image && p.slug)).slice(0, 40));
          }
        } catch (e) {
          console.warn('Error loading live interviews from Supabase:', e);
        }
      }
    }

    loadLiveInterviews();
  }, [posts]);

  if (!interviews.length) {
    return (
      <section className="rounded-xl border border-green-200 bg-white p-6" aria-label="Entrevistas da TV Voz de Brasília">
        <h2 className="text-2xl font-bold text-gray-900">Entrevistas de Paulo Fayad</h2>
        <p className="mt-2 text-gray-700">Assista às entrevistas autorais da TV Voz de Brasília com lideranças do Distrito Federal e do Congresso Nacional.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { name: 'Júlio César Ribeiro', href: '/entrevistas', image: 'https://www.camara.leg.br/internet/deputado/bandep/204372.jpg' },
            { name: 'Erika Kokay', href: '/entrevistas', image: 'https://www.camara.leg.br/internet/deputado/bandep/160575.jpg' },
            { name: 'Chico Vigilante', href: '/entrevistas', image: 'https://www.cl.df.gov.br/documents/10162/33185635/Chico%2BVigilante%2B-%2B2023-2026.jpg/b2187cf2-5479-e17f-861d-8212b201ac73?imageThumbnail=3&t=1740158439023' },
          ].map((item) => (
            <Link key={item.name} href={item.href} className="overflow-hidden rounded-xl border border-gray-200 bg-slate-50 hover:shadow-md">
              <img src={item.image} alt={item.name} loading="lazy" className="h-44 w-full object-cover object-top" />
              <div className="p-4"><h3 className="font-bold text-gray-900">Entrevista com {item.name}</h3><p className="mt-2 text-sm text-green-700">Consultar acervo de entrevistas</p></div>
            </Link>
          ))}
        </div>
        <Link href="/entrevistas" className="mt-4 inline-block rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800">Ver entrevistas</Link>
      </section>
    );
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