import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Clock } from 'lucide-react';
import { getPostsByCategorySlug } from '@/lib/wordpress';

const categoryData: Record<string, any> = {
  politica: {
    name: 'Política',
    description: 'Acompanhe as últimas notícias sobre política no Distrito Federal e no Brasil',
    color: 'from-red-600 to-red-700'
  },
  'distrito-federal': {
    name: 'Distrito Federal',
    description: 'Tudo o que acontece em Brasília e nas regiões administrativas',
    color: 'from-blue-600 to-blue-700'
  },
  turismo: {
    name: 'Turismo',
    description: 'Descubra os melhores lugares para visitar em Brasília e região',
    color: 'from-green-600 to-green-700'
  },
  saude: {
    name: 'Saúde',
    description: 'Informações sobre saúde pública, bem-estar e qualidade de vida',
    color: 'from-purple-600 to-purple-700'
  },
  tecnologia: {
    name: 'Tecnologia',
    description: 'Inovação, startups e as últimas tendências tecnológicas',
    color: 'from-blue-500 to-blue-600'
  },
  esportes: {
    name: 'Esportes',
    description: 'Cobertura completa do esporte brasiliense e brasileiro',
    color: 'from-orange-600 to-orange-700'
  },
  economia: {
    name: 'Economia',
    description: 'Notícias sobre economia, negócios e mercado financeiro',
    color: 'from-yellow-600 to-yellow-700'
  },
  'meio-ambiente': {
    name: 'Meio Ambiente',
    description: 'Sustentabilidade, preservação e questões ambientais',
    color: 'from-green-700 to-green-800'
  },
  internacional: {
    name: 'Internacional',
    description: 'Notícias do Brasil e do mundo',
    color: 'from-indigo-600 to-indigo-700'
  }
};

export async function generateStaticParams() {
  const slugs = [
    'politica',
    'distrito-federal',
    'turismo',
    'saude',
    'tecnologia',
    'esportes',
    'economia',
    'meio-ambiente',
    'internacional',
    'entrevista'
  ];
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function CategoriaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = categoryData[slug] || { name: slug, description: '', color: 'from-green-600 to-green-700' };
  const posts = await getPostsByCategorySlug(slug, 20);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4">

          {/* Cabeçalho da categoria */}
          <div className={`bg-gradient-to-r ${category.color} rounded-2xl p-12 mb-8 text-white shadow-xl`}>
            <h1 className="text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl opacity-90">{category.description}</p>
            <p className="text-sm opacity-75 mt-2">{posts.length} notícias encontradas</p>
          </div>

          {/* Grid de notícias */}
          {posts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">Nenhuma notícia encontrada nesta categoria.</p>
              <Link href="/" className="text-green-600 mt-4 inline-block hover:underline">← Voltar para a home</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => {
                const titulo = post.title?.rendered?.replace(/<[^>]+>/g, '') || '';
                const resumo = post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || '';
                const imagem = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                const data = new Date(post.date).toLocaleDateString('pt-BR', {
                  day: 'numeric', month: 'short', year: 'numeric'
                });

                return (
                  <Link
                    key={post.id}
                    href={`/noticia/${post.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      {imagem && (
                        <img
                          src={imagem}
                          alt={titulo}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {titulo}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {resumo}
                      </p>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{data}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}