import Link from 'next/link';
import CaesbCampaignBanner from '@/components/common/CaesbCampaignBanner';
import GdfCampaignBanner from '@/components/common/GdfCampaignBanner';

const stories = [
  {
    section: 'POLÍTICA • ECONOMIA',
    title: 'Lula defende ajuste fiscal e afirma que mercado financeiro não ditará os rumos do Brasil',
    summary: 'Em live neste sábado (21), presidente rebate críticas à proposta para o Orçamento de 2027 e afirma que não cortará programas sociais.',
    image: 'https://www.gov.br/planejamento/pt-br/assuntos/noticias/2026/imagens/55156120202_eb131de887_o.jpg/@@images/image-1847-ab43b5834cceb5a118f2f34172060dff.jpeg',
    alt: 'Presidente Luiz Inácio Lula da Silva em fotografia oficial de arquivo',
    credit: 'Lula: foto oficial de arquivo; a imagem não retrata a transmissão de 21/11',
    source: 'Agência Brasil • publicado em 21/11/2026, às 14h12',
    sourceUrl: 'https://agenciabrasil.ebc.com.br/politica/noticia/2026-11/o-sistema-financeiro-nao-vai-me-ensinar-dirigir-o-brasil-diz-lula',
    paragraphs: [
      'Em uma transmissão ao vivo nas redes sociais neste sábado, 21 de novembro, o presidente Luiz Inácio Lula da Silva defendeu o projeto de ajuste fiscal do governo e reagiu a críticas do mercado financeiro e de integrantes da esquerda. A conversa foi conduzida pelo deputado André Janones, na Granja do Torto, em Brasília.',
      'A proposta, já aprovada pelo Senado e ainda pendente de análise na Câmara dos Deputados, combina contenção de despesas e aumento de receitas. Segundo a Agência Brasil, a previsão apresentada é de impacto fiscal entre R$ 45,1 bilhões e R$ 56,1 bilhões em 2027.',
      'Lula afirmou que não aceitará que o sistema financeiro determine as prioridades de seu governo. Também defendeu o ministro do Planejamento, Bruno Moretti, e disse que o ajuste não retirará recursos destinados à população de baixa renda.',
      'O presidente declarou ainda que não pretende elevar a idade mínima de aposentadoria no próximo mandato e abordou a possibilidade de criar uma pasta dedicada às pessoas idosas. São compromissos e propostas mencionados na entrevista, não medidas já implementadas.'
    ]
  },
  {
    section: 'DISTRITO FEDERAL • INFRAESTRUTURA',
    title: 'Novacap mantém equipes nas ruas para enfrentar danos das chuvas no DF',
    summary: 'Tapa-buracos, podas e atendimento de emergências continuam neste sábado em várias regiões administrativas.',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1100&q=85',
    alt: 'Vista urbana, imagem ilustrativa de infraestrutura de cidade',
    credit: 'Imagem ilustrativa de infraestrutura urbana; não retrata os serviços deste sábado',
    source: 'Agência Brasília / Novacap • 21/11/2026',
    sourceUrl: 'https://agenciabrasilia.df.gov.br/noticias',
    paragraphs: [
      'Equipes da Novacap permaneceram em atividade no Distrito Federal neste sábado (21), mesmo com o feriado prolongado. Os serviços abrangem recuperação de asfalto, manejo de árvores e prontidão para ocorrências decorrentes das chuvas.',
      'A programação envolve Ceilândia, Taguatinga, Plano Piloto, São Sebastião, Planaltina e Santa Maria. O trabalho busca reduzir transtornos de circulação e riscos nas áreas de maior vulnerabilidade.',
      'Além das frentes programadas, grupos de sobreaviso estão disponíveis para responder a situações emergenciais. O órgão reforça que as condições climáticas podem alterar a execução dos serviços viários.'
    ]
  },
  {
    section: 'DISTRITO FEDERAL • SAÚDE',
    title: 'Agentes de saúde do DF somam 1,5 milhão de visitas domiciliares desde abril',
    summary: 'Balanço apresentado neste sábado detalha o acompanhamento de famílias, especialmente em áreas como Ceilândia e Pôr do Sol.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1100&q=85',
    alt: 'Profissional de saúde em imagem fotográfica ilustrativa',
    credit: 'Fotografia ilustrativa de atendimento em saúde; não retrata a equipe citada',
    source: 'Agência Brasília / SES-DF • 21/11/2026',
    sourceUrl: 'https://www.agenciabrasilia.df.gov.br/w/agentes-de-saude-fazem-15-milhao-de-visitas-a-casas-de-moradores-do-df-desde-abril',
    paragraphs: [
      'A Secretaria de Saúde divulgou neste sábado um balanço de 1,5 milhão de visitas domiciliares realizadas desde abril por agentes comunitários. O atendimento alcançou mais de 523 mil moradores acompanhados em casa.',
      'No mesmo período, médicos e enfermeiros da rede de atenção primária realizaram mais de 2,1 milhões de atendimentos individuais, segundo dados apresentados pela Agência Brasília.',
      'Na UBS 17 de Ceilândia, profissionais acompanham famílias das regiões do Pôr do Sol e do P Sul, com atenção à prevenção, à vacinação e às necessidades das pessoas que têm dificuldade de deslocamento.'
    ]
  },
  {
    section: 'DISTRITO FEDERAL • EDUCAÇÃO',
    title: 'Proerd ultrapassa 740 mil alunos certificados na história do Distrito Federal',
    summary: 'Programa da PMDF divulgou neste sábado novo balanço de atividades educativas de prevenção às drogas e à violência.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1100&q=85',
    alt: 'Material escolar em fotografia ilustrativa',
    credit: 'Fotografia ilustrativa de educação; não representa uma turma específica do Proerd',
    source: 'Agência Brasília / PMDF • 21/11/2026',
    sourceUrl: 'https://agenciabrasilia.df.gov.br/w/proerd-consolida-cultura-de-paz-e-fortalece-rede-de-protecao-e-cidadania-para-jovens-do-df',
    paragraphs: [
      'O Programa Educacional de Resistência às Drogas e à Violência (Proerd) alcançou mais de 740 mil estudantes certificados desde sua criação no Distrito Federal, em 1998.',
      'Em balanço divulgado neste sábado (21), a PMDF informou que 12.161 estudantes concluíram atividades desde abril de 2026. A iniciativa acontece em escolas públicas e particulares.',
      'O conteúdo trabalha escolhas seguras, prevenção ao bullying e aproximação entre famílias, professores e profissionais da segurança pública.'
    ]
  }
];

export default function Capa21Nov2026() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-6 pb-5" aria-label="Capa da edição de domingo, 22 de novembro de 2026">
      <div className="mb-5" aria-label="Banner do GDF acima da edição de domingo">
        <GdfCampaignBanner />
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b-4 border-blue-900 pb-3">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-blue-900">Edição de domingo • 22 de novembro de 2026</p>
          <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">Brasília e Brasil: notícias deste domingo</h2>
        </div>
        <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white">ATUALIZADO EM 22/11</span>
      </div>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <Link href="/brasilia/celina-leao-estadio-sobradinho-17-novembro" className="group block" aria-label="Abrir reportagem completa sobre Celina Leão e o estádio de Sobradinho">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[280px] bg-slate-100">
              <img
                src="https://agenciabrasilia.df.gov.br/documents/d/guest/whatsapp-image-2026-11-17-at-19-59-00-jpeg"
                alt="Celina Leão na entrega da nova pista de atletismo no Estádio Augustinho Lima, em Sobradinho, em 17 de novembro de 2026"
                className="h-full w-full object-contain"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white md:p-9">
              <p className="text-xs font-black uppercase tracking-widest text-amber-300">Distrito Federal • Esporte e infraestrutura • Edição de 22/11/2026</p>
              <h1 className="mt-3 text-3xl font-black leading-tight group-hover:underline md:text-5xl">Celina Leão entrega pista de atletismo e nova iluminação em Sobradinho</h1>
              <p className="mt-4 text-base leading-7 text-slate-100">Em balanço da semana, a reforma de R$ 5,5 milhões do Estádio Augustinho Lima destaca novas condições de treino e uso comunitário. A entrega ocorreu em 17 de novembro.</p>
              <p className="mt-4 text-xs leading-5 text-slate-300">Foto do evento de 17/11/2026: Joel Rodrigues / Agência Brasília.</p>
              <span className="mt-6 inline-flex w-fit items-center rounded-lg bg-amber-400 px-5 py-3 font-black text-slate-950 transition-colors group-hover:bg-amber-300">
                Leia a reportagem completa
              </span>
            </div>
          </div>
        </Link>
      </article>

      <div className="mt-6" aria-label="Publicidade CAESB PI 46319 para registro da campanha"><CaesbCampaignBanner /></div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {stories.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
            <img src={item.image} alt={item.alt} className="h-56 w-full bg-slate-100 object-contain" loading="lazy" referrerPolicy="no-referrer" />
            <div className="p-6">
              <p className="text-xs text-slate-500">{item.credit}</p>
              <p className="mt-3 text-xs font-black uppercase tracking-wide text-blue-800">{item.section} • 21/11/2026</p>
              <h3 className="mt-2 text-2xl font-extrabold leading-tight text-slate-900">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-700">{item.summary}</p>
              <details className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <summary className="cursor-pointer font-bold text-blue-800">Ler reportagem completa</summary>
                {item.paragraphs.map((text, index) => <p key={index} className="mt-3 text-sm leading-7 text-slate-700">{text}</p>)}
                <p className="mt-4 text-xs text-slate-600"><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">Apuração: {item.source}</a></p>
              </details>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}