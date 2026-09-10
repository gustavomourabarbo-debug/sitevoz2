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
    youtube: 'https://www.youtube.com/@VozdebrasiliaTV/search?query=Leila%20do%20V%C3%B4lei%20Paulo%20Fayad',
  },
  {
    name: 'Júlio César Ribeiro',
    eyebrow: 'CONGRESSO EM FOCO',
    headline: 'JÚLIO CÉSAR: PERGUNTAS DIRETAS',
    sub: 'Uma conversa sobre mandato, prioridades e os temas que movimentam o Distrito Federal.',
    youtube: 'https://www.youtube.com/@VozdebrasiliaTV/search?query=Julio%20Cesar%20Paulo%20Fayad',
  },
  {
    name: 'Rôney Nemer',
    eyebrow: 'BRASÍLIA EM DEBATE',
    headline: 'RÔNEY NEMER FALA SEM FILTRO',
    sub: 'Paulo Fayad entrevista Rôney Nemer sobre experiência pública, Brasília e os desafios do DF.',
    youtube: 'https://www.youtube.com/@VozdebrasiliaTV/search?query=Roney%20Nemer%20Paulo%20Fayad',
  },
  {
    name: 'Erika Kokay',
    eyebrow: 'POLÍTICA SEM ATALHOS',
    headline: 'ERIKA KOKAY NO CENTRO DO DEBATE',
    sub: 'A deputada federal conversa com Paulo Fayad sobre Congresso, Brasília e suas principais pautas.',
    youtube: 'https://www.youtube.com/@VozdebrasiliaTV/search?query=Erika%20Kokay%20Paulo%20Fayad',
  },
  {
    name: 'Izalci Lucas',
    eyebrow: 'SENADO E DISTRITO FEDERAL',
    headline: 'IZALCI LUCAS: CARA A CARA',
    sub: 'Paulo Fayad conduz uma entrevista direta sobre política nacional e os rumos de Brasília.',
    youtube: 'https://www.youtube.com/@VozdebrasiliaTV/search?query=Izalci%20Lucas%20Paulo%20Fayad',
  },
  {
    name: 'Chico Vigilante',
    eyebrow: 'CRÍTICAS, PROPOSTAS E DF',
    headline: 'CHICO VIGILANTE ABRE O JOGO',
    sub: 'Uma conversa franca com Paulo Fayad sobre gestão pública, trabalhadores e os desafios do DF.',
    youtube: 'https://www.youtube.com/@VozdebrasiliaTV/search?query=Chico%20Vigilante%20Paulo%20Fayad',
  },
  {
    name: 'Dra. Jane',
    eyebrow: 'SEGURANÇA, POLÍTICA E BRASÍLIA',
    headline: 'DRA. JANE: SEM MEIAS PALAVRAS',
    sub: 'Paulo Fayad conversa com a parlamentar sobre segurança pública, mandato e Distrito Federal.',
    youtube: 'https://www.youtube.com/@VozdebrasiliaTV/search?query=Dra%20Jane%20Paulo%20Fayad',
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
              ENTREVISTAS QUE COLOCAM BRASÍLIA NO CENTRO DO DEBATE
            </h1>
            <p className="mt-4 text-zinc-300 text-lg max-w-3xl">
              Paulo Fayad frente a frente com lideranças políticas do Distrito Federal e do Congresso Nacional.
            </p>
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {interviews.map((item, index) => (
              <article
                key={item.name}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl"
              >
                <div className="relative min-h-[310px] p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-800 via-zinc-950 to-black">
                  <div className="absolute inset-0 opacity-20 text-[120px] md:text-[150px] font-black leading-none flex items-center justify-center select-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block bg-red-600 text-white text-[11px] font-black tracking-widest px-3 py-1 uppercase rounded">
                      {item.eyebrow}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider">Entrevista • Paulo Fayad</p>
                    <h2 className="mt-2 text-3xl md:text-4xl font-black leading-[0.95] uppercase">
                      {item.headline}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-zinc-300 leading-relaxed min-h-[72px]">{item.sub}</p>
                  <a
                    href={item.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 transition px-5 py-3 font-black"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    Assistir no YouTube
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900 p-6 md:p-8">
            <h3 className="text-2xl font-black">ACERVO TV VOZ DE BRASÍLIA</h3>
            <p className="mt-2 text-zinc-300">
              Os botões abrem a busca correspondente dentro do canal oficial da TV Voz de Brasília no YouTube, facilitando o acesso às entrevistas do acervo.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
