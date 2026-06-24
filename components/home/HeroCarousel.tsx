'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { getHeroNews, EnrichedNews } from '@/lib/news-service';

interface HeroCarouselProps {
  posts?: any[];
}

export default function HeroCarousel({ posts }: HeroCarouselProps = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [heroNews, setHeroNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (posts && posts.length > 0) {
      setHeroNews(posts);
      setIsLoading(false);
    } else {
      async function fetchNews() {
        try {
          const data = await getHeroNews(5);
          setHeroNews(data);
        } catch (err) {
          console.error('Error fetching hero news:', err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchNews();
    }
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

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-[500px] md:h-[600px]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url(${currentNews.featured_image})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div className="max-w-4xl">
                <span className={`inline-block ${currentNews.categoryColor} text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4`}>
                  {currentNews.category}
                </span>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight line-clamp-2">
                  {typeof currentNews.title === 'object' && currentNews.title !== null ? (currentNews.title.rendered || '').replace(/<[^>]+>/g, '') : currentNews.title}
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed line-clamp-2">
                  {typeof currentNews.excerpt === 'object' && currentNews.excerpt !== null ? (currentNews.excerpt.rendered || '').replace(/<[^>]+>/g, '') : currentNews.excerpt}
                </p>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(currentNews.published_at || currentNews.created_at || currentNews.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <Link
                    href={`/noticia/${currentNews.slug}`}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    Ler Matéria Completa
                  </Link>
                </div>
              </div>
            </div>

            {heroNews.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
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

