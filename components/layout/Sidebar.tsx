'use client';
 
import Link from 'next/link';
import { TrendingUp, Play, DollarSign, Cloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdComponent from '../common/AdComponent';
 
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

      {/* Anúncio 300x250 */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 flex flex-col items-center">
        <span className="text-[10px] text-gray-400 font-semibold mb-2 tracking-wider">PUBLICIDADE</span>
        <AdComponent token="02cda84a0e4149c2855e170b9c26dedd" width="300" height="250" />
      </div>

      {/* Anúncio 300x600 */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 flex flex-col items-center">
        <span className="text-[10px] text-gray-400 font-semibold mb-2 tracking-wider">PUBLICIDADE</span>
        <AdComponent token="528c9f9e89c0496a8d9da2ba4bfb1124" width="300" height="600" />
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