import type { News } from './supabase';
import currentNews from '../public/data/news-current.json';
import archiveNews from '../public/data/news.json';

export interface EnrichedNews extends News {
  categorySlug: string;
  categoryColor: string;
}

const current = currentNews as any[];
const archive = archiveNews as any[];
const currentSlugs = new Set(current.map((n) => n.slug));
const combined = [...current, ...archive.filter((n) => !currentSlugs.has(n.slug) && n.id !== '900001')];

const news: EnrichedNews[] = combined.map((item: any) => ({
  ...item,
  categorySlug: item.categorySlug || 'distrito-federal',
  categoryColor: item.categoryColor || 'bg-blue-600',
  featured_image: item.featured_image || '/news-images/senado.png',
})) as EnrichedNews[];

export async function getAllNews(): Promise<EnrichedNews[]> { return news; }
export async function getLatestNews(limit = 8): Promise<EnrichedNews[]> { return news.slice(0, limit); }
export async function getHeroNews(limit = 5): Promise<EnrichedNews[]> { return news.slice(0, limit); }
export async function getNewsByCategory(categorySlug: string, limit = 4): Promise<EnrichedNews[]> {
  const filtered = news.filter((item) => item.categorySlug === categorySlug);
  return limit ? filtered.slice(0, limit) : filtered;
}
export async function getNewsBySlug(slug: string): Promise<EnrichedNews | null> {
  return news.find((item) => item.slug === slug) || null;
}
export async function getRelatedNews(categorySlug: string, currentSlug: string, limit = 3): Promise<EnrichedNews[]> {
  return news.filter((item) => item.categorySlug === categorySlug && item.slug !== currentSlug).slice(0, limit);
}
