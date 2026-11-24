import DetranCampaignBanner from '@/components/common/DetranCampaignBanner';
import Header from '@/components/layout/Header';
import Cop31Highlights from '@/components/home/Cop31Highlights';
import Capa21Nov2026 from '@/components/home/Capa21Nov2026';
import GdfCampaignBanner from '@/components/common/GdfCampaignBanner';
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
        
        <div className="mx-auto max-w-[1400px] pt-4" aria-label="Campanha Viva Flor do GDF acima das notícias de Júlio César e Rôney Nemer">
          <GdfCampaignBanner />
        </div>
        {/* Atualização editorial verificada 24/11/2026; imagens de arquivo identificadas */}
        <section aria-label="Destaques de 23 de novembro" className="mx-auto max-w-[1400px] px-4 pt-5 pb-6">
          <div className="mb-5 border-b-2 border-amber-500 pb-3"><h2 className="text-2xl font-extrabold text-slate-950">BRASÍLIA E BRASIL</h2></div>
          <div className="grid gap-5 md:grid-cols-2">
            <a href="/destaque/celina-leao-politica-climatica-df" className="group block overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200 transition-shadow hover:shadow-2xl">
              <img className="h-64 w-full object-cover" src="https://midias.correiobraziliense.com.br/_midias/jpg/2026/04/20/675x450/1_whatsapp-image-2026-04-20-at-14-57-40--1--66369988.jpg" alt="Celina Leão em fotografia institucional" referrerPolicy="no-referrer" />
              <div className="p-5"><p className="text-xs font-black tracking-widest text-red-700">DISTRITO FEDERAL · 23/11/2026</p><h3 className="mt-2 text-2xl font-black text-slate-950">Celina Leão regulamenta política climática do DF</h3><p className="mt-3 text-slate-700">Decreto publicado nesta segunda-feira estabelece diretrizes para reduzir emissões e preparar o Distrito Federal para os efeitos das mudanças climáticas. A decisão coloca a execução e o acompanhamento de metas ambientais no centro da agenda local.</p><span className="mt-4 inline-block font-bold text-blue-800 underline">Ler reportagem completa na Voz de Brasília →</span></div>
            </a>
            <a href="/destaque/camara-aprova-ajuste-fiscal-lula" className="group block overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200 transition-shadow hover:shadow-2xl">
              <img className="h-64 w-full object-contain bg-slate-100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%282023%E2%80%932027%29.jpg/960px-Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%282023%E2%80%932027%29.jpg" alt="Luiz Inácio Lula da Silva em retrato oficial" referrerPolicy="no-referrer" />
              <div className="p-5"><p className="text-xs font-black tracking-widest text-red-700">POLÍTICA · 23/11/2026</p><h3 className="mt-2 text-2xl font-black text-slate-950">Câmara aprova texto-base do ajuste fiscal defendido por Lula</h3><p className="mt-3 text-slate-700">A Câmara dos Deputados aprovou na noite de segunda-feira o texto-base do projeto de ajuste das contas públicas para 2027. O presidente havia defendido a proposta e respondido a questionamentos sobre os gastos do governo.</p><p className="mt-2 text-xs text-slate-500">Foto: Ricardo Stuckert/PR · Wikimedia Commons (CC BY 2.0).</p><span className="mt-4 inline-block font-bold text-blue-800 underline">Ler reportagem completa na Voz de Brasília →</span></div>
            </a>
          </div>
        </section>
        <section id="agenda-governadora" aria-label="Agenda da governadora do Distrito Federal" className="mx-auto max-w-[1400px] px-4 pb-4">
          <details className="group w-full max-w-[420px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none items-center gap-3 p-4 text-slate-900 hover:bg-slate-50 focus-visible:outline focus-visible:outline-blue-700 [&::-webkit-details-marker]:hidden">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-900 text-white" aria-hidden="true"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h2M14 14h2M8 17h2"/></svg></span>
              <span className="min-w-0 flex-1"><span className="block text-base font-extrabold leading-snug">Agenda da governadora Celina Leão</span><span className="mt-1 block text-xs font-semibold text-blue-800">Consultar compromissos</span></span>
              <span className="shrink-0 text-xl text-blue-900 transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
            </summary>
            <div className="border-t border-slate-200 p-4 text-sm leading-relaxed">
              <p className="mt-1 font-semibold text-slate-600">Semana de 23 a 29 de novembro de 2026 · Boletim de 24/11</p>
            <a className="mt-3 inline-block rounded-lg bg-blue-900 px-4 py-3 font-bold text-white" href="https://www.df.gov.br/agenda-do-governador" target="_blank" rel="noopener noreferrer">Consultar programação oficial do dia e da semana →</a>
            <h3 className="mt-5 text-lg font-bold text-slate-900">Terça-feira, 24/11 — compromissos realizados e confirmados pelo GDF</h3>
            <div className="mt-3 grid gap-3">
              <div className="rounded-lg border border-slate-200 p-4"><h4 className="font-bold text-slate-900">Ceilândia — visita à Feira do Produtor</h4><p className="mt-1 text-slate-700">Acompanhamento da recuperação da cobertura e da ampliação do estacionamento. Horário do compromisso não confirmado.</p><a className="mt-2 inline-block text-sm font-semibold text-blue-800 underline" href="https://agenciabrasilia.df.gov.br/w/feira-do-produtor-de-ceilandia-recebe-nova-cobertura-termoacustica?redirect=%2Fnoticias" target="_blank" rel="noopener noreferrer">Registro oficial</a></div>
              <div className="rounded-lg border border-slate-200 p-4"><h4 className="font-bold text-slate-900">P Sul, Ceilândia — obras de drenagem</h4><p className="mt-1 text-slate-700">Assinatura de ata de registro de preços e autorização de intervenções de drenagem. Horário do compromisso não confirmado.</p><a className="mt-2 inline-block text-sm font-semibold text-blue-800 underline" href="https://www.agenciabrasilia.df.gov.br/w/gdf-lanca-pacote-de-quase-r-15-milhoes-para-drenagem-pluvial-em-ceilandia" target="_blank" rel="noopener noreferrer">Registro oficial</a></div>
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">Atos divulgados nesta semana</h3>
            <p className="mt-2 text-slate-700"><strong>23/11:</strong> divulgação da proposta de atualização dos valores venais para o IPVA de 2027. <strong>24/11:</strong> anúncio de ponto facultativo em 5 e 6 de janeiro de 2027.</p>
            <p className="mt-3 text-sm text-slate-600">Os horários e demais compromissos de 23 a 29/11 não foram confirmados nesta consulta. A programação oficial pode sofrer alterações; consulte o calendário do GDF acima. Fontes: GDF e Agência Brasília.</p>
            </div>
          </details>
        </section>
        <section aria-label="Bontempo móveis planejados" className="mx-auto max-w-[1400px] px-4 py-6">
          <a href="https://www.bontempo.com.br/" target="_blank" rel="noopener sponsored noreferrer" className="group block overflow-hidden rounded-2xl border border-amber-400 bg-[#161816] text-white shadow-2xl">
            <div className="grid md:grid-cols-[1fr_1.1fr]">
              <div className="flex flex-col justify-center p-8 md:p-12"><p className="text-sm font-semibold tracking-[.35em] text-amber-300">PUBLICIDADE · DESIGN E DECORAÇÃO</p><p className="mt-5 text-5xl font-light tracking-[.15em] md:text-6xl">BONTEMPO</p><h2 className="mt-5 text-3xl font-semibold leading-tight md:text-4xl">O extraordinário começa em casa.</h2><p className="mt-4 text-lg text-stone-300">Móveis planejados, personalidade e sofisticação para ambientes que contam a sua história.</p><span className="mt-7 inline-block w-fit border border-amber-300 px-6 py-3 font-bold tracking-widest text-amber-200 group-hover:bg-amber-300 group-hover:text-black">CONHEÇA A BONTEMPO ↗</span></div>
              <div className="min-h-[290px] bg-[linear-gradient(135deg,#35382f,#7c6b52_45%,#242823)] flex items-center justify-center p-8"><div className="border border-white/30 p-8 text-center"><p className="text-2xl font-light tracking-widest">DESIGN QUE EXPRESSA</p><p className="mt-3 text-4xl font-light tracking-[.2em]">VOCÊ.</p><p className="mt-6 text-sm tracking-widest text-amber-100">BONTEMPO · MÓVEIS PLANEJADOS</p></div></div>
            </div>
          </a>
        </section>
        <section aria-label="Entrevista com Henrique Bertolazzi" className="mx-auto max-w-[1400px] px-4 py-5"><article className="grid overflow-hidden rounded-2xl bg-slate-950 text-white shadow-xl md:grid-cols-2"><a href="https://www.youtube.com/watch?v=rJ9fTOX_9b0" target="_blank" rel="noopener noreferrer" className="group relative block min-h-[260px] bg-black" aria-label="Assistir à entrevista com Henrique Bertolazzi no YouTube"><img src="https://i.ytimg.com/vi/rJ9fTOX_9b0/hqdefault.jpg" alt="Entrevista com Henrique Bertolazzi — TV Voz de Brasília" className="h-full min-h-[260px] w-full object-contain" loading="lazy" /><span className="absolute inset-0 flex items-center justify-center bg-black/10"><span className="rounded-full bg-red-600 px-6 py-4 text-xl font-black text-white shadow-lg transition-transform group-hover:scale-105">▶ Assistir à entrevista</span></span></a><div className="p-8"><p className="font-bold text-amber-300">ENTREVISTA ESPECIAL · ACERVO TV VOZ</p><h2 className="mt-3 text-3xl font-black">Henrique Bertolazzi | Bontempo Móveis</h2><p className="mt-4">Entrevista concedida a Paulo Fayad, publicada em 31 de março de 2024 no canal TV Voz de Brasília.</p><a className="mt-5 inline-block rounded bg-amber-300 px-5 py-3 font-bold text-slate-950" href="https://www.youtube.com/watch?v=rJ9fTOX_9b0">Assistir no YouTube</a><a className="mt-4 block text-amber-200 underline" href="https://www.bontempo.com.br/">Conheça a Bontempo</a></div></article></section>
        <section aria-label="Edição de segunda-feira, 23 de novembro de 2026" className="mx-auto max-w-[1400px] px-4 pt-5 pb-4">
          <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-slate-950 to-blue-950 px-6 py-7 text-white shadow-xl">
            <p className="text-sm font-black tracking-wider text-amber-300">TV VOZ DE BRASÍLIA · BRASÍLIA · SEGUNDA-FEIRA, 23/11/2026</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">Júlio César e Rôney Nemer: os compromissos dos eleitos com o Distrito Federal</h1>
            <p className="mt-3 text-base text-blue-100">Duas reportagens acompanham a agenda de 2027 na Câmara dos Deputados e na Câmara Legislativa do DF.</p>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <a href="/noticia/julio-cesar-reeleito-esporte-protecao-mulheres-2027" className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md hover:shadow-xl">
              <img src="https://www.camara.leg.br/internet/deputado/bandep/204372.jpg" alt="Fotografia oficial do deputado Júlio César Ribeiro" className="h-60 w-full object-contain bg-slate-100" />
              <div className="p-5"><span className="text-xs font-bold text-amber-700">POLÍTICA · 23/11/2026</span><h2 className="mt-2 text-xl font-extrabold leading-snug text-slate-900">Júlio César reforça esporte, juventude e proteção às mulheres como prioridades</h2><p className="mt-2 text-slate-700">Reeleito para o terceiro mandato, deputado federal projeta ações sociais e esportivas para 2027.</p><strong className="mt-3 block text-blue-800">LER REPORTAGEM COMPLETA →</strong></div>
            </a>
            <a href="/noticia/roney-nemer-retorno-cldf-mandato-participativo-2027" className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md hover:shadow-xl">
              <img src="https://images.metroimg.com/2022/04/12154107/roney-2.jpg" alt="Rôney Nemer, fotografia de arquivo" className="h-60 w-full object-contain bg-slate-100" />
              <div className="p-5"><span className="text-xs font-bold text-amber-700">DISTRITO FEDERAL · 23/11/2026</span><h2 className="mt-2 text-xl font-extrabold leading-snug text-slate-900">Rôney Nemer prepara retorno à CLDF e defende mandato participativo</h2><p className="mt-2 text-slate-700">Deputado eleito coloca saúde, transporte e desenvolvimento urbano entre suas prioridades.</p><strong className="mt-3 block text-blue-800">LER REPORTAGEM COMPLETA →</strong></div>
            </a>
          </div>
        </section>
        <section className="mx-auto max-w-[1400px] px-4 pt-5 pb-4" aria-label="Manchete: Shakira confirma quatro shows no Brasil">
          <a href="/shakira-brasil-2027" className="group grid overflow-hidden rounded-2xl border-2 border-amber-400 bg-slate-950 text-white shadow-xl transition-shadow hover:shadow-2xl md:grid-cols-[43%_57%]">
            <div className="relative min-h-[320px] overflow-hidden">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/SHARIKA_MEDELLIN_13_04_2025_%28122%29.jpg" alt="Shakira em apresentação real da turnê Las Mujeres Ya No Lloran em 2025" className="h-full w-full object-cover object-[center_35%] transition-transform duration-300 group-hover:scale-105" loading="eager" />
              <span className="absolute bottom-2 left-3 rounded bg-black/70 px-3 py-1 text-xs text-white">Foto real de arquivo: J.ébey / Wikimedia Commons (CC0)</span>
            </div>
            <div className="flex flex-col justify-center px-6 py-8 md:px-10">
              <span className="text-sm font-black uppercase tracking-widest text-amber-300">Destaque cultural · 22/11/2026 · Cultura e Turismo</span>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Shakira volta ao Brasil: quatro shows entre o Réveillon e janeiro</h2>
              <p className="mt-4 text-base leading-relaxed text-blue-100 md:text-lg">Balneário Camboriú (31/12), Cariacica (03/01), Salvador (06/01) e Fortaleza (09/01). Ingressos começam a ser vendidos em 26 de novembro.</p>
              <span className="mt-6 inline-flex w-fit rounded-lg bg-amber-300 px-6 py-3 font-black text-slate-950">CONFIRA LOCAIS, DATAS E INGRESSOS →</span>
            </div>
          </a>
        </section>
        <Capa21Nov2026 />
        <ClubePermutasConvite />
        <section className="mx-auto max-w-[1400px] px-4 pt-4" aria-label="Conheça a XELVYA AI">
          <a href="/xelvya" className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-200 bg-gradient-to-r from-indigo-950 to-violet-800 p-5 text-white shadow-md hover:shadow-lg">
            <div><span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Tecnologia e inteligência artificial</span><h2 className="mt-1 text-2xl font-black">XELVYA AI • Inteligência ao seu lado</h2><p className="mt-1 text-sm text-indigo-100">Conheça a nossa IA em português — pronuncia-se Xél-via.</p></div>
            <span className="rounded-lg bg-white px-5 py-3 font-bold text-indigo-950">Conhecer a XELVYA</span>
          </a>
        </section>
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
