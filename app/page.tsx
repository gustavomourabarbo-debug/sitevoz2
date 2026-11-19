import DetranCampaignBanner from '@/components/common/DetranCampaignBanner';
import Header from '@/components/layout/Header';
import Cop31Highlights from '@/components/home/Cop31Highlights';
import Cupula19Nov from '@/components/home/Cupula19Nov';
import BrasiliaHighlights from '@/components/home/BrasiliaHighlights';
import ClubePermutasConvite from '@/components/home/ClubePermutasConvite';
import LatestNews from '@/components/home/LatestNews';
import InterviewsSection from '@/components/home/InterviewsSection';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import CategoriesSection from '@/components/home/CategorySection';
import { getPosts, getInterviewPosts } from "../lib/wordpress";
import PremiumBanner from '@/components/common/PremiumBanner';
import MosaicHighlights from '@/components/common/MosaicHighlights';
import MaceioShowcase from '@/components/home/MaceioShowcase';
import ViralStrip from '@/components/home/ViralStrip';
import InstagramVideoBanner from '@/components/common/InstagramVideoBanner';
import SponsorBanner from '@/components/common/SponsorBanner';
import TopStoryBanner from '@/components/common/TopStoryBanner';

export const revalidate = 61;

export default async function Home() {
  const feedPosts = await getPosts(150);
  const interviews = await getInterviewPosts(40);

  const posts = feedPosts.filter((p: any) => {
    const texto = `${p?.title?.rendered ?? p?.title ?? ''} ${p?.excerpt?.rendered ?? p?.excerpt ?? ''}`
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return !(texto.includes('datafolha') && texto.includes('flavio bolsonaro') && !String(p?.date || '').startsWith('2026-10-04'));
  });

  const norm = (p: any) =>
    `${p?.title?.rendered ?? ''} ${p?.excerpt?.rendered ?? ''} ${p?.category ?? ''} ${p?.categorySlug ?? ''}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const isMaceio = (p: any) =>
    /maceio|alagoas|pajucara|ponta verde|praia do frances|maragogi|sao miguel dos milagres/.test(norm(p));

  const maceioPosts = posts.filter(isMaceio);
  const fotoRuim = (p: any) => !p?.featured_image || /\.(gif)$/i.test(String(p.featured_image));

  // A capa agora é 100% orientada pela atualidade: as matérias antigas continuam
  // disponíveis nas seções abaixo, mas não ocupam mais o carrossel principal.
  const recentes = posts
    .filter((p: any) => !fotoRuim(p))
    .sort((a: any, b: any) => {
      const da = new Date(a?.published_at || a?.created_at || a?.date || 0).getTime();
      const db = new Date(b?.published_at || b?.created_at || b?.date || 0).getTime();
      return db - da;
    });

  // A primeira dobra prioriza estritamente as notícias dos últimos dois dias.
  // As matérias anteriores permanecem nas editorias e no arquivo, sem ocupar a vitrine.
  const agora = Date.now();
  const atuais = recentes.filter((p: any) => {
    const data = new Date(p?.published_at || p?.created_at || p?.date || 0).getTime();
    return Number.isFinite(data) && data <= agora && data >= agora - 48 * 60 * 60 * 1000;
  });
  const capaAtual = atuais;
  const postsDestaques = [...capaAtual, ...recentes.filter((p: any) => !capaAtual.includes(p))];
  const heroPosts = capaAtual.slice(0, 8);
  const categories: { title: string; category: string }[] = [
    { title: 'Política', category: 'politica' }, { title: 'Distrito Federal', category: 'distrito-federal' },
    { title: 'Economia', category: 'economia' }, { title: 'Turismo', category: 'turismo' },
    { title: 'Gastronomia', category: 'gastronomia' }, { title: 'Saúde', category: 'saude' },
    { title: 'Tecnologia', category: 'tecnologia' }, { title: 'Esportes', category: 'esportes' },
    { title: 'Internacional', category: 'internacional' }, { title: 'Cultura', category: 'cultura' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header  />
      <main className="pt-0">
        <ClubePermutasConvite />
        <Cupula19Nov />
        <BrasiliaHighlights />
        <Cop31Highlights />


        <section className="mx-auto max-w-[1400px] px-4 pt-7" aria-label="Arquivo de notícias verificadas de 18 de novembro de 2026">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-3xl font-black text-slate-900">Arquivo recente — 18/11/2026</h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">Edição de quarta-feira · 5 reportagens</span>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[{"title":"Aliança Global contra a Fome e a Pobreza celebra dois anos em Roma","tag":"Cidadania","image":"https://www.gov.br/secom/en/latest-news/2024/12/2024-a-year-that-consolidated-economic-social-geopolitical-progress/2024_08_g20.jpeg/@@images/6f45d15b-872b-4523-99bc-60c4590c4b9f.jpeg","alt":"Fotografia de arquivo do lançamento da Aliança Global contra a Fome e a Pobreza, no G20 de 2024","caption":"Foto de arquivo: encontro do G20 no Rio de Janeiro, em 2024","source":"Secretaria de Comunicação Social da Presidência","url":"https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2026/11/alianca-global-contra-a-fome-e-a-pobreza-completa-dois-anos-e-lanca-a-campanha-corrida-ate-2030/","body":["Em 18 de novembro de 2026, a Aliança Global contra a Fome e a Pobreza marcou seu segundo aniversário com um encontro de alto nível na sede da FAO, em Roma. A iniciativa foi lançada em 2024, durante a presidência brasileira do G20.","Copresidido por Brasil e Espanha, o encontro reuniu representantes de governos e organismos internacionais para discutir resultados de políticas sociais e caminhos para acelerar o combate à fome e à pobreza até 2030.","Na agenda, a campanha internacional Corrida até 2030 destaca a mobilização de recursos, assistência técnica e parcerias entre os países. Segundo a Secretaria de Comunicação Social da Presidência, a Aliança soma 225 membros.","O desafio, a partir de agora, é transformar compromissos internacionais em medidas verificáveis de proteção social, segurança alimentar e melhoria das condições de vida."]},{"title":"Cidades recebem só 1,2% do financiamento climático para adaptação, diz CNI","tag":"Meio ambiente","image":"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=85","alt":"Imagem ilustrativa de edifícios e infraestrutura urbana","caption":"Imagem ilustrativa: infraestrutura urbana e adaptação climática","source":"CNI / Brasil 61","url":"https://brasil61.com/n/cidades-recebem-apenas-1-2-do-financiamento-climatico-destinado-a-adaptacao-aponta-estudo-da-cni-pind264845","body":["Estudo da Confederação Nacional da Indústria divulgado durante a COP31 aponta que apenas 1,2% do financiamento climático urbano global é destinado a medidas de adaptação aos impactos das mudanças climáticas.","O levantamento calcula que aproximadamente US$ 10 bilhões, de um total anual de US$ 831 bilhões, são direcionados à adaptação, apesar da exposição crescente das cidades a eventos climáticos extremos.","Apresentado em 16 de novembro, em Antália, na Turquia, o relatório Cidades Resilientes, Infraestrutura e Água reúne dados sobre vulnerabilidades urbanas e possibilidades de investimento.","Para o Brasil, a discussão envolve saneamento, planejamento urbano, proteção de moradores em áreas de risco e a capacidade de financiar obras de infraestrutura resiliente."]},{"title":"Canadá anuncia aporte ao Fundo Florestas Tropicais para Sempre","tag":"Meio ambiente","image":"https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&q=85","alt":"Imagem ilustrativa de floresta preservada","caption":"Imagem ilustrativa: conservação de florestas tropicais","source":"Ministérios do Meio Ambiente, Fazenda e Relações Exteriores","url":"https://www.gov.br/mma/pt-br/noticias/anuncio-de-investimento-do-canada-no-fundo-florestas-tropicais-para-sempre-tfff-nota-conjunta-mre-mma-mf","body":["O governo brasileiro divulgou nota conjunta sobre um compromisso inicial de 560 milhões de dólares canadenses, aproximadamente US$ 400 milhões, do Canadá com o Fundo Florestas Tropicais para Sempre (TFFF).","O aporte está previsto para ocorrer ao longo de quatro anos. O anúncio foi feito em 15 de novembro, durante reunião entre o presidente Luiz Inácio Lula da Silva e o primeiro-ministro Mark Carney, em Manila.","A nota publicada em 17 de novembro destaca também novos compromissos filantrópicos anunciados durante a COP31, que se somam ao esforço internacional para financiar a conservação florestal.","O objetivo do mecanismo é estabelecer uma fonte duradoura de recursos para apoiar países que preservam suas florestas tropicais, tema que permanece na agenda internacional desta quarta-feira."]},{"title":"Missão comercial no Paraguai e na Argentina projeta até US$ 2 milhões em negócios","tag":"Economia","image":"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=85","alt":"Imagem ilustrativa de logística, contêineres e comércio exterior","caption":"Imagem ilustrativa: comércio exterior e logística","source":"Brasil 61 / CECIEx / ApexBrasil","url":"https://brasil61.com/n/missao-comercial-paraguai-e-argentina-pode-gerar-us-2-mi-para-empresas-brasileiras-nos-proximos-meses-presidente-da-acsp-defende-ampliacao-do-comercio-regional-cacb260288.amp","body":["Empresas brasileiras participam de uma missão comercial organizada pelo CECIEx e pela ApexBrasil para ampliar os negócios com Paraguai e Argentina. Os organizadores estimam potencial de até US$ 2 milhões em negociações nos próximos meses.","A agenda é realizada por meio do projeto Brazilian Suppliers, com apoio da São Paulo Chamber of Commerce, vinculada à Associação Comercial de São Paulo.","Após compromissos em Assunção, a missão segue para encontros em Buenos Aires, com rodadas comerciais previstas para 19 de novembro e visitas técnicas no dia seguinte.","A iniciativa busca aproximar exportadores brasileiros de compradores locais e identificar oportunidades para empresas interessadas em ampliar sua presença no mercado sul-americano."]},{"title":"Guia gratuito para mulheres empreendedoras será lançado em 19 de novembro","tag":"Negócios","image":"https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1000&q=85","alt":"Imagem ilustrativa de profissionais em reunião de negócios","caption":"Imagem ilustrativa: planejamento e empreendedorismo","source":"Brasil 61 / CMEC","url":"https://brasil61.com/noticias/mais-acessadas","body":["O Conselho Nacional da Mulher Empreendedora e da Cultura (CMEC) prepara para 19 de novembro o lançamento de um guia digital gratuito para apoiar mulheres na organização e na gestão de seus negócios.","Segundo material divulgado nesta quarta-feira, o e-book reúne 67 páginas de orientações práticas sobre custos, precificação, planejamento financeiro e estruturação de empreendimentos.","A publicação é voltada a empreendedoras que buscam transformar ideias em operações sustentáveis e aprimorar os controles financeiros de suas atividades.","O conteúdo também chama atenção para os desafios enfrentados por mulheres no acesso a crédito e em decisões de investimento, temas importantes para a expansão de pequenos negócios."]}].map((item) => (
              <article key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img src={item.image} alt={item.alt} className="h-56 w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <p className="mb-1 text-xs text-slate-500">{item.caption}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-emerald-700">{item.tag} · 18/11/2026</p>
                  <h3 className="mt-2 text-xl font-extrabold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.body[0]}</p>
                  <details className="mt-3">
                    <summary className="cursor-pointer font-bold text-emerald-700">Ler reportagem completa</summary>
                    <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
                      {item.body.slice(1).map((paragrafo, indice) => <p key={indice}>{paragrafo}</p>)}
                    </div>
                  </details>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-semibold text-sky-800 underline">
                    Fonte: {item.source}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <DetranCampaignBanner />
        <section className="mx-auto max-w-[1400px] px-4 pt-7 pb-4" aria-label="Entrevistas autorais da TV Voz de Brasília">
          <div className="mb-5 rounded-2xl bg-slate-900 p-7 text-white">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-300">Jornalismo e conteúdo original</p>
            <h1 className="mt-2 text-3xl font-black md:text-5xl">Brasília em pauta. O Brasil em destaque.</h1>
            <p className="mt-3 max-w-3xl text-lg text-slate-200">Jornalismo independente, grandes conversas e cobertura dos assuntos que movimentam o país.</p>
            <a href="/entrevistas" className="mt-5 inline-block rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950">Conheça nossas conversas</a>
          </div>
          <InterviewsSection posts={interviews} />
        </section>
        <div className="pt-4 space-y-4">
          <SponsorBanner sponsor="snaider" />
        </div>
        <div className="w-full bg-[#020617] py-4">
          <div className="mx-auto max-w-[1200px] px-4">
            <img
              src="https://cdn.creativeclaw.co/u/d4de7256/images/b00ab739-9a74-4feb-87f8-859e585a4a0e.png"
              alt="Anuário Brasileiro 25 Anos — 1 milhão de exemplares, mil páginas e espaço para sua logomarca"
              className="mx-auto block h-auto w-full rounded-xl shadow-lg"
              loading="eager"
            />
          </div>
        </div>
        <div className="bg-white pt-8"><div className="max-w-[1400px] mx-auto px-4">{atuais.length > 0 ? <LatestNews posts={atuais} /> : <div className="rounded-xl border border-slate-200 bg-slate-50 p-5"><h2 className="text-xl font-bold text-slate-900">Arquivo jornalístico preservado</h2><p className="text-slate-600">As reportagens de datas anteriores continuam disponíveis nas editorias e no acervo. Ainda não há outras matérias recentes confirmadas nesta faixa. Consulte o arquivo jornalístico abaixo.</p></div>}</div></div>
        <div className="mt-4"><PremiumBanner variant={0} /></div>
        <div className="mt-6"><SponsorBanner sponsor="visao" /></div>
        <ViralStrip />
        {atuais.length > 0 && <MosaicHighlights posts={atuais} />}


        <div className="mt-6 mb-2">
          <PremiumBanner variant={3} />
        </div>

        <div className="mt-4 mb-2">
          <SponsorBanner sponsor="lunardi" />
        </div>

        <section className="mx-auto max-w-[1400px] px-4 py-8" aria-label="Reportagens completas do arquivo">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">Reportagens e análises do acervo</h2>
          <p className="mb-6 text-slate-600">Conteúdo jornalístico publicado pela TV Voz de Brasília. Consulte a data original de cada reportagem.</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.filter((p: any) => String(p?.content?.rendered || p?.content || '').replace(/<[^>]*>/g, '').trim().length >= 500 && p?.slug && p?.featured_image).slice(0, 12).map((p: any) => (
              <article key={p.slug} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <a href={`/noticia/${encodeURIComponent(p.slug)}`} className="block">
                  <img src={p.featured_image} alt="" loading="lazy" className="h-44 w-full object-cover" />
                  <div className="p-5">
                    <p className="mb-2 text-xs font-semibold text-slate-500">{p.category || 'Jornalismo'} · {p.date ? new Date(p.date).toLocaleDateString('pt-BR') : 'Arquivo'}</p>
                    <h3 className="text-lg font-bold text-slate-900">{String(p.title?.rendered || p.title || '').replace(/<[^>]*>/g, '')}</h3>
                    <p className="mt-3 text-sm text-slate-600">{String(p.excerpt?.rendered || p.excerpt || '').replace(/<[^>]*>/g, '').slice(0, 180)}</p>
                    <span className="mt-4 inline-block font-semibold text-green-700">Ler reportagem completa</span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>
        <div className="max-w-[1400px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">{categories.map((c) => (<CategoriesSection key={c.category} title={c.title} category={c.category} initialPosts={posts.filter((p: any) => p.categorySlug === c.category && p.featured_image && (p.content?.rendered || p.content)).slice(0, 4)} />))}</div>
            <aside className="lg:col-span-1"><div className="lg:sticky lg:top-24"><Sidebar /></div></aside>
          </div>
        </div>
        <div className="mb-2"><PremiumBanner variant={1} /></div>
        <div className="mt-4 mb-2"><SponsorBanner sponsor="coreto" /></div>
        {maceioPosts.length > 0 && <MaceioShowcase />}

        <div className="mt-4 mb-2"><SponsorBanner sponsor="kumon" /></div>
        <div className="mt-2 mb-10"><PremiumBanner variant={2} /></div>
      </main>
      <Footer />
    </div>
  );
}
