import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
 title:'Instituto Brazil Just (IBJ) em Brasília: projetos sociais e inclusão | Voz de Brasília',
 description:'Conheça o Instituto Brazil Just (IBJ), CNPJ 13.838.187/0001-49, presidido pela Dra. Deijanete de Araújo Fayad. Projetos Mulheres Belas, Esporte é Vida, TEA, Hip Hop e outras iniciativas.',
 alternates:{canonical:'https://www.vozdebrasilia.com.br/instituto-brazil-just'},
 openGraph:{title:'Instituto Brazil Just (IBJ) — projetos sociais em Brasília e no Brasil',description:'Instituto Brazil Just: história, identidade e projetos sociais de inclusão, esporte, formação, cultura e cidadania.',type:'article',url:'https://www.vozdebrasilia.com.br/instituto-brazil-just'}
};
const projetos=[
 {nome:'Mulheres Belas',status:'Atividades comunitárias registradas; proposta de expansão',texto:'Ações de acolhimento, convivência e fortalecimento da autonomia de mulheres. Há registros de encontros comunitários no Distrito Federal. A expansão de cursos e oficinas depende de estruturação e apoio.'},
 {nome:'Esporte é Vida',status:'Atividades esportivas documentadas',texto:'Experiências de inclusão por meio do esporte, incluindo futebol e atividades de karatê em Águas Lindas de Goiás. Outras modalidades permanecem entre as possibilidades de expansão.'},
 {nome:'TEA — Laços de Inclusão',status:'Projeto em estruturação',texto:'Proposta de fortalecimento das redes de acolhimento, informação e inclusão de pessoas com transtorno do espectro autista e suas famílias, sem alegar atendimentos clínicos ainda não comprovados.'},
 {nome:'Hip Hop — Zumbi Periférico',status:'Atividade cultural documentada',texto:'Iniciativa cultural em Maceió, Alagoas, com atividades de hip hop e valorização de expressões culturais periféricas.'},
 {nome:'Meninas Luz',status:'Projeto apresentado',texto:'Iniciativa social voltada à proteção e ao desenvolvimento de meninas e adolescentes; etapas e realizações devem ser divulgadas conforme comprovação.'},
 {nome:'Carreta da Visão',status:'Proposta de atendimento itinerante',texto:'Projeto de promoção de acesso a triagens e cuidados com a saúde ocular, sujeito à estruturação e às condições de execução.'},
 {nome:'Clínica Zoe Genesis',status:'Proposta em desenvolvimento',texto:'Projeto de atendimento e acolhimento multidisciplinar cuja implementação depende de recursos, autorizações e estrutura.'},
 {nome:'RECOMEÇAR',status:'Programa institucional',texto:'Ação de orientação para famílias e pessoas em situação de endividamento e dificuldades socioeconômicas.'},
];
const root='https://institutobraziljust.org.br/';
export default function PaginaIBJ(){
 const schema={
  '@context':'https://schema.org',
  '@type':'Article',
  headline:'Instituto Brazil Just (IBJ): projetos sociais e identidade institucional',
  description:'Apresentação editorial do Instituto Brazil Just e de seus projetos sociais.',
  dateModified:'2026-11-25',
  mainEntityOfPage:'https://www.vozdebrasilia.com.br/instituto-brazil-just',
  about:{'@type':'NGO',name:'Instituto Brazil Just (IBJ)',alternateName:'IBJ — Instituto Brazil Just',taxID:'13.838.187/0001-49',areaServed:{'@type':'Country',name:'Brasil'},location:{'@type':'Place',name:'Brasília, Distrito Federal, Brasil'},url:root},
  publisher:{'@type':'Organization',name:'TV Voz de Brasília',url:'https://www.vozdebrasilia.com.br/'}
 };
 return <div className="min-h-screen bg-slate-50">
  <Header />
  <main className="mx-auto max-w-[1120px] px-4 py-10">
   <nav className="mb-8 text-sm text-slate-600"><Link className="font-semibold text-green-800" href="/">Início</Link> / Institucional / Instituto Brazil Just</nav>
   <article className="overflow-hidden rounded-2xl border bg-white shadow-md">
    <header className="bg-gradient-to-r from-green-950 to-emerald-800 px-7 py-11 text-white md:px-12">
      <p className="text-sm font-bold uppercase tracking-widest text-emerald-100">Voz de Brasília • Institucional e cidadania</p>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">Instituto Brazil Just (IBJ): projetos sociais em Brasília e no Brasil</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-50">Inclusão social, esporte, cultura, cidadania e iniciativas voltadas ao desenvolvimento humano.</p>
    </header>
    <div className="space-y-7 px-7 py-9 text-[17px] leading-8 text-slate-800 md:px-12">
      <p>O <strong>Instituto Brazil Just (IBJ)</strong> é uma organização social sediada em Brasília, no Distrito Federal, identificada pelo <strong>CNPJ 13.838.187/0001-49</strong>. A presidência é exercida pela <strong>Dra. Deijanete de Araújo Fayad</strong>. A instituição desenvolve e propõe iniciativas ligadas ao fortalecimento da cidadania e à inclusão de pessoas e famílias.</p>
      <p>O trabalho do IBJ reúne experiências comunitárias, ações culturais e esportivas e projetos em diferentes fases de desenvolvimento. Apresentar cada iniciativa com clareza é importante para que apoiadores e beneficiários distingam atividades já realizadas de propostas que ainda dependem de recursos ou parcerias.</p>
      <section aria-labelledby="projetos-ibj"><h2 id="projetos-ibj" className="mb-5 text-2xl font-black text-slate-950">Projetos e programas do IBJ</h2>
       <div className="grid gap-4 md:grid-cols-2">{projetos.map(p=><div key={p.nome} className="rounded-xl border border-slate-200 bg-slate-50 p-5"><h3 className="text-xl font-bold text-green-900">{p.nome}</h3><p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-600">{p.status}</p><p className="mt-3 text-base leading-7">{p.texto}</p></div>)}</div>
      </section>
      <h2 className="text-2xl font-black text-slate-950">Identidade e transparência</h2>
      <p>Para a busca na internet, o nome completo <strong>Instituto Brazil Just</strong> identifica com mais precisão a entidade do que a sigla IBJ isolada, utilizada também por outras organizações. O CNPJ, a localização e a identidade de seus programas ajudam o público a encontrar a instituição correta.</p>
      <p>A Voz de Brasília mantém este conteúdo como referência institucional sobre a história e os programas do Instituto. A documentação e a situação de execução de cada projeto devem ser consultadas diretamente nos canais oficiais da organização.</p>
      <div className="rounded-xl border-l-4 border-green-700 bg-green-50 p-5"><p className="font-bold text-green-950">Site institucional do Instituto Brazil Just</p><a href={root} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-green-800 underline">Acessar o portal do IBJ</a><p className="mt-3 text-sm text-slate-700">A identificação dos perfis sociais oficiais será adicionada após confirmação dos respectivos endereços.</p></div>
      <p className="text-sm text-slate-600">Conteúdo institucional informativo. A divulgação de iniciativas em planejamento não representa comprovação de sua execução.</p>
    </div>
   </article>
  </main>
  <Footer />
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
 </div>
}
