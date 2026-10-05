import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Resultado das Eleições 2026: direita avança no Congresso e STF entra no radar do Senado | TV Voz de Brasília',
  description: 'Resultado das Eleições 2026 por estado: direita avança no Congresso, Senado muda correlação de forças e STF entra no radar político. Votos, bancadas, fotos oficiais e análise de Paulo Fayad.',
  keywords: ['eleição', 'eleições 2026', 'resultado eleição', 'resultado eleições 2026', 'Senado', 'deputado federal', 'deputado estadual', 'TSE', 'apuração', 'votos'],
  alternates: { canonical: 'https://www.vozdebrasilia.com.br/eleicoes/resultado-eleicoes-2026' },
  openGraph: {
    type: 'article',
    url: 'https://www.vozdebrasilia.com.br/eleicoes/resultado-eleicoes-2026',
    title: 'Resultado das Eleições 2026: Congresso muda e STF entra no radar do Senado',
    description: 'Veja a apuração por estado, a nova correlação de forças no Congresso, o impacto sobre o STF, bancadas, dados e fotos oficiais dos candidatos.',
    siteName: 'TV Voz de Brasília',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resultado das Eleições 2026',
    description: 'Senado, deputados, votos, bancadas, gráficos e fotos por estado.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

const senate = [["AC","s","21:08:18",[["PL","MARCIO BITTAR",223972,"10002548050","Eleito"],["REPUBLICANOS","MARA ROCHA",157104,"10002533895","Eleito"]]],["AL","n","22:15:49",[["PP","ARTHUR LIRA",947394,"20002553272",""],["PSDB","MARINA JHC",925148,"20002553711",""]]],["AM","n","22:21:09",[["MDB","EDUARDO BRAGA",1232633,"40002531447",""],["PSDB","PLINIO VALÉRIO",943600,"40002537344",""]]],["AP","s","21:04:28",[["PODE","RAYSSA FURLAN",264799,"30002530071","Eleito"],["PSD","LUCAS BARRETO",213948,"30002530069","Eleito"]]],["BA","n","22:22:51",[["PT","RUI COSTA",4304332,"50002536321",""],["PT","JAQUES WAGNER",3957047,"50002536317",""]]],["CE","n","22:20:40",[["PSB","CID GOMES",3015643,"60002542479",""],["REDE","LUIZIANNE",2806080,"60002542476",""]]],["DF","s","20:23:38",[["PL","MICHELLE BOLSONARO",938496,"70002552936","Eleito"],["PL","BIA KICIS",886616,"70002552934","Eleito"]]],["ES","s","20:57:09",[["PSB","RENATO CASAGRANDE",995361,"80002551370","Eleito"],["REPUBLICANOS","EVAIR DE MELO",982978,"80002553265","Eleito"]]],["GO","n","21:52:10",[["PL","GUSTAVO GAYER",1639105,"90002543556",""],["UNIÃO","GRACINHA CAIADO",1458296,"90002540997",""]]],["MA","n","22:20:40",[["PP","FUFUCA",1526128,"100002542867",""],["NOVO","LAHESIO BONFIM",1469024,"100002548011",""]]],["MG","n","22:16:33",[["PL","DOMINGOS SÁVIO",4965692,"130002551786",""],["PT","MARÍLIA CAMPOS",3984339,"130002550560",""]]],["MS","s","21:06:39",[["PL","REINALDO AZAMBUJA",903554,"120002535764","Eleito"],["PL","CAPITÃO CONTAR",856045,"120002535769","Eleito"]]],["MT","s","21:32:09",[["UNIÃO","MAURO MENDES",1187352,"110002551966","Eleito"],["PL","ZÉ MEDEIROS",977777,"110002552693","Eleito"]]],["PA","n","22:21:39",[["MDB","HELDER",2338468,"140002550779",""],["UNIÃO","CHICÃO",2011044,"140002550780",""]]],["PB","n","22:13:09",[["PSB","JOAO AZEVÊDO",1391766,"150002549793",""],["MDB","VENEZIANO",974459,"150002544905",""]]],["PE","n","22:21:50",[["PT","HUMBERTO COSTA",2529839,"170002547773",""],["PDT","MARÍLIA ARRAES",2323608,"170002547771",""]]],["PI","n","22:22:20",[["MDB","MARCELO CASTRO",1304726,"180002533967",""],["PSD","JÚLIO CÉSAR O JULIM DO LULA",987056,"180002533964",""]]],["PR","n","21:46:30",[["PL","FILIPE BARROS",3148406,"160002547660",""],["NOVO","DELTAN DALLAGNOL",2904432,"160002547661",""]]],["RJ","s","22:20:10",[["PL","CARLOS PORTINHO",4264932,"190002535142","Eleito"],["PL","CARLOS JORDY",3912405,"190002542888","Eleito"]]],["RN","n","22:07:30",[["PODE","STYVENSON VALENTIM",1054851,"200002534448",""],["PT","SAMANDA DE LULA",635854,"200002533841",""]]],["RO","s","20:51:22",[["PL","DR. FERNANDO MÁXIMO",570799,"220002539996","Eleito"],["PL","BRUNO SCHEID",474226,"220002539995","Eleito"]]],["RR","s","21:09:59",[["PL","NICOLETTI",138269,"230002534804","Eleito"],["MDB","TERESA SURITA",117270,"230002553006","Eleito"]]],["RS","s","21:12:41",[["PL","SANDERSON",3453316,"210002547816","Eleito"],["NOVO","MARCEL VAN HATTEM",3449053,"210002547819","Eleito"]]],["SC","s","21:56:30",[["PL","CAROL DE TONI",2694918,"240002541931","Eleito"],["PL","CARLOS BOLSONARO",2041840,"240002541935","Eleito"]]],["SE","s","22:08:19",[["PT","ROGERIO CARVALHO",511142,"260002547285","Eleito"],["MDB","DELEGADO ALESSANDRO",399775,"260002533084","Eleito"]]],["SP","n","22:16:33",[["PP","GUILHERME DERRITE",13272618,"250002541312",""],["PL","ANDRÉ DO PRADO",12701837,"250002541308",""]]],["TO","s","21:18:59",[["PL","EDUARDO GOMES",450191,"270002546333","Eleito"],["MDB","ALEXANDRE GUIMARÃES",316786,"270002548344","Eleito"]]]] as const;

const topFederal = [["MG","PL","NIKOLAS FERREIRA",3117805,"130002542026"],["SP","PL","LUCAS PAVANATO",3038271,"250002535995"],["SP","PSOL","ERIKA HILTON",1596383,"250002539612"],["CE","PL","ANDRÉ FERNANDES",683375,"60002536979"],["SP","PSOL","SÂMIA BOMFIM",583048,"250002539604"],["SC","PL","JULIA ZANATTA",560223,"240002539378"],["MG","PT","ANA ELISA",523994,"130002535301"],["SP","MISSÃO","KIM KATAGUIRI",520032,"250002546642"],["SP","PSB","TABATA AMARAL",476360,"250002539435"],["PR","NOVO","JEFFREY CHIQUINI",425390,"160002542287"],["ES","PL","LUCAS POLESE",419735,"80002549698"],["PA","PL","DELEGADO CAVEIRA",414879,"140002546709"],["RS","PL","MAURÍCIO MARCON",379834,"210002534654"],["SP","PL","RENATO BOLSONARO",379287,"250002535947"],["SP","PP","SARGENTO NANTES",333381,"250002532342"],["PA","MDB","JADER FILHO",325769,"140002540456"],["SP","PODE","DELEGADO PALUMBO",303227,"250002544357"],["RS","PSOL","FERNANDA MELCHIONNA",280262,"210002533902"],["SP","PSOL","GUILHERME CORTEZ",275438,"250002539620"],["PA","PODE","DRA. ALESSANDRA HABER",272647,"140002547295"]] as const;

const topState = [["SP","PL","EDUARDA CAMPOPIANO",1956143,"250002536384"],["MG","PL","BRUNO ENGLER",675690,"130002542113"],["SP","PT","EDUARDO SUPLICY",654594,"250002536851"],["SP","PSOL","SOFIA FAVERO",407742,"250002538926"],["SC","PL","ANA CAMPAGNOLO",387523,"240002539977"],["SP","PSOL","CARLOS GIANNAZI",367819,"250002539947"],["MG","PT","BEATRIZ CERQUEIRA",328211,"130002535347"],["SP","PSOL","PAULA DA BANCADA FEMINISTA",326186,"250002539952"],["RJ","PL","ÍNDIA ARMELAU",248504,"190002533418"],["SP","PL","GIOVANNI SANCHES",235363,"250002536388"],["SP","PODE","ROGERIO LINS",229928,"250002545156"],["MG","PL","PABLO ALMEIDA",226935,"130002542107"],["BA","PSD","IVANA BASTOS",202121,"50002532697"],["SP","PL","TENENTE COIMBRA",198338,"250002536395"],["RJ","UNIÃO","MÁRCIO CANELLA",197178,"190002541682"],["PR","PL","PAULO MELO",192404,"160002547632"],["SP","MISSÃO","RAFA MINATO",185566,"250002545037"],["SP","PP","DANILO JOAN",182832,"250002533740"],["SP","PL","THOMAZ HENRIQUE",178159,"250002536353"],["RJ","PSOL","RENATA SOUZA",176871,"190002536120"]] as const;

const chamberSeats = {"PL":121,"PT":70,"UNIÃO":46,"PSD":44,"PP":41,"REPUBLICANOS":40,"MDB":36,"PODE":27,"PSB":15,"PSOL":14,"PCDOB":11,"PSDB":11,"NOVO":10,"PV":7,"PDT":6,"AVANTE":5,"PRD":5,"SOLIDARIEDADE":2,"REDE":1,"MISSÃO":1};
const stateSeats = {"PL":212,"PT":140,"MDB":112,"PSD":103,"PP":81,"REPUBLICANOS":78,"UNIÃO":73,"PODE":47,"PSB":42,"PSDB":26,"PSOL":26,"PDT":24,"PV":19,"AVANTE":18,"NOVO":15,"PRD":13,"PCDOB":9,"AGIR":7,"SOLIDARIEDADE":4,"REDE":3,"MOBILIZA":3,"CIDADANIA":1,"DEMOCRATA":1,"DC":1,"MISSÃO":1};
const chamberVotes = {"PL":25810594,"PT":14766516,"PSD":9366830,"REPUBLICANOS":7897994,"MDB":7871625,"UNIÃO":7842417,"PP":7606554,"PODE":5885405,"PSOL":5294449,"PSB":4993699,"NOVO":2914103,"PSDB":2835498,"PDT":1864351,"AVANTE":1802254,"PV":1323310,"PCDOB":1303825,"MISSÃO":1223268,"PRD":1185329,"SOLIDARIEDADE":928852,"CIDADANIA":290668,"REDE":263327};

const blocs = [
  { title: 'Senado — votos agregados', total: 206758037, left: 66745547, center: 23448369, right: 116549457 },
  { title: 'Deputado Federal — votos agregados', total: 113520964, left: 29873568, center: 20010956, right: 63633399 },
  { title: 'Deputado Estadual/Distrital — votos agregados', total: 112582504, left: 30451469, center: 25916791, right: 56212561 },
];

const nf = new Intl.NumberFormat('pt-BR');
const pct = (n:number,t:number) => (n*100/t).toFixed(2).replace('.', ',') + '%';
const photoUrl = (uf:string,sqcand:string) => `https://resultados.tse.jus.br/oficial/ele2026/6259/fotos/${uf.toLowerCase()}/${sqcand}.jpeg`;
const resultUrl = (uf:string) => {
  const u=uf.toLowerCase();
  return `https://resultados.tse.jus.br/oficial/app/index.html#/eleicao;e=e6259;uf=${u};ufbu=${u};mubu=${u};tipo=3;turno=1/resultados`;
};

function Bubble({label,value,total,tone}:{label:string;value:number;total:number;tone:string}) {
  const p=value*100/total;
  const size=Math.max(126,Math.min(196,116+p*1.45));
  return <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm flex flex-col items-center">
    <div className={`rounded-full grid place-items-center text-white shadow-lg ${tone}`} style={{width:size,height:size}}>
      <div><div className="text-xs font-extrabold uppercase">{label}</div><div className="text-2xl font-black leading-tight">{nf.format(value)}</div><div className="text-xs font-bold">{pct(value,total)}</div></div>
    </div>
    <div className="mt-3 font-bold text-gray-900">{label}</div>
  </div>;
}

function Bars({data}:{data:Record<string,number>}) {
  const rows=Object.entries(data).sort((a,b)=>b[1]-a[1]).slice(0,20);
  const max=rows[0]?.[1] || 1;
  return <div className="space-y-3">{rows.map(([party,v])=><div key={party} className="grid grid-cols-[88px_1fr_56px] gap-3 items-center">
    <div className="font-bold text-sm text-gray-800">{party}</div>
    <div className="h-4 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-700 to-blue-600 rounded-full" style={{width:`${v/max*100}%`}}/></div>
    <div className="text-right text-sm font-black text-gray-800">{v}</div>
  </div>)}</div>;
}


function PiePanel({title,right,center,left,total,foot}:{title:string;right:number;center:number;left:number;total:number;foot:string}) {
  const rp=right*100/total, cp=center*100/total, lp=left*100/total;
  const a=rp, b=rp+cp;
  return <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="text-lg font-black text-gray-900">{title}</div>
    <div className="mt-5 flex flex-col sm:flex-row items-center gap-6">
      <div className="w-48 h-48 rounded-full shadow-inner border-8 border-white"
        style={{background:`conic-gradient(#1d4ed8 0 ${a}%, #c3921f ${a}% ${b}%, #be123c ${b}% 100%)`}} />
      <div className="space-y-3 min-w-[190px]">
        <div><span className="inline-block w-3 h-3 rounded-full bg-blue-700 mr-2"/><strong>Direita:</strong> {nf.format(right)} <span className="text-gray-500">({pct(right,total)})</span></div>
        <div><span className="inline-block w-3 h-3 rounded-full bg-amber-600 mr-2"/><strong>Centro:</strong> {nf.format(center)} <span className="text-gray-500">({pct(center,total)})</span></div>
        <div><span className="inline-block w-3 h-3 rounded-full bg-rose-700 mr-2"/><strong>Esquerda:</strong> {nf.format(left)} <span className="text-gray-500">({pct(left,total)})</span></div>
      </div>
    </div>
    <p className="mt-4 text-sm text-gray-600">{foot}</p>
  </div>;
}

function CandidateCard({uf,party,name,votes,sqcand,status,final}:{uf:string;party:string;name:string;votes:number;sqcand:string;status?:string;final?:boolean}) {
  return <article className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
    <div className="bg-gray-100 aspect-[4/5] flex items-center justify-center overflow-hidden">
      <img
        src={photoUrl(uf,sqcand)}
        alt={name}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain object-top"
      />
    </div>
    <div className="p-3">
      <div className="inline-flex rounded-full bg-gray-900 text-white px-2 py-1 text-[10px] font-extrabold">{uf} • {party}</div>
      <h3 className="mt-2 text-sm md:text-base font-black text-gray-900 leading-tight">{name}</h3>
      <div className="mt-1 text-xs md:text-sm text-gray-600">{nf.format(votes)} votos</div>
      {status!==undefined && <div className={`mt-2 text-xs font-bold ${final?'text-green-700':'text-amber-700'}`}>{final ? (status || 'Totalização encerrada') : 'Liderança na apuração • totalização aberta'}</div>}
      <a href={resultUrl(uf)} target="_blank" rel="noopener" className="inline-block mt-2 text-xs font-bold text-green-700 underline">Resultado oficial {uf} ↗</a>
    </div>
  </article>;
}

function Curve() {
  const entries=Object.entries(chamberVotes).sort((a,b)=>b[1]-a[1]);
  const total=entries.reduce((s,x)=>s+x[1],0);
  let cum=0;
  const w=900,h=260,pad=28;
  const pts:[[number,number]]=[[pad,h-pad]];
  entries.forEach(([,v],i)=>{cum+=v;pts.push([pad+(i+1)*(w-2*pad)/entries.length,h-pad-(cum/total)*(h-2*pad)]);});
  return <div>
    <svg viewBox="0 0 900 260" preserveAspectRatio="none" className="w-full h-64 rounded-xl bg-gradient-to-b from-blue-50 to-white">
      {[.25,.5,.75,1].map(q=><g key={q}><line x1={pad} x2={w-pad} y1={h-pad-q*(h-2*pad)} y2={h-pad-q*(h-2*pad)} stroke="#d1d5db"/><text x="4" y={h-pad-q*(h-2*pad)+4} fill="#6b7280" fontSize="12">{Math.round(q*100)}%</text></g>)}
      <polyline points={pts.map(p=>p.join(',')).join(' ')} fill="none" stroke="#b38a13" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div className="mt-3 flex flex-wrap gap-2">{entries.slice(0,10).map(([p,v],i)=><span key={p} className="rounded-full border border-amber-300 px-3 py-1 text-xs font-bold text-gray-800">{i+1}. {p} — {nf.format(v)}</span>)}</div>
  </div>;
}

export default function ElectionResultsPage() {
  const jsonLd={
    '@context':'https://schema.org',
    '@type':'NewsArticle',
    headline:'Resultado das Eleições 2026: Congresso muda e STF entra no radar do Senado',
    description:'Resultado das Eleições 2026 por estado, com a nova força da direita no Congresso, projeção do Senado, impacto político sobre o STF, votos, bancadas e fotos oficiais do TSE.',
    datePublished:'2026-10-04T22:00:00-03:00',
    dateModified:'2026-10-04T23:35:00-03:00',
    author:{'@type':'Person',name:'Paulo Fayad'},
    publisher:{'@type':'Organization',name:'TV Voz de Brasília',logo:{'@type':'ImageObject',url:'https://www.vozdebrasilia.com.br/logo.png'}},
    mainEntityOfPage:'https://www.vozdebrasilia.com.br/eleicoes/resultado-eleicoes-2026',
    keywords:['eleição','eleições 2026','resultado eleição','resultado eleições 2026','Senado','deputados','TSE','apuração'],
  };

  return <div className="min-h-screen bg-gray-50">
    <Header/>
    <main className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>

      <section className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white">
        <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-16">
          <div className="text-amber-400 font-extrabold uppercase tracking-wider text-sm">Especial Eleições 2026 • resultado por estado</div>
          <h1 className="mt-3 max-w-6xl text-4xl md:text-6xl font-black leading-[1.02]">A eleição muda o eixo do poder: direita avança no Congresso e o STF entra no radar do novo Senado</h1>
          <p className="mt-5 max-w-5xl text-lg md:text-xl text-gray-200">Os números desta noite redesenham a correlação de forças em Brasília. A Câmara fica mais conservadora, o Senado pode se aproximar de uma maioria capaz de pressionar o Supremo e o centro volta a ocupar a posição de fiel da balança.</p>
          <div className="mt-7 max-w-5xl border-y border-white/20 py-5 text-xl md:text-2xl font-semibold leading-snug text-white">Não é apenas uma eleição de nomes. É uma eleição sobre <span className="text-amber-400">quem passa a ter força para aprovar, bloquear, investigar e confrontar instituições</span> a partir de 2027.</div>
          <div className="mt-5 text-sm font-bold text-gray-300">Análise de Paulo Fayad • atualização da noite eleitoral de 4 de outubro de 2026</div>
          <div className="mt-6 border-l-4 border-amber-400 bg-white/10 rounded-r-xl p-4 text-sm text-gray-100"><strong>Nota metodológica:</strong> “direita”, “centro” e “esquerda” são uma classificação editorial da TV Voz de Brasília, não uma classificação oficial do TSE. Onde a totalização ainda não estava formalmente encerrada, mostramos a fotografia da apuração, sem antecipar proclamação oficial.</div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/10 border border-white/15 p-5"><div className="text-4xl font-black text-amber-400">56,05%</div><div className="mt-1 text-gray-200">dos votos agregados para deputado federal no bloco classificado à direita</div></div>
            <div className="rounded-2xl bg-white/10 border border-white/15 p-5"><div className="text-4xl font-black text-amber-400">302 / 513</div><div className="mt-1 text-gray-200">cadeiras da Câmara na distribuição desta fotografia do TSE</div></div>
            <div className="rounded-2xl bg-white/10 border border-white/15 p-5"><div className="text-4xl font-black text-amber-400">34 / 54</div><div className="mt-1 text-gray-200">duas primeiras posições ao Senado em partidos classificados à direita</div></div>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Resultado oficial em todos os estados</h2>
        <p className="mt-2 text-gray-600">Abra diretamente a página de resultados do TSE para cada unidade da Federação.</p>
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2">
          {senate.map(([uf])=><a key={uf} href={resultUrl(uf)} target="_blank" rel="noopener" className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-center text-sm font-black text-green-700 hover:bg-green-50">{uf} • TSE ↗</a>)}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">O tamanho real de cada campo político nas urnas</h2>
          <p className="mt-2 text-gray-600 max-w-4xl">O tamanho das esferas acompanha o total de votos de cada bloco. No Senado, o eleitor vota em dois candidatos, por isso o total bruto é maior.</p>
          <div className="mt-8 space-y-8">
            {blocs.map((b)=><div key={b.title} className="rounded-2xl border border-gray-200 p-5">
              <h3 className="text-xl font-black text-gray-900">{b.title}</h3>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Bubble label="Esquerda" value={b.left} total={b.total} tone="bg-gradient-to-br from-rose-400 to-rose-700"/>
                <Bubble label="Centro" value={b.center} total={b.total} tone="bg-gradient-to-br from-amber-300 to-amber-700"/>
                <Bubble label="Direita" value={b.right} total={b.total} tone="bg-gradient-to-br from-blue-400 to-blue-800"/>
              </div>
            </div>)}
          </div>
        </div>
      </section>


      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="max-w-5xl">
          <div className="text-sm font-black uppercase tracking-wider text-red-700">O poder em uma imagem</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-black text-gray-950 leading-tight">A direita domina a Câmara e pode chegar ao Senado a um voto do quórum de 2/3</h2>
          <p className="mt-4 text-lg text-gray-600">A comparação abaixo junta cadeiras já distribuídas na Câmara, Assembleias/Câmara Distrital e uma projeção editorial do Senado de 81 cadeiras caso as duas primeiras posições de cada estado se confirmem.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <PiePanel title="Câmara dos Deputados" right={302} center={87} left={124} total={513} foot="A direita passa de 58% das cadeiras nesta classificação editorial."/>
          <PiePanel title="Assembleias e Câmara Distrital" right={549} center={247} left={263} total={1059} foot="Nos Legislativos estaduais, a vantagem existe, mas é menos concentrada."/>
          <PiePanel title="Senado projetado — 81 cadeiras" right={53} center={13} left={15} total={81} foot="Projeção: 53 cadeiras à direita, uma abaixo dos 54 votos que representam dois terços do Senado."/>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Como o voto virou cadeira no Congresso</h2>
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><h3 className="text-xl font-black mb-5">Câmara dos Deputados — 513 cadeiras</h3><Bars data={chamberSeats}/></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><h3 className="text-xl font-black mb-5">Assembleias + Câmara Distrital — 1.059 cadeiras</h3><Bars data={stateSeats}/></div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">Onde o voto se concentra</h2>
          <p className="mt-2 text-gray-600">A leitura acumulada mostra o peso dos maiores partidos e a velocidade com que eles concentram o eleitorado.</p>
          <div className="mt-6 rounded-2xl border border-gray-200 p-5"><Curve/></div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Senado: 54 nomes nas duas primeiras posições</h2>
        <p className="mt-2 text-gray-600 max-w-5xl">Agora diagramados em até <strong>seis por linha</strong> no desktop e quatro em telas intermediárias. As fotos são exibidas em tamanho menor e sem esticar, preservando melhor a definição do arquivo oficial do TSE.</p>

        <div className="mt-7 grid grid-cols-3 gap-4 max-w-2xl">
          <div className="rounded-xl border bg-white p-4"><div className="text-3xl font-black text-blue-700">34</div><div className="text-sm text-gray-600">direita</div></div>
          <div className="rounded-xl border bg-white p-4"><div className="text-3xl font-black text-rose-700">11</div><div className="text-sm text-gray-600">esquerda</div></div>
          <div className="rounded-xl border bg-white p-4"><div className="text-3xl font-black text-amber-700">9</div><div className="text-sm text-gray-600">centro</div></div>
        </div>

        <div className="mt-8 space-y-8">
          {senate.map(([uf,tf,hg,top])=><div key={uf}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-2 mb-3">
              <h3 className="text-xl font-black text-gray-900">{uf} <span className="text-xs font-semibold text-gray-500">• TSE {hg} • {tf==='s'?'encerrado':'em totalização'}</span></h3>
              <a href={resultUrl(uf)} target="_blank" rel="noopener" className="text-sm font-bold text-green-700 underline">Abrir resultado oficial ↗</a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {top.map((c)=><CandidateCard key={c[1]} uf={uf} party={c[0]} name={c[1]} votes={c[2]} sqcand={c[3]} status={c[4]} final={tf==='s'}/>)}
            </div>
          </div>)}
        </div>
      </section>


      <section className="bg-slate-950 text-white py-14">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-red-400 text-sm font-black uppercase tracking-[.18em]">O ponto de tensão institucional</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-black leading-tight">STF sob pressão: ministros correm risco de impeachment?</h2>
          <p className="mt-5 text-xl text-slate-200 leading-relaxed">O risco político <strong className="text-white">aumenta</strong>, mas impeachment de ministro do Supremo não nasce automaticamente do resultado das urnas. A Constituição dá ao Senado a competência para processar e julgar ministros do STF por crimes de responsabilidade; a Lei 1.079/1950 exige enquadramento jurídico e prevê condenação apenas com <strong className="text-amber-400">dois terços dos senadores — 54 votos</strong>.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5"><div className="text-5xl font-black text-blue-400">53</div><div className="mt-2 text-slate-300">cadeiras projetadas para a direita nesta classificação, se as lideranças atuais ao Senado se confirmarem</div></div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5"><div className="text-5xl font-black text-amber-400">54</div><div className="mt-2 text-slate-300">votos correspondem a dois terços do Senado, quórum previsto para condenação em crime de responsabilidade</div></div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5"><div className="text-5xl font-black text-red-400">1</div><div className="mt-2 text-slate-300">é a distância matemática entre a projeção do bloco de direita e esse quórum — mas senadores não votam automaticamente por bloco</div></div>
          </div>

          <div className="mt-9 grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-7">
            <div className="text-lg leading-relaxed text-slate-200 space-y-5">
              <p><strong className="text-white">Há pressão concreta sobre Alexandre de Moraes.</strong> Em setembro de 2026, senadores defenderam publicamente seu afastamento após novas revelações do caso Banco Master, e a PET 20/2026 foi protocolada no Senado com pedido de impeachment; o registro oficial ainda constava aguardando despacho na consulta mais recente.</p>
              <p><strong className="text-white">Isso não significa que haja votos para condenar qualquer ministro.</strong> Além do enquadramento em crime de responsabilidade, o processo depende de tramitação no Senado, análise institucional e formação de uma maioria qualificada. O centro — especialmente MDB e PSD — pode ser decisivo.</p>
              <p><strong className="text-white">O próprio rito está sob disputa jurídica.</strong> As ADPFs 1259 e 1260 discutem pontos da Lei do Impeachment aplicáveis a ministros do STF; decisões cautelares de 2025 alteraram partes do regime e foram depois parcialmente suspensas. Portanto, o cenário é politicamente mais duro para a Corte, mas juridicamente ainda cercado de etapas e controvérsias.</p>
            </div>
            <aside className="rounded-2xl border border-red-500/40 bg-red-950/30 p-6">
              <div className="text-sm font-black uppercase tracking-wider text-red-300">Leitura de Paulo Fayad</div>
              <p className="mt-3 text-2xl font-serif leading-snug">“O STF não sai automaticamente ameaçado das urnas, mas sai diante de um Senado potencialmente muito menos disposto a funcionar apenas como espectador. A mudança maior é a elevação do custo político dos conflitos entre Corte e Congresso.”</p>
              <div className="mt-5 text-sm text-slate-300">O cenário de 53 cadeiras é uma projeção editorial baseada na fotografia da apuração desta noite, não um resultado definitivo nem indicação de voto individual de senador.</div>
            </aside>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a className="rounded-full border border-white/20 px-4 py-2 font-bold hover:bg-white/10" href="https://legis.senado.leg.br/norma/579494/publicacao/16434817" target="_blank" rel="noopener">Constituição — art. 52 ↗</a>
            <a className="rounded-full border border-white/20 px-4 py-2 font-bold hover:bg-white/10" href="https://www.planalto.gov.br/ccivil_03/leis/l1079.htm" target="_blank" rel="noopener">Lei 1.079/1950 ↗</a>
            <a className="rounded-full border border-white/20 px-4 py-2 font-bold hover:bg-white/10" href="https://www25.senado.leg.br/web/atividade/materias/-/materia/175743" target="_blank" rel="noopener">PET 20/2026 ↗</a>
            <a className="rounded-full border border-white/20 px-4 py-2 font-bold hover:bg-white/10" href="https://portal.stf.jus.br/processos/detalhe.asp?incidente=7374620" target="_blank" rel="noopener">ADPF 1259 ↗</a>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">Deputados federais mais votados</h2>
          <p className="mt-2 text-gray-600">Os 20 maiores totais individuais encontrados nos arquivos estaduais do TSE nesta fotografia da noite eleitoral.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {topFederal.map((c)=><CandidateCard key={c[2]} uf={c[0]} party={c[1]} name={c[2]} votes={c[3]} sqcand={c[4]}/>)}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Deputados estaduais e distritais mais votados</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {topState.map((c)=><CandidateCard key={c[2]} uf={c[0]} party={c[1]} name={c[2]} votes={c[3]} sqcand={c[4]}/>)}
        </div>
      </section>

      <section className="bg-gray-950 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-amber-400 text-sm font-black uppercase tracking-[.18em]">Análise</div><h2 className="mt-2 text-3xl md:text-5xl font-black">Paulo Fayad: “O centro do poder político se deslocou”</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-200">
            <p><strong className="text-amber-400">A Câmara saiu da eleição claramente deslocada para a direita.</strong> Pela classificação editorial adotada neste painel, partidos à direita somam 63,63 milhões de votos para deputado federal, contra 29,87 milhões da esquerda e 20,01 milhões do centro. Em cadeiras, a fotografia é de 302 vagas à direita, 124 à esquerda e 87 ao centro.</p>
            <p><strong className="text-amber-400">O Senado é a peça que pode produzir a maior mudança institucional.</strong> Se as duas primeiras posições atuais se confirmarem e forem somadas às 27 cadeiras não renovadas nesta eleição, a projeção editorial chega a 53 senadores de partidos classificados à direita, 15 à esquerda e 13 ao centro. É uma composição capaz de mudar a relação com o STF, com o governo e com as indicações para cargos de Estado.</p>
            <p><strong className="text-amber-400">O centro continua decisivo.</strong> MDB, PSD e outros partidos de centro preservam capacidade de articulação. Em votações de maioria absoluta e quórum qualificado, esse campo pode definir o resultado.</p>
            <p><strong className="text-amber-400">Voto popular não é sinônimo automático de cadeira.</strong> Federações, quocientes e regras proporcionais mudam a tradução de votos em mandatos. Por isso é preciso olhar simultaneamente para votos, bancadas e capacidade de formar maioria.</p>
          </div>
          <blockquote className="mt-8 border-l-4 border-amber-400 bg-white/5 rounded-r-xl p-6 text-xl md:text-2xl font-serif leading-relaxed">“A eleição de 2026 mostra que o eleitor pode votar de forma diferente para Executivo e Legislativo. É no Congresso que o poder real de aprovar, travar ou alterar projetos será medido.” — Paulo Fayad</blockquote>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 py-10">
        <h2 className="text-2xl font-black text-gray-900">Fonte e metodologia</h2>
        <p className="mt-3 text-sm text-gray-600">Fonte primária: arquivos públicos de resultados do Tribunal Superior Eleitoral. A divisão entre esquerda, centro e direita é uma classificação editorial da TV Voz de Brasília e pode ser reorganizada por outros critérios acadêmicos ou jornalísticos.</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a className="font-bold text-green-700 underline" href="https://resultados.tse.jus.br/" target="_blank" rel="noopener">Resultados oficiais do TSE</a>
          <a className="font-bold text-green-700 underline" href="https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados-2024" target="_blank" rel="noopener">Informações técnicas do TSE</a>
          <a className="font-bold text-green-700 underline" href="https://www12.senado.leg.br/assessoria-de-imprensa/notas/como-tramita-um-pedido-de-impeachment-contra-ministro-do-stf" target="_blank" rel="noopener">Como tramita pedido contra ministro do STF</a>
          <a className="font-bold text-green-700 underline" href="https://www12.senado.leg.br/noticias/materias/2026/09/01/senadores-pedem-impeachment-do-ministro-alexandre-de-moraes-do-stf" target="_blank" rel="noopener">Senado: pressão política em setembro de 2026</a>
        </div>
      </section>
    </main>
    <Footer/>
  </div>;
}
