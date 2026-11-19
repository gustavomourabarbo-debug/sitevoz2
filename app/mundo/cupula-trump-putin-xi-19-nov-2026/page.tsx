import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Trump, Putin e Xi discutem segurança nuclear em reunião na China | Voz de Brasília',
  description: 'Encontro histórico de Trump, Putin e Xi em Shenzhen, 19 de novembro de 2026: armas nucleares, Ucrânia, Irã e comércio na agenda.',
  alternates: { canonical: 'https://www.vozdebrasilia.com.br/mundo/cupula-trump-putin-xi-19-nov-2026' }
};

export default function CupulaMundo() {
  return <div className="min-h-screen bg-slate-50">
    <Header />
    <main className="mx-auto max-w-[1050px] px-4 py-8">
      <nav className="mb-5 text-sm text-green-800"><Link href="/">Início</Link> / Mundo</nav>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-6 pt-8 md:px-12">
          <p className="text-xs font-black uppercase tracking-widest text-amber-700">Internacional · 19/11/2026 · Redação Voz de Brasília</p>
          <h1 className="mt-4 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
            Trump, Putin e Xi se reúnem em Shenzhen e discutem segurança nuclear, guerras e comércio
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            O encontro trilateral ocorreu à margem da cúpula da Cooperação Econômica Ásia-Pacífico (APEC), na China, nesta quinta-feira, 19 de novembro.
          </p>
        </div>
        <img
          src="https://www.whitehouse.gov/wp-content/uploads/2026/10/P20260924DT-1643.jpg?w=1200"
          alt="Fotografia oficial anterior ao encontro: Donald Trump e Xi Jinping conversam na Casa Branca em setembro de 2026"
          className="mt-6 max-h-[550px] w-full object-cover"
        />
        <p className="px-6 pt-2 text-xs text-slate-500 md:px-12">
          Fotografia oficial de arquivo, feita em 24 de setembro de 2026, na Casa Branca. Daniel Torok / White House. A imagem não retrata a reunião com Putin em Shenzhen.
        </p>
        <div className="space-y-5 px-6 py-8 text-lg leading-8 text-slate-800 md:px-12">
          <p>Donald Trump, Vladimir Putin e Xi Jinping sentaram-se à mesma mesa nesta quinta-feira (19), em Shenzhen, no sul da China. A reunião, realizada no contexto da APEC, foi acompanhada internacionalmente como um encontro incomum entre as lideranças das três principais potências nucleares.</p>
          <p>Segundo a Associated Press e a CNN Brasil, as conversas incluíram a possibilidade de ampliar o diálogo sobre redução de riscos nucleares, em um momento no qual o último grande tratado de limitação estratégica entre Estados Unidos e Rússia expirou em fevereiro. A busca de um novo entendimento que envolva também a China faz parte da agenda apresentada por Trump.</p>
          <p>Antes da cúpula trilateral, o presidente norte-americano realizou reuniões bilaterais com Xi e Putin. A conversa com o presidente russo durou cerca de 40 minutos, e a guerra na Ucrânia esteve entre os assuntos mencionados. No diálogo com Xi, comércio, tarifas e estabilidade das relações entre Washington e Pequim ganharam destaque.</p>
          <p>Relatos da imprensa internacional indicaram que autoridades russas e a mídia estatal chinesa falaram em entendimento para aprofundar conversas sobre riscos nucleares, fornecimento energético e reformas nas Nações Unidas. Não foi anunciado um tratado de desarmamento, tampouco um acordo para encerrar as guerras na Ucrânia ou no Irã.</p>
          <p>A reunião evidencia a importância das relações entre Washington, Moscou e Pequim para decisões que afetam segurança internacional, cadeias de abastecimento e economia mundial. Os próximos passos dependerão da continuidade das negociações e de eventuais textos oficiais publicados pelos governos.</p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7">
            <p className="font-black text-slate-800">Fontes e documentação</p>
            <a className="block text-sky-800 underline" target="_blank" rel="noopener noreferrer" href="https://apnews.com/article/trump-xi-putin-nuclear-ukraine-iran-a04dc76ed8e786b087e2c1ea9598783a">Associated Press — cobertura do encontro em Shenzhen, 19/11/2026</a>
            <a className="block text-sky-800 underline" target="_blank" rel="noopener noreferrer" href="https://www.cnnbrasil.com.br/internacional/comeca-reuniao-trilateral-entre-trump-putin-e-xi-jinping-na-china/">CNN Brasil — encontro trilateral e reuniões bilaterais</a>
            <a className="block text-sky-800 underline" target="_blank" rel="noopener noreferrer" href="https://www.whitehouse.gov/gallery/president-donald-j-trump-and-first-lady-melania-trump-host-china-for-a-state-visit-september-24-2026/">Casa Branca — crédito e data da fotografia de arquivo</a>
          </div>
        </div>
      </article>
    </main>
    <Footer />
  </div>;
}
