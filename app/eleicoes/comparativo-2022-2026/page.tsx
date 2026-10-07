import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ElectionTable from '@/components/elections/ElectionTable';

export const metadata: Metadata = {
  title: 'Planilha Eleitoral 2022 x 2026 | Eleitos e não eleitos | Voz de Brasília',
  description: 'Relatório eleitoral interativo da Voz de Brasília com votos de 2022 e 2026, mudança de cargo, eleitos e não eleitos, com pesquisa por nome, partido e UF.',
  alternates: { canonical: 'https://www.vozdebrasilia.com.br/eleicoes/comparativo-2022-2026' },
  robots: { index: true, follow: true },
};

export default function ComparativoEleicoes(){
 return <div className="min-h-screen bg-slate-100"><Header/><main className="pt-24 pb-16">
  <section className="max-w-[1540px] mx-auto px-3 md:px-5">
   <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-green-600 px-5 py-8 md:px-10 md:py-10 text-white">
      <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-widest">Especial permanente · Eleições</div>
      <h1 className="mt-3 max-w-5xl text-3xl md:text-5xl font-black leading-tight">Planilha eleitoral completa: eleitos de 2022 e o resultado de 2026</h1>
      <p className="mt-4 max-w-4xl text-base md:text-lg text-emerald-50 font-medium">Pesquise qualquer nome e veja partido, votos de 2022, candidatura em 2026, mudança de cargo, votação e resultado. A base foi revisada cruzando Câmara Federal, Senado, governos e legislativos estaduais/distrital.</p>
    </div>

    <div className="p-4 md:p-8">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4"><div className="text-xs font-black uppercase tracking-wider text-emerald-700">Consulta rápida</div><div className="mt-1 font-black text-slate-900">Digite o nome e encontre o candidato na hora.</div></div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4"><div className="text-xs font-black uppercase tracking-wider text-blue-700">Mudança de cargo</div><div className="mt-1 font-black text-slate-900">Identifica quem disputou outro cargo em 2026.</div></div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><div className="text-xs font-black uppercase tracking-wider text-amber-700">Resultado</div><div className="mt-1 font-black text-slate-900">Diferencia eleitos, não eleitos e casos não localizados.</div></div>
      </div>

      <ElectionTable/>

      <div className="mt-7 flex flex-wrap gap-3">
        <a href="/documentos/planilha-eleitos-2022-comparacao-2026.csv" className="rounded-xl bg-emerald-700 px-6 py-3 font-black text-white hover:bg-emerald-800">Baixar base completa (CSV)</a>
        <a href="https://resultados.tse.jus.br" target="_blank" rel="noreferrer" className="rounded-xl border-2 border-slate-300 px-6 py-3 font-black text-slate-800 hover:bg-slate-100">Conferir resultados no TSE</a>
      </div>
      <p className="mt-6 text-xs text-slate-500">Fonte principal: Justiça Eleitoral/TSE. Revisão geral em 7 de outubro de 2026. Resultados podem ser atualizados em caso de decisão judicial ou retotalização.</p>
    </div>
   </div>
  </section>
 </main><Footer/></div>
}