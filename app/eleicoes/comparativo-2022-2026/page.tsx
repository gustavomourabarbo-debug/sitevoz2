import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Eleitos em 2022 x Eleições 2026 | Voz de Brasília',
  description: 'Planilha permanente da Voz de Brasília comparando eleitos em 2022, candidaturas em 2026, votos e situação eleitoral.',
  alternates: { canonical: 'https://www.vozdebrasilia.com.br/eleicoes/comparativo-2022-2026' },
  robots: { index: true, follow: true },
};

export default function ComparativoEleicoes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-5xl mx-auto px-4">
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 md:p-10">
            <span className="text-sm font-bold text-green-700 uppercase tracking-wide">Arquivo permanente · Eleições</span>
            <h1 className="mt-2 text-3xl md:text-5xl font-black text-gray-900 leading-tight">Eleitos em 2022 x Eleições 2026</h1>
            <p className="mt-4 text-lg text-gray-700">Planilha da Voz de Brasília com deputados federais eleitos em 2022, deputados distritais do DF e senadores, comparando candidatura, votação e resultado em 2026.</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/documentos/planilha-eleitos-2022-comparacao-2026.csv"
                className="inline-flex items-center rounded-xl bg-green-700 px-6 py-3 font-bold text-white hover:bg-green-800"
              >
                Baixar planilha completa (CSV/Excel)
              </a>
              <a
                href="/eleicoes/resultado-eleicoes-2026"
                className="inline-flex items-center rounded-xl border border-gray-300 px-6 py-3 font-bold text-gray-800 hover:bg-gray-100"
              >
                Ver resultado das Eleições 2026
              </a>
            </div>

            <div className="mt-8 rounded-xl bg-amber-50 border border-amber-200 p-5">
              <h2 className="font-black text-gray-900">Correção confirmada: Aécio Neves</h2>
              <p className="mt-2 text-gray-800">Aécio Neves foi eleito deputado federal por Minas Gerais em 2022 com 85.341 votos. Em 2026, não disputou novamente a Câmara: candidatou-se ao Senado por Minas Gerais, recebeu 836.595 votos (4,08%), ficou em 7º lugar e não foi eleito.</p>
            </div>

            <div className="mt-8 text-sm text-gray-600">
              <p><strong>Atualização:</strong> 7 de outubro de 2026.</p>
              <p className="mt-1">Fontes de conferência: resultados oficiais da Justiça Eleitoral/TSE e páginas de apuração citadas dentro da própria planilha.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
