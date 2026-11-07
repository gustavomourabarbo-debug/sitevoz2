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
        <section aria-label="Edição jornalística de 7 de novembro de 2026" className="max-w-[1400px] mx-auto px-4 pt-5">
<article className="rounded-2xl bg-slate-900 text-white p-6 md:p-9">
<p className="text-sm font-extrabold text-amber-300">EDIÇÃO DE HOJE • SÁBADO, 07/11/2026 • FONTE 07/11</p>
<h1 className="my-4 text-3xl md:text-5xl font-black">Vale-refeição e vale-alimentação passam por mudanças neste sábado; integração ainda enfrenta desafios</h1>
<p className="text-lg text-slate-200">Mudanças previstas no PAT ampliam a possibilidade de aceitação em diferentes maquininhas, mas a implementação depende dos sistemas das operadoras.</p>
<a href="/noticias/edicao-07-novembro/#vales" className="mt-5 inline-block rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950">Ler a reportagem completa</a>
<p className="mt-3 text-xs text-slate-300">Agência Brasil • 07/11/2026 09h03</p>
</article>
<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
<a href="/noticias/edicao-07-novembro/#enem-materiais" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><small className="font-extrabold text-emerald-800">Educação · FONTE 07/11/2026 09h57</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Enem 2026: documento oficial com foto e caneta preta transparente são indispensáveis</h2><p className="my-2 text-sm text-slate-600">Às vésperas da prova de domingo, candidatos devem conferir documentos e regras de entrada.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
<a href="/noticias/edicao-07-novembro/#cartorios" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><small className="font-extrabold text-emerald-800">Casa e Cidadania · FONTE 07/11/2026 08h31</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Cartórios realizam mutirão gratuito para orientar compradores contra fraudes imobiliárias</h2><p className="my-2 text-sm text-slate-600">Atendimento neste sábado inclui Brasília e outras cidades, com orientações sobre escrituras e verificação de documentos.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
<a href="/noticias/edicao-07-novembro/#mpox" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><small className="font-extrabold text-emerald-800">Saúde · FONTE 07/11/2026 09h37</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Mpox: especialista não recomenda vacinação em massa neste momento</h2><p className="my-2 text-sm text-slate-600">Imunização segue direcionada a grupos prioritários e unidades de saúde devem acompanhar sintomas suspeitos.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
<a href="/noticias/edicao-07-novembro/#redacao" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><small className="font-extrabold text-emerald-800">Educação e Carreiras · FONTE 07/11/2026 08h01</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Redação do Enem: cinco competências são avaliadas, com até 200 pontos cada</h2><p className="my-2 text-sm text-slate-600">Prova de domingo exige texto dissertativo-argumentativo e proposta de intervenção.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
<a href="/noticias/edicao-07-novembro/#semifinal" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><small className="font-extrabold text-emerald-800">Esporte · FONTE 07/11/2026 08h00</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Atlético-MG e Grêmio disputam hoje vaga na final da Copa do Brasil</h2><p className="my-2 text-sm text-slate-600">Jogo de volta da semifinal está previsto para as 18h, em Belo Horizonte.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
<a href="/noticias/edicao-07-novembro/#mutirao-hospitais" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><small className="font-extrabold text-emerald-800">Saúde e Bem-Estar · FONTE 06/11/2026 17h25 (agenda de 07/11)</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Neste sábado, hospitais universitários têm mutirão com previsão de 49 mil atendimentos</h2><p className="my-2 text-sm text-slate-600">Dia E mobiliza 47 hospitais federais em consultas, exames e cirurgias; notícia de referência publicada em 06/11.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
</div><p className="mt-4 text-sm text-slate-600">Edições anteriores: <a href="/noticias/edicao-06-novembro" className="font-semibold text-emerald-800 underline">06/11</a> e <a href="/noticias/edicao-05-novembro" className="font-semibold text-emerald-800 underline">05/11</a>.</p></section>
        <section aria-label="Lula e Celina Leão na capa" className="mx-auto mt-7 max-w-[1400px] px-4">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-sm font-extrabold uppercase tracking-wide text-emerald-800">Governo Federal e Governo do DF</p><h2 className="text-2xl font-black text-slate-900 md:text-3xl">Lula e Celina Leão: notícias em acompanhamento</h2></div>
            <span className="text-sm font-bold text-slate-600">Atualização editorial: 07/11/2026</span>
          </div>
          <p className="mb-5 text-sm text-slate-600">Notícias verificadas com suas datas originais. As fotografias são registros oficiais de arquivo, não imagens realizadas hoje.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <a href="/noticias/governos-07-novembro/#lula" className="block">
                <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%282023%E2%80%932027%29.jpg/500px-Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%282023%E2%80%932027%29.jpg" alt="Fotografia real do presidente Lula com faixa presidencial, de arquivo" className="h-64 w-full bg-slate-100 object-contain object-center md:h-72" loading="lazy" />
                <div className="px-5 pb-5 pt-3"><p className="text-xs font-bold uppercase text-emerald-700">Governo Federal · Fonte 06/11 · Acompanhamento 07/11</p><h3 className="mt-2 text-xl font-extrabold text-slate-900">Lula sanciona nova lei de avaliação da formação médica</h3><p className="mt-2 text-sm text-slate-700">A regra torna o Enamed requisito para o exercício profissional dos futuros médicos, segundo o Ministério da Saúde.</p><span className="mt-3 inline-block text-sm font-bold text-emerald-800">Ler reportagem no portal →</span></div>
              </a>
              <p className="px-5 pb-4 text-xs text-slate-500">Foto de arquivo (2023): Ricardo Stuckert/PR · CC BY 2.0</p>
            </article>
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <a href="/noticias/governos-07-novembro/#celina" className="block">
                <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Celina_Leao_Posse_2026.jpg/960px-Celina_Leao_Posse_2026.jpg" alt="Fotografia real da governadora Celina Leão na solenidade de posse de março de 2026" className="h-64 w-full bg-slate-100 object-cover object-center md:h-72" loading="lazy" />
                <div className="px-5 pb-5 pt-3"><p className="text-xs font-bold uppercase text-emerald-700">Governo do DF · Fonte 06/11 · Acompanhamento 07/11</p><h3 className="mt-2 text-xl font-extrabold text-slate-900">Celina destaca expansão da saúde com nova UPA em Águas Claras</h3><p className="mt-2 text-sm text-slate-700">Unidade em obras terá 65 leitos e investimento de R$ 17,6 milhões, conforme a Agência Brasília.</p><span className="mt-3 inline-block text-sm font-bold text-emerald-800">Ler reportagem no portal →</span></div>
              </a>
              <p className="px-5 pb-4 text-xs text-slate-500">Foto de arquivo (30/03/2026): George Gianni/Agência Brasília · CC BY 4.0</p>
            </article>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a href="/noticias/governos-07-novembro/#energia-federal" className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold text-emerald-700">GOVERNO FEDERAL · 06/11/2026</p><h3 className="mt-1 text-lg font-bold text-slate-900">CNPE define diretrizes para reduzir dependência de combustíveis fósseis</h3><span className="mt-2 block text-sm font-bold text-emerald-800">Ler no portal →</span></a>
            <a href="/noticias/governos-07-novembro/#enem-federal" className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold text-emerald-700">GOVERNO FEDERAL · SERVIÇO 07/11/2026</p><h3 className="mt-1 text-lg font-bold text-slate-900">Enem: MEC e Inep orientam candidatos para as provas de domingo (8)</h3><span className="mt-2 block text-sm font-bold text-emerald-800">Ler no portal →</span></a>
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
