'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Play, Clock, User, Facebook, Twitter, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdComponent from '@/components/common/AdComponent';

export default function DynamicEntrevistaPage() {
  const [slug, setSlug] = useState<string | null>(null);
  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const match = path.match(/\/entrevista\/([^/]+)/);
      if (match && match[1] && match[1] !== 'page' && match[1] !== 'index.html') {
        setSlug(match[1]);
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        setSlug(urlParams.get('slug'));
      }
    }
  }, []);

  useEffect(() => {
    if (slug === null) return;
    if (!slug) {
      setIsLoading(false);
      return;
    }

    async function loadPost() {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch interview post by slug
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('slug', slug)
          .single();

        if (!error && data) {
          setPost(data);
        }

        // Fetch related interviews
        const { data: relatedData } = await supabase
          .from('news')
          .select('*')
          .or('categoryslug.eq.entrevista,categoryslug.eq.entrevistas,category.eq.Agenda Voz,category.eq.Entrevista')
          .limit(6);
        
        if (relatedData) {
          setRelated(relatedData);
        }
      } catch (err) {
        console.error('Error loading dynamic interview post:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-12 flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-12 text-center">
          <h1 className="text-2xl font-bold text-gray-700">
            Entrevista não encontrada ou ainda está sendo publicada.
          </h1>
          <Link href="/entrevistas" className="text-green-600 mt-4 inline-block">
            ← Voltar para entrevistas
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const titulo = post.title || '';
  const conteudo = post.content || '';
  const imagem = post.featured_image || '';
  const autor = post.author || 'TV Voz de Brasília';
  const data = new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Extract YouTube video URL from content
  const videoMatch = conteudo.match(
    /(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/
  );
  const videoId = videoMatch?.[1] || null;
  const videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  const shareUrl = encodeURIComponent(
    'https://vozdebrasilia.com.br/entrevista/' + post.slug
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
                
                {/* Player de vídeo ou imagem */}
                {videoUrl ? (
                  <div className="relative" style={{ paddingTop: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={videoUrl}
                      title={titulo}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : imagem ? (
                  <img
                    src={imagem}
                    alt={titulo}
                    className="w-full h-96 object-cover"
                  />
                ) : null}

                <div className="p-8 md:p-12">
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                      <Play className="w-4 h-4 fill-white" />
                      ENTREVISTA
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {titulo}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {autor.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{autor}</div>
                        <div className="text-sm text-gray-600">Entrevista Exclusiva</div>
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
                      href={'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>

                    <a
                      href={'https://twitter.com/intent/tweet?url=' + shareUrl + '&text=' + shareText}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>

                    <a
                      href={'https://api.whatsapp.com/send?text=' + shareText + '%20' + shareUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>

                  {/* CONTEÚDO REAL */}
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
                  <h3 className="font-bold text-gray-900 mb-4 text-lg border-b pb-2 flex items-center gap-2">
                    <Play className="w-5 h-5 text-green-600" />
                    Outras Entrevistas
                  </h3>

                  <div className="space-y-4">
                    {related
                      .filter((r: any) => r.slug !== slug)
                      .slice(0, 5)
                      .map((r: any) => {
                        const rTitulo = r.title || '';
                        const rImagem = r.featured_image || '';
                        const rData = new Date(r.published_at || r.created_at).toLocaleDateString('pt-BR');
                        return (
                          <Link
                            key={r.id}
                            href={`/entrevista/${r.slug}`}
                            className="group flex gap-3"
                          >
                            {rImagem && (
                              <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                                <img
                                  src={rImagem}
                                  alt={rTitulo}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <Play className="w-4 h-4 text-white fill-white" />
                                </div>
                              </div>
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
      </main>

      <Footer />
    </div>
  );
}
