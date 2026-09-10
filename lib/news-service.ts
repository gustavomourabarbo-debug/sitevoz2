import type { News } from './supabase';
import localNews from '../public/data/news.json';

export interface EnrichedNews extends News {
  categorySlug: string;
  categoryColor: string;
}

const categoryPlaceholders: Record<string, string[]> = {
  politica: [
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
  ],
  'distrito-federal': [
    'https://images.unsplash.com/photo-1600320844655-46b5d92823b2?w=800&auto=format&fit=crop&q=80',
  ],
  turismo: [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
  ],
  saude: [
    'https://images.unsplash.com/photo-1584515901387-a7a1a6337627?w=800&auto=format&fit=crop&q=80',
  ],
  tecnologia: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
  ],
  esportes: [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
  ],
  economia: [
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80',
  ],
  'meio-ambiente': [
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80',
  ],
  internacional: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
  ],
  general: [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
  ],
};

function getCategorySlug(categoryName: string): string {
  const mapping: Record<string, string> = {
    Política: 'politica',
    'Distrito Federal': 'distrito-federal',
    Turismo: 'turismo',
    Saúde: 'saude',
    Tecnologia: 'tecnologia',
    Esportes: 'esportes',
    Economia: 'economia',
    'Meio Ambiente': 'meio-ambiente',
    Internacional: 'internacional',
  };

  return mapping[categoryName] || 'distrito-federal';
}

function getCategoryColor(categoryName: string): string {
  const mapping: Record<string, string> = {
    Política: 'bg-red-600',
    'Distrito Federal': 'bg-blue-600',
    Turismo: 'bg-green-600',
    Saúde: 'bg-purple-600',
    Tecnologia: 'bg-blue-500',
    Esportes: 'bg-orange-600',
    Economia: 'bg-yellow-600',
    'Meio Ambiente': 'bg-green-700',
    Internacional: 'bg-indigo-600',
  };

  return mapping[categoryName] || 'bg-blue-600';
}

function getFallbackImage(id: string, categorySlug: string, title?: string): string {
  const titleUpper = (title || '').toUpperCase();

  if (titleUpper.includes('TV VOZ INTERNATIONAL')) return '/news-images/itamaraty.png';
  if (titleUpper.includes('FESTIVAL VOZ DE BRASÍLIA')) return '/news-images/festival.png';
  if (titleUpper.includes('JAQUES WAGNER')) return '/news-images/senado.png';
  if (titleUpper.includes('BOLSONARO')) return '/news-images/gavel.png';
  if (titleUpper.includes('VORCARO')) return '/news-images/police.png';

  const images = categoryPlaceholders[categorySlug] || categoryPlaceholders.general;
  return images[0];
}

const news: EnrichedNews[] = (localNews as any[]).map((item) => {
  const categorySlug = item.categorySlug || getCategorySlug(item.category);

  return {
    ...item,
    categorySlug,
    categoryColor: item.categoryColor || getCategoryColor(item.category),
    featured_image:
      item.featured_image ||
      getFallbackImage(String(item.id), categorySlug, item.title),
  };
});

export async function getAllNews(): Promise<EnrichedNews[]> {
  return news;
}

export async function getLatestNews(limit: number = 8): Promise<EnrichedNews[]> {
  return news.slice(0, limit);
}

export async function getHeroNews(limit: number = 5): Promise<EnrichedNews[]> {
  return news.slice(0, limit);
}

export async function getNewsByCategory(
  categorySlug: string,
  limit: number = 4
): Promise<EnrichedNews[]> {
  const filtered = news.filter((item) => item.categorySlug === categorySlug);
  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getNewsBySlug(
  slug: string
): Promise<EnrichedNews | null> {
  return news.find((item) => item.slug === slug) || null;
}

export async function getRelatedNews(
  categorySlug: string,
  currentSlug: string,
  limit: number = 3
): Promise<EnrichedNews[]> {
  return news
    .filter(
      (item) =>
        item.categorySlug === categorySlug &&
        item.slug !== currentSlug
    )
    .slice(0, limit);
}
