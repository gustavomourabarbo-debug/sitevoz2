const fs = require('fs');
const path = require('path');
const https = require('https');

// Helper to download json from url using Node's standard https library
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse JSON: ${e.message}`));
          }
        } else {
          reject(new Error(`HTTP error! Status: ${res.statusCode}. Body: ${data.substring(0, 100)}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Map WP categories to TV Voz de Brasília categories
function mapCategory(wpTerms) {
  if (!wpTerms || !Array.isArray(wpTerms)) return 'Distrito Federal';
  
  // Flatten terms array
  const terms = wpTerms.flat();
  
  // List of target categories
  const targetCategories = [
    { name: 'Política', matches: ['política', 'politica', 'governo', 'senado', 'câmara', 'camara', 'deputado', 'eleições'] },
    { name: 'Distrito Federal', matches: ['distrito federal', 'df', 'brasília', 'brasilia', 'plano piloto', 'ceilândia', 'taguatinga'] },
    { name: 'Turismo', matches: ['turismo', 'viagem', 'passeio', 'hotel', 'gastronomia', 'restaurante'] },
    { name: 'Saúde', matches: ['saúde', 'saude', 'vacina', 'hospital', 'médico', 'medico', 'gripe', 'covid'] },
    { name: 'Tecnologia', matches: ['tecnologia', 'inovação', 'inovacao', 'startup', 'celular', 'internet', '5g'] },
    { name: 'Esportes', matches: ['esportes', 'esporte', 'futebol', 'jogo', 'atleta', 'campeonato'] },
    { name: 'Economia', matches: ['economia', 'finanças', 'financas', 'mercado', 'dólar', 'dolar', 'inflação', 'pib', 'emprego'] },
    { name: 'Meio Ambiente', matches: ['meio ambiente', 'sustentabilidade', 'clima', 'chuva', 'parque', 'floresta'] },
    { name: 'Internacional', matches: ['internacional', 'mundo', 'exterior', 'global', 'país', 'pais'] }
  ];

  for (const term of terms) {
    if (!term || !term.name) continue;
    const nameLower = term.name.toLowerCase();
    
    // Check direct matches
    for (const cat of targetCategories) {
      if (cat.matches.some(keyword => nameLower.includes(keyword) || keyword.includes(nameLower))) {
        return cat.name;
      }
    }
  }

  // Fallback to the first category found in terms, or Distrito Federal
  const firstCatTerm = terms.find(t => t.taxonomy === 'category');
  return firstCatTerm ? firstCatTerm.name : 'Distrito Federal';
}

// Convert category name to slug
function getCategorySlug(categoryName) {
  const mapping = {
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

// Get category background color
function getCategoryColor(categoryName) {
  const mapping = {
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

async function run() {
  console.log('Iniciando importação de notícias da Voz de Brasília...');
  
  try {
    // 1. Fetch posts from WordPress API
    const wpUrl = 'https://www.vozdebrasilia.com.br/wp-json/wp/v2/posts?_embed&per_page=40';
    console.log(`Buscando posts de: ${wpUrl}`);
    const posts = await fetchJson(wpUrl);
    console.log(`Sucesso! ${posts.length} posts recuperados.`);

    // 2. Process and map posts to our News structure
    const newsList = posts.map((post) => {
      // Find featured image in _embedded
      let featuredImage = null;
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        const media = post._embedded['wp:featuredmedia'][0];
        featuredImage = media.source_url || (media.media_details && media.media_details.sizes && media.media_details.sizes.large ? media.media_details.sizes.large.source_url : null);
      }
      
      // Fallback: try to extract first image from content
      if (!featuredImage && post.content && post.content.rendered) {
        const imgMatch = post.content.rendered.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) {
          featuredImage = imgMatch[1];
        }
      }

      // Fallback: use a placeholder if no image found
      if (!featuredImage) {
        featuredImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';
      }

      // Map Category
      const categoryName = mapCategory(post._embedded && post._embedded['wp:term'] ? post._embedded['wp:term'] : []);
      const categorySlug = getCategorySlug(categoryName);
      const categoryColor = getCategoryColor(categoryName);

      // Get Author
      let authorName = 'Redação';
      if (post._embedded && post._embedded['author'] && post._embedded['author'][0]) {
        authorName = post._embedded['author'][0].name || 'Redação';
      }

      // Get Tags
      let tags = [];
      if (post._embedded && post._embedded['wp:term']) {
        const terms = post._embedded['wp:term'].flat();
        tags = terms.filter(t => t.taxonomy === 'post_tag').map(t => t.name);
      }

      // Clean HTML helper
      const cleanHtml = (html) => {
        return html ? html.replace(/<[^>]*>?/gm, '').trim() : '';
      };

      const title = cleanHtml(post.title.rendered);
      const excerpt = cleanHtml(post.excerpt.rendered) || title;
      
      return {
        id: post.id.toString(),
        title: title,
        slug: post.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        content: post.content.rendered,
        excerpt: excerpt,
        category: categoryName,
        categorySlug: categorySlug,
        categoryColor: categoryColor,
        featured_image: featuredImage,
        author: authorName,
        tags: tags,
        status: 'published',
        views: Math.floor(Math.random() * 1500) + 100, // mock views
        published_at: post.date,
        created_at: post.date,
        updated_at: post.modified || post.date
      };
    });

    // 3. Save to local JSON file
    const dataDir = path.join(__dirname, '..', 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const outputPath = path.join(dataDir, 'news.json');
    fs.writeFileSync(outputPath, JSON.stringify(newsList, null, 2), 'utf-8');
    console.log(`Arquivo salvo com sucesso em: ${outputPath}`);

    // 4. Try updating Supabase if env vars are present
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseServiceKey) {
      console.log('Supabase configurado! Tentando sincronizar com o banco de dados...');
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      for (const item of newsList) {
        const { error } = await supabase
          .from('news')
          .upsert({
            title: item.title,
            slug: item.slug,
            content: item.content,
            excerpt: item.excerpt,
            category: item.category,
            featured_image: item.featured_image,
            author: item.author,
            tags: item.tags,
            status: item.status,
            published_at: item.published_at,
            updated_at: item.updated_at
          }, { onConflict: 'slug' });
          
        if (error) {
          console.error(`Erro ao inserir post "${item.title}":`, error.message);
        }
      }
      console.log('Sincronização com o Supabase concluída.');
    } else {
      console.log('Supabase não configurado ou chaves ausentes. Pulando sincronização de DB.');
    }

  } catch (error) {
    console.error('Erro durante a execução do script de importação:', error);
  }
}

run();
