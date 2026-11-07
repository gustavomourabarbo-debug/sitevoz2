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
        <section aria-label="Notícias verificadas de 5 de novembro de 2026" className="max-w-[1400px] mx-auto px-4 pt-5">
  <article className="rounded-2xl bg-slate-900 text-white p-6 md:p-9">
    <p className="text-sm font-extrabold text-amber-300">EDIÇÃO 05/11/2026 · NOTÍCIAS CONFIRMADAS</p>
    <h1 className="my-4 text-3xl md:text-5xl font-black">GDF realiza hoje o segundo sorteio de 2026 do Nota Legal</h1>
    <p className="text-lg text-slate-200">O sorteio foi realizado na quinta-feira (5) e transmitido nos canais oficiais do governo distrital.</p>
    <a href="/noticias/edicao-05-novembro/#nota-legal" className="mt-5 inline-block rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950">Ler reportagem completa</a>
    <p className="mt-3 text-xs text-slate-300">Fonte: Agência Brasília — 05/11/2026</p>
  </article>
  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <a key="mobilidade" href="/noticias/edicao-05-novembro/#mobilidade" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"><small className="font-extrabold text-emerald-800">Mobilidade · 05/11/2026</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">São Sebastião recebe obras de calçadas com acessibilidade</h2><p className="my-2 text-sm text-slate-600">Intervenções nas ruas Gameleira e da Ponte incluem rampas e piso tátil; investimento informado é de cerca de R$ 780 mil.</p><span className="font-bold text-emerald-800">Ler reportagem →</span></a>
  <a key="industria" href="/noticias/edicao-05-novembro/#industria" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"><small className="font-extrabold text-emerald-800">Economia · 05/11/2026</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Produção industrial brasileira cai 0,8% em setembro, informa IBGE</h2><p className="my-2 text-sm text-slate-600">Pesquisa divulgada em 5 de novembro registra a quarta retração da indústria em cinco meses.</p><span className="font-bold text-emerald-800">Ler reportagem →</span></a>
  <a key="leilao-der" href="/noticias/edicao-05-novembro/#leilao-der" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"><small className="font-extrabold text-emerald-800">Mobilidade · 05/11/2026</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">DER-DF anuncia leilão de veículos para 27 de novembro</h2><p className="my-2 text-sm text-slate-600">O 11º leilão público de 2026 será online; visitação dos lotes está prevista para 25 e 26 de novembro.</p><span className="font-bold text-emerald-800">Ler reportagem →</span></a>
  <a key="basquete" href="/noticias/edicao-05-novembro/#basquete" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"><small className="font-extrabold text-emerald-800">Educação e Esporte · 05/11/2026</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Estudantes do DF representam Brasília no basquete dos Jogos da Juventude</h2><p className="my-2 text-sm text-slate-600">Atletas formadas em centros de iniciação desportiva da rede pública participam da competição nacional.</p><span className="font-bold text-emerald-800">Ler reportagem →</span></a>
  <a key="quiosque" href="/noticias/edicao-05-novembro/#quiosque" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"><small className="font-extrabold text-emerald-800">Gastronomia e Negócios · 05/11/2026</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Rota do Quiosque abre seleção de até 100 negócios no DF</h2><p className="my-2 text-sm text-slate-600">Programa combina capacitação para empreendedores, circuito gastronômico e premiação de comida de rua.</p><span className="font-bold text-emerald-800">Ler reportagem →</span></a>
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
