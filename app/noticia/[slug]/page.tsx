import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Clock, Facebook, Twitter, Mail } from 'lucide-react';
import { getPostBySlug, getPosts } from '@/lib/wordpress';
import AdComponent from '@/components/common/AdComponent';

export async function generateStaticParams() {
  try {
    const posts = await getPosts(200);
    return posts.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (err) {
    console.error('Error generating static params for news detail:', err);
    return [];
  }
}

export default async function NoticiaPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  const related = await getPosts(6);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-12 text-center">
          <h1 className="text-2xl font-bold text-gray-700">
            Notícia não encontrada.
          </h1>
          <Link href="/" className="text-green-600 mt-4 inline-block">
            ← Voltar para a home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const titulo = post.title?.rendered?.replace(/<[^>]+>/g, '') || '';
  const conteudo = post.content?.rendered || '';
  const imagem =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  const autor =
    post._embedded?.author?.[0]?.name || 'TV Voz de Brasília';
  const categoria =
    post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Notícia';
  const categoriaSlug =
    post._embedded?.['wp:term']?.[0]?.[0]?.slug || '';
  const data = new Date(post.date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const shareUrl = encodeURIComponent(
    'https://vozdebrasilia.com.br/noticia/' + post.slug
  );
  const shareText = encodeURIComponent(titulo);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CONTEÚDO PRINCIPAL */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                {imagem && (
                  <img
                    src={imagem}
                    alt={titulo}
                    className="w-full h-96 object-cover"
                  />
                )}

                <div className="p-8 md:p-12">
                  <div className="mb-4">
                    <Link
                      href={'/categoria/' + categoriaSlug}
                      className="inline-block bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors"
                    >
                      {categoria}
                    </Link>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {titulo}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        {autor.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {autor}
                        </div>
                        <div className="text-sm text-gray-500">Redator</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{data}</span>
                    </div>
                  </div>

                  {/* COMPARTILHAMENTO */}
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-sm font-semibold text-gray-700">
                      Compartilhar:
                    </span>

                    <a
                      href={
                        'https://www.facebook.com/sharer/sharer.php?u=' +
                        shareUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>

                    <a
                      href={
                        'https://twitter.com/intent/tweet?url=' +
                        shareUrl +
                        '&text=' +
                        shareText
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>

                    <a
                      href={
                        'https://api.whatsapp.com/send?text=' +
                        shareText +
                        '%20' +
                        shareUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>

                  {/* CONTEÚDO WORDPRESS */}
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: conteudo }}
                    style={{
                      lineHeight: '1.8',
                      fontSize: '1.1rem',
                      color: '#374151',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 flex flex-col items-center">
                  <span className="text-[10px] text-gray-400 font-semibold mb-2 tracking-wider">PUBLICIDADE</span>
                  <AdComponent token="02cda84a0e4149c2855e170b9c26dedd" width="300" height="250" />
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg border-b pb-2">
                    Últimas Notícias
                  </h3>

                  <div className="space-y-4">
                    {related
                      .filter((r: any) => r.slug !== params.slug)
                      .slice(0, 5)
                      .map((r: any) => {
                        const rTitulo =
                          r.title?.rendered?.replace(/<[^>]+>/g, '') || '';
                        const rImagem =
                          r._embedded?.['wp:featuredmedia']?.[0]
                            ?.source_url || '';
                        const rData = new Date(r.date).toLocaleDateString(
                          'pt-BR'
                        );

                        return (
                          <Link
                            key={r.id}
                            href={'/noticia/' + r.slug}
                            className="group flex gap-3"
                          >
                            {rImagem && (
                              <img
                                src={rImagem}
                                alt={rTitulo}
                                className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                              />
                            )}

                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                                {rTitulo}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {rData}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 BANNER RODAPÉ */}
        <div className="w-full text-center my-8 px-4">
          <AdComponent token="cad1456400464e69a8a7ada3d2ccab43" width="728" height="90" />
        </div>
      </main>

      <Footer />
    </div>
  );
}