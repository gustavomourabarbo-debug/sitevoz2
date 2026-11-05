import DetranCampaignBanner from '@/components/common/DetranCampaignBanner';
import Header from '@/components/layout/Header';
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
      <Header  />
      <main className="pt-0">
        <DetranCampaignBanner />
        <section aria-label="Edição de 5 de novembro de 2026" className="max-w-[1400px] mx-auto px-4 pt-5">
          <article className="rounded-2xl bg-slate-900 text-white p-6 md:p-9">
            <p className="text-sm font-extrabold text-amber-300">EDIÇÃO 05/11/2026 · DISTRITO FEDERAL</p>
            <h1 className="my-4 text-3xl md:text-5xl font-black">Rota do Quiosque poderá selecionar até 100 estabelecimentos no DF</h1>
            <p className="text-lg text-slate-200">GDF lançou iniciativa de capacitação e circuito gastronômico para negócios locais, com inscrições anunciadas até 6 de novembro. Informação publicada pela Agência Brasília em 5/11.</p>
            <a href="/noticias/edicao-05-novembro/#gastronomia" className="mt-5 inline-block rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950">Leia a reportagem completa</a>
          </article>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            <a href="/noticias/edicao-05-novembro/#saude" className="rounded-xl border border-amber-300 bg-white p-4 text-slate-900 shadow-sm hover:shadow-lg"><span className="text-xs font-bold text-amber-700">FONTE 05/11 • Saúde</span><h2 className="font-bold text-lg mt-2">Saúde detalha repasses federais para o piso da enfermagem</h2><span className="text-blue-800 font-bold text-sm">LER REPORTAGEM →</span></a>
            <a href="/noticias/edicao-05-novembro/#tecnologia" className="rounded-xl border border-amber-300 bg-white p-4 text-slate-900 shadow-sm hover:shadow-lg"><span className="text-xs font-bold text-amber-700">FONTE 05/11 • Tecnologia</span><h2 className="font-bold text-lg mt-2">Serpro realiza programação de soberania em IA em Brasília</h2><span className="text-blue-800 font-bold text-sm">LER REPORTAGEM →</span></a>
            <a href="/noticias/edicao-05-novembro/#mobilidade" className="rounded-xl border border-amber-300 bg-white p-4 text-slate-900 shadow-sm hover:shadow-lg"><span className="text-xs font-bold text-amber-700">FONTE 05/11 • Mobilidade</span><h2 className="font-bold text-lg mt-2">Seminário Via Viva debate segurança viária e frotas limpas</h2><span className="text-blue-800 font-bold text-sm">LER REPORTAGEM →</span></a>
            <a href="/noticias/edicao-05-novembro/#economia" className="rounded-xl border border-amber-300 bg-white p-4 text-slate-900 shadow-sm hover:shadow-lg"><span className="text-xs font-bold text-amber-700">FONTE 05/11 • Economia</span><h2 className="font-bold text-lg mt-2">IBGE inclui divulgação da produção industrial no calendário de 5 de novembro</h2><span className="text-blue-800 font-bold text-sm">LER REPORTAGEM →</span></a>
          </div>
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
