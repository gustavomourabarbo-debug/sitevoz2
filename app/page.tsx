import DetranCampaignBanner from '@/components/common/DetranCampaignBanner';
import CaesbCampaignBanner from '@/components/common/CaesbCampaignBanner';
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
        <CaesbCampaignBanner />

        <section className="mx-auto max-w-[1400px] px-4 pt-5" aria-label="Banco do Brasil">
          <div className="rounded-2xl bg-[#f8d92f] px-6 py-5 text-[#173a83] shadow-sm md:flex md:items-center md:justify-between">
            <div><p className="mt-1 text-3xl font-black">Banco do Brasil</p><p className="mt-1 text-base font-medium">Soluções financeiras para pessoas e empresas.</p></div>
            <a className="mt-4 inline-block rounded-lg bg-[#173a83] px-5 py-3 font-bold text-white md:mt-0" href="https://www.bb.com.br/" target="_blank" rel="noopener noreferrer">Conheça o BB</a>
          </div>
        </section>
        <section className="mx-auto max-w-[1400px] px-4 pt-7" aria-label="Quatro notícias de hoje">
          <h2 className="mb-4 text-3xl font-black text-slate-900">Destaques de hoje — 17/11/2026</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {[{"title":"Enem abre caminhos para ingresso no ensino superior em 2027","tag":"Educação","body":["A edição de 2026 do Enem entra em uma etapa decisiva para os estudantes que pretendem cursar o ensino superior no próximo ano.","A nota do exame poderá ser utilizada nos processos de seleção do Sisu, do Prouni e do Fies, três portas de entrada com regras diferentes.","Segundo informações divulgadas nesta terça-feira, os programas reúnem oportunidades que alcançam aproximadamente 1,5 milhão de vagas.","O Sisu organiza a disputa por vagas em instituições públicas de ensino superior, conforme critérios e calendário próprios.","Já o Prouni é direcionado à concessão de bolsas de estudo em instituições privadas, respeitados os requisitos do programa.","O Fies oferece financiamento estudantil para cursos superiores privados, condicionado às regras de elegibilidade e contratação.","A diversidade de alternativas amplia as possibilidades de planejamento dos candidatos, mas também exige atenção aos editais.","É importante conferir prazos, documentação, notas mínimas e critérios específicos antes de efetuar qualquer inscrição.","O resultado do Enem, por si só, não representa matrícula automática ou garantia de aprovação em qualquer programa.","Para os estudantes, o próximo passo é acompanhar os canais oficiais e organizar a estratégia de inscrição de acordo com o perfil e a renda familiar."]},{"title":"Polícia Federal reforça combate à manipulação de resultados esportivos","tag":"Esportes","body":["A integridade das competições esportivas ganhou destaque nesta terça-feira com a divulgação de uma iniciativa conjunta da Polícia Federal e do Ministério do Esporte.","A cooperação busca fortalecer o enfrentamento de práticas que distorcem resultados e prejudicam a credibilidade das disputas.","O tema envolve não apenas atletas e clubes, mas também dirigentes, organizadores, torcedores e instituições responsáveis pela fiscalização.","A manipulação de partidas compromete o princípio da competição justa e pode gerar consequências econômicas e reputacionais.","A articulação entre órgãos públicos permite aproximar conhecimento esportivo e capacidade de investigação criminal.","A identificação de indícios exige análise cuidadosa, já que resultados inesperados, isoladamente, não comprovam irregularidade.","Medidas preventivas, canais de denúncia e orientações a participantes podem ajudar a reduzir vulnerabilidades.","A proteção de competições de base e profissionais demanda procedimentos consistentes e transparência institucional.","O alcance prático da iniciativa dependerá da implementação das ações previstas e da cooperação entre os envolvidos.","O compromisso anunciado sinaliza a intenção de tratar a integridade esportiva como tema permanente de interesse público."]},{"title":"Brasil amplia debate internacional sobre combate à fome e à pobreza","tag":"Cidadania","body":["A Aliança Global contra a Fome e a Pobreza completou dois anos com a apresentação de novas ações para acelerar resultados até 2030.","A iniciativa brasileira procura reunir governos e parceiros em torno de políticas públicas voltadas à segurança alimentar e à redução da vulnerabilidade social.","O desafio ultrapassa a distribuição imediata de alimentos e envolve renda, acesso a serviços e oportunidades econômicas.","A articulação internacional pode facilitar a circulação de experiências e o apoio a programas já testados em diferentes países.","O horizonte de 2030 torna a avaliação de resultados especialmente relevante para os participantes.","Metas de longo prazo precisam ser acompanhadas por indicadores capazes de mostrar o que mudou na vida das famílias.","A efetividade das ações também depende de capacidade administrativa, orçamento e continuidade das políticas.","Em um cenário de desigualdades persistentes, iniciativas multilaterais podem contribuir para dar escala a soluções locais.","A prestação pública de contas será fundamental para distinguir compromissos anunciados de resultados concretos.","O avanço da agenda social dependerá da transformação das parcerias em medidas mensuráveis e sustentáveis."]},{"title":"INSS orienta segurados sobre apoio durante tratamento de câncer","tag":"Saúde","body":["A campanha Novembro Azul chama atenção para a saúde masculina e para a importância de buscar atendimento sem adiar sinais de alerta.","Nesta terça-feira, o INSS destacou formas de apoio previdenciário a homens que enfrentam tratamento de câncer.","O acesso a benefícios depende da situação individual e do cumprimento dos requisitos previstos na legislação.","Em alguns casos, a incapacidade temporária para o trabalho pode justificar a solicitação de benefício previdenciário.","O diagnóstico de uma doença, isoladamente, não significa concessão automática de todos os benefícios disponíveis.","A avaliação considera documentação médica, vínculo previdenciário e regras aplicáveis a cada modalidade.","Manter laudos, exames e relatórios organizados ajuda a instruir eventuais requerimentos.","A orientação adequada também pode reduzir dúvidas em um período de grande pressão emocional e financeira para as famílias.","O acompanhamento clínico continua sendo responsabilidade dos serviços de saúde, enquanto o INSS analisa a proteção previdenciária.","A recomendação é consultar os canais oficiais para verificar direitos, procedimentos e documentos necessários antes de protocolar o pedido."]}].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <img src={item.tag === "Educação" ? "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1000&q=85" : item.tag === "Esportes" ? "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&q=85" : item.tag === "Cidadania" ? "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000&q=85" : "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&q=85"} alt={item.tag === "Educação" ? "Estudantes em ambiente educacional" : item.tag === "Esportes" ? "Campo de futebol" : item.tag === "Cidadania" ? "Ação social e comunidade" : "Profissional de saúde em atendimento"} className="mb-4 h-52 w-full rounded-xl object-cover" loading="lazy" />
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">{item.tag} · 17/11/2026</p>
                <h3 className="text-xl font-extrabold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.body[0]}</p>
                <details className="mt-4"><summary className="cursor-pointer font-bold text-emerald-700">Ler reportagem completa</summary><div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">{item.body.slice(1).map((paragrafo, indice) => <p key={indice}>{paragrafo}</p>)}</div></details>
                <p className="mt-4 text-xs text-slate-500">Redação Voz de Brasília · Informações verificadas em comunicados públicos</p>
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
