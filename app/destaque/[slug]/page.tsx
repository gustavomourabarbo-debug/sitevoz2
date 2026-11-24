import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const materias = {
  'celina-leao-politica-climatica-df': {
    titulo: 'Política climática do DF ganha regras de execução: o desafio agora é transformar planejamento em resultados',
    chamada: 'Decreto regulamenta a política distrital de mudança do clima e coloca emissões, adaptação e prevenção de riscos na rotina do planejamento público.',
    categoria: 'Distrito Federal · Meio ambiente',
    data: '24 de novembro de 2026',
    imagem: 'https://midias.correiobraziliense.com.br/_midias/jpg/2026/04/20/675x450/1_whatsapp-image-2026-04-20-at-14-57-40--1--66369988.jpg',
    imagemAlt: 'Celina Leão em fotografia institucional',
    credito: 'Imagem de arquivo de Celina Leão; não representa a publicação do decreto.',
    paragrafos: [
      'A regulamentação da Política Distrital de Mudança do Clima coloca um assunto antes tratado principalmente no discurso ambiental dentro das responsabilidades permanentes da administração pública. A governadora Celina Leão assinou o Decreto nº 49.764, de 19 de novembro de 2026, publicado no Diário Oficial do Distrito Federal em 23 de novembro.',
      'A norma detalha a aplicação da Lei nº 4.797, de 2012, e estabelece uma estrutura para planejar, executar, acompanhar e avaliar medidas contra os efeitos das mudanças climáticas. O avanço institucional é relevante, mas a sociedade terá razão em cobrar a passagem do papel para os resultados.',
      'A Secretaria do Meio Ambiente assume papel de coordenação técnica. Entre os instrumentos previstos estão o inventário de emissões de gases de efeito estufa, a contribuição distrital de metas, o plano de mitigação e o plano de adaptação. O conjunto deve orientar escolhas e permitir a comparação dos resultados ao longo dos anos.',
      'Para Brasília, o debate não é abstrato. Eventos de chuva intensa, períodos de seca, ilhas de calor e pressões sobre o Cerrado influenciam a rotina de moradores, comerciantes e prestadores de serviços. Uma política eficiente precisa dialogar com as necessidades reais de cada região administrativa.',
      'A redução das emissões dependerá de decisões concretas em mobilidade, transporte, energia, resíduos, edificações e uso do solo. Não basta anunciar compromissos gerais: será necessário estabelecer prioridades, metas verificáveis e responsabilidades definidas para cada setor.',
      'Já a adaptação exige atenção à drenagem urbana, aos recursos hídricos, à saúde coletiva, às áreas sujeitas a alagamento e à proteção das pessoas mais vulneráveis. A prevenção costuma ser menos visível do que uma obra emergencial, mas pode significar menos prejuízos e mais segurança para a população.',
      'O decreto também prevê incorporar progressivamente a dimensão climática aos instrumentos de orçamento e planejamento, como o Plano Plurianual e as leis orçamentárias. Esse ponto será decisivo, porque políticas sem previsão de recursos dificilmente deixam de ser apenas boas intenções.',
      'A participação de universidades, pesquisadores, organizações sociais e moradores pode qualificar o acompanhamento. A abertura de dados e a publicação periódica de relatórios serão instrumentos importantes para que a população saiba o que foi prometido, o que foi feito e o que não avançou.',
      'A Voz de Brasília considera positiva a organização de uma política pública com critérios de avaliação. Ao mesmo tempo, entende que o sucesso da iniciativa não pode ser medido pelo número de documentos criados, mas pela melhoria observável nas cidades e na qualidade de vida das pessoas.',
      'A partir de agora, o acompanhamento jornalístico deve se concentrar nas metas que vierem a ser estabelecidas, nos prazos efetivamente cumpridos e na capacidade do governo de coordenar ações entre diferentes áreas. É assim que uma diretriz ambiental poderá se transformar em compromisso concreto com o Distrito Federal.'
    ]
  },
  'camara-aprova-ajuste-fiscal-lula': {
    titulo: 'Câmara conclui votação de ajuste fiscal: o desafio de Lula será conciliar contas públicas e proteção social',
    chamada: 'Projeto de lei complementar altera regras para a gestão das despesas em 2027; o debate político continua em torno de prioridades, investimentos e serviços essenciais.',
    categoria: 'Política · Economia',
    data: '24 de novembro de 2026',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%282023%E2%80%932027%29.jpg/960px-Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%282023%E2%80%932027%29.jpg',
    imagemAlt: 'Retrato oficial do presidente Luiz Inácio Lula da Silva',
    credito: 'Foto oficial: Ricardo Stuckert/PR · Wikimedia Commons (CC BY 2.0). Imagem de arquivo.',
    paragrafos: [
      'A Câmara dos Deputados aprovou em 23 de novembro o Projeto de Lei Complementar 299/2026, relacionado ao esforço do governo federal para reorganizar as contas públicas a partir de 2027. O texto, que passou anteriormente pelo Senado, abre novos instrumentos para limitar a execução de determinadas despesas e perseguir as metas fiscais.',
      'O texto-base recebeu 353 votos favoráveis, 128 contrários e cinco abstenções. A votação expressiva revela que parte significativa da Câmara aceitou a necessidade de rever regras orçamentárias, embora persistam divergências sobre os efeitos econômicos e sociais do ajuste.',
      'O centro da discussão não é apenas técnico. O orçamento da União define a capacidade de manter serviços, preservar investimentos e responder às necessidades da população. Qualquer alteração relevante nas despesas e receitas repercute sobre prioridades públicas e sobre a confiança de empresas e famílias.',
      'A defesa do governo é que a iniciativa contribua para estabilizar as contas e sustentar uma trajetória fiscal mais previsível. Parlamentares favoráveis argumentam que a correção de distorções e o aumento da eficiência podem ajudar a cumprir metas sem comprometer o atendimento social.',
      'A oposição, por sua vez, questiona o alcance da proposta e sustenta que o governo precisa demonstrar maior disciplina no controle dos gastos. Também existem preocupações no setor produtivo com medidas de arrecadação e com o ambiente de negócios.',
      'Essa divergência merece ser apresentada com clareza. Um país não fortalece suas finanças ignorando os custos das políticas públicas, mas tampouco resolve suas dificuldades apenas deslocando o peso do ajuste para serviços essenciais ou para quem tem menor capacidade de suportá-lo.',
      'O acompanhamento do novo regime exigirá atenção a três pontos: a economia efetivamente obtida, o comportamento da arrecadação e as despesas preservadas ou reduzidas. Esses dados, mais do que os discursos de ocasião, permitirão avaliar o resultado da medida.',
      'Também será necessário verificar como a legislação será aplicada na prática. Aprovar uma autorização para conter despesas não equivale a comprovar, desde já, um superávit. A execução orçamentária, o cenário econômico e as decisões administrativas continuarão determinantes.',
      'Na avaliação editorial da Voz de Brasília, responsabilidade fiscal e proteção social não precisam ser bandeiras incompatíveis. O compromisso público deve combinar regras transparentes, combate ao desperdício e prioridade para ações que produzam benefícios verificáveis à população.',
      'Com a votação concluída e o texto encaminhado à etapa seguinte do processo legislativo, começa outra fase: acompanhar a implementação. O portal seguirá observando as decisões do Executivo e seus efeitos sobre investimentos, serviços, desenvolvimento e a vida dos brasileiros.'
    ]
  }
} as const;

type Slug = keyof typeof materias;
function materia(slug: string) { return materias[slug as Slug]; }

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(materias).map(slug => ({ slug })); }
export function generateMetadata({params}: {params: {slug: string}}): Metadata {
  const m=materia(params.slug);
  if(!m) return {title:'Reportagem não encontrada — Voz de Brasília'};
  return {
    title: m.titulo + ' | Voz de Brasília',
    description:m.chamada,
    alternates:{canonical:'https://www.vozdebrasilia.com.br/destaque/'+params.slug},
    openGraph:{title:m.titulo,description:m.chamada,type:'article',images:[m.imagem]}
  };
}

export default function DestaquePage({params}:{params:{slug:string}}) {
  const m=materia(params.slug);
  if(!m) notFound();
  return <div className="min-h-screen bg-slate-50">
    <Header />
    <main className="mx-auto max-w-[1050px] px-4 py-8 md:py-12">
      <nav className="mb-6 text-sm font-semibold text-green-800"><Link href="/">Início</Link><span className="mx-2 text-slate-400">/</span>Reportagem</nav>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="px-6 pb-8 pt-9 md:px-12">
          <p className="text-xs font-extrabold uppercase tracking-widest text-green-800">{m.categoria} · {m.data}</p>
          <h1 className="mt-4 text-3xl font-black leading-tight text-slate-950 md:text-5xl">{m.titulo}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{m.chamada}</p>
          <p className="mt-5 border-t border-slate-200 pt-4 text-sm font-semibold text-slate-700">Análise e comentários da redação · TV Voz de Brasília</p>
        </header>
        <figure className="bg-slate-100">
          <img className="mx-auto max-h-[530px] w-full object-contain" src={m.imagem} alt={m.imagemAlt} referrerPolicy="no-referrer"/>
          <figcaption className="px-6 py-3 text-xs text-slate-600 md:px-12">{m.credito}</figcaption>
        </figure>
        <div className="space-y-6 px-6 py-9 text-[17px] leading-8 text-slate-800 md:px-12">
          {m.paragrafos.map((p,index)=><p key={index}>{p}</p>)}
        </div>
        <footer className="border-t border-slate-200 bg-slate-50 p-6 md:px-12">
          <Link href="/" className="font-bold text-green-800 hover:underline">← Voltar à capa da Voz de Brasília</Link>
        </footer>
      </article>
    </main>
    <Footer />
  </div>;
}
