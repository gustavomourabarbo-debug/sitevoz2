'use client';
 
import Link from 'next/link';
import { TrendingUp, Play, DollarSign, Cloud } from 'lucide-react';
import { useEffect, useState } from 'react';
 
export default function Sidebar() {
  const [mostRead, setMostRead] = useState<any[]>([]);
  const [recentVideos, setRecentVideos] = useState<any[]>([]);
 
  useEffect(() => {
    fetch('https://www.vozdebrasilia.com.br/wp-json/wp/v2/posts?per_page=5&orderby=comment_count&order=desc&_embed=true')
      .then(r => r.json())
      .then(data => setMostRead(Array.isArray(data) ? data : []))
      .catch(() => {});
 
    fetch('https://www.vozdebrasilia.com.br/wp-json/wp/v2/posts?categories=59&per_page=3&orderby=date&order=desc&_embed=true')
      .then(r => r.json())
      .then(data => setRecentVideos(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);
 
  return (
    <div className="space-y-6">
 
      {/* Banner topo - GDF */}
      <div className="w-full">
        <a
          href="https://agenciabrasilia.df.gov.br/w/gdf-que-fez-acoes-do-governo-contribuem-para-melhorar-a-vida-da-populacao-em-diversas-areas"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <img
            src="https://www.vozdebrasilia.com.br/wp-content/uploads/2026/04/Gif-.gif"
            alt="Banner GDF"
            className="w-full h-auto rounded-xl"
          />
        </a>
      </div>
 
      {/* Banner Azulão Transportes */}
      <div className="w-full">
        <a
          href="https://www.instagram.com/azulao_transportes/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <img
            src="https://www.vozdebrasilia.com.br/wp-content/uploads/2026/04/d4092420-4f6d-4f19-a97f-ff91615e4cdd-1.png"
            alt="Azulão Transportes"
            className="w-full h-auto rounded-xl"
          />
        </a>
      </div>
 
      {/* Mais Lidas */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-gray-900">Mais Lidas</h3>
        </div>
        <div className="space-y-4">
          {mostRead.length === 0 ? (
            <p className="text-sm text-gray-400">Carregando...</p>
          ) : (
            mostRead.map((post: any, index: number) => {
              const titulo = post.title?.rendered?.replace(/<[^>]+>/g, '') || '';
              return (
                <Link
                  key={post.id}
                  href={`/noticia/${post.slug}`}
                  className="group flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors mb-1">
                      {titulo}
                    </h4>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
 
      {/* Vídeos Recentes */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-gray-900">Vídeos Recentes</h3>
        </div>
        <div className="space-y-4">
          {recentVideos.length === 0 ? (
            <p className="text-sm text-gray-400">Carregando...</p>
          ) : (
            recentVideos.map((video: any) => {
              const titulo = video.title?.rendered?.replace(/<[^>]+>/g, '') || '';
              const imagem =
                video._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg';
              return (
                <Link
                  key={video.id}
                  href={`/entrevista/${video.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-lg mb-2">
                    <div
                      className="w-full h-32 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(${imagem})` }}
                    >
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-green-600 fill-green-600 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {titulo}
                  </h4>
                </Link>
              );
            })
          )}
        </div>
      </div>
 
      {/* Clima & Economia */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-md p-6 text-white">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Clima & Economia
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
            <div>
              <div className="text-xs opacity-75 mb-1">Brasília</div>
              <div className="font-bold text-2xl">28°C</div>
              <div className="text-xs opacity-75">Parcialmente nublado</div>
            </div>
            <div className="text-4xl">☁️</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
            <div>
              <div className="text-xs opacity-75 mb-1">Dólar</div>
              <div className="font-bold text-xl flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                R$ 4,85
              </div>
              <div className="text-xs text-green-400">↓ -0,5%</div>
            </div>
            <div>
              <div className="text-xs opacity-75 mb-1">Euro</div>
              <div className="font-bold text-xl">R$ 5,32</div>
              <div className="text-xs text-red-400">↑ +0,2%</div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Banner rodapé */}
      <div className="w-full">
        <a
          href="https://agenciabrasilia.df.gov.br/w/gdf-que-fez-acoes-do-governo-contribuem-para-melhorar-a-vida-da-populacao-em-diversas-areas"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <img
            src="https://www.vozdebrasilia.com.br/wp-content/uploads/2026/03/728x90-1.gif"
            alt="Banner publicitário"
            className="w-full h-auto rounded-xl"
          />
        </a>
      </div>
 
    </div>
  );
}