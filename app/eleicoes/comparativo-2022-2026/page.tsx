import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ElectionTable from '@/components/elections/ElectionTable';

export const metadata: Metadata = {
  title: 'Eleitos em 2022 x Eleições 2026 | Voz de Brasília',
  description: 'Consulta interativa da Voz de Brasília: Câmara Federal, Senado e candidatos do Distrito Federal, com votos e situação em 2022 e 2026.',
  alternates: { canonical: 'https://www.vozdebrasilia.com.br/eleicoes/comparativo-2022-2026' },
  robots: { index: true, follow: true },
};

export default function ComparativoEleicoes(){
 return <div className="min-h-screen bg-gray-50"><Header/><main className="pt-24 pb-16"><section className="max-w-[1500px] mx-auto px-4">
  <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 md:p-9">
   <span className="text-sm font-bold text-green-700 uppercase tracking-wide">Arquivo permanente · Eleições</span>
   <h1 className="mt-2 text-3xl md:text-5xl font-black text-gray-900 leading-tight">Quem foi eleito em 2022 e o que aconteceu em 2026</h1>
   <p className="mt-4 text-lg text-gray-700">Pesquise pelo nome e compare votação, partido, candidatura e resultado. Use as abas para consultar Câmara Federal, Senado ou somente os nomes do Distrito Federal.</p>
   <ElectionTable/>
   <div className="mt-7 flex flex-wrap gap-3"><a href="/documentos/planilha-eleitos-2022-comparacao-2026.csv" className="rounded-xl bg-green-700 px-6 py-3 font-bold text-white hover:bg-green-800">Baixar planilha completa (CSV)</a><a href="https://resultados.tse.jus.br" target="_blank" rel="noreferrer" className="rounded-xl border border-gray-300 px-6 py-3 font-bold text-gray-800 hover:bg-gray-100">Conferir no TSE</a></div>
   <p className="mt-6 text-xs text-gray-500">Fonte principal: Justiça Eleitoral/TSE. Atualização: 7 de outubro de 2026. A base deve ser revisada quando houver decisão judicial que altere situação de candidatura ou totalização.</p>
  </div>
 </section></main><Footer/></div>
}