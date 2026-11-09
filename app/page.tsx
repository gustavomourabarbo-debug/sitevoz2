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
        <section aria-label="Atualização jornalística 9 de novembro" className="mx-auto max-w-[1400px] px-4 pt-5">
          <div className="rounded-2xl border-2 border-green-700 bg-white p-6 shadow-md md:p-8">
            <p className="text-sm font-extrabold uppercase tracking-wider text-green-800">EDIÇÃO DE SEGUNDA-FEIRA • 09/11/2026 • FONTES OFICIAIS 07–08/11</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">Enem, acolhimento social, CRLV-e e saúde no Distrito Federal</h1>
            <p className="mt-3 text-base text-slate-700">Notícias verificadas, com datas e fontes identificadas. A edição anterior permanece disponível no acervo.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <a href="/noticias/edicao-9-novembro-2026#enem" className="rounded-xl bg-green-50 p-4 font-bold text-green-900 hover:underline">Enem 2026: provas de 8/11 concluídas; segunda etapa em 15/11 →</a>
              <a href="/noticias/edicao-9-novembro-2026#acolhimento" className="rounded-xl bg-green-50 p-4 font-bold text-green-900 hover:underline">GDF programa acolhimento social nesta segunda, 9/11 →</a>
              <a href="/noticias/edicao-9-novembro-2026#crlv" className="rounded-xl bg-green-50 p-4 font-bold text-green-900 hover:underline">Licenciamento 2026: atenção aos finais de placas →</a>
              <a href="/noticias/edicao-9-novembro-2026#saude" className="rounded-xl bg-green-50 p-4 font-bold text-green-900 hover:underline">GDF anuncia 57 vagas para médicos de família →</a>
            </div>
          </div>
        </section>
        <section aria-label="Cobertura especial ENEM 2026" className="mx-auto max-w-[1400px] px-4 pt-5 pb-4">
          <a href="/noticias/enem-2026-gabarito-oficial" className="block rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-slate-950 to-blue-900 px-6 py-7 text-white shadow-xl hover:shadow-2xl">
            <span className="text-sm font-black tracking-wider text-amber-300">COBERTURA ESPECIAL • ENEM 2026 • 08/11</span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">Gabarito oficial ainda não foi divulgado pelo Inep</h2>
            <p className="mt-3 max-w-4xl text-base text-blue-100 md:text-lg">O primeiro dia de provas terminou neste domingo. O segundo será em 15 de novembro. Veja quando as respostas oficiais devem ser publicadas e como identificar a cor do caderno.</p>
            <strong className="mt-5 inline-block rounded-lg bg-amber-400 px-5 py-3 text-sm font-black text-slate-950">ACOMPANHAR GABARITO OFICIAL →</strong>
          </a>
        </section>
        <section aria-label="Edição jornalística de 7 de novembro de 2026" className="max-w-[1400px] mx-auto px-4 pt-5">
<article className="rounded-2xl bg-slate-900 text-white p-6 md:p-9">
<p className="text-sm font-extrabold text-amber-300">ARQUIVO JORNALÍSTICO • SÁBADO, 07/11/2026 • FONTE 07/11</p>
<img src="https://imagens.ebc.com.br/VpwCdcitCs4h6WVIzbY3FZl3zdE=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2025/11/12/_d6a9124.jpg?itok=KbZPYXax" alt="Imagem da reportagem sobre o vale-refeição" loading="lazy" referrerPolicy="no-referrer" className="mb-4 h-72 w-full rounded-xl object-cover" /><h1 className="my-4 text-3xl md:text-5xl font-black">Vale-refeição e vale-alimentação passam por mudanças neste sábado; integração ainda enfrenta desafios</h1>
<p className="text-lg text-slate-200">Mudanças previstas no PAT ampliam a possibilidade de aceitação em diferentes maquininhas, mas a implementação depende dos sistemas das operadoras.</p>
<a href="/noticias/edicao-07-novembro/#vales" className="mt-5 inline-block rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950">Ler a reportagem completa</a>
<p className="mt-3 text-xs text-slate-300">Agência Brasil • 07/11/2026 09h03</p>
</article>
<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
<a href="/noticias/edicao-07-novembro/#enem-materiais" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><img src="https://imagens.ebc.com.br/d1oGdST8RatRpKw3CfCogJroXHE=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2026/11/06/54913047179_c0e0b99549_o.jpg?itok=UaxH17VD" alt="Imagem documental da notícia" loading="lazy" referrerPolicy="no-referrer" className="h-36 w-full rounded-t-xl object-cover" /><small className="font-extrabold text-emerald-800">Educação · FONTE 07/11/2026 09h57</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Enem 2026: documento oficial com foto e caneta preta transparente são indispensáveis</h2><p className="my-2 text-sm text-slate-600">Às vésperas da prova de domingo, candidatos devem conferir documentos e regras de entrada.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
<a href="/noticias/edicao-07-novembro/#cartorios" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><img src="https://imagens.ebc.com.br/OJymsVIrwbeThTZ5rhr-VT7BWbU=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/cidade_satelite_aguas_claras_fpzzb_abr_1608221568_0.jpg?itok=sC02lW_y" alt="Imagem documental da notícia" loading="lazy" referrerPolicy="no-referrer" className="h-36 w-full rounded-t-xl object-cover" /><small className="font-extrabold text-emerald-800">Casa e Cidadania · FONTE 07/11/2026 08h31</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Cartórios realizam mutirão gratuito para orientar compradores contra fraudes imobiliárias</h2><p className="my-2 text-sm text-slate-600">Atendimento neste sábado inclui Brasília e outras cidades, com orientações sobre escrituras e verificação de documentos.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
<a href="/noticias/edicao-07-novembro/#mpox" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><img src="https://imagens.ebc.com.br/6VvQxFoNiWi2-rTJOyLH9A3eAxE=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2024/08/13/2024-08-13t135812z_488502842_rc2yx8aqv1tn_rtrmadp_3_africa-mpox.jpg?itok=VwD2jZ3G" alt="Imagem documental da notícia" loading="lazy" referrerPolicy="no-referrer" className="h-36 w-full rounded-t-xl object-cover" /><small className="font-extrabold text-emerald-800">Saúde · FONTE 07/11/2026 09h37</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Mpox: especialista não recomenda vacinação em massa neste momento</h2><p className="my-2 text-sm text-slate-600">Imunização segue direcionada a grupos prioritários e unidades de saúde devem acompanhar sintomas suspeitos.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
<a href="/noticias/edicao-07-novembro/#redacao" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><img src="https://imagens.ebc.com.br/F6Z3my2MYrE4WYVXH9Hg5pvkxiY=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2025/11/16/enem-mc_abr_16112025-3.jpg?itok=E7YFIc3L" alt="Imagem documental da notícia" loading="lazy" referrerPolicy="no-referrer" className="h-36 w-full rounded-t-xl object-cover" /><small className="font-extrabold text-emerald-800">Educação e Carreiras · FONTE 07/11/2026 08h01</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Redação do Enem: cinco competências são avaliadas, com até 200 pontos cada</h2><p className="my-2 text-sm text-slate-600">Prova de domingo exige texto dissertativo-argumentativo e proposta de intervenção.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
<a href="/noticias/edicao-07-novembro/#semifinal" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><img src="https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2026/11/07/carlos_vinicius_gol_gremio_copa_do_brasil_2026.jpg" alt="Imagem documental da notícia" loading="lazy" referrerPolicy="no-referrer" className="h-36 w-full rounded-t-xl object-cover" /><small className="font-extrabold text-emerald-800">Esporte · FONTE 07/11/2026 08h00</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Atlético-MG e Grêmio disputam hoje vaga na final da Copa do Brasil</h2><p className="my-2 text-sm text-slate-600">Jogo de volta da semifinal está previsto para as 18h, em Belo Horizonte.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
<a href="/noticias/edicao-07-novembro/#mutirao-hospitais" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"><img src="https://www.gov.br/hubrasil/pt-br/comunicacao/noticias/rede-hu-brasil-realiza-terceiro-mutirao-nacional-de-2026-com-previsao-de-quase-50-mil-procedimentos-2/huap1.jpeg/@@images/a2999267-d3b5-434e-82dd-7e48455258c6.jpeg" alt="Imagem documental da notícia" loading="lazy" referrerPolicy="no-referrer" className="h-36 w-full rounded-t-xl object-cover" /><small className="font-extrabold text-emerald-800">Saúde e Bem-Estar · FONTE 06/11/2026 17h25 (agenda de 07/11)</small><h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">Neste sábado, hospitais universitários têm mutirão com previsão de 49 mil atendimentos</h2><p className="my-2 text-sm text-slate-600">Dia E mobiliza 47 hospitais federais em consultas, exames e cirurgias; notícia de referência publicada em 06/11.</p><span className="font-bold text-emerald-800">LER REPORTAGEM →</span></a>
</div><p className="mt-4 text-sm text-slate-600">Edições anteriores: <a href="/noticias/edicao-06-novembro" className="font-semibold text-emerald-800 underline">06/11</a> e <a href="/noticias/edicao-05-novembro" className="font-semibold text-emerald-800 underline">05/11</a>.</p></section>
        <section aria-label="Notícias e imagens divulgadas em 7 de novembro de Lula e Celina" className="mx-auto mt-7 max-w-[1400px] px-4"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-extrabold text-emerald-800">GOVERNO FEDERAL E GOVERNO DO DF</p><h2 className="text-2xl font-black text-slate-900 md:text-3xl">Lula e Celina Leão: notícias deste sábado</h2></div><span className="text-sm font-bold text-slate-600">Edição 07/11/2026</span></div><div className="grid grid-cols-1 gap-5 md:grid-cols-2"><article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><a href="/noticias/governos-07-novembro/#lula" className="block"><img src="https://www.bnews.com.br/media/_versions/2026/11/lula_1yuyhv9g_widelg_widelg.jpeg" alt="Lula comenta preparação para agenda internacional" className="h-64 w-full bg-slate-100 object-cover object-center md:h-72" loading="lazy" referrerPolicy="no-referrer"/><div className="p-5"><p className="text-xs font-bold uppercase text-emerald-700">VÍDEO DIVULGADO EM 07/11/2026</p><h3 className="mt-2 text-xl font-extrabold text-slate-900">Lula comenta preparação para agenda internacional</h3><p className="mt-2 text-sm text-slate-700">Em vídeo divulgado neste sábado, o presidente fala da recuperação da voz e da próxima viagem à Turquia.</p><span className="mt-3 inline-block text-sm font-bold text-emerald-800">Ler reportagem →</span></div></a><p className="px-5 pb-4 text-xs text-slate-500">Frame da gravação publicada em 07/11/2026 • BNews / canal do presidente</p></article><article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><a href="/noticias/governos-07-novembro/#celina" className="block"><img src="https://www.politicadistrital.com.br/wp-content/uploads/2026/11/Celina-Saude-1068x580.webp" alt="Celina autoriza novas vagas para médicos do DF" className="h-64 w-full bg-slate-100 object-cover object-center md:h-72" loading="lazy" referrerPolicy="no-referrer"/><div className="p-5"><p className="text-xs font-bold uppercase text-emerald-700">REPORTAGEM PUBLICADA EM 07/11/2026</p><h3 className="mt-2 text-xl font-extrabold text-slate-900">Celina autoriza novas vagas para médicos do DF</h3><p className="mt-2 text-sm text-slate-700">Governadora anuncia 57 vagas de médicos da família e 100 para generalistas, segundo reportagem de hoje.</p><span className="mt-3 inline-block text-sm font-bold text-emerald-800">Ler reportagem →</span></div></a><p className="px-5 pb-4 text-xs text-slate-500">Imagem publicada no PDNews em 07/11/2026 • data exata da captura não informada</p></article></div><div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"><a href="/noticias/governos-07-novembro/#energia-federal" className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><img src="https://www.gov.br/cidades/pt-br/assuntos/noticias-1/noticia-mcid-no-2378/img_1262.jpeg/@@images/b4cc7e8c-977a-4a5f-8bf8-6977e43ba775.jpeg" className="h-40 w-full object-cover" loading="lazy" referrerPolicy="no-referrer" alt="CNPE debate transição energética com a presença de Lula"/><div className="p-4"><p className="text-xs font-bold text-emerald-700">FONTE PUBLICADA 07/11 • REUNIÃO 06/11</p><h3 className="mt-2 text-lg font-bold text-slate-900">CNPE debate transição energética com a presença de Lula</h3><span className="mt-2 block text-sm font-bold text-emerald-800">Ler no portal →</span></div></a><a href="/noticias/governos-07-novembro/#enem-federal" className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><img src="https://imagens.ebc.com.br/d1oGdST8RatRpKw3CfCogJroXHE=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2026/11/06/54913047179_c0e0b99549_o.jpg?itok=UaxH17VD" className="h-40 w-full object-cover" loading="lazy" referrerPolicy="no-referrer" alt="Enem: MEC e Inep orientam os candidatos para domingo"/><div className="p-4"><p className="text-xs font-bold text-emerald-700">SERVIÇO DE HOJE • 07/11</p><h3 className="mt-2 text-lg font-bold text-slate-900">Enem: MEC e Inep orientam os candidatos para domingo</h3><span className="mt-2 block text-sm font-bold text-emerald-800">Ler no portal →</span></div></a></div></section>
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
