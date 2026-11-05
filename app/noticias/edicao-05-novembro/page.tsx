import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const reports = [
  {
    "id": "gastronomia",
    "category": "Gastronomia",
    "title": "Rota do Quiosque poderá selecionar até 100 estabelecimentos no DF",
    "excerpt": "Projeto anunciado em 5/11 prevê formação, circuito gastronômico e premiação; inscrições até 6/11.",
    "source": "Agência Brasília / Sedet-DF",
    "url": "https://agenciabrasilia.df.gov.br/w/rota-do-quiosque-2026-vai-eleger-a-melhor-comida-de-rua-do-distrito-federal?p_l_back_url=%2Fpt%2Fweb%2Fguest%2Fbusca%3Fdelta%3D10%26start%3D20&p_l_back_url_title=Busca",
    "img": "/news-images/festival.png"
  },
  {
    "id": "saude",
    "category": "Saúde",
    "title": "Saúde detalha repasses federais para o piso da enfermagem",
    "excerpt": "Fundo Nacional de Saúde publicou em 5/11 planilhas de recursos de outubro para estados, municípios e DF.",
    "source": "Fundo Nacional de Saúde",
    "url": "https://portalfns.saude.gov.br/ministerio-da-saude-disponibiliza-valores-de-outubro-de-2026-referentes-ao-piso-da-enfermagem/",
    "img": "/news-images/senado.png"
  },
  {
    "id": "tecnologia",
    "category": "Tecnologia e IA",
    "title": "Serpro realiza programação de soberania em IA em Brasília",
    "excerpt": "Encontro oficial de 5/11 discute governança de dados, nuvem e tecnologias para o setor público.",
    "source": "Serpro",
    "url": "https://www.serpro.gov.br/menu/quem-somos/eventos/semana-de-ia-serpro-v2",
    "img": "/news-images/itamaraty.png"
  },
  {
    "id": "mobilidade",
    "category": "Mobilidade",
    "title": "Seminário Via Viva debate segurança viária e frotas limpas",
    "excerpt": "Programação oficial de 5/11 inclui mobilidade urbana e infraestrutura de transportes.",
    "source": "Ministério dos Transportes",
    "url": "https://viaviva.transportes.gov.br/programacao/",
    "img": "/news-images/festival.png"
  },
  {
    "id": "economia",
    "category": "Economia",
    "title": "IBGE inclui divulgação da produção industrial no calendário de 5 de novembro",
    "excerpt": "Indicador de setembro tem data prevista de divulgação nesta quinta-feira; resultados devem ser consultados na fonte oficial.",
    "source": "IBGE",
    "url": "https://www.ibge.gov.br/calendario/mensal.html?ano=2026&mes=11",
    "img": "/news-images/senado.png"
  }
];

export const metadata = { title: 'Edição de 5 de novembro de 2026 | TV Voz de Brasília', description: 'Reportagens autorais com fontes oficiais e datas identificadas' };

export default function Edicao05Novembro(){return <div className="min-h-screen bg-slate-50"><Header/><main className="mx-auto max-w-5xl px-4 pt-24 pb-16"><div className="mb-9 rounded-2xl bg-slate-900 p-8 text-white"><p className="text-amber-300 font-bold">VOZ DE BRASÍLIA • 05/11/2026</p><h1 className="text-4xl font-black">Notícias e análises com fontes identificadas</h1><p className="mt-3 text-slate-200">Conteúdo editorial próprio. Datas e fontes estão identificadas; não se atribuem resultados que ainda não estejam confirmados.</p></div>{reports.map((item)=><article id={item.id} key={item.id} className="bg-white border border-slate-200 rounded-xl p-7 mb-7 shadow-sm"><p className="text-amber-700 font-bold text-sm">05/11/2026 • {item.category}</p><h2 className="text-2xl font-bold text-slate-900 mt-2 mb-3">{item.title}</h2><p className="text-slate-700">{item.excerpt}</p><p className="text-slate-700 mt-3">A pauta integra a cobertura editorial da TV Voz de Brasília nesta quinta-feira. O acompanhamento dos fatos exige a consulta aos documentos oficiais, que informam os prazos, as atividades e as próximas etapas. Quando se trata de programação prevista, a reportagem não a apresenta como resultado já concluído.</p><p className="mt-5 text-sm"><strong>Fonte oficial:</strong> <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{item.source}</a></p></article>)}</main><Footer/></div>}
