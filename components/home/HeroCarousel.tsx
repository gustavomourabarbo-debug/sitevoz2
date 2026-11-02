'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { getHeroNews, EnrichedNews } from '@/lib/news-service';
import { supabase } from '@/lib/supabase';

interface HeroCarouselProps {
  posts?: any[];
}

export default function HeroCarousel({ posts = [] }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [heroNews, setHeroNews] = useState<any[]>(posts);
  const [isLoading, setIsLoading] = useState(!posts || posts.length === 0);

  useEffect(() => {
    let active = true;
    async function loadNews() {
      // Set static posts first
      if (posts && posts.length > 0) {
        setHeroNews(posts);
        setIsLoading(false);
      }

      // Se a home ja enviou os posts (curadoria server-side), respeitar 100%
      if (posts && posts.length > 0) {
        return;
      }

      // Try to fetch live news from Supabase
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('published_at', { ascending: false })
            .limit(8);

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

            setHeroNews(merged.slice(0, 8));
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
          const data = await getHeroNews(8);
          setHeroNews(data);
        } catch (err) {
          console.error('Error fetching hero news:', err);
        } finally {
          setIsLoading(false);
        }
      }
    }

    loadNews();
    return () => { active = false; };
  }, [posts]);

  useEffect(() => {
    if (!isPaused && heroNews.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroNews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, heroNews.length]);

  const nextSlide = () => {
    if (heroNews.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroNews.length);
  };

  const prevSlide = () => {
    if (heroNews.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroNews.length) % heroNews.length);
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 h-[500px] md:h-[600px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (heroNews.length === 0) return null;

  const currentNews = heroNews[currentSlide];
  const currentTitle = String(
    typeof currentNews.title === 'object' && currentNews.title !== null
      ? currentNews.title.rendered || ''
      : currentNews.title || '',
  )
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const enlargeCampaignPortrait = currentTitle.includes('celina') || currentTitle.includes('paula belmonte');

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative">
            {/* Foto sem texto por cima: nunca cobre o rosto */}
            <div className="relative h-[280px] md:h-[440px] overflow-hidden bg-gray-900">
              <div
                className="absolute inset-0 bg-cover bg-center scale-125 blur-2xl opacity-60"
                style={{ backgroundImage: `url(${currentNews.featured_image})` }}
              />
              <img
                src={currentNews.featured_image}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 w-full h-full object-contain object-center transition-all duration-700 ${
                  enlargeCampaignPortrait ? 'scale-110' : ''
                }`}
              />
              <span className={`absolute top-4 left-4 ${currentNews.categoryColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}>
                {currentNews.category}
              </span>
            </div>

            {/* Manchete em faixa propria, curta e legivel */}
            <div className="bg-gray-950 px-6 py-6 md:px-10 md:py-8">
              <div className="max-w-4xl">
                <h1 className="text-xl md:text-3xl font-bold text-white leading-snug line-clamp-2">
                  {typeof currentNews.title === 'object' && currentNews.title !== null ? (currentNews.title.rendered || '').replace(/<[^>]+>/g, '') : currentNews.title}
                </h1>

                <p className="mt-2 text-sm md:text-base text-gray-300 leading-relaxed line-clamp-2">
                  {typeof currentNews.excerpt === 'object' && currentNews.excerpt !== null ? (currentNews.excerpt.rendered || '').replace(/<[^>]+>/g, '') : currentNews.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">
                      {new Date(currentNews.published_at || currentNews.created_at || currentNews.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <Link
                    href={currentNews.href || `/noticia/${currentNews.slug}`}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
                  >
                    {currentNews.ctaLabel || 'Ler Matéria Completa'}
                  </Link>
                </div>
              </div>
            </div>

            {heroNews.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  aria-label="Slide anterior"
                  className="absolute z-10 top-[120px] left-4 md:left-4 md:top-[200px] md:bottom-auto bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Próximo slide"
                  className="absolute z-10 top-[120px] right-4 md:right-4 md:top-[200px] md:bottom-auto bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>


                <div className="absolute top-[248px] md:top-[400px] left-1/2 -translate-x-1/2 flex gap-2 z-10">

                  {heroNews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

