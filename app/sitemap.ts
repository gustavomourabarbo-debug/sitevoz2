import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/wordpress';

export const revalidate = 1800; // mapa do site regenerado a cada 30 min

const BASE = 'https://www.vozdebrasilia.com.br';

const CATEGORIAS = [
  'politica',
  'distrito-federal',
  'turismo',
  'saude',
  'tecnologia',
  'esportes',
  'economia',
  'cultura',
  'gastronomia',
  'entrevistas',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: any[] = [];
  try {
    posts = (await getPosts(500)) || [];
  } catch {
    posts = [];
  }

  const now = new Date();

  const estaticas: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'hourly', priority: 1 },
    { url: `${BASE}/videos`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/entrevistas`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const categorias: MetadataRoute.Sitemap = CATEGORIAS.map((slug) => ({
    url: `${BASE}/categoria/${slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const noticias: MetadataRoute.Sitemap = posts
    .filter((p: any) => p?.slug)
    .map((p: any) => ({
      url: `${BASE}/noticia/${p.slug}`,
      lastModified: p?.date ? new Date(p.date) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  return [...estaticas, ...categorias, ...noticias];
}
