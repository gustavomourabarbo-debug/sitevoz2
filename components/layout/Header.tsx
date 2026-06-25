'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Play } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainMenuItems = [
    { label: 'Início', href: '/' },
    { label: 'Política', href: '/categoria/politica' },
    { label: 'Distrito Federal', href: '/categoria/distrito-federal' },
    { label: 'Turismo', href: '/categoria/turismo' },
    { label: 'Saúde', href: '/categoria/saude' },
    { label: 'Tecnologia', href: '/categoria/tecnologia' },
    { label: 'Esportes', href: '/categoria/esportes' },
    { label: 'Economia', href: '/categoria/economia' },
    { label: 'Internacional', href: '/categoria/internacional' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300">
        <div className="bg-gradient-to-r from-green-700 to-green-600 py-2">
          <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-white text-xs">
              <span>Brasília, {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-4 text-white text-xs">
              <a href="#" className="hover:text-yellow-300 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              <a href="https://www.instagram.com/tvvozdebrasilia/" target="_blank" rel="noreferrer" className="hover:text-yellow-300 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              <a href="https://www.youtube.com/@VozdebrasiliaTV/featured" target="_blank" rel="noreferrer" className="hover:text-yellow-300 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            <Link href="/" className="flex items-center group">
              <img
                src="/logo.png?v=3"
                alt="TV Voz de Brasília"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <div className="hidden lg:block flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar notícias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            <Link
              href="/entrevistas"
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg"
            >
              <Play className="w-4 h-4 fill-white" />
              <span className="font-semibold">Últimas Entrevistas</span>
            </Link>

            <button
              className="lg:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <nav className="border-t border-gray-200 hidden lg:block">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex items-center gap-6 overflow-x-auto">
              {mainMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 text-sm font-medium text-gray-700 hover:text-green-600 whitespace-nowrap border-b-2 border-transparent hover:border-green-600 transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="max-w-[1400px] mx-auto px-4 py-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Buscar notícias..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="space-y-2">
                {mainMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-green-600 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/entrevistas"
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg justify-center mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span className="font-semibold">Últimas Entrevistas</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="h-36"></div>
    </>
  );
}