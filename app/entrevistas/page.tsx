import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Play, Clock, User } from 'lucide-react';
import { getInterviewPosts } from '@/lib/wordpress';

export default async function EntrevistasPage() {
  const interviews = await getInterviewPosts(20);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Entrevistas</h1>
                <p className="text-gray-600 mt-1">Conversas aprofundadas com especialistas e autoridades</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {interviews.map((interview: any) => {
              const titulo = interview.title?.rendered?.replace(/<[^>]+>/g, '') || '';
              const imagem = interview._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg';
              const autor = interview._embedded?.['author']?.[0]?.name || 'TV Voz de Brasília';
              const data = new Date(interview.date).toLocaleDateString('pt-BR');

              return (
                <Link
                  key={interview.id}
                  href={`/entrevista/${interview.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative overflow-hidden">
                    <div
                      className="w-full h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${imagem})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </div>
                      </div>

                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <Play className="w-3 h-3 fill-white" />
                        AO VIVO
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-3 line-clamp-2 group-hover:text-green-600 transition-colors leading-tight">
                      {titulo}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-semibold text-gray-700 truncate">{autor}</p>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{data}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}