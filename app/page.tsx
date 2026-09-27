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
import TerracapBanner from '@/components/common/TerracapBanner';

export const revalidate = 61;

export default async function Home() {
  const feedPosts = await getPosts(150); const interviews = await getInterviewPosts(40);
  const curated = [
    {
      id: 'df-eleicoes-2609', slug: 'candidatos-governo-df-2609',
      title: { rendered: 'Eleições 2026: veja os dez candidatos ao governo do DF' },
      excerpt: { rendered: 'Agência Brasil apresenta os candidatos ao GDF. O Distrito Federal tem 2,25 milhões de eleitores aptos a votar.' },
      date: '2026-09-26T08:15:00-03:00', published_at: '2026-09-26T08:15:00-03:00', created_at: '2026-09-26T08:15:00-03:00',
      category: 'Distrito Federal', categorySlug: 'distrito-federal', categoryColor: 'bg-green-700',
      featured_image: 'https://imagens.ebc.com.br/YtGwk6g4UzeH5Y4_0zzlhiMwqcs%3D/1170x700/smart/https%3A//agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2026/09/24/candidatos_df.jpg?itok=H2MZ30-I',
      href: 'https://agenciabrasil.ebc.com.br/politica/noticia/2026-09/eleicoes-2026-saiba-quem-sao-os-candidatos-ao-governo-do-df'
    },
    {
      id: 'tse-local-2609', slug: 'tse-consulta-local-votacao-2609',
      title: { rendered: 'Local de votação pode ter mudado; TSE orienta eleitor a consultar antes' },
      excerpt: { rendered: 'A Justiça Eleitoral recomenda conferir zona e seção no e-Título ou no site do TSE antes do primeiro turno.' },
      date: '2026-09-26T18:56:00-03:00', published_at: '2026-09-26T18:56:00-03:00', created_at: '2026-09-26T18:56:00-03:00',
      category: 'Eleições 2026', categorySlug: 'politica', categoryColor: 'bg-blue-700',
      featured_image: 'https://imagens.ebc.com.br/U_PXy6jnuNqefHh0JD_zxjCkvbw%3D/1170x700/smart/https%3A//agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2024/09/03/0d7a0238.jpg?itok=PRL1g000',
      href: 'https://agenciabrasil.ebc.com.br/politica/noticia/2026-09/eleitor-deve-se-antecipar-na-consulta-local-de-votacao-alerta-tse'
    },
    {
      id: 'go-eleicoes-2609', slug: 'candidatos-governo-goias-2609',
      title: { rendered: 'Goiás tem seis candidatos ao governo nas eleições de 2026' },
      excerpt: { rendered: 'Mais de 5 milhões de eleitores estão aptos a votar no estado; confira os nomes na disputa.' },
      date: '2026-09-26T08:30:00-03:00', published_at: '2026-09-26T08:30:00-03:00', created_at: '2026-09-26T08:30:00-03:00',
      category: 'Política', categorySlug: 'politica', categoryColor: 'bg-green-700',
      featured_image: 'https://imagens.ebc.com.br/7NvTHj9vzyl0Hp4wgfkuTtILGqY%3D/1170x700/smart/https%3A//agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2026/09/24/candidatos_go.jpg?itok=jAUkvUUF',
      href: 'https://agenciabrasil.ebc.com.br/politica/noticia/2026-09/conheca-os-candidatos-ao-governo-de-goias-nas-eleicoes-deste-ano'
    },
    {
      id: 'agenda-presidencia-2609', slug: 'agenda-presidenciaveis-fim-semana-2609',
      title: { rendered: 'Presidenciáveis têm caminhadas e encontros neste fim de semana' },
      excerpt: { rendered: 'A agenda de 26 e 27 de setembro reúne atos de campanha em diferentes cidades do país.' },
      date: '2026-09-26T09:45:00-03:00', published_at: '2026-09-26T09:45:00-03:00', created_at: '2026-09-26T09:45:00-03:00',
      category: 'Brasil', categorySlug: 'politica', categoryColor: 'bg-blue-700',
      featured_image: 'https://imagens.ebc.com.br/Qjn25j4kWuBB0OOSqVFyv-s7K54%3D/1170x700/smart/https%3A//agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2026/08/18/banner_agenda_-_1170x700.png?itok=KJR_nOUL',
      href: 'https://agenciabrasil.ebc.com.br/politica/noticia/2026-09/confira-agenda-dos-presidenciaveis-neste-fim-de-semana-26-e-27'
    }
  ];
  const posts = [...curated, ...feedPosts.filter((p: any) => String(p?.published_at || p?.date || '').slice(0, 10) === '2026-09-26')];
  const norm=(p:any)=>`${p?.title?.rendered??''} ${p?.excerpt?.rendered??''} ${p?.category??''} ${p?.categorySlug??''}`.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const heroPosts:any[]=curated;
  const isMaceio=(p:any)=>/maceio|alagoas|pajucara|ponta verde|praia do frances|maragogi|sao miguel dos milagres/.test(norm(p)); const maceioPosts=posts.filter(isMaceio);
  const categories=[{title:'Política',category:'politica'},{title:'Distrito Federal',category:'distrito-federal'},{title:'Economia',category:'economia'},{title:'Turismo',category:'turismo'},{title:'Gastronomia',category:'gastronomia'},{title:'Saúde',category:'saude'},{title:'Tecnologia',category:'tecnologia'},{title:'Esportes',category:'esportes'},{title:'Internacional',category:'internacional'},{title:'Cultura',category:'cultura'}];
  return <div className="min-h-screen bg-gray-50"><Header/><main className="pt-16"><TrendingBar posts={posts}/><div className="pt-4 space-y-4"><TerracapBanner/><SponsorBanner sponsor="snaider"/></div><div className="mt-4"><HeroCarousel posts={heroPosts}/></div><InstagramVideoBanner/><div className="bg-white pt-8"><div className="max-w-[1400px] mx-auto px-4"><LatestNews posts={posts}/></div></div><div className="mt-4"><PremiumBanner variant={0}/></div><div className="mt-6"><SponsorBanner sponsor="visao"/></div><ViralStrip/><MosaicHighlights posts={posts}/><div className="mt-6 mb-2"><PremiumBanner variant={3}/></div><div className="mt-4 mb-2"><SponsorBanner sponsor="lunardi"/></div><div className="max-w-[1400px] mx-auto px-4 py-8"><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="lg:col-span-2 space-y-10">{categories.map((c)=><CategoriesSection key={c.category} title={c.title} category={c.category}/>)}</div><aside className="lg:col-span-1"><div className="lg:sticky lg:top-24"><Sidebar/></div></aside></div></div><div className="mb-2"><PremiumBanner variant={1}/></div><div className="mt-4 mb-2"><SponsorBanner sponsor="coreto"/></div>{maceioPosts.length>0&&<MaceioShowcase/>}<div className="bg-gray-50 py-8"><div className="max-w-[1400px] mx-auto px-4"><InterviewsSection posts={interviews}/></div></div><div className="mt-4 mb-2"><SponsorBanner sponsor="kumon"/></div><div className="mt-2 mb-10"><PremiumBanner variant={2}/></div></main><Footer/></div>;
}
