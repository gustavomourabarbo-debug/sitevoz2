'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { getHeroNews } from '@/lib/news-service';
import { supabase } from '@/lib/supabase';

interface HeroCarouselProps { posts?: any[]; }

const FALLBACK_IMAGE = 'https://www.camara.leg.br/internet/deputado/bandep/204374.jpg';

export default function HeroCarousel({ posts = [] }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [heroNews, setHeroNews] = useState<any[]>(posts);
  const [isLoading, setIsLoading] = useState(!posts || posts.length === 0);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadNews() {
      if (posts && posts.length > 0) { setHeroNews(posts); setIsLoading(false); return; }
      if (supabase) {
        try {
          const { data, error } = await supabase.from('news').select('*').order('published_at', { ascending: false }).limit(10);
          if (!error && data && data.length > 0 && active) {
            setHeroNews(data.map((item:any)=>({ ...item, title:{rendered:item.title}, excerpt:{rendered:item.excerpt}, date:item.published_at||item.created_at })));
            setIsLoading(false); return;
          }
        } catch (e) { console.warn('Supabase load error:', e); }
      }
      if (active) {
        try { setHeroNews(await getHeroNews(10)); }
        catch (err) { console.error('Error fetching hero news:', err); }
        finally { setIsLoading(false); }
      }
    }
    loadNews(); return () => { active = false; };
  }, [posts]);

  useEffect(() => { setImageFailed(false); }, [currentSlide]);
  useEffect(() => {
    if (!isPaused && heroNews.length > 0) {
      const interval=setInterval(()=>setCurrentSlide(prev=>(prev+1)%heroNews.length),5000);
      return ()=>clearInterval(interval);
    }
  }, [isPaused, heroNews.length]);

  if (isLoading) return <div className="h-[500px] md:h-[600px] bg-gray-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!heroNews.length) return null;
  const currentNews=heroNews[currentSlide];
  const imageSrc=!imageFailed && currentNews?.featured_image ? currentNews.featured_image : FALLBACK_IMAGE;
  const title=typeof currentNews.title==='object' ? currentNews.title?.rendered||'' : currentNews.title||'';
  const excerpt=typeof currentNews.excerpt==='object' ? currentNews.excerpt?.rendered||'' : currentNews.excerpt||'';

  return <div className="bg-white">
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white" onMouseEnter={()=>setIsPaused(true)} onMouseLeave={()=>setIsPaused(false)}>
        <div className="relative h-[300px] md:h-[460px] overflow-hidden bg-gray-100">
          <img src={imageSrc} alt={title.replace(/<[^>]+>/g,'')} onError={()=>setImageFailed(true)} className="absolute inset-0 w-full h-full object-cover object-center" />
          <span className={`absolute top-4 left-4 ${currentNews.categoryColor||'bg-green-700'} text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg`}>{currentNews.category||'Notícias'}</span>
          {heroNews.length>1 && <>
            <button onClick={()=>setCurrentSlide(p=>(p-1+heroNews.length)%heroNews.length)} aria-label="Slide anterior" className="absolute z-10 top-1/2 -translate-y-1/2 left-4 bg-black/45 text-white p-3 rounded-full"><ChevronLeft className="w-6 h-6"/></button>
            <button onClick={()=>setCurrentSlide(p=>(p+1)%heroNews.length)} aria-label="Próximo slide" className="absolute z-10 top-1/2 -translate-y-1/2 right-4 bg-black/45 text-white p-3 rounded-full"><ChevronRight className="w-6 h-6"/></button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">{heroNews.map((_:any,i:number)=><button key={i} aria-label={`Ir para slide ${i+1}`} onClick={()=>setCurrentSlide(i)} className={`h-3 rounded-full ${i===currentSlide?'bg-white w-8':'bg-white/60 w-3'}`}/>)}</div>
          </>}
        </div>
        <div className="bg-gray-950 px-6 py-6 md:px-10 md:py-8">
          <h1 className="text-xl md:text-3xl font-bold text-white leading-snug line-clamp-2">{title.replace(/<[^>]+>/g,'')}</h1>
          <p className="mt-2 text-sm md:text-base text-gray-300 leading-relaxed line-clamp-2">{excerpt.replace(/<[^>]+>/g,'')}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4"><div className="flex items-center gap-2 text-gray-400"><Clock className="w-4 h-4"/><span className="text-xs">{new Date(currentNews.published_at||currentNews.created_at||currentNews.date).toLocaleDateString('pt-BR')}</span></div><Link href={currentNews.href||`/noticia/${currentNews.slug}`} className="bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800">{currentNews.ctaLabel||'Ler Matéria Completa'}</Link></div>
        </div>
      </div>
    </div>
  </div>;
}
