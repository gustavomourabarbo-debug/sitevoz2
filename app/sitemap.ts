import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/wordpress';\nimport fs from 'fs';\nimport path from 'path';\nimport { candidateSlug, parseElectionCsv } from '@/lib/election-data';

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
    { url: `${BASE}/eleicoes/resultado-eleicoes-2026`, lastModified: now, changeFrequency: 'hourly', priority: 1 },
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

  let candidatos: MetadataRoute.Sitemap = [];\n  try { const csv=fs.readFileSync(path.join(process.cwd(),'public/documentos/planilha-eleitos-2022-comparacao-2026.csv'),'utf8'); candidatos=parseElectionCsv(csv).map(r=>({url:`${BASE}/eleicoes/candidato/${candidateSlug(r)}`,lastModified:now,changeFrequency:'monthly' as const,priority:0.8})); } catch {}\n  estaticas.push({ url: `${BASE}/eleicoes/comparativo-2022-2026`, lastModified: now, changeFrequency: 'daily', priority: 0.9 });\n  return [...estaticas, ...candidatos, ...categorias, ...noticias];
}
