import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Clock } from 'lucide-react';

const titulo = 'Rôney Nemer volta à disputa distrital com experiência e propostas para Brasília';
const slug = 'roney-nemer-volta-disputa-distrital-experiencia-propostas-brasilia';
const imagemPrincipal = 'https://www.tribunapr.com.br/hermes-media/eleicoes/2026/candidatos/df/70002538503.jpg';
const imagemEsporte = 'https://www.roneynemer.com.br/novo-site/wp-content/uploads/2017/05/17952953_1517278448284510_5959153782989292242_n.jpg';
const imagemComunidade = 'https://www.roneynemer.com.br/novo-site/wp-content/uploads/2018/06/Captura-de-Tela-2018-06-05-%C3%A0s-18.03.15-300x245.png';

export const metadata = {
  title: `${titulo} — TV Voz de Brasília`,
  description: 'Candidato a deputado distrital pelo PP, número 11111, Rôney Nemer retorna à disputa eleitoral no Distrito Federal. Paulo Fayad analisa sua trajetória e propostas.',
  alternates: { canonical: `https://www.vozdebrasilia.com.br/noticia/${slug}` },
  openGraph: {
    title: titulo,
    description: 'Rôney Nemer concorre a deputado distrital pelo PP com o número 11111 e apresenta propostas para o Distrito Federal.',
    url: `https://www.vozdebrasilia.com.br/noticia/${slug}`,
    type: 'article',
    images: [{ url: imagemPrincipal }],
  },
};

export default function RoneyNemerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-12">
        <article className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={imagemPrincipal} alt="Rôney Nemer, candidato a deputado distrital em 2026" className="w-full max-h-[560px] object-contain bg-gray-100" />
            <div className="p-7 md:p-12">
              <Link href="/categoria/politica" className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-5">Política</Link>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">{titulo}</h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">Arquiteto e ex-parlamentar concorre pelo Progressistas com o número 11111 e volta ao debate eleitoral do Distrito Federal.</p>
              <div className="flex flex-wrap items-center gap-5 pb-7 mb-8 border-b border-gray-200 text-sm text-gray-600">
                <strong className="text-gray-900">Por Paulo Fayad</strong>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" />1º de setembro de 2026</span>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-8">
                <p>Brasília acompanha em 2026 uma eleição que reúne novos nomes e personagens que já deixaram sua marca na vida pública da capital. Entre eles está <strong>Rôney Nemer</strong>, candidato a deputado distrital pelo Progressistas (PP), número <strong>11111</strong>, que retorna à disputa eleitoral trazendo a experiência acumulada ao longo de diferentes mandatos.</p>

                <p>Arquiteto e urbanista de formação, Nemer construiu parte importante de sua trajetória política no Distrito Federal. Foi eleito deputado distrital em diferentes legislaturas e chegou à Câmara dos Deputados, onde representou Brasília no Congresso Nacional. Em 2026, sua candidatura à Câmara Legislativa está registrada como deferida pela Justiça Eleitoral.</p>

                <figure className="my-9">
                  <img src={imagemEsporte} alt="Rôney Nemer em agenda pública voltada ao esporte no Distrito Federal" className="w-full rounded-xl shadow-sm" />
                  <figcaption className="text-sm text-gray-500 mt-2">Arquivo: Rôney Nemer em agenda pública ligada ao esporte no Distrito Federal. Foto: site oficial de Rôney Nemer / reprodução.</figcaption>
                </figure>

                <p>Nesta nova caminhada eleitoral, o candidato volta a colocar em discussão temas diretamente ligados ao cotidiano da população. Sua experiência anterior inclui atuação em assuntos urbanos, infraestrutura, esporte, qualificação profissional, serviços públicos e demandas das diferentes regiões administrativas.</p>

                <p>Entre os temas apresentados em sua trajetória pública aparecem a regularização urbana, melhoria da infraestrutura, mobilidade, incentivo aos pequenos comerciantes, qualificação profissional e oportunidades para jovens. Meio ambiente, proteção de mananciais e políticas de atendimento aos animais também integram o conjunto de assuntos associados à sua atuação.</p>

                <figure className="my-9">
                  <img src={imagemComunidade} alt="Registro de Rôney Nemer em encontro com lideranças comunitárias" className="w-full rounded-xl shadow-sm" />
                  <figcaption className="text-sm text-gray-500 mt-2">Arquivo: registro relacionado à homenagem a lideranças comunitárias. Foto: site oficial de Rôney Nemer / reprodução.</figcaption>
                </figure>

                <p>Conheço a política de Brasília há décadas, acompanhando governos, parlamentares, empresários, lideranças comunitárias e os diferentes momentos da nossa capital. É nesse contexto que considero importante abrir espaço para que candidatos apresentem à sociedade sua trajetória e, principalmente, aquilo que pretendem realizar.</p>

                <p>Rôney Nemer chega a esta eleição com algo que somente o tempo proporciona: <strong>experiência administrativa e parlamentar</strong>. Ao eleitor caberá analisar essa história, confrontá-la com as propostas apresentadas e decidir qual projeto considera melhor para o futuro do Distrito Federal.</p>

                <p>A democracia se fortalece com informação, debate, propostas e participação popular.</p>

                <p className="mt-10"><strong>Paulo Fayad</strong><br /><em>Jornalista — Voz de Brasília</em></p>
                <p className="text-sm text-gray-500"><strong>Foto principal:</strong> imagem oficial da candidatura 2026 / reprodução. Imagens internas: arquivo do site oficial de Rôney Nemer.</p>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
