import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Clock } from 'lucide-react';

const titulo = 'Rôney Nemer: experiência e diálogo pelo Distrito Federal';
const slug = 'roney-nemer-volta-disputa-distrital-experiencia-propostas-brasilia';
const imagemPrincipal = 'https://dados.agenciasertao.com/json/v1/eleicoes/2026/fotos/70002538503.jpg';
const imagemCamara = 'https://www.camara.leg.br/internet/deputado/bandep/178870.jpgmaior.jpg';
const imagemAtividade = 'https://images.metroimg.com/2022/04/12154107/roney-2.jpg';

export const metadata = {
  title: `${titulo} — TV Voz de Brasília`,
  description: 'Paulo Fayad analisa a candidatura de Rôney Nemer a deputado distrital pelo PP, número 11111, nas Eleições 2026.',
  alternates: { canonical: `https://www.vozdebrasilia.com.br/noticia/${slug}` },
  openGraph: {
    title: titulo,
    description: 'Uma trajetória pública que volta ao encontro das comunidades de Brasília.',
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
            <img src={imagemPrincipal} alt="Foto oficial de Rôney Nemer nas Eleições 2026" className="w-full max-h-[620px] object-contain bg-gray-100" />
            <div className="p-7 md:p-12">
              <Link href="/categoria/politica" className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-5">Eleições 2026 · Distrito Federal</Link>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">{titulo}</h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">Candidato a deputado distrital pelo PP, com o número 11111, Rôney Nemer retorna à disputa eleitoral levando para as ruas uma trajetória construída na administração pública, no Legislativo e no contato com as comunidades de Brasília.</p>
              <div className="flex flex-wrap items-center gap-5 pb-7 mb-8 border-b border-gray-200 text-sm text-gray-600">
                <strong className="text-gray-900">Por Paulo Fayad — jornalista e diretor da TV Voz de Brasília</strong>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" />2 de setembro de 2026</span>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-8">
                <p>Conheço Brasília como quem acompanha de perto o crescimento de suas cidades, suas dificuldades e a força de sua gente. É nesse cenário que a candidatura de Rôney Nemer merece ser observada: não apenas pelo currículo, mas pela capacidade de transformar experiência em presença, escuta e resultados concretos.</p>

                <p>Rôney chegou ao Distrito Federal ainda jovem, formou-se em Arquitetura e Urbanismo pela Universidade de Brasília e construiu uma longa vida pública. Foi administrador regional, exerceu mandatos de deputado distrital e representou o Distrito Federal na Câmara dos Deputados entre 2015 e 2019. Também comandou o Instituto Brasília Ambiental, função que ampliou sua vivência em gestão e sustentabilidade.</p>

                <p>Agora, candidato a deputado distrital pelo Progressistas, número <strong>11111</strong>, ele volta a percorrer o DF em busca de um novo mandato. Seu registro consta como deferido na base pública da Justiça Eleitoral consultada para esta reportagem.</p>

                <blockquote className="border-l-4 border-yellow-500 bg-yellow-50 px-6 py-4 text-xl font-semibold text-gray-800">“Brasília precisa de representantes que conheçam cada cidade, saibam ouvir suas lideranças e tenham experiência para transformar demandas em ações.” — Paulo Fayad</blockquote>

                <p>A política ganha sentido quando chega à vida real: na escola que oferece oportunidades, na unidade de saúde que atende com dignidade, na segurança das famílias, no esporte que afasta jovens da vulnerabilidade, na mobilidade que devolve tempo ao trabalhador e no cuidado ambiental que preserva o futuro.</p>

                <p>Esses são os temas que a trajetória de Rôney coloca novamente no debate. Seu histórico de diálogo com lideranças comunitárias e de atuação em áreas urbanas cria uma base importante para apresentar propostas, ouvir a população e construir soluções para as regiões administrativas.</p>

                <figure className="my-9">
                  <img src={imagemCamara} alt="Rôney Nemer durante mandato na Câmara dos Deputados" className="w-full max-h-[620px] object-contain rounded-xl bg-gray-100 shadow-sm" />
                  <figcaption className="text-sm text-gray-500 mt-2">Rôney Nemer representou o DF na Câmara dos Deputados. Fonte: Câmara dos Deputados.</figcaption>
                </figure>

                <figure className="my-9">
                  <img src={imagemAtividade} alt="Rôney Nemer em atividade pública em Brasília" className="w-full rounded-xl shadow-sm" />
                  <figcaption className="text-sm text-gray-500 mt-2">Experiência em gestão e atuação pública no Distrito Federal. Fonte: Metrópoles.</figcaption>
                </figure>

                <p>O eleitor brasiliense sabe que promessas isoladas não bastam. É preciso apresentar prioridades, assumir compromissos claros e manter canais permanentes de prestação de contas. A experiência de quem já passou pelo Executivo e pelo Legislativo pode ser valiosa quando vem acompanhada de renovação de métodos e abertura verdadeira à participação popular.</p>

                <p>Vejo em Rôney Nemer um nome experiente, conhecido nas cidades e preparado para contribuir com esse debate. A campanha será a oportunidade de mostrar ao Distrito Federal quais projetos pretende defender e como seu trabalho poderá melhorar, na prática, a vida das pessoas.</p>

                <p>Brasília merece uma política próxima, responsável e comprometida com resultados. Que a eleição de 2026 seja marcada por propostas, respeito e diálogo — e que cada candidato tenha a responsabilidade de honrar a confiança recebida nas urnas.</p>

                <aside className="my-10 rounded-xl bg-green-900 p-6 text-white">
                  <h2 className="mt-0 text-2xl text-yellow-300">Rôney Nemer nas Eleições 2026</h2>
                  <ul className="mb-0">
                    <li>Cargo: deputado distrital pelo Distrito Federal</li>
                    <li>Partido: Progressistas (PP)</li>
                    <li>Número: 11111</li>
                    <li>Situação consultada: candidatura deferida</li>
                    <li>Instagram oficial informado ao TSE: @roneynemerdf</li>
                  </ul>
                </aside>

                <p className="text-sm text-gray-500"><strong>Fontes factuais:</strong> Justiça Eleitoral/TSE, Câmara dos Deputados, site oficial de Rôney Nemer e registros públicos de sua trajetória. Texto opinativo assinado por Paulo Fayad.</p>
                <p className="mt-10"><strong>Paulo Fayad</strong><br /><em>Jornalista e diretor da TV Voz de Brasília</em></p>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
