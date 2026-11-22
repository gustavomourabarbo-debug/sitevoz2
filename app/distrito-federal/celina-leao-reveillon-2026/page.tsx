import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const articleUrl = 'https://www.vozdebrasilia.com.br/distrito-federal/celina-leao-reveillon-2026';
const photo = 'https://uploads.diariodopoder.com.br/2026/09/a6349a2f-governadora-do-distrito-federal-e-candidata-a-reeleicao-celina-leao-pp-foto-sara-marques-agencia-cldf.jpg';
const source = 'https://www1.folha.uol.com.br/colunas/painel/2026/11/governo-do-df-quer-aproveitar-estrutura-de-festival-da-posse-de-lula-para-festa-de-reveillon.shtml';

export const metadata: Metadata = {
  title: 'Celina Leão: GDF estuda usar estrutura da posse no Réveillon | Voz de Brasília',
  description: 'Gestão de Celina Leão avalia aproveitar a estrutura do festival da posse presidencial no Réveillon de Brasília para reduzir despesas.',
  alternates: { canonical: articleUrl },
  openGraph: {
    title: 'GDF estuda aproveitar estrutura da posse de Lula no Réveillon de Brasília',
    description: 'Proposta em discussão pretende economizar recursos públicos na festa da virada.',
    url: articleUrl,
    type: 'article',
    images: [{ url: photo, alt: 'Celina Leão em imagem de arquivo de 2026 — Agência CLDF' }],
  },
};

export default function CelinaLeaoReveillon2026() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pb-12">
        <div className="mx-auto max-w-[1100px] px-4 pt-8">
          <nav aria-label="Navegação" className="mb-6 text-sm font-semibold text-blue-800">
            <Link href="/" className="hover:underline">Início</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-600">Distrito Federal</span>
          </nav>
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <header className="px-5 pt-7 pb-6 md:px-10 md:pt-10">
              <p className="text-xs font-black uppercase tracking-widest text-blue-900">Distrito Federal • Gestão pública</p>
              <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                GDF estuda aproveitar estrutura da posse de Lula no Réveillon de Brasília
              </h1>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
                Gestão da governadora Celina Leão avalia negociar o uso de palcos e equipamentos de um festival de shows para reduzir as despesas da festa de fim de ano na capital.
              </p>
              <p className="mt-5 border-t border-slate-200 pt-4 text-sm text-slate-500">
                Redação Voz de Brasília • 21 de novembro de 2026
              </p>
            </header>
            <figure className="bg-slate-100">
              <img
                src={photo}
                alt="Governadora Celina Leão em registro na Câmara Legislativa do Distrito Federal"
                className="mx-auto block max-h-[610px] w-full object-contain"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <figcaption className="px-5 py-3 text-xs text-slate-600 md:px-10">
                Celina Leão em fotografia de arquivo de 2026. Foto: Sara Marques/Agência CLDF. A imagem não retrata a negociação descrita na notícia.
              </figcaption>
            </figure>
            <div className="space-y-6 px-5 py-8 text-base leading-8 text-slate-800 md:px-10 md:text-lg">
              <p>
                O Governo do Distrito Federal estuda pedir autorização para utilizar, na festa de Réveillon de Brasília, parte da infraestrutura planejada para o festival de shows da posse presidencial de Luiz Inácio Lula da Silva, prevista para 5 de janeiro de 2027. A informação foi divulgada neste sábado (21) pela coluna Painel, da Folha de S.Paulo.
              </p>
              <p>
                A proposta é uma alternativa de economia para a administração da governadora Celina Leão. Em um cenário de ajustes e restrições no orçamento, a utilização compartilhada de palcos, equipamentos e outras estruturas poderia diminuir os custos da celebração de fim de ano na capital federal.
              </p>
              <p>
                De acordo com a reportagem, o governo distrital também considera contratar artistas locais, cujos cachês são menores. O objetivo seria preservar a programação cultural sem ampliar os gastos previstos para o evento.
              </p>
              <div data-gdf-internal-middle-slot="true" className="py-2" aria-label="Espaço da campanha do GDF" />
              <h2 className="pt-2 text-2xl font-black leading-tight text-slate-900 md:text-3xl">
                Negociação ainda depende de autorização
              </h2>
              <p>
                A eventual cessão ou utilização conjunta da estrutura dependerá de entendimentos entre os organizadores do festival da posse e os responsáveis pelo Réveillon. A iniciativa está em discussão, e não foi anunciada a formalização de um acordo.
              </p>
              <p>
                A ideia surge em meio à decisão de priorizar serviços essenciais e rever despesas de eventos públicos. Segundo a coluna, a gestão distrital já havia cancelado gastos com as comemorações do aniversário de Brasília, apontando a necessidade de destinar recursos à saúde.
              </p>
              <p>
                A possibilidade de redução dos custos, o número de atrações e a definição dos locais da festa ainda dependerão das negociações e das providências administrativas pertinentes. Por enquanto, o compartilhamento da estrutura é uma proposta, não uma medida concretizada.
              </p>
              <aside className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-slate-700">
                <p className="font-bold text-blue-900">Informação de origem</p>
                <p className="mt-1">
                  Notícia baseada nas informações publicadas pela coluna Painel, da Folha de S.Paulo, em 21 de novembro de 2026.
                </p>
                <a className="mt-2 inline-block font-semibold text-blue-800 underline" href={source} target="_blank" rel="noopener noreferrer">
                  Consultar reportagem original
                </a>
              </aside>
            </div>
          </article>
          <div className="mt-8">
            <Link href="/" className="inline-flex items-center rounded-lg bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800">
              Voltar à capa da Voz de Brasília
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
