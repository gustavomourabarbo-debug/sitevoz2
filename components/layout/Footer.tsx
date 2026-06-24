'use client';
 
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';
 
export default function Footer() {
  const currentYear = new Date().getFullYear();
 
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-16">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="TV Voz de Brasília"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              O portal de notícias mais completo do Distrito Federal. Informação de qualidade, sempre.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
 
          <div>
            <h3 className="font-bold text-lg mb-4">Editorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/politica" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Política
                </Link>
              </li>
              <li>
                <Link href="/categoria/distrito-federal" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Distrito Federal
                </Link>
              </li>
              <li>
                <Link href="/categoria/turismo" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Turismo
                </Link>
              </li>
              <li>
                <Link href="/categoria/saude" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Saúde
                </Link>
              </li>
              <li>
                <Link href="/categoria/tecnologia" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Tecnologia
                </Link>
              </li>
              <li>
                <Link href="/categoria/esportes" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Esportes
                </Link>
              </li>
              <li>
                <Link href="/categoria/economia" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Economia
                </Link>
              </li>
              <li>
                <Link href="/entrevistas" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Entrevistas
                </Link>
              </li>
            </ul>
          </div>
 
          <div>
            <h3 className="font-bold text-lg mb-4">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/quem-somos" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Nossa Equipe
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/anuncie" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Anuncie Conosco
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-uso" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
 
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Receba as principais notícias do dia direto no seu e-mail.
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
              />
              <button className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all">
                <Mail className="w-5 h-5" />
              </button>
            </div>
 
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>SCS, Quadra 6, Bloco A, Ed. Marilena - Brasília/DF</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(61) 3333-4444</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contato@tvvozdebrasilia.com.br</span>
              </div>
            </div>
          </div>
        </div>
 
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} TV Voz de Brasília. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-xs">
              Desenvolvido com tecnologia de ponta para oferecer a melhor experiência
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}