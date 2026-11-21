import CaesbCampaignBanner from '@/components/common/CaesbCampaignBanner';

const stories = [
  {
    section: 'POLÍTICA • BRASIL',
    title: 'Lula manifesta solidariedade ao Rio Grande do Sul após tempestade devastadora',
    summary: 'Presidente falou neste sábado (21) sobre as vítimas do temporal em Tupanciretã e a mobilização de ministérios para apoiar a população.',
    image: 'https://www.gov.br/planejamento/pt-br/assuntos/noticias/2026/imagens/55156120202_eb131de887_o.jpg/@@images/image-1847-ab43b5834cceb5a118f2f34172060dff.jpeg',
    alt: 'Presidente Luiz Inácio Lula da Silva em foto de arquivo',
    credit: 'Lula: fotografia oficial de arquivo, utilizada para ilustrar notícia de 21/11',
    source: 'Agência Brasil • 21/11/2026, 12h20',
    sourceUrl: 'https://agenciabrasil.ebc.com.br/politica/noticia/2026-11/lula-presta-solidariedade-cidade-gaucha-devastada-por-tempestade',
    paragraphs: [
      'O presidente Luiz Inácio Lula da Silva se manifestou neste sábado (21) sobre as consequências do temporal que atingiu Tupanciretã, no Rio Grande do Sul, na madrugada de sexta-feira. A tempestade deixou mortos, feridos e milhares de moradores com prejuízos em suas residências.',
      'Segundo a Agência Brasil, Lula destacou a presença de integrantes do governo federal na cidade e afirmou que a prioridade é reunir esforços para a recuperação das áreas atingidas. Equipes de diferentes ministérios atuam na articulação com autoridades estaduais e locais.',
      'A Defesa Civil gaúcha informou neste sábado que as tempestades atingiram pelo menos 33 municípios do estado. A situação exige atenção às famílias desalojadas, à rede de serviços essenciais e à reconstrução dos imóveis danificados.'
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
    <section className="mx-auto max-w-[1400px] px-4 pt-6 pb-5" aria-label="Capa da edição de sábado, 21 de novembro de 2026">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b-4 border-blue-900 pb-3">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-blue-900">Edição de sábado • 21 de novembro de 2026</p>
          <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">Brasília e Brasil: as notícias deste sábado</h2>
        </div>
        <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white">ATUALIZADO EM 21/11</span>
      </div>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[280px] bg-slate-100">
            <img
              src="https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2024/12/31140019/53153252639_3e99496d5c_k.jpg"
              alt="Governadora Celina Leão em fotografia real de arquivo"
              className="h-full w-full object-contain"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white md:p-9">
            <p className="text-xs font-black uppercase tracking-widest text-amber-300">Distrito Federal • Saúde • 21/11/2026</p>
            <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Água Quente terá primeira UPA com investimento de R$ 17,3 milhões</h1>
            <p className="mt-4 text-base leading-7 text-slate-100">Governadora Celina Leão destaca ampliação da rede. A unidade em construção terá 65 leitos modulares, raio-X e preparação para tomógrafo.</p>
            <p className="mt-4 text-xs leading-5 text-slate-300">Celina Leão. Foto real de arquivo: George Gianni/GDF (2024). A imagem não retrata as obras de 21/11.</p>
          </div>
        </div>
        <div className="space-y-3 px-6 py-6 text-base leading-7 text-slate-800 md:px-9">
          <p>O Governo do Distrito Federal detalhou neste sábado, 21 de novembro, as obras da primeira Unidade de Pronto Atendimento (UPA) da região administrativa de Água Quente. O investimento de R$ 17,3 milhões integra um conjunto de seis unidades em construção para reforçar a rede de urgência e emergência.</p>
          <p>A estrutura contará com 65 leitos modulares para adultos e crianças, sala de raio-X, preparação para receber tomógrafo e sistema de energia solar. O projeto está em fase de acabamento e foi pensado para diminuir a necessidade de deslocamento da população a outras regiões em busca de assistência.</p>
          <p>Em declarações divulgadas pela Agência Brasília, a governadora Celina Leão afirmou que a expansão depende de planejamento e recursos garantidos. A execução está sob responsabilidade do Instituto de Gestão Estratégica de Saúde do Distrito Federal (IgesDF).</p>
          <details className="rounded-lg bg-slate-50 p-4">
            <summary className="cursor-pointer font-bold text-blue-900">Leia a reportagem completa</summary>
            <p className="mt-3">Com a instalação da UPA, a população de Água Quente deverá contar com atendimento mais próximo para casos que precisam de avaliação de urgência. A construção se soma às iniciativas em Águas Claras, Guará, Sol Nascente, Taguatinga e outras regiões incluídas no pacote de expansão.</p>
            <p className="mt-3">A promessa de redução do tempo de deslocamento depende da conclusão da obra, aquisição de equipamentos, contratação das equipes e início do funcionamento. Não há, nesta reportagem, anúncio de inauguração da unidade em 21 de novembro.</p>
            <p className="mt-3 text-sm"><a href="https://agenciabrasilia.df.gov.br/w/com-investimento-de-r-173-milhoes-agua-quente-vai-ter-sua-primeira-upa" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-800 underline">Informações e fotos das obras na Agência Brasília (21/11)</a></p>
          </details>
        </div>
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