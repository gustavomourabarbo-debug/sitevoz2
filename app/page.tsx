import EdicaoNovembro04 from '@/components/home/EdicaoNovembro04';
import DetranCampaignBanner from '@/components/common/DetranCampaignBanner';
import Header from '@/components/layout/Header';
import LatestNews from '@/components/home/LatestNews';
import InterviewsSection from '@/components/home/InterviewsSection';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import CategoriesSection from '@/components/home/CategorySection';
import { getPosts, getInterviewPosts } from "../lib/wordpress";
import PremiumBanner from '@/components/common/PremiumBanner';
import TrendingBar from '@/components/common/TrendingBar';
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
    return Number.isFinite(data) && data <= agora + 60 * 60 * 1000 && data >= agora - 48 * 60 * 60 * 1000;
  });
  const capaAtual = atuais.length ? atuais : recentes.slice(0, 8);
  const postsDestaques = [...capaAtual, ...recentes.filter((p: any) => !capaAtual.includes(p))];
  const heroPosts = capaAtual.slice(0, 8);
  const topStory = {
    href: '/noticias/edicao-30-outubro/#finados',
    category: 'Brasília e Entorno',
    title: { rendered: 'PRF reforça fiscalização nas rodovias do DF e Entorno para o feriado de Finados' },
    excerpt: { rendered: 'Operação de 30 de outubro a 2 de novembro busca prevenir acidentes. Veja as orientações aos motoristas e as demais notícias verificadas.' },
    featured_image: 'https://www.gov.br/prf/pt-br/noticias/estaduais/distrito-federal/prf-reforca-fiscalizacao-no-df-e-entorno-durante-a-operacao-finados-2026/@@images/image-1600-0ff198658edd999c91f34ce36d32d1fe.jpeg',
  };

  const categories: { title: string; category: string }[] = [
    { title: 'Política', category: 'politica' }, { title: 'Distrito Federal', category: 'distrito-federal' },
    { title: 'Economia', category: 'economia' }, { title: 'Turismo', category: 'turismo' },
    { title: 'Gastronomia', category: 'gastronomia' }, { title: 'Saúde', category: 'saude' },
    { title: 'Tecnologia', category: 'tecnologia' }, { title: 'Esportes', category: 'esportes' },
    { title: 'Internacional', category: 'internacional' }, { title: 'Cultura', category: 'cultura' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-0">
        {atuais.length > 0 && <TrendingBar posts={atuais} />}
        <EdicaoNovembro04 />
        <DetranCampaignBanner />
        <section aria-label="Edição de 2 de novembro com fontes verificadas" className="max-w-[1400px] mx-auto px-4 pt-5"><div className="rounded-2xl border-2 border-amber-400 bg-slate-900 text-white p-5 md:p-8"><p className="text-amber-300 text-sm font-extrabold tracking-wide">EDIÇÃO 02/11/2026 • FERIADO DE FINADOS • FATOS PUBLICADOS EM 30/10 E 01/11</p><h2 className="text-3xl md:text-5xl font-black my-3">Finados no DF: serviços, saúde, educação e movimento na capital</h2><p className="text-lg text-slate-200 mb-5">Seleção jornalística com cinco reportagens completas, fotografias documentais e fontes oficiais. Os fatos mantêm suas datas originais; nenhuma ocorrência antiga é apresentada como notícia de hoje.</p><a href="/noticias/edicao-02-novembro/#finados" className="inline-block bg-amber-400 text-slate-950 font-black px-5 py-3 rounded-lg">LER MANCHETE COMPLETA →</a><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">{[["saude","Saúde pública: prevenção e atendimento no DF","01/11"],["corrida","Corrida do Servidor movimentou Brasília","01/11"],["tecnologia","Oficinas de tecnologia para estudantes","01/11"],["viagens","Aeroportos projetam mais de 2 milhões de passageiros","30/10"]].map(([id,title,date])=><a key={id} href={`/noticias/edicao-02-novembro/#${id}`} className="bg-slate-800 border border-slate-600 rounded-lg p-4 hover:border-amber-300"><small className="text-amber-300">FONTE {date}/2026</small><h3 className="font-bold text-lg mt-2">{title}</h3><span className="text-amber-300 font-bold text-xs">LER REPORTAGEM →</span></a>)}</div></div></section>
        <div className="pt-4 space-y-4">
          {topStory && (
            <div className="max-w-[1400px] mx-auto px-4">
              <TopStoryBanner
                href={topStory.href}
                kicker="MANCHETE • BRASÍLIA • FONTE 29/10/2026 • EDIÇÃO 30/10"
                title={typeof topStory.title === 'object' ? topStory.title?.rendered || '' : topStory.title || ''}
                excerpt={typeof topStory.excerpt === 'object' ? topStory.excerpt?.rendered || '' : topStory.excerpt || ''}
                image={topStory.featured_image}
              />
            </div>
          )}
          <section aria-label="Quatro notícias verificadas de 29 de outubro" className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ['habitacao','HABITAÇÃO','FGTS aprova R$ 144,5 bilhões para habitação em 2027'],
              ['energia','ENERGIA','Leilão de transmissão prevê R$ 8,9 bilhões em investimentos'],
              ['saude','SAÚDE','SUS terá R$ 3,95 bilhões para novo ciclo de projetos do Proadi'],
              ['educacao','EDUCAÇÃO','Revisão para o Enem mobiliza estudantes da EJA no Piauí'],
            ].map(([id,tag,title]) => <a key={id} href={`/noticias/edicao-30-outubro/#${id}`} className="block rounded-xl border border-amber-300 bg-white shadow-md p-5 hover:shadow-xl"><small className="text-amber-700 font-bold">FONTE 29/10 • {tag}</small><h3 className="text-lg font-bold text-slate-900 mt-2">{title}</h3><span className="text-blue-700 font-bold text-sm mt-3 block">LER REPORTAGEM →</span></a>)}
          </section>
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
        <div className="bg-white pt-8"><div className="max-w-[1400px] mx-auto px-4">{atuais.length > 0 ? <LatestNews posts={atuais} /> : <div className="rounded-xl border border-slate-200 bg-slate-50 p-5"><h2 className="text-xl font-bold text-slate-900">Arquivo jornalístico preservado</h2><p className="text-slate-600">As reportagens de datas anteriores continuam disponíveis nas editorias e no acervo. Não há matérias de 02/11 confirmadas para esta faixa de últimas notícias.</p></div>}</div></div>
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

        <div className="max-w-[1400px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">{categories.map((c) => (<CategoriesSection key={c.category} title={c.title} category={c.category} />))}</div>
            <aside className="lg:col-span-1"><div className="lg:sticky lg:top-24"><Sidebar /></div></aside>
          </div>
        </div>
        <div className="mb-2"><PremiumBanner variant={1} /></div>
        <div className="mt-4 mb-2"><SponsorBanner sponsor="coreto" /></div>
        {maceioPosts.length > 0 && <MaceioShowcase />}
        <div className="bg-gray-50 py-8"><div className="max-w-[1400px] mx-auto px-4"><InterviewsSection posts={interviews} /></div></div>
        <div className="mt-4 mb-2"><SponsorBanner sponsor="kumon" /></div>
        <div className="mt-2 mb-10"><PremiumBanner variant={2} /></div>
      </main>
      <Footer />
    </div>
  );
}
