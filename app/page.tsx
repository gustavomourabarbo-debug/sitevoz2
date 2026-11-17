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
        <section className="mx-auto max-w-[1400px] px-4 pt-7 pb-4" aria-label="Entrevistas autorais da TV Voz de Brasília">
          <div className="mb-5 rounded-2xl bg-slate-900 p-7 text-white">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-300">Jornalismo e conteúdo original</p>
            <h1 className="mt-2 text-3xl font-black md:text-5xl">Brasília em pauta. O Brasil em destaque.</h1>
            <p className="mt-3 max-w-3xl text-lg text-slate-200">Jornalismo independente, grandes conversas e cobertura dos assuntos que movimentam o país.</p>
            <a href="/entrevistas" className="mt-5 inline-block rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950">Conheça nossas conversas</a>
          </div>
          <InterviewsSection posts={interviews.filter((p: any) => Boolean(p?.featured_image || p?._embedded?.['wp:featuredmedia']?.[0]?.source_url))} />
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
