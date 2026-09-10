'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Play, ExternalLink } from 'lucide-react';

const interviews = [
  {
    name: 'Leila do Vôlei',
    eyebrow: 'ESPORTE, PODER E BRASÍLIA',
    headline: 'LEILA DO VÔLEI SEM RODEIOS',
    sub: 'Paulo Fayad conversa com Leila Barros sobre trajetória, Brasília e vida pública.',
    image: 'https://legis.senado.leg.br/senadores/fotos-oficiais/5979',
    url: 'https://www.youtube.com/@VozdebrasiliaTV/search?query=Leila%20do%20V%C3%B4lei%20Paulo%20Fayad',
  },
  {
    name: 'Júlio César Ribeiro',
    eyebrow: 'CONGRESSO EM FOCO',
    headline: 'JÚLIO CÉSAR: PERGUNTAS DIRETAS',
    sub: 'Uma conversa sobre mandato, prioridades e os temas que movimentam o Distrito Federal.',
    image: 'https://www.camara.leg.br/internet/deputado/bandep/204372.jpg',
    url: 'https://www.vozdebrasilia.com.br/entrevista-com-o-deputado-julio-cesar-jornalista-paulo-fayad/',
  },
  {
    name: 'Rôney Nemer',
    eyebrow: 'BRASÍLIA EM DEBATE',
    headline: 'RÔNEY NEMER FALA SEM FILTRO',
    sub: 'Paulo Fayad entrevista Rôney Nemer sobre experiência pública, Brasília e os desafios do DF.',
    image: 'https://dados.agenciasertao.com/json/v1/eleicoes/2026/fotos/70002538503.jpg',
    url: 'https://www.youtube.com/@VozdebrasiliaTV/search?query=Roney%20Nemer%20Paulo%20Fayad',
  },
  {
    name: 'Erika Kokay',
    eyebrow: 'POLÍTICA SEM ATALHOS',
    headline: 'ERIKA KOKAY NO CENTRO DO DEBATE',
    sub: 'A deputada federal conversa com Paulo Fayad sobre Congresso, Brasília e suas principais pautas.',
    image: 'https://www.camara.leg.br/internet/deputado/bandep/160575.jpg',
    url: 'https://www.vozdebrasilia.com.br/entrevista-com-a-deputada-federal-erika-kokay-apresentador-paulo-fayad/',
  },
  {
    name: 'Izalci Lucas',
    eyebrow: 'SENADO E DISTRITO FEDERAL',
    headline: 'IZALCI LUCAS: CARA A CARA',
    sub: 'Paulo Fayad conduz uma entrevista direta sobre política nacional e os rumos de Brasília.',
    image: 'https://legis.senado.leg.br/senadores/fotos-oficiais/4770',
    url: 'https://www.youtube.com/@VozdebrasiliaTV/search?query=Izalci%20Lucas%20Paulo%20Fayad',
  },
  {
    name: 'Chico Vigilante',
    eyebrow: 'CRÍTICAS, PROPOSTAS E DF',
    headline: 'CHICO VIGILANTE ABRE O JOGO',
    sub: 'Uma conversa franca com Paulo Fayad sobre gestão pública, trabalhadores e os desafios do DF.',
    image: 'https://www.cl.df.gov.br/documents/10162/33185635/Chico%2BVigilante%2B-%2B2023-2026.jpg/b2187cf2-5479-e17f-861d-8212b201ac73?imageThumbnail=3&t=1740158439023',
    url: 'https://www.vozdebrasilia.com.br/entrevista-com-deputado-distrital-chico-vigilante-apresentador-paulo-fayad/',
  },
  {
    name: 'Dra. Jane',
    eyebrow: 'SEGURANÇA, POLÍTICA E BRASÍLIA',
    headline: 'DRA. JANE: SEM MEIAS PALAVRAS',
    sub: 'Paulo Fayad conversa com a parlamentar sobre segurança pública, mandato e Distrito Federal.',
    image: 'https://www.cl.df.gov.br/documents/10162/35054112/251107AP03A%280339%29.jpg/8770a532-8ee4-9628-2449-e3321d621290?version=1.0&t=1762532064071&download=true',
    url: 'https://www.youtube.com/@VozdebrasiliaTV/search?query=Dra%20Jane%20Paulo%20Fayad',
  },
];

export default function EntrevistasPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <main className="pb-16">
        <section className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-16">
            <div className="inline-flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase">
              <Play className="w-3.5 h-3.5 fill-white" />
              TV Voz de Brasília
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight max-w-5xl">
              ENTREVISTAS DE PAULO FAYAD
            </h1>
            <p className="mt-4 text-zinc-300 text-lg max-w-3xl">
              Entrevistas especiais da TV Voz de Brasília com lideranças do Distrito Federal e do Congresso Nacional.
            </p>
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {interviews.map((item) => (
              <article key={item.name} className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
                <div className="relative h-[360px] overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-red-600 text-white text-[11px] font-black tracking-widest px-3 py-1 uppercase rounded">
                      {item.eyebrow}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/80 text-sm font-bold uppercase tracking-wider">Entrevista • Paulo Fayad</p>
                    <h2 className="mt-2 text-3xl font-black leading-[0.95] uppercase drop-shadow-lg">{item.headline}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-zinc-300 leading-relaxed min-h-[72px]">{item.sub}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 transition px-5 py-3 font-black"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    Assistir entrevista
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
