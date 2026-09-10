import currentNews from '../public/data/news-current.json';
import archiveNews from '../public/data/news.json';

const categoryPlaceholders: Record<string, string> = {
  politica: '/news-images/senado.png',
  'distrito-federal': 'https://images.unsplash.com/photo-1600320844655-46b5d92823b2?w=800&auto=format&fit=crop&q=80',
  turismo: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
  saude: 'https://images.unsplash.com/photo-1584515901387-a7a1a6337627?w=800&auto=format&fit=crop&q=80',
  tecnologia: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
  esportes: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
  economia: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80',
  internacional: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
  cultura: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
};

export function decodeHtml(text: string): string {
  if (!text) return '';
  return text.replace(/&hellip;/g, '…').replace(/&#8230;/g, '…').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '').trim();
}

function normalize(item: any) {
  const categorySlug = item.categorySlug || 'distrito-federal';
  const image = item.featured_image || categoryPlaceholders[categorySlug] || '/news-images/senado.png';
  return {
    ...item,
    title: { rendered: item.title?.rendered || item.title || '' },
    content: { rendered: item.content?.rendered || item.content || '' },
    excerpt: { rendered: item.excerpt?.rendered || item.excerpt || '' },
    date: item.date || item.published_at || item.created_at,
    featured_image: image,
    categorySlug,
    category: item.category || 'Notícias',
    categoryColor: item.categoryColor || 'bg-blue-600',
    _embedded: {
      'wp:featuredmedia': [{ source_url: image }],
      author: [{ name: item.author || 'Redação Voz de Brasília' }],
      'wp:term': [[{ name: item.category || 'Notícias', slug: categorySlug }]],
    },
  };
}

function allNews(): any[] {
  const current = currentNews as any[];
  const archive = archiveNews as any[];
  const currentSlugs = new Set(current.map((n) => n.slug));
  return [...current, ...archive.filter((n) => !currentSlugs.has(n.slug) && n.id !== '900001')];
}

export async function getPosts(limit = 12) {
  return allNews().slice(0, limit).map(normalize);
}

export async function getInterviewPosts(limit = 5) {
  return allNews().filter((n: any) => n.categorySlug === 'entrevista' || n.categorySlug === 'entrevistas' || n.category === 'Agenda Voz').slice(0, limit).map(normalize);
}

export async function getPostBySlug(slug: string) {
  const post = allNews().find((n: any) => n.slug === slug);
  return post ? normalize(post) : null;
}

export async function getPostsByCategory(categoryId: number, limit = 4) {
  return getPosts(limit);
}

export async function getPostsByCategorySlug(slug: string, limit = 20, page = 1) {
  const filtered = allNews().filter((n: any) => {
    if (slug === 'entrevista' || slug === 'entrevistas') return n.categorySlug === 'entrevista' || n.categorySlug === 'entrevistas' || n.category === 'Agenda Voz';
    return n.categorySlug === slug;
  });
  return filtered.slice((page - 1) * limit, page * limit).map(normalize);
}
