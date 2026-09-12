import Header from '@/components/layout/Header';
import HeroCarousel from '@/components/home/HeroCarousel';
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

  const roneyPost = {
    id: 'roney-nemer-2026-09-01',
    slug: 'roney-nemer-volta-disputa-distrital-experiencia-propostas-brasilia',
    title: { rendered: 'Rôney Nemer: experiência e diálogo pelo Distrito Federal' },
    excerpt: { rendered: 'Candidato a deputado distrital pelo PP, número 11111, Rôney Nemer retorna à disputa eleitoral com uma trajetória construída na administração pública, no Legislativo e nas comunidades de Brasília.' },
    date: '2026-09-02T07:45:00-03:00',
    published_at: '2026-09-02T07:45:00-03:00',
    created_at: '2026-09-02T07:45:00-03:00',
    category: 'Política',
    categorySlug: 'politica',
    categoryColor: 'bg-red-600',
    featured_image: 'https://dados.agenciasertao.com/json/v1/eleicoes/2026/fotos/70002538503.jpg',
    href: '/noticia/roney-nemer-volta-disputa-distrital-experiencia-propostas-brasilia',
  };

  const posts = [
    roneyPost,
    ...feedPosts.filter((p: any) => p?.slug !== roneyPost.slug),
  ];

  const norm = (p: any) =>
    `${p?.title?.rendered ?? ''} ${p?.excerpt?.rendered ?? ''} ${p?.category ?? ''} ${p?.categorySlug ?? ''}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const isMaceio = (p: any) =>
    /maceio|alagoas|pajucara|ponta verde|praia do frances|maragogi|sao miguel dos milagres/.test(norm(p));

  const isPolitica = (p: any) =>
    p?.categorySlug === 'politica' ||
    /politica|lula|celina|michelle bolsonaro|julio cesar|flavio bolsonaro|leila|roney nemer|augusto cury|bolsonaro|caiado|zema|congresso|presidencia|eleicoes 2026|planalto|buriti/.test(
      norm(p),
    );

  const politicaPosts = posts.filter(isPolitica);
  const maceioPosts = posts.filter(isMaceio);
  const fotoRuim = (p: any) => !p?.featured_image || /\.(gif)$/i.test(String(p.featured_image));

  const fotoRuim = (p: any) =>
    !p?.featured_image || /\.(gif)$/i.test(String(p.featured_image));

  // Ordem editorial da capa: uma matéria de cada personagem estratégico.
  // Augusto Cury fica em superdestaque próprio logo acima deste carrossel.
  const obrigatorios = [
    'julio cesar',
    'roney nemer',
    'celina',
    'leila',
    'michelle bolsonaro',
    'lula',
    'flavio bolsonaro',
  ];

  const base = (politicaPosts.length >= 3 ? politicaPosts : posts).filter((p: any) => !fotoRuim(p));

  const destaques: any[] = [];

  termosEditoriais.forEach((termo) => {
    const achado = base.find((p: any) => norm(p).includes(termo) && !destaques.includes(p));
    if (achado) destaques.push(achado);
  });

  const recentes = [...base].sort((a: any, b: any) => {
    const da = new Date(a?.published_at || a?.created_at || a?.date || 0).getTime();
    const db = new Date(b?.published_at || b?.created_at || b?.date || 0).getTime();
    return db - da;
  });

  recentes.forEach((p: any) => {
    if (!destaques.includes(p)) destaques.push(p);
  });

  const heroPosts = destaques.slice(0, 8);

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
      <main className="pt-16">
        <TrendingBar posts={posts} />
        <div className="pt-4 space-y-4">
          <SponsorBanner sponsor="petrobras" />
          <div className="max-w-[1400px] mx-auto px-4">
            <TopStoryBanner
              href="/noticia/analise-profunda-paulo-fayad-augusto-cury-sera-o-proximo-presidente-do-brasil-e"
              kicker="ANÁLISE DE PAULO FAYAD • VOZ DE BRASÍLIA VIU ANTES"
              title="Augusto Cury cresce — e a aposta registrada pela Voz de Brasília ganha força"
              excerpt="A Voz de Brasília acompanha Cury desde quando aparecia com apenas 2% nas pesquisas. Em 31 de agosto, Paulo Fayad registrou de forma explícita sua aposta: Cury pode romper a polarização e vencer a eleição no primeiro turno. Agora, com levantamentos colocando o candidato entre 8% e 11%, revisitamos a tese e acompanhamos os próximos movimentos da curva."
              image="https://s2-g1.glbimg.com/4osiPZSqBjvajoKfPeoB7JFXcjs=/1315x0/filters:format(jpeg)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/v/g/KqdAvmQ1AwgklqqQ0Kug/cury-avante.jpg"
            />
          </div>
          <SponsorBanner sponsor="snaider" />
        </div>
        <div className="mt-4"><HeroCarousel posts={heroPosts} /></div>
        <InstagramVideoBanner />
        <div className="bg-white pt-8"><div className="max-w-[1400px] mx-auto px-4"><LatestNews posts={posts} /></div></div>
        <div className="mt-4"><PremiumBanner variant={0} /></div>
        <div className="mt-6"><SponsorBanner sponsor="visao" /></div>
        <ViralStrip />
        <MosaicHighlights posts={posts} />

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
