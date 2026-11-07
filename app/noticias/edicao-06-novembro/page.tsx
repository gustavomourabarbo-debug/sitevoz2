import Header from '@/components/layout/Header';
const noticias = [
  {
    "id": "saude",
    "cat": "Saúde",
    "title": "Saúde do DF alerta hoje contra falsas cobranças de cirurgias no SUS",
    "summary": "Secretaria de Saúde reforçou nesta sexta-feira que consultas, exames e procedimentos na rede pública são gratuitos.",
    "paras": [
      "A Secretaria de Saúde do Distrito Federal alertou, nesta sexta-feira (6), para golpes que exigem pagamentos por supostas vagas e procedimentos médicos da rede pública. A orientação foi divulgada após denúncias de falsas ofertas de cirurgias relacionadas ao Outubro Rosa.",
      "O SUS é gratuito. Cobranças por Pix, transferências e dinheiro para adiantar consultas ou cirurgias devem ser denunciadas à Ouvidoria do DF, pelo 162, e à Polícia Civil, pelo 197."
    ],
    "source": "Agência Brasília — 06/11/2026, 18h38",
    "url": "https://www.agenciabrasilia.df.gov.br/w/sus-e-100-gratuito-saude-alerta-contra-cobrancas-indevidas-por-cirurgias-e-consultas"
  },
  {
    "id": "vacinacao",
    "cat": "Saúde e bem-estar",
    "title": "DF confirma vacinação contra a gripe em mais de 30 locais neste sábado",
    "summary": "Secretaria de Saúde divulgou hoje os locais de imunização para 7 de novembro.",
    "paras": [
      "O Governo do Distrito Federal anunciou nesta sexta-feira (6) que haverá mais de 30 pontos de vacinação no sábado (7). A dose contra a gripe está disponível para toda a população a partir de seis meses de idade.",
      "Também haverá outros imunizantes conforme o calendário de vacinação. A orientação é levar documento de identificação com foto e a caderneta de vacinação, quando disponível."
    ],
    "source": "Agência Brasília — 06/11/2026, 18h01",
    "url": "https://agenciabrasilia.df.gov.br/w/saiba-onde-se-vacinar-contra-a-gripe-neste-sabado-7-"
  },
  {
    "id": "acessibilidade",
    "cat": "Mobilidade e inclusão",
    "title": "GDF apresenta transporte adaptado e Libras em evento paralímpico",
    "summary": "Publicação de hoje detalha o apoio a participantes do encontro no CICB.",
    "paras": [
      "A Agência Brasília publicou nesta sexta-feira (6) o balanço das medidas de acessibilidade do governo em evento do Comitê Brasileiro de Clubes Paralímpicos, realizado no Centro Internacional de Convenções do Brasil.",
      "Cinco vans adaptadas do programa DF Acessível realizaram transportes de participantes, e o evento contou com intérpretes de Libras, segundo as informações oficiais."
    ],
    "source": "Agência Brasília — 06/11/2026, 16h59",
    "url": "https://www.agenciabrasilia.df.gov.br/w/gdf-reforca-inclusao-e-leva-transporte-adaptado-e-interprete-de-libras-para-evento-paralimpico"
  },
  {
    "id": "gamiverse",
    "cat": "Tecnologia e educação",
    "title": "Gamiverse reunirá estudantes de 16 polos de tecnologia e jogos do DF",
    "summary": "Evento gratuito anunciado hoje ocorrerá de 16 a 18 de novembro.",
    "paras": [
      "A programação do Gamiverse foi divulgada pelo GDF nesta sexta-feira (6). Entre 16 e 18 de novembro, o encontro reunirá estudantes do projeto Gamifica – Tecnologia em Jogos, com atividades de esportes eletrônicos, exposições e palestras.",
      "O evento está previsto para o Millennium Convention Center, na Ascade, das 9h às 16h. A entrada é gratuita e as disputas são voltadas aos alunos dos 16 polos participantes."
    ],
    "source": "Agência Brasília — 06/11/2026, 16h18",
    "url": "https://www.agenciabrasilia.df.gov.br/w/gamiverse-transforma-jovens-em-protagonistas-da-tecnologia-e-dos-games-no-df"
  },
  {
    "id": "fac",
    "cat": "Educação e cultura",
    "title": "Resultado preliminar do FAC I/2026 é divulgado nesta sexta-feira",
    "summary": "Secretaria de Cultura publicou hoje a avaliação dos projetos inscritos no edital.",
    "paras": [
      "A Secretaria de Cultura e Economia Criativa do DF divulgou nesta sexta-feira (6) a avaliação preliminar de mérito cultural das propostas do FAC I/2026.",
      "A lista publicada no Diário Oficial apresenta notas, valores e a situação das propostas de ampla concorrência e modalidades regionalizadas. Os interessados devem acompanhar os prazos e as orientações nos canais oficiais."
    ],
    "source": "Agência Brasília — 06/11/2026, 11h35",
    "url": "https://www.agenciabrasilia.df.gov.br/w/divulgado-o-resultado-preliminar-da-avaliacao-de-merito-cultural-do-fac-i/2026"
  },
  {
    "id": "cerrado",
    "cat": "Meio ambiente",
    "title": "DF anuncia fórum de prevenção a incêndios florestais para novembro",
    "summary": "Encontro previsto para 23 e 24 de novembro foi anunciado hoje e prepara ações de 2027.",
    "paras": [
      "A Secretaria do Meio Ambiente do Distrito Federal anunciou nesta sexta-feira (6) a realização do Fórum Distrital de Prevenção e Combate aos Incêndios Florestais, em 23 e 24 de novembro.",
      "O encontro será realizado no auditório da Escola de Governo e deverá reunir instituições, pesquisadores e a comunidade para avaliar a temporada de 2026 e discutir ações de proteção do Cerrado para 2027."
    ],
    "source": "Agência Brasília — 06/11/2026, 18h50",
    "url": "https://www.agenciabrasilia.df.gov.br/w/forum-reune-sociedade-e-instituicoes-para-debater-prevencao-e-combate-a-incendios-florestais-no-df"
  }
];
export const metadata={title:"Notícias de 6 de novembro de 2026 | TV Voz de Brasília",description:"Reportagens da TV Voz de Brasília baseadas em fontes oficiais do dia 6 de novembro de 2026"};
export default function EdicaoSeisNovembro(){return (<><Header dataEdicao="2026-11-06" /><main className="min-h-screen bg-slate-50 text-slate-900"><div className="bg-emerald-900 px-5 py-3 text-center text-sm font-semibold tracking-wide text-white" aria-label="Data da edição">Edição de 6 de novembro de 2026</div><div className="mx-auto max-w-5xl px-5 py-9"><h1 className="text-3xl font-extrabold leading-tight md:text-5xl">Notícias de hoje, 6 de novembro de 2026</h1><p className="mt-4 text-slate-600">Reportagens autorais com data original de publicação e fontes identificadas.</p><nav aria-label="Notícias" className="my-7 flex flex-wrap gap-2">{noticias.map(x=><a key={x.id} href={"#"+x.id} className="rounded-lg bg-emerald-900 px-3 py-2 text-sm font-semibold text-white">{x.cat}</a>)}</nav>{noticias.map(x=><article id={x.id} key={x.id} className="mb-7 scroll-mt-64 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9"><p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">{x.cat} • 06/11/2026</p><h2 className="my-3 text-2xl font-extrabold leading-tight md:text-3xl">{x.title}</h2><p className="mb-5 text-lg font-medium text-slate-600">{x.summary}</p>{x.paras.map((p,i)=><p key={i} className="mb-4 leading-relaxed">{p}</p>)}<p className="mt-6 border-t border-slate-200 pt-4 text-sm"><strong>Fonte oficial: </strong><a href={x.url} target="_blank" rel="noopener noreferrer" className="text-emerald-800 underline">{x.source}</a></p></article>)}<a href="/" className="font-bold text-emerald-900 underline">Voltar à capa</a></div></main></>)};