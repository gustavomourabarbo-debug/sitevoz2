import { manualPolitica1109 } from './manual-politica-1109';

const LOVABLE_FEED = "https://voz-central-ai.lovable.app/api/public/voznews-feed";

const fetchHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json'
};

const categoryPlaceholders: Record<string, string[]> = {
  politica: [
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1620216525890-ffb8cf0f2bfb?w=800&auto=format&fit=crop&q=80',
  ],
  'distrito-federal': [
    'https://images.unsplash.com/photo-1600320844655-46b5d92823b2?w=800&auto=format&fit=crop&q=80',
  ],
  turismo: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80'],
  gastronomia: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80'],
  saude: ['https://images.unsplash.com/photo-1584515901387-a7a1a6337627?w=800&auto=format&fit=crop&q=80'],
  tecnologia: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'],
  esportes: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80'],
  economia: ['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80'],
  'meio-ambiente': ['https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80'],
  internacional: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'],
  cultura: ['https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=80'],
  general: ['https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80'],
};

const categoryNames: Record<string, string> = {
  politica: 'Política',
  'distrito-federal': 'Distrito Federal',
  turismo: 'Turismo',
  gastronomia: 'Gastronomia',
  saude: 'Saúde',
  tecnologia: 'Tecnologia',
  esportes: 'Esportes',
  economia: 'Economia',
  'meio-ambiente': 'Meio Ambiente',
  internacional: 'Internacional',
  cultura: 'Cultura',
};

const categoryColors: Record<string, string> = {
  politica: 'bg-red-600',
  'distrito-federal': 'bg-blue-600',
  turismo: 'bg-green-600',
  gastronomia: 'bg-orange-500',
  saude: 'bg-purple-600',
  tecnologia: 'bg-blue-500',
  esportes: 'bg-orange-600',
  economia: 'bg-yellow-600',
  'meio-ambiente': 'bg-green-700',
  internacional: 'bg-indigo-600',
  cultura: 'bg-pink-600',
};

export function decodeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&hellip;/g, '…')
    .replace(/&#8230;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function normalizeLovablePost(item: any) {
  const categorySlug = item.categorySlug || item.category_slug || 'distrito-federal';
  const category = item.category || categoryNames[categorySlug] || 'Notícias';
  const featured = item.featured_image || item.imagem_url || categoryPlaceholders[categorySlug]?.[0] || categoryPlaceholders.general[0];
  return {
    ...item,
    id: item.id,
    slug: item.slug,
    title: { rendered: item.title?.rendered || item.title || item.titulo || '' },
    content: { rendered: item.content?.rendered || item.content || item.texto || '' },
    excerpt: { rendered: item.excerpt?.rendered || item.excerpt || item.resumo || '' },
    date: item.date || item.published_at || item.enviado_em || item.created_at,
    featured_image: featured,
    categorySlug,
    category,
    categoryColor: item.categoryColor || categoryColors[categorySlug] || 'bg-blue-600',
    _embedded: item._embedded || {
      'wp:featuredmedia': [{ source_url: featured }],
      author: [{ name: item.author || 'Paulo Fayad' }],
      'wp:term': [[{ name: category, slug: categorySlug }]],
    },
  };
}

function enrichPostsWithImages(posts: any) {
  const enrich = (post: any) => {
    if (!post) return post;
    const p = normalizeLovablePost(post);
    if (!p._embedded) p._embedded = {};
    if (!p._embedded['wp:featuredmedia']) p._embedded['wp:featuredmedia'] = [{}];
    if (!p._embedded['wp:featuredmedia'][0]) p._embedded['wp:featuredmedia'][0] = {};
    p._embedded['wp:featuredmedia'][0].source_url = p.featured_image;
    return p;
  };
  return Array.isArray(posts) ? posts.map(enrich) : enrich(posts);
}

async function fetchLiveNews(limit = 12): Promise<any[] | null> {
  try {
    const res = await fetch(`${LOVABLE_FEED}?limit=${limit}`, {
      method: 'GET',
      headers: fetchHeaders,
      cache: 'no-store'
    } as any);
    if (!res.ok) return null;
    const data = await res.json();
    const items = Array.isArray(data) ? data : data.items;
    if (!Array.isArray(items)) return null;
    return items.map(normalizeLovablePost);
  } catch (err) {
    console.error('Error fetching live news:', err);
    return null;
  }
}

function loadStaticNews(): any[] {
  try {
    const localNews = require('../public/data/news.json');
    return Array.isArray(localNews) ? localNews.map(normalizeLovablePost) : [];
  } catch (err) {
    console.error('Error loading static news:', err);
    return [];
  }
}

function mergeManual(items: any[]) {
  const manual = manualPolitica1109.map(normalizeLovablePost);
  const slugs = new Set(manual.map((p: any) => p.slug));
  return [...manual, ...items.filter((p: any) => !slugs.has(p.slug))];
}

export async function getPosts(limit = 12) {
  const live = await fetchLiveNews(Math.max(limit, 150));
  const source = live && live.length > 0 ? live : loadStaticNews();
  return enrichPostsWithImages(mergeManual(source).slice(0, limit));
}

export async function getInterviewPosts(limit = 5) {
  const all = await getPosts(150);
  const interviews = all.filter((news: any) =>
    news.categorySlug === 'entrevista' ||
    news.categorySlug === 'entrevistas' ||
    news.category === 'Agenda Voz'
  );
  return interviews.slice(0, limit);
}

export async function getPostBySlug(slug: string) {
  const manual = manualPolitica1109.find((item: any) => item.slug === slug);
  if (manual) return enrichPostsWithImages(manual);

  const all = await fetchLiveNews(300);
  if (all && all.length > 0) {
    const post = all.find((item: any) => item.slug === slug);
    if (post) return enrichPostsWithImages(post);
  }

  const fallback = loadStaticNews().find((item: any) => item.slug === slug);
  return fallback ? enrichPostsWithImages(fallback) : null;
}

export async function getPostsByCategory(categoryId: number, limit = 4) {
  return getPosts(limit);
}

export async function getPostsByCategorySlug(slug: string, limit = 20, page = 1) {
  const all = await getPosts(150);
  const filtered = all.filter((news: any) => {
    if (slug === 'entrevista' || slug === 'entrevistas') {
      return news.categorySlug === 'entrevista' || news.categorySlug === 'entrevistas' || news.category === 'Agenda Voz';
    }
    return news.categorySlug === slug;
  });
  return filtered.slice((page - 1) * limit, page * limit);
}
