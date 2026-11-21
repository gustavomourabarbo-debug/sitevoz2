import CaesbCampaignBanner from '@/components/common/CaesbCampaignBanner';
const capa = {
  image: "https://www.gov.br/igualdaderacial/pt-br/assuntos/noticias/marcha-das-mulheres-negras-por-reparacao-e-bem-viver-reune-milhares-em-brasilia/20251125marchamnegras1.jpg/@@images/image-2002-72447359c086af0e19476636206633b4.jpeg",
  title: "Consciência Negra: 20 de novembro mobiliza o Brasil por memória, cultura e igualdade",
  caption: "Foto real de arquivo: Marcha das Mulheres Negras, Brasília, 25/11/2025. Crédito: Ricardo Stuckert/PR. A imagem não retrata atos de 20/11/2026.",
};
const materias = [
  {
    categoria: "DISTRITO FEDERAL",
    dataFato: "19/11/2026",
    titulo: "Celina Leão assina acordo para facilitar negociação de dívidas de pequeno valor no DF",
    imagem: "https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2024/12/31140019/53153252639_3e99496d5c_k.jpg",
    legenda: "Celina Leão. Foto real de arquivo: George Gianni/GDF (2024).",
    resumo: "Convênio firmado no Palácio do Buriti prevê condições diferenciadas de negociação, parcelamento e redução de custos para cancelar protestos em cartório.",
    texto: [
      "A governadora do Distrito Federal, Celina Leão, assinou em 19 de novembro um convênio que institui a Cobrança Social Extrajudicial. A medida foi apresentada pelo GDF como caminho para facilitar a regularização de dívidas de menor valor, incluindo contas de serviços essenciais e tributos.",
      "A iniciativa reúne o governo distrital, concessionárias e entidades ligadas aos cartórios de protesto. Entre as medidas anunciadas estão descontos, possibilidades de parcelamento e regras para diminuir os custos de cancelamento de protestos.",
      "Segundo a Agência Brasília, o objetivo é reduzir obstáculos financeiros enfrentados por famílias em situação de vulnerabilidade. Os critérios aplicáveis dependem do valor e da natureza de cada débito."
    ],
    fonte: "Agência Brasília • 19/11/2026",
    url: "https://www.agenciabrasilia.df.gov.br/w/gdf-cria-modalidade-de-cobranca-extrajudicial-para-negociar-dividas"
  },
  {
    categoria: "BRASIL • IGUALDADE RACIAL",
    dataFato: "19/11/2026",
    titulo: "Governo Lula destaca ações de igualdade racial e presença negra no serviço público",
    imagem: "https://www.gov.br/mj/pt-br/assuntos/noticias/mjsp-participa-de-cerimonia-no-dia-da-consciencia-negra-no-palacio-do-planalto/mjsp-participa-de-cerimonia-no-dia-da-consciencia-negra-no-palacio-do-planalto/@@images/0abbcc2b-92b5-4413-931d-9b3f823ded07.jpeg",
    legenda: "Lula em cerimônia anterior sobre igualdade racial. Foto real de arquivo: Governo Federal; não é registro de 20/11/2026.",
    resumo: "Na véspera do feriado, ministérios divulgaram programação cultural e levantamento sobre o ingresso de pessoas negras na administração pública federal.",
    texto: [
      "Às vésperas do Dia Nacional de Zumbi e da Consciência Negra, o governo federal apresentou ações do Novembro Negro voltadas à cultura afro-brasileira e ao enfrentamento da discriminação racial. O Ministério da Cultura destacou a campanha Cultura Negra Vive e atividades de valorização da produção cultural negra.",
      "Levantamento divulgado pelo Ministério da Gestão em 19 de novembro informou que pessoas negras corresponderam a 45% dos ingressos no serviço público federal nos últimos quatro anos. O estudo também analisa a evolução da presença de profissionais negros em cargos de liderança.",
      "Os resultados divulgados pelo Executivo integram o balanço das políticas de ações afirmativas do governo Lula. A ampliação de oportunidades convive com desafios persistentes de representação e de redução das desigualdades."
    ],
    fonte: "Ministério da Cultura e Ministério da Gestão • 19/11/2026",
    url: "https://www.gov.br/gestao/pt-br/assuntos/noticias/2026/novembro/pessoas-negras-representaram-45-dos-ingressos-no-servico-publico-federal-nos-ultimos-quatro-anos"
  }
];

export default function Capa20Nov2026() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-6 pb-5" aria-label="Capa especial de 20 de novembro de 2026">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b-4 border-red-800 pb-3">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-red-800">Edição especial • Sexta-feira, 20 de novembro de 2026</p>
          <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">Dia Nacional de Zumbi e da Consciência Negra</h2>
        </div>
        <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white">MANCHETE DE CAPA</span>
      </div>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[280px] bg-slate-900">
            <img src={capa.image} alt="Fotografia documental de uma marcha de mulheres negras em Brasília, registrada em 2025" className="h-full w-full object-cover" loading="eager" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 p-6 text-white md:p-9">
            <p className="text-xs font-black uppercase tracking-widest text-amber-300">Brasil • Cultura • Direitos • 20/11/2026</p>
            <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">{capa.title}</h1>
            <p className="mt-4 text-base leading-7 text-slate-100">Feriado nacional homenageia Zumbi dos Palmares. Brasília terá programação cultural, debates sobre equidade racial e projeção especial no Congresso Nacional.</p>
            <p className="mt-4 text-xs leading-5 text-slate-300">{capa.caption}</p>
          </div>
        </div>
        <div className="space-y-3 px-6 py-6 text-base leading-7 text-slate-800 md:px-9">
          <p>Nesta sexta-feira (20), o Brasil celebra o Dia Nacional de Zumbi e da Consciência Negra, feriado nacional dedicado à memória da resistência à escravidão, à valorização da cultura afro-brasileira e à reflexão sobre as desigualdades raciais que persistem no país.</p>
          <p>Em Brasília, o Congresso Nacional programou uma projeção mapeada para as 19h em sua fachada, com imagens e histórias ligadas à contribuição da população negra. No Distrito Federal, instituições culturais e órgãos públicos participam de debates e atividades sobre ancestralidade, diversidade e acesso a direitos.</p>
          <p>O Ministério da Cultura anunciou ações do Novembro Negro e a campanha Cultura Negra Vive. A discussão sobre igualdade racial também passou pelo Senado nesta semana, com sessão especial que reuniu representantes do poder público e da sociedade civil.</p>
          <details className="rounded-lg bg-slate-50 p-4">
            <summary className="cursor-pointer font-bold text-red-800">Leia a reportagem completa</summary>
            <p className="mt-3">O 20 de novembro recorda a morte de Zumbi dos Palmares em 1695 e se consolidou como data de reconhecimento da história e da atuação de lideranças negras. A celebração nacional, contudo, vai além da memória: também coloca em debate políticas de educação, renda, representação, cultura, justiça e combate ao racismo.</p>
            <p className="mt-3">A programação organizada no DF inclui atividades culturais abertas ao público. Informações sobre funcionamento de serviços distritais no feriado foram divulgadas pelo GDF; parte das unidades não terá atendimento regular.</p>
          </details>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
            <a className="text-blue-800 underline" href="https://www12.senado.leg.br/assessoria-de-imprensa/releases/congresso-nacional-recebe-projecao-mapeada-em-homenagem-ao-dia-nacional-de-zumbi-e-da-consciencia-negra" target="_blank" rel="noopener noreferrer">Fonte: Senado Federal</a>
            <a className="text-blue-800 underline" href="https://www.gov.br/cultura/pt-br/assuntos/noticias/minc-celebra-o-dia-da-consciencia-negra-com-acoes-afirmativas-e-programacao-cultural" target="_blank" rel="noopener noreferrer">Fonte: Ministério da Cultura</a>
            <a className="text-blue-800 underline" href="https://www.agenciabrasilia.df.gov.br/w/confira-o-que-abre-e-o-que-fecha-no-df-no-feriado-da-consciencia-negra" target="_blank" rel="noopener noreferrer">Serviços no DF durante o feriado</a>
          </div>
        </div>
      </article>

      <div className="mt-6" aria-label="Campanha CAESB acima da reportagem da governadora Celina Leão"><CaesbCampaignBanner /></div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {materias.map((m) => {
          const isCelina = m.categoria === 'DISTRITO FEDERAL';
          const reportagem = '/noticia/celina-leao-negociacao-dividas-df';
          return (
          <article key={m.titulo} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
            {isCelina ? (
              <a href={reportagem} aria-label={'Ler reportagem completa: ' + m.titulo} className="block bg-slate-50">
                <img src={m.imagem} alt="Celina Leão em fotografia de arquivo" className="h-64 w-full object-contain object-center" loading="eager" referrerPolicy="no-referrer" />
              </a>
            ) : (
              <img src={m.imagem} alt={m.legenda} className="h-64 w-full bg-slate-50 object-contain object-center" loading="eager" referrerPolicy="no-referrer" />
            )}
            <div className="p-6">
              <p className="text-xs leading-5 text-slate-500">{m.legenda}</p>
              <p className="mt-3 text-xs font-black uppercase tracking-wide text-green-800">{m.categoria} · 20/11/2026</p>
              {isCelina ? (
                <a href={reportagem} className="group">
                  <h3 className="mt-2 text-2xl font-extrabold leading-tight text-slate-900 group-hover:text-blue-800">{m.titulo}</h3>
                </a>
              ) : (
                <h3 className="mt-2 text-2xl font-extrabold leading-tight text-slate-900">{m.titulo}</h3>
              )}
              <p className="mt-3 text-base leading-7 text-slate-700">{m.resumo}</p>
              {isCelina ? (
                <a href={reportagem} className="mt-5 inline-flex rounded-lg bg-blue-800 px-5 py-3 font-bold text-white hover:bg-blue-900">LER REPORTAGEM COMPLETA →</a>
              ) : (
                <details className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <summary className="cursor-pointer font-bold text-green-800">Ler reportagem</summary>
                  {m.texto.map((paragrafo, idx) => <p key={idx} className="mt-3 text-sm leading-7 text-slate-700">{paragrafo}</p>)}
                </details>
              )}
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}
