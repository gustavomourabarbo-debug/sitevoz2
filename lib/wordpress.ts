const WP_API = "https://www.vozdebrasilia.com.br/wp-json/wp/v2";

const fetchHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json'
};

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

// Helper to determine the category slug from post details
function detectCategorySlug(post: any): string {
  if (!post) return 'general';
  
  if (post._embedded && post._embedded['wp:term']) {
    const terms = post._embedded['wp:term'].flat();
    for (const term of terms) {
      if (term.taxonomy === 'category') {
        const nameLower = term.name.toLowerCase();
        if (nameLower.includes('polít') || nameLower.includes('polit')) return 'politica';
        if (nameLower.includes('distr') || nameLower.includes('df') || nameLower.includes('brasíl') || nameLower.includes('brasil')) return 'distrito-federal';
        if (nameLower.includes('turis')) return 'turismo';
        if (nameLower.includes('saúd') || nameLower.includes('saud')) return 'saude';
        if (nameLower.includes('tecno')) return 'tecnologia';
        if (nameLower.includes('espor')) return 'esportes';
        if (nameLower.includes('econ') || nameLower.includes('negóc') || nameLower.includes('negoc')) return 'economia';
        if (nameLower.includes('ambie') || nameLower.includes('susten') || nameLower.includes('clima')) return 'meio-ambiente';
        if (nameLower.includes('inter') || nameLower.includes('mundo')) return 'internacional';
      }
    }
  }
  return 'general';
}

function getCategoryNameFromSlug(slug: string): string {
  const mapping: Record<string, string> = {
    'politica': 'Política',
    'distrito-federal': 'Distrito Federal',
    'turismo': 'Turismo',
    'saude': 'Saúde',
    'tecnologia': 'Tecnologia',
    'esportes': 'Esportes',
    'economia': 'Economia',
    'meio-ambiente': 'Meio Ambiente',
    'internacional': 'Internacional'
  };
  return mapping[slug] || 'Notícias';
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

// Intercepts WordPress API responses and replaces broken featured image paths with local/placeholder images
function enrichPostsWithImages(posts: any) {
  if (!posts) return posts;
  
  const processPost = (post: any) => {
    if (!post) return;
    
    const titleUpper = (post.title?.rendered || '').toUpperCase();
    let fallbackImage = '';
    
    const catSlug = detectCategorySlug(post);
    const categoryName = getCategoryNameFromSlug(catSlug);
    const categoryColor = getCategoryColor(categoryName);
    
    // Exact mapping for the top 5 articles with our custom generated high-quality local images
    if (titleUpper.includes("TV VOZ INTERNATIONAL")) {
      fallbackImage = "/news-images/itamaraty.png";
    } else if (titleUpper.includes("FESTIVAL VOZ DE BRASÍLIA")) {
      fallbackImage = "/news-images/festival.png";
    } else if (titleUpper.includes("JAQUES WAGNER")) {
      fallbackImage = "/news-images/senado.png";
    } else if (titleUpper.includes("BOLSONARO")) {
      fallbackImage = "/news-images/gavel.png";
    } else if (titleUpper.includes("VORCARO")) {
      fallbackImage = "/news-images/police.png";
    } else {
      const placeholders = categoryPlaceholders[catSlug] || categoryPlaceholders['general'];
      const imageIndex = (post.id || 0) % placeholders.length;
      fallbackImage = placeholders[imageIndex];
    }
    
    post.featured_image = fallbackImage;
    post.categorySlug = catSlug;
    post.category = categoryName;
    post.categoryColor = categoryColor;
    
    if (!post._embedded) {
      post._embedded = {};
    }
    if (!post._embedded['wp:featuredmedia']) {
      post._embedded['wp:featuredmedia'] = [{}];
    }
    if (!post._embedded['wp:featuredmedia'][0]) {
      post._embedded['wp:featuredmedia'][0] = {};
    }
    
    post._embedded['wp:featuredmedia'][0].source_url = fallbackImage;
  };

  if (Array.isArray(posts)) {
    posts.forEach(processPost);
  } else {
    processPost(posts);
  }
  
  return posts;
}

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

export async function getPosts(limit = 12) {
  try {
    const res = await fetch(
      `${WP_API}/posts?per_page=${limit}&page=1&_embed=true`,
      { 
        headers: fetchHeaders,
        next: { revalidate: 60 } 
      }
    );
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const data = await res.json();
    return enrichPostsWithImages(data);
  } catch (err) {
    console.warn('Falling back to local news for getPosts:', err);
    try {
      const localNews = require('../public/data/news.json');
      // Format localNews to look like WordPress API posts for maximum safety
      return localNews.slice(0, limit).map((news: any) => ({
        id: news.id,
        slug: news.slug,
        title: { rendered: news.title },
        content: { rendered: news.content },
        excerpt: { rendered: news.excerpt },
        date: news.published_at,
        _embedded: {
          'wp:featuredmedia': [{ source_url: news.featured_image }],
          'author': [{ name: news.author }],
          'wp:term': [[{ name: news.category, slug: news.categorySlug }]]
        }
      }));
    } catch (localErr) {
      console.error('Error loading fallback local news:', localErr);
      return [];
    }
  }
}

export async function getInterviewPosts(limit = 5) {
  try {
    const res = await fetch(
      `${WP_API}/posts?categories=59&per_page=${limit}&orderby=date&order=desc&_embed=true`,
      { 
        headers: fetchHeaders,
        next: { revalidate: 60 } 
      }
    );
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const data = await res.json();
    return enrichPostsWithImages(data);
  } catch (err) {
    console.warn('Falling back to local interviews for getInterviewPosts:', err);
    try {
      const localNews = require('../public/data/news.json');
      const interviews = localNews.filter((news: any) => news.categorySlug === 'entrevista' || news.category === 'Agenda Voz');
      return interviews.slice(0, limit).map((news: any) => ({
        id: news.id,
        slug: news.slug,
        title: { rendered: news.title },
        content: { rendered: news.content },
        excerpt: { rendered: news.excerpt },
        date: news.published_at,
        _embedded: {
          'wp:featuredmedia': [{ source_url: news.featured_image }],
          'author': [{ name: news.author }],
          'wp:term': [[{ name: news.category, slug: news.categorySlug }]]
        }
      }));
    } catch (localErr) {
      return [];
    }
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const res = await fetch(
      `${WP_API}/posts?slug=${slug}&_embed=true`,
      { 
        headers: fetchHeaders,
        next: { revalidate: 60 } 
      }
    );
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const posts = await res.json();
    const post = posts[0] || null;
    if (!post) throw new Error('Not found');
    return enrichPostsWithImages(post);
  } catch (err) {
    console.warn(`Falling back to local news for slug ${slug}:`, err);
    try {
      const localNews = require('../public/data/news.json');
      const news = localNews.find((n: any) => n.slug === slug);
      if (!news) return null;
      return {
        id: news.id,
        slug: news.slug,
        title: { rendered: news.title },
        content: { rendered: news.content },
        excerpt: { rendered: news.excerpt },
        date: news.published_at,
        _embedded: {
          'wp:featuredmedia': [{ source_url: news.featured_image }],
          'author': [{ name: news.author }],
          'wp:term': [[{ name: news.category, slug: news.categorySlug }]]
        }
      };
    } catch (localErr) {
      return null;
    }
  }
}

export async function getPostsByCategory(categoryId: number, limit = 4) {
  const res = await fetch(
    `${WP_API}/posts?categories=${categoryId}&per_page=${limit}&orderby=date&order=desc&_embed=true`,
    { 
      headers: fetchHeaders,
      next: { revalidate: 60 } 
    }
  );
  if (!res.ok) throw new Error(`Erro ao buscar posts por categoria (Status: ${res.status})`);
  const data = await res.json();
  return enrichPostsWithImages(data);
}

export async function getPostsByCategorySlug(slug: string, limit = 20, page = 1) {
  const categoryMap: Record<string, number[]> = {
    'politica': [97],
    'esportes': [574, 1557],
    'saude': [208],
    'economia': [91],
    'tecnologia': [671],
    'turismo': [92],
    'distrito-federal': [2095],
    'internacional': [318, 111],
    'entrevista': [59],
  };

  const ids = categoryMap[slug];
  if (!ids) return [];

  const res = await fetch(
    `${WP_API}/posts?categories=${ids.join(',')}&per_page=${limit}&page=${page}&orderby=date&order=desc&_embed=true`,
    { 
      headers: fetchHeaders,
      next: { revalidate: 60 } 
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return enrichPostsWithImages(data);
}