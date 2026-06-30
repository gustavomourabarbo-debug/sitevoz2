import { supabase, News } from './supabase';
import localNews from '../public/data/news.json';

// Extend News type with helper fields if needed
export interface EnrichedNews extends News {
  categorySlug: string;
  categoryColor: string;
}

// High-quality category-specific Unsplash images to bypass broken WordPress uploads paths
const categoryPlaceholders: Record<string, string[]> = {
  'politica': [
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1620216525890-ffb8cf0f2bfb?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80'
  ],
  'distrito-federal': [
    'https://images.unsplash.com/photo-1600320844655-46b5d92823b2?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1597843797221-77df98f8280f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1620216525890-ffb8cf0f2bfb?w=800&auto=format&fit=crop&q=80'
  ],
  'turismo': [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=80'
  ],
  'saude': [
    'https://images.unsplash.com/photo-1584515901387-a7a1a6337627?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&auto=format&fit=crop&q=80'
  ],
  'tecnologia': [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
  ],
  'esportes': [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=80'
  ],
  'economia': [
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80'
  ],
  'meio-ambiente': [
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80'
  ],
  'internacional': [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80'
  ],
  'general': [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1495020689067-958852a6565d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=800&auto=format&fit=crop&q=80'
  ]
};

function getFallbackImage(idStr: string, catSlug: string, title?: string): string {
  const titleUpper = (title || '').toUpperCase();
  if (titleUpper.includes("TV VOZ INTERNATIONAL")) {
    return "/news-images/itamaraty.png";
  } else if (titleUpper.includes("FESTIVAL VOZ DE BRASÍLIA")) {
    return "/news-images/festival.png";
  } else if (titleUpper.includes("JAQUES WAGNER")) {
    return "/news-images/senado.png";
  } else if (titleUpper.includes("BOLSONARO")) {
    return "/news-images/gavel.png";
  } else if (titleUpper.includes("VORCARO")) {
    return "/news-images/police.png";
  }
  
  const numericId = parseInt(idStr.replace(/[^0-9]/g, '')) || 0;
  const placeholders = categoryPlaceholders[catSlug] || categoryPlaceholders['general'];
  return placeholders[numericId % placeholders.length];
}

const rawFallbackNews = localNews as EnrichedNews[];
const fallbackNews = rawFallbackNews.map(item => ({
  ...item,
  featured_image: getFallbackImage(item.id, item.categorySlug || 'general', item.title)
}));

export async function getAllNews(): Promise<EnrichedNews[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });
        
      if (!error && data && data.length > 0) {
        const liveNews = data.map((item: any) => {
          const catSlug = getCategorySlug(item.category);
          return {
            ...item,
            categorySlug: catSlug,
            categoryColor: getCategoryColor(item.category),
            featured_image: item.featured_image || getFallbackImage(item.id, catSlug, item.title)
          };
        });
        
        // Merge: liveNews first, then fallbackNews (removing duplicates by slug)
        const all = [...liveNews];
        const slugs = new Set(all.map(item => item.slug));
        for (const item of fallbackNews) {
          if (!slugs.has(item.slug)) {
            all.push(item);
          }
        }
        return all;
      }
    }
  } catch (err) {
    console.warn('Supabase not available in getAllNews, returning fallback:', err);
  }
  return fallbackNews;
}

export async function getLatestNews(limit: number = 8): Promise<EnrichedNews[]> {
  const news = await getAllNews();
  return news.slice(0, limit);
}

export async function getHeroNews(limit: number = 5): Promise<EnrichedNews[]> {
  const news = await getAllNews();
  return news.slice(0, limit);
}

export async function getNewsByCategory(categorySlug: string, limit: number = 4): Promise<EnrichedNews[]> {
  const news = await getAllNews();
  const filtered = news.filter(item => item.categorySlug === categorySlug);
  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getNewsBySlug(slug: string): Promise<EnrichedNews | null> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (!error && data) {
        const catSlug = getCategorySlug(data.category);
        return {
          ...data,
          categorySlug: catSlug,
          categoryColor: getCategoryColor(data.category),
          featured_image: getFallbackImage(data.id, catSlug, data.title)
        };
      }
    }
  } catch (err) {
    console.warn('Supabase not available, searching locally for slug:', slug, err);
  }
  
  const news = await getAllNews();
  return news.find(item => item.slug === slug) || null;
}

export async function getRelatedNews(categorySlug: string, currentSlug: string, limit: number = 3): Promise<EnrichedNews[]> {
  const news = await getAllNews();
  return news
    .filter(item => item.categorySlug === categorySlug && item.slug !== currentSlug)
    .slice(0, limit);
}

// Helpers
function getCategorySlug(categoryName: string): string {
  const mapping: Record<string, string> = {
    'Política': 'politica',
    'Distrito Federal': 'distrito-federal',
    'Turismo': 'turismo',
    'Saúde': 'saude',
    'Tecnologia': 'tecnologia',
    'Esportes': 'esportes',
    'Economia': 'economia',
    'Meio Ambiente': 'meio-ambiente',
    'Internacional': 'internacional'
  };
  return mapping[categoryName] || 'distrito-federal';
}

function getCategoryColor(categoryName: string): string {
  const mapping: Record<string, string> = {
    'Política': 'bg-red-600',
    'Distrito Federal': 'bg-blue-600',
    'Turismo': 'bg-green-600',
    'Saúde': 'bg-purple-600',
    'Tecnologia': 'bg-blue-500',
    'Esportes': 'bg-orange-600',
    'Economia': 'bg-yellow-600',
    'Meio Ambiente': 'bg-green-700',
    'Internacional': 'bg-indigo-600'
  };
  return mapping[categoryName] || 'bg-blue-600';
}
