import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Eleições 2026: senadores eleitos, campeões de votos, Senado e segundo turno | TV Voz de Brasília',
  description: 'Resultado das Eleições 2026 por estado: direita avança no Congresso, Senado muda correlação de forças e STF entra no radar político. Votos, bancadas, fotos oficiais e análise de Paulo Fayad.',
  keywords: ['eleição', 'eleições 2026', 'resultado eleição 2026', 'senadores eleitos', 'campeões de votos', 'Flávio Bolsonaro', 'Lula', 'segundo turno', 'Senado 2027', 'Câmara', 'STF', 'TSE', 'apuração'],
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

const senate = [["AC","s","21:08:18",[["PL","MARCIO BITTAR",223972,"10002548050","Eleito"],["REPUBLICANOS","MARA ROCHA",157104,"10002533895","Eleito"]]],["AL","s","22:54:51",[["PP","ARTHUR LIRA",948703,"20002553272","Eleito"],["PSDB","MARINA JHC",926860,"20002553711","Eleito"]]],["AM","s","06:08:17",[["MDB","EDUARDO BRAGA",1240471,"40002531447","Eleito"],["PSDB","PLINIO VALÉRIO",948793,"40002537344","Eleito"]]],["AP","s","21:04:28",[["PODE","RAYSSA FURLAN",264799,"30002530071","Eleito"],["PSD","LUCAS BARRETO",213948,"30002530069","Eleito"]]],["BA","s","00:52:46",[["PT","RUI COSTA",4335196,"50002536321","Eleito"],["PT","JAQUES WAGNER",3986690,"50002536317","Eleito"]]],["CE","s","23:11:37",[["PSB","CID GOMES",3033562,"60002542479","Eleito"],["REDE","LUIZIANNE",2822806,"60002542476","Eleito"]]],["DF","s","20:23:38",[["PL","MICHELLE BOLSONARO",938496,"70002552936","Eleito"],["PL","BIA KICIS",886616,"70002552934","Eleito"]]],["ES","s","20:57:09",[["PSB","RENATO CASAGRANDE",995361,"80002551370","Eleito"],["REPUBLICANOS","EVAIR DE MELO",982978,"80002553265","Eleito"]]],["GO","s","22:39:26",[["PL","GUSTAVO GAYER",1639247,"90002543556","Eleito"],["UNIÃO","GRACINHA CAIADO",1458522,"90002540997","Eleito"]]],["MA","s","02:02:00",[["PP","FUFUCA",1530187,"100002542867","Eleito"],["NOVO","LAHESIO BONFIM",1471859,"100002548011","Eleito"]]],["MG","s","00:53:12",[["PL","DOMINGOS SÁVIO",4968829,"130002551786","Eleito"],["PT","MARÍLIA CAMPOS",3990864,"130002550560","Eleito"]]],["MS","s","21:06:39",[["PL","REINALDO AZAMBUJA",903554,"120002535764","Eleito"],["PL","CAPITÃO CONTAR",856045,"120002535769","Eleito"]]],["MT","s","21:32:09",[["UNIÃO","MAURO MENDES",1187352,"110002551966","Eleito"],["PL","ZÉ MEDEIROS",977777,"110002552693","Eleito"]]],["PA","s","23:56:34",[["MDB","HELDER",2342070,"140002550779","Eleito"],["UNIÃO","CHICÃO",2014409,"140002550780","Eleito"]]],["PB","s","23:23:05",[["PSB","JOAO AZEVÊDO",1391994,"150002549793","Eleito"],["MDB","VENEZIANO",974550,"150002544905","Eleito"]]],["PE","s","22:55:58",[["PT","HUMBERTO COSTA",2531389,"170002547773","Eleito"],["PDT","MARÍLIA ARRAES",2325127,"170002547771","Eleito"]]],["PI","s","23:37:35",[["MDB","MARCELO CASTRO",1307833,"180002533967","Eleito"],["PSD","JÚLIO CÉSAR",989146,"180002533964","Eleito"]]],["PR","s","22:44:48",[["PL","FILIPE BARROS",3148583,"160002547660","Eleito"],["NOVO","DELTAN DALLAGNOL",2904594,"160002547661","Eleito"]]],["RJ","s","22:23:21",[["PL","CARLOS PORTINHO",4264932,"190002535142","Eleito"],["PL","CARLOS JORDY",3912405,"190002542888","Eleito"]]],["RN","s","23:02:12",[["PODE","STYVENSON VALENTIM",1055000,"200002534448","Eleito"],["PT","SAMANDA DE LULA",635924,"200002533841","Eleito"]]],["RO","s","20:51:22",[["PL","DR. FERNANDO MÁXIMO",570799,"220002539996","Eleito"],["PL","BRUNO SCHEID",474226,"220002539995","Eleito"]]],["RR","s","21:09:59",[["PL","NICOLETTI",138269,"230002534804","Eleito"],["MDB","TERESA SURITA",117270,"230002553006","Eleito"]]],["RS","s","21:13:15",[["PL","SANDERSON",3453316,"210002547816","Eleito"],["NOVO","MARCEL VAN HATTEM",3449053,"210002547819","Eleito"]]],["SC","s","21:56:38",[["PL","CAROL DE TONI",2694918,"240002541931","Eleito"],["PL","CARLOS BOLSONARO",2041840,"240002541935","Eleito"]]],["SE","s","22:08:20",[["PT","ROGERIO CARVALHO",511142,"260002547285","Eleito"],["MDB","DELEGADO ALESSANDRO",399775,"260002533084","Eleito"]]],["SP","s","23:00:41",[["PP","GUILHERME DERRITE",13273880,"250002541312","Eleito"],["PL","ANDRÉ DO PRADO",12703089,"250002541308","Eleito"]]],["TO","s","21:19:00",[["PL","EDUARDO GOMES",450191,"270002546333","Eleito"],["MDB","ALEXANDRE GUIMARÃES",316786,"270002548344","Eleito"]]]] as const;

const topFederal = [["MG","PL","NIKOLAS FERREIRA",3117805,"130002542026"],["SP","PL","LUCAS PAVANATO",3038271,"250002535995"],["SP","PSOL","ERIKA HILTON",1596383,"250002539612"],["CE","PL","ANDRÉ FERNANDES",683375,"60002536979"],["SP","PSOL","SÂMIA BOMFIM",583048,"250002539604"],["SC","PL","JULIA ZANATTA",560223,"240002539378"],["MG","PT","ANA ELISA",523994,"130002535301"],["SP","MISSÃO","KIM KATAGUIRI",520032,"250002546642"],["SP","PSB","TABATA AMARAL",476360,"250002539435"],["PR","NOVO","JEFFREY CHIQUINI",425390,"160002542287"],["ES","PL","LUCAS POLESE",419735,"80002549698"],["PA","PL","DELEGADO CAVEIRA",414879,"140002546709"],["RS","PL","MAURÍCIO MARCON",379834,"210002534654"],["SP","PL","RENATO BOLSONARO",379287,"250002535947"],["SP","PP","SARGENTO NANTES",333381,"250002532342"],["PA","MDB","JADER FILHO",325769,"140002540456"],["SP","PODE","DELEGADO PALUMBO",303227,"250002544357"],["RS","PSOL","FERNANDA MELCHIONNA",280262,"210002533902"],["SP","PSOL","GUILHERME CORTEZ",275438,"250002539620"],["PA","PODE","DRA. ALESSANDRA HABER",272647,"140002547295"]] as const;

const topState = [["SP","PL","EDUARDA CAMPOPIANO",1956143,"250002536384"],["MG","PL","BRUNO ENGLER",675690,"130002542113"],["SP","PT","EDUARDO SUPLICY",654594,"250002536851"],["SP","PSOL","SOFIA FAVERO",407742,"250002538926"],["SC","PL","ANA CAMPAGNOLO",387523,"240002539977"],["SP","PSOL","CARLOS GIANNAZI",367819,"250002539947"],["MG","PT","BEATRIZ CERQUEIRA",328211,"130002535347"],["SP","PSOL","PAULA DA BANCADA FEMINISTA",326186,"250002539952"],["RJ","PL","ÍNDIA ARMELAU",248504,"190002533418"],["SP","PL","GIOVANNI SANCHES",235363,"250002536388"],["SP","PODE","ROGERIO LINS",229928,"250002545156"],["MG","PL","PABLO ALMEIDA",226935,"130002542107"],["BA","PSD","IVANA BASTOS",202121,"50002532697"],["SP","PL","TENENTE COIMBRA",198338,"250002536395"],["RJ","UNIÃO","MÁRCIO CANELLA",197178,"190002541682"],["PR","PL","PAULO MELO",192404,"160002547632"],["SP","MISSÃO","RAFA MINATO",185566,"250002545037"],["SP","PP","DANILO JOAN",182832,"250002533740"],["SP","PL","THOMAZ HENRIQUE",178159,"250002536353"],["RJ","PSOL","RENATA SOUZA",176871,"190002536120"]] as const;

const senateStateMedia = {"AC":["https://www12.senado.leg.br/noticias/materias/2026/10/04/acre-elege-marcio-bittar-e-mara-rocha-para-o-senado/whatsapp-image-2026-10-04-at-18-41-59.jpeg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/acre-elege-marcio-bittar-e-mara-rocha-para-o-senado"],"AL":["https://www12.senado.leg.br/noticias/materias/2026/10/04/alagoas-elege-arthur-lira-e-marina-jhc-para-o-senado/arthur-lira-x-marina-jhc.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/alagoas-elege-arthur-lira-e-marina-jhc-para-o-senado"],"AP":["https://www12.senado.leg.br/noticias/materias/2026/10/04/amapa-elege-rayssa-furlan-e-lucas-barreto-para-o-senado/rayssa-furlan-x-lucas-barreto_001.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/amapa-elege-rayssa-furlan-e-lucas-barreto-para-o-senado"],"AM":["https://www12.senado.leg.br/noticias/materias/2026/10/04/eduardo-braga-e-plinio-valerio-sao-reeleitos-senadores-pelo-amazonas/eduardo-braga-x-plinio-valerio_01.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/eduardo-braga-e-plinio-valerio-sao-reeleitos-senadores-pelo-amazonas"],"BA":["https://www12.senado.leg.br/noticias/materias/2026/10/04/bahia-escolhe-rui-costa-e-jaques-wagner-para-o-senado/foto_-nao-e-montagem-rui-costa-e-jaques-wagner.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/bahia-escolhe-rui-costa-e-jaques-wagner-para-o-senado"],"CE":["https://www12.senado.leg.br/noticias/materias/2026/10/04/cid-gomes-e-luizianne-sao-eleitos-senadores-pelo-ceara/cid-gomes-x-luizianne-lins.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/cid-gomes-e-luizianne-sao-eleitos-senadores-pelo-ceara"],"DF":["https://www12.senado.leg.br/noticias/materias/2026/10/04/distrito-federal-elege-michelle-bolsonaro-e-bia-kicis-ao-senado/michelle_bia_01.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/distrito-federal-elege-michelle-bolsonaro-e-bia-kicis-ao-senado"],"ES":["https://www12.senado.leg.br/noticias/materias/2026/10/04/espirito-santo-escolhe-renato-casagrande-e-evair-de-melo-para-o-senado/renato_casagrande_evair_mello_02.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/espirito-santo-escolhe-renato-casagrande-e-evair-de-melo-para-o-senado"],"GO":["https://www12.senado.leg.br/noticias/materias/2026/10/04/goias-elege-gustavo-gayer-e-gracinha-caiado-ao-senado/go_gustavo_gayer_gracinha_caiado_01.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/goias-elege-gustavo-gayer-e-gracinha-caiado-ao-senado"],"MA":["https://www12.senado.leg.br/noticias/materias/2026/10/04/fufuca-e-lahesio-bonfim-sao-os-novos-senadores-pelo-maranhao/andre_fufuca_lahesio_bonfim_01.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/fufuca-e-lahesio-bonfim-sao-os-novos-senadores-pelo-maranhao"],"MT":["https://www12.senado.leg.br/noticias/materias/2026/10/04/mato-grosso-elege-mauro-mendes-e-ze-medeiros-ao-senado/mauro_mendes_ze_medeiros_01.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/mato-grosso-elege-mauro-mendes-e-ze-medeiros-ao-senado"],"MS":["https://www12.senado.leg.br/noticias/materias/2026/10/04/senado-mato-grosso-do-sul-elege-reinaldo-azambuja-e-capitao-contar/montagem-reinaldo-azambuja-x-capitao-contar.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/senado-mato-grosso-do-sul-elege-reinaldo-azambuja-e-capitao-contar"],"MG":["https://www12.senado.leg.br/noticias/materias/2026/10/04/minas-gerais-elege-domingos-savio-e-marilia-campos-para-o-senado/whatsapp-image-2026-10-04-at-19-37-57.jpeg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/minas-gerais-elege-domingos-savio-e-marilia-campos-para-o-senado"],"PA":["https://www12.senado.leg.br/noticias/materias/2026/10/04/para-elege-helder-e-chicao-para-o-senado/pa_helderbarbalho_chicao_01.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/para-elege-helder-e-chicao-para-o-senado"],"PB":["https://www12.senado.leg.br/noticias/materias/2026/10/04/joao-azevedo-e-veneziano-sao-eleitos-senadores-pela-paraiba/whatsapp-image-2026-10-04-at-18-27-56.jpeg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/joao-azevedo-e-veneziano-sao-eleitos-senadores-pela-paraiba"],"PR":["https://www12.senado.leg.br/noticias/materias/2026/10/04/parana-elege-filipe-barros-e-deltan-dallagnol/whatsapp-image-2026-10-04-at-18-26-27.jpeg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/parana-elege-filipe-barros-e-deltan-dallagnol"],"PE":["https://www12.senado.leg.br/noticias/materias/2026/10/04/pernambuco-elege-humberto-costa-e-marilia-arraes-para-o-senado/whatsapp-image-2026-10-04-at-19-09-26.jpeg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/pernambuco-elege-humberto-costa-e-marilia-arraes-para-o-senado"],"PI":["https://www12.senado.leg.br/noticias/materias/2026/10/04/piaui-elege-marcelo-castro-e-julio-cesar-para-o-senado/pi-mascara-2-fotos.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/piaui-elege-marcelo-castro-e-julio-cesar-para-o-senado"],"RJ":["https://www12.senado.leg.br/noticias/materias/2026/10/04/rio-de-janeiro-elege-carlos-portinho-e-carlos-jordy/whatsapp-image-2026-10-04-at-19-26-57.jpeg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/rio-de-janeiro-elege-carlos-portinho-e-carlos-jordy"],"RN":["https://www12.senado.leg.br/noticias/materias/2026/10/04/rio-grande-do-norte-elege-styvenson-e-samanda-de-lula-para-o-senado/rn-mascara-2-fotos.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/rio-grande-do-norte-elege-styvenson-e-samanda-de-lula-para-o-senado"],"RS":["https://www12.senado.leg.br/noticias/materias/2026/10/04/rio-grande-do-sul-elege-sanderson-e-marcel-van-hattem-para-o-senado/rs-mascara-2-fotos.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/rio-grande-do-sul-elege-sanderson-e-marcel-van-hattem-para-o-senado"],"RO":["https://www12.senado.leg.br/noticias/materias/2026/10/04/rondonia-elege-fernando-maximo-e-bruno-scheid-para-o-senado/ro-mascara-2-fotos.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/rondonia-elege-fernando-maximo-e-bruno-scheid-para-o-senado"],"RR":["https://www12.senado.leg.br/noticias/materias/2026/10/04/roraima-elege-nicoletti-e-teresa-surita-para-o-senado/rr-mascara-2-fotos.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/roraima-elege-nicoletti-e-teresa-surita-para-o-senado"],"SC":["https://www12.senado.leg.br/noticias/materias/2026/10/04/santa-catarina-elege-carol-de-toni-e-carlos-bolsonaro-ao-senado/sc-mascara-2-fotos.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/santa-catarina-elege-carol-de-toni-e-carlos-bolsonaro-ao-senado"],"SP":["https://www12.senado.leg.br/noticias/materias/2026/10/04/sao-paulo-elege-derrite-e-andre-do-prado-como-novos-senadores/sp-mascara-2-fotos.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/sao-paulo-elege-derrite-e-andre-do-prado-como-novos-senadores"],"SE":["https://www12.senado.leg.br/noticias/materias/2026/10/04/sergipe-reelege-rogerio-carvalho-e-alessandro-vieira/whatsapp-image-2026-10-04-at-19-02-43.jpeg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/sergipe-reelege-rogerio-carvalho-e-alessandro-vieira"],"TO":["https://www12.senado.leg.br/noticias/materias/2026/10/04/tocantins-reelege-eduardo-gomes-e-elege-alexandre-guimaraes-ao-senado/eduardo_gomes_alexandre_guimaraes_01.jpg/mural/imagem_materia","https://www12.senado.leg.br/noticias/materias/2026/10/04/tocantins-reelege-eduardo-gomes-e-elege-alexandre-guimaraes-ao-senado"]} as const;

const senateComposition = {"PL":28,"PT":9,"MDB":8,"UNIÃO":6,"PP":6,"PSD":5,"REPUBLICANOS":5,"PSB":4,"NOVO":3,"PSDB":2,"PODE":2,"REDE":1,"PDT":1,"SEM PARTIDO":1} as const;

const chamberSeats = {"PL":118,"PT":70,"UNIÃO":44,"PSD":42,"PP":41,"REPUBLICANOS":41,"MDB":36,"PODE":25,"PSB":15,"PSOL":14,"PCDOB":11,"PSDB":11,"NOVO":10,"PV":7,"PDT":6,"AVANTE":5,"PRD":5,"SOLIDARIEDADE":2,"REDE":1,"MISSÃO":1};
const stateSeats = {"PL":212,"PT":141,"MDB":112,"PSD":103,"PP":81,"REPUBLICANOS":78,"UNIÃO":73,"PODE":47,"PSB":42,"PSDB":26,"PSOL":26,"PDT":24,"PV":19,"AVANTE":17,"NOVO":15,"PRD":13,"PCDOB":9,"AGIR":7,"SOLIDARIEDADE":4,"REDE":3,"MOBILIZA":3,"CIDADANIA":1,"DEMOCRATA":1,"DC":1,"MISSÃO":1};
const chamberVotes = {"PL":25522991,"PT":14714709,"PSD":9290859,"MDB":7874420,"REPUBLICANOS":7842238,"UNIÃO":7737305,"PP":7587453,"PODE":5737207,"PSOL":5294044,"PSB":5006022,"NOVO":2905651,"PSDB":2839853,"PDT":1856310,"AVANTE":1801930,"PV":1324685,"PCDOB":1306312,"MISSÃO":1219306,"PRD":1158548,"SOLIDARIEDADE":921333,"CIDADANIA":291324,"REDE":263428,"DC":113362,"UP":45431,"MOBILIZA":34272,"DEMOCRATA":27195,"PSTU":18696,"AGIR":7155,"PCO":3041};

const blocs = [
  { title: 'Senado — votos agregados', total: 207038240, left: 66891431, center: 23483656, right: 116648474 },
  { title: 'Deputado Federal — votos agregados', total: 112745080, left: 29829637, center: 19929969, right: 62982433 },
  { title: 'Deputado Estadual/Distrital — votos agregados', total: 112739225, left: 30514334, center: 25962504, right: 56260704 },
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


function PiePanel({title,right,center,left,total,foot,other=0}:{title:string;right:number;center:number;left:number;total:number;foot:string;other?:number}) {
  const rp=right*100/total, cp=center*100/total, lp=left*100/total;
  const a=rp, b=rp+cp, c=b+lp;
  return <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="text-lg font-black text-gray-900">{title}</div>
    <div className="mt-5 flex flex-col sm:flex-row items-center gap-6">
      <div className="w-48 h-48 rounded-full shadow-inner border-8 border-white"
        style={{background:`conic-gradient(#1d4ed8 0 ${a}%, #c3921f ${a}% ${b}%, #be123c ${b}% ${c}%, #64748b ${c}% 100%)`}} />
      <div className="space-y-3 min-w-[190px]">
        <div><span className="inline-block w-3 h-3 rounded-full bg-blue-700 mr-2"/><strong>Direita:</strong> {nf.format(right)} <span className="text-gray-500">({pct(right,total)})</span></div>
        <div><span className="inline-block w-3 h-3 rounded-full bg-amber-600 mr-2"/><strong>Centro:</strong> {nf.format(center)} <span className="text-gray-500">({pct(center,total)})</span></div>
        <div><span className="inline-block w-3 h-3 rounded-full bg-rose-700 mr-2"/><strong>Esquerda:</strong> {nf.format(left)} <span className="text-gray-500">({pct(left,total)})</span></div>
        {other>0 && <div><span className="inline-block w-3 h-3 rounded-full bg-slate-500 mr-2"/><strong>Sem classificação:</strong> {nf.format(other)} <span className="text-gray-500">({pct(other,total)})</span></div>}
      </div>
    </div>
    <p className="mt-4 text-sm text-gray-600">{foot}</p>
  </div>;
}


function SenateStateCard({uf,top}:{uf:string;top:readonly (readonly [string,string,number,string,string])[]}) {
  const media=(senateStateMedia as Record<string, readonly [string,string]>)[uf];
  return <article className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
    {media && <a href={media[1]} target="_blank" rel="noopener">
      <img src={media[0]} alt={`Senadores eleitos por ${uf}`} loading="lazy" decoding="async" className="w-full aspect-[16/9] object-cover bg-gray-100"/>
    </a>}
    <div className="p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex rounded-full bg-gray-950 text-white px-3 py-1 text-xs font-black">{uf}</span>
        <a href={resultUrl(uf)} target="_blank" rel="noopener" className="text-xs font-bold text-green-700 underline">Resultado TSE ↗</a>
      </div>
      <div className="mt-3 space-y-3">
        {top.map((c)=><div key={c[1]} className="border-t first:border-0 border-gray-100 pt-3 first:pt-0">
          <div className="font-black text-gray-950">{c[1]} <span className="text-xs text-gray-500">({c[0]})</span></div>
          <div className="text-sm text-gray-600">{nf.format(c[2])} votos • eleito</div>
        </div>)}
      </div>
      {media && <div className="mt-3 text-[11px] text-gray-500">Foto: Agência Senado — reprodução autorizada mediante citação.</div>}
    </div>
  </article>;
}

function CandidateCard({uf,party,name,votes,sqcand,status,final}:{uf:string;party:string;name:string;votes:number;sqcand:string;status?:string;final?:boolean}) {
  return <article className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
    <div className="p-4">
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
    dateModified:'2026-10-05T09:20:00-03:00',
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
          <h1 className="mt-3 max-w-6xl text-4xl md:text-6xl font-black leading-[1.02]">As urnas redesenham Brasília: 54 senadores eleitos, PL histórico e Flávio Bolsonaro x Lula no segundo turno</h1>
          <p className="mt-5 max-w-5xl text-lg md:text-xl text-gray-200">Com 99,99% da apuração presidencial informada pelo TSE e o Senado já definido, o primeiro turno deixa um mapa político mais nítido: forte avanço da direita no Legislativo, PL como maior bancada projetada do Senado desde 1988 e uma disputa presidencial aberta para 25 de outubro.</p>
          <div className="mt-7 max-w-5xl border-y border-white/20 py-5 text-xl md:text-2xl font-semibold leading-snug text-white">Não é apenas uma eleição de nomes. É uma eleição sobre <span className="text-amber-400">quem passa a ter força para aprovar, bloquear, investigar e confrontar instituições</span> a partir de 2027.</div>
          <div className="mt-5 text-sm font-bold text-gray-300">Análise de Paulo Fayad • atualização da noite eleitoral de 4 de outubro de 2026</div>
          <div className="mt-6 border-l-4 border-amber-400 bg-white/10 rounded-r-xl p-4 text-sm text-gray-100"><strong>Nota metodológica:</strong> “direita”, “centro” e “esquerda” são uma classificação editorial da TV Voz de Brasília, não uma classificação oficial do TSE. Onde a totalização ainda não estava formalmente encerrada, mostramos a fotografia da apuração, sem antecipar proclamação oficial.</div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-white/10 border border-white/15 p-5"><div className="text-4xl font-black text-amber-400">47,03%</div><div className="mt-1 text-gray-200">Flávio Bolsonaro no 1º turno: 56.104.268 votos</div></div>
            <div className="rounded-2xl bg-white/10 border border-white/15 p-5"><div className="text-4xl font-black text-amber-400">45,16%</div><div className="mt-1 text-gray-200">Lula no 1º turno: 53.876.617 votos</div></div>
            <div className="rounded-2xl bg-white/10 border border-white/15 p-5"><div className="text-4xl font-black text-amber-400">54 / 54</div><div className="mt-1 text-gray-200">vagas do Senado definidas; 40 novos e 14 reeleitos</div></div>
            <div className="rounded-2xl bg-white/10 border border-white/15 p-5"><div className="text-4xl font-black text-amber-400">28</div><div className="mt-1 text-gray-200">senadores projetados para o PL em 2027, maior bancada inicial desde 1988</div></div>
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

      
      <section className="bg-white py-14">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-sm font-black uppercase tracking-[.18em] text-red-700">O retrato depois da madrugada</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-black text-gray-950 leading-tight">O que de fato ficou decidido no primeiro turno</h2>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-2xl font-black">Presidência</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">Com 99,99% das urnas apuradas na atualização do TSE, Flávio Bolsonaro terminou o primeiro turno com <strong>56.104.268 votos (47,03%)</strong> e Lula com <strong>53.876.617 (45,16%)</strong>. A diferença foi de 2.227.651 votos. Outros candidatos somaram 15.291.628 votos válidos — cerca de 12,21% — que passam a ser o principal eleitorado em disputa no segundo turno, embora transferência de voto nunca seja automática.</p>
              <p className="mt-3 text-gray-700">O segundo turno será em <strong>25 de outubro</strong>. A disputa presidencial está definida entre Flávio Bolsonaro (PL) e Lula (PT).</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-2xl font-black">Senado</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">As <strong>54 vagas</strong> em disputa estão definidas. A renovação foi alta: <strong>40 novos senadores e 14 reeleitos</strong>. O PL elegeu 19 dos 54 e, somadas as cadeiras que permanecem, a Agência Senado projeta <strong>28 senadores do PL em 2027</strong> — a maior bancada partidária no início de uma legislatura desde a Constituição de 1988.</p>
              <p className="mt-3 text-gray-700">O PT aparece com 9; MDB, 8; União e PP, 6 cada; PSD e Republicanos, 5 cada; PSB, 4; Novo, 3; PSDB e Podemos, 2 cada; Rede e PDT, 1 cada; e há 1 cadeira sem partido na projeção atual.</p>
            </div>
          </div>

          <h3 className="mt-10 text-2xl md:text-3xl font-black text-gray-950">Os campeões de votos para o Senado</h3>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4"><div className="text-xs font-black text-red-700">PP-SP</div><div className="mt-1 font-black text-gray-950">Guilherme Derrite</div><div className="mt-1 text-sm text-gray-600">13.273.880 votos</div></div><div className="rounded-xl border border-gray-200 bg-gray-50 p-4"><div className="text-xs font-black text-red-700">PL-SP</div><div className="mt-1 font-black text-gray-950">André do Prado</div><div className="mt-1 text-sm text-gray-600">12.703.089 votos</div></div><div className="rounded-xl border border-gray-200 bg-gray-50 p-4"><div className="text-xs font-black text-red-700">PL-MG</div><div className="mt-1 font-black text-gray-950">Domingos Sávio</div><div className="mt-1 text-sm text-gray-600">4.968.829 votos</div></div><div className="rounded-xl border border-gray-200 bg-gray-50 p-4"><div className="text-xs font-black text-red-700">PT-BA</div><div className="mt-1 font-black text-gray-950">Rui Costa</div><div className="mt-1 text-sm text-gray-600">4.335.196 votos</div></div><div className="rounded-xl border border-gray-200 bg-gray-50 p-4"><div className="text-xs font-black text-red-700">PL-RJ</div><div className="mt-1 font-black text-gray-950">Carlos Portinho</div><div className="mt-1 text-sm text-gray-600">4.264.932 votos</div></div><div className="rounded-xl border border-gray-200 bg-gray-50 p-4"><div className="text-xs font-black text-red-700">PT-MG</div><div className="mt-1 font-black text-gray-950">Marília Campos</div><div className="mt-1 text-sm text-gray-600">3.990.864 votos</div></div><div className="rounded-xl border border-gray-200 bg-gray-50 p-4"><div className="text-xs font-black text-red-700">PT-BA</div><div className="mt-1 font-black text-gray-950">Jaques Wagner</div><div className="mt-1 text-sm text-gray-600">3.986.690 votos</div></div><div className="rounded-xl border border-gray-200 bg-gray-50 p-4"><div className="text-xs font-black text-red-700">PL-RJ</div><div className="mt-1 font-black text-gray-950">Carlos Jordy</div><div className="mt-1 text-sm text-gray-600">3.912.405 votos</div></div><div className="rounded-xl border border-gray-200 bg-gray-50 p-4"><div className="text-xs font-black text-red-700">PL-RS</div><div className="mt-1 font-black text-gray-950">Sanderson</div><div className="mt-1 text-sm text-gray-600">3.453.316 votos</div></div><div className="rounded-xl border border-gray-200 bg-gray-50 p-4"><div className="text-xs font-black text-red-700">Novo-RS</div><div className="mt-1 font-black text-gray-950">Marcel Van Hattem</div><div className="mt-1 text-sm text-gray-600">3.449.053 votos</div></div>
          </div>
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
          <h2 className="mt-2 text-3xl md:text-5xl font-black text-gray-950 leading-tight">A direita domina a Câmara; no Senado, o PL vira a maior força partidária</h2>
          <p className="mt-4 text-lg text-gray-600">A comparação abaixo junta cadeiras já distribuídas na Câmara, Assembleias/Câmara Distrital e uma projeção editorial do Senado de 81 cadeiras caso as duas primeiras posições de cada estado se confirmem.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <PiePanel title="Câmara — 505 cadeiras atribuídas" right={296} center={85} left={124} total={505} foot="Na consulta desta manhã, MG e SP ainda não apareciam com totalização formal encerrada no arquivo do TSE; 8 cadeiras permaneciam fora deste recorte."/>
          <PiePanel title="Assembleias e Câmara Distrital" right={549} center={247} left={263} total={1059} foot="Nos Legislativos estaduais, a vantagem existe, mas é menos concentrada."/>
          <PiePanel title="Senado projetado — 81 cadeiras" right={52} center={13} left={15} other={1} total={81} foot="Nesta classificação editorial, 52 cadeiras estão em partidos de direita, 13 no centro, 15 na esquerda e uma sem partido. Trocas partidárias, suplentes e o segundo turno estadual ainda podem alterar o quadro."/>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Como o voto virou cadeira no Congresso</h2>
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><h3 className="text-xl font-black mb-5">Câmara — 505 cadeiras atribuídas na consulta</h3><Bars data={chamberSeats}/></div>
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
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Os 54 senadores eleitos — resultado consolidado</h2>
        <p className="mt-2 text-gray-600 max-w-5xl">O Senado está definido: dois eleitos por unidade da Federação. Para preservar a qualidade visual do portal, substituímos os retratos pequenos do TSE por imagens oficiais em resolução maior publicadas pela Agência Senado. Onde não houver material jornalístico em boa definição, a página deve priorizar o dado, não uma foto ruim.</p>

        <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          <div className="rounded-xl border bg-white p-4"><div className="text-3xl font-black text-gray-950">40</div><div className="text-sm text-gray-600">novos senadores</div></div>
          <div className="rounded-xl border bg-white p-4"><div className="text-3xl font-black text-gray-950">14</div><div className="text-sm text-gray-600">reeleitos</div></div>
          <div className="rounded-xl border bg-white p-4"><div className="text-3xl font-black text-blue-700">19</div><div className="text-sm text-gray-600">vagas conquistadas pelo PL neste pleito</div></div>
          <div className="rounded-xl border bg-white p-4"><div className="text-3xl font-black text-blue-700">28</div><div className="text-sm text-gray-600">bancada projetada do PL em 2027</div></div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {senate.map(([uf,, ,top])=><SenateStateCard key={uf} uf={uf} top={top}/>)}
        </div>
      </section>


      
      <section className="bg-white py-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-sm font-black uppercase tracking-[.18em] text-blue-700">Senado 2027</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-black text-gray-950">A nova composição partidária</h2>
          <p className="mt-3 max-w-5xl text-gray-600">Projeção da Agência Senado considera os eleitos de 2026, as 27 cadeiras com mandato até 2031 e substituições já definidas. O quadro ainda pode mudar com troca de partido, suplentes e o segundo turno para governador.</p>
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {Object.entries(senateComposition).map(([party,seats])=><div key={party} className="rounded-xl border border-gray-200 p-4 bg-gray-50"><div className="text-xs font-black text-gray-500">{party}</div><div className="text-3xl font-black text-gray-950">{seats}</div></div>)}
          </div>
          <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-950"><strong>Atenção:</strong> Deltan Dallagnol (Novo-PR) foi eleito, mas sua candidatura segue sub judice, segundo a Agência Senado. Se a inelegibilidade for confirmada pelo TSE, poderá ser necessária nova eleição para a vaga. Além disso, Alan Rick (Republicanos-AC), Omar Aziz (PSD-AM) e Professora Dorinha (União-TO), que têm mandato até 2031, disputam governos estaduais no segundo turno e podem ser substituídos por suplentes.</div>
        </div>
      </section>

      <section className="bg-slate-950 text-white py-14">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-red-400 text-sm font-black uppercase tracking-[.18em]">O ponto de tensão institucional</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-black leading-tight">STF sob pressão: ministros correm risco de impeachment?</h2>
          <p className="mt-5 text-xl text-slate-200 leading-relaxed">O risco político <strong className="text-white">aumenta</strong>, mas impeachment de ministro do Supremo não nasce automaticamente do resultado das urnas. A Constituição dá ao Senado a competência para processar e julgar ministros do STF por crimes de responsabilidade; a Lei 1.079/1950 exige enquadramento jurídico e prevê condenação apenas com <strong className="text-amber-400">dois terços dos senadores — 54 votos</strong>.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5"><div className="text-5xl font-black text-blue-400">52</div><div className="mt-2 text-slate-300">cadeiras em partidos classificados à direita nesta projeção editorial; há ainda uma cadeira sem partido</div></div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5"><div className="text-5xl font-black text-amber-400">54</div><div className="mt-2 text-slate-300">votos correspondem a dois terços do Senado, quórum previsto para condenação em crime de responsabilidade</div></div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5"><div className="text-5xl font-black text-red-400">2</div><div className="mt-2 text-slate-300">é a distância matemática entre 52 cadeiras de direita e o quórum de 54; isso não significa voto automático por bloco</div></div>
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
              <div className="mt-5 text-sm text-slate-300">O cenário de 52 cadeiras em partidos classificados à direita é uma projeção editorial do mapa partidário, não uma previsão de voto individual. Há ainda uma cadeira sem partido e possíveis mudanças decorrentes do segundo turno estadual.</div>
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

      
      <section className="py-14 bg-gradient-to-b from-gray-950 to-slate-900 text-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-sm font-black uppercase tracking-[.18em] text-amber-400">Análise política ampliada</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-black leading-tight">A direita avançou muito. A esquerda recuou — mas não desapareceu.</h2>
          <div className="mt-7 space-y-6 text-lg leading-relaxed text-slate-200">
            <p><strong className="text-white">É correto falar em uma mudança relevante do eixo institucional.</strong> O PL conquistou 19 das 54 vagas ao Senado e deverá começar 2027 com 28 senadores, enquanto a Câmara também apresenta vantagem dos partidos classificados neste painel à direita. Isso aumenta o poder de agenda do campo conservador, sobretudo em segurança pública, economia, costumes, fiscalização do Executivo e relação com o Judiciário.</p>
            <p><strong className="text-white">Mas “a esquerda acabou” seria uma leitura errada.</strong> Lula obteve 45,16% dos votos válidos no primeiro turno, mais de 53,8 milhões de votos; o PT deverá ter 9 senadores, a segunda maior bancada da Casa. O dado mostra perda relativa de espaço institucional, não desaparecimento social ou eleitoral.</p>
            <p><strong className="text-white">O que pode explicar o recuo?</strong> Eleições de continuidade costumam concentrar desgaste do governo, e a campanha de 2026 foi atravessada por temas como custo de vida, segurança, corrupção e polarização. Há também uma consolidação da direita partidária: diferentemente de 2018, o campo conservador chega a 2026 com partidos, lideranças regionais e bancadas mais estruturados.</p>
            <p><strong className="text-white">“O eleitor cansou?”</strong> Não há uma única resposta demonstrável. O primeiro turno sugere simultaneamente duas forças: um contingente grande querendo mudança, expresso pela liderança de Flávio Bolsonaro, e outro quase tão grande defendendo continuidade, expresso nos 45,16% de Lula. A eleição não mostra um país que abandonou um lado; mostra um país profundamente dividido entre dois projetos.</p>
            <p><strong className="text-white">Um quarto mandato de Lula seria “demais”?</strong> Lula busca um quarto mandato presidencial no total — não consecutivo. Essa é uma pergunta política que o eleitor decidirá. Para parte do eleitorado, experiência e continuidade são ativos; para outra parte, um quarto mandato simboliza prolongamento excessivo de um mesmo ciclo. O primeiro turno confirma que ambas as leituras têm peso eleitoral de dezenas de milhões de votos.</p>
          </div>

          <div className="mt-10 border-t border-white/15 pt-9">
            <h3 className="text-3xl font-black">O que acontece agora no segundo turno</h3>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <h4 className="text-xl font-black text-amber-400">A disputa por 15,3 milhões de votos</h4>
                <p className="mt-2 text-slate-200">Os eleitores que votaram nos demais candidatos somaram aproximadamente 12,21% dos votos válidos. Apoios partidários importam, mas esses votos não pertencem aos candidatos derrotados. A campanha passa a disputar eleitor por eleitor.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <h4 className="text-xl font-black text-amber-400">Sete governos ainda em jogo</h4>
                <p className="mt-2 text-slate-200">Acre, Amazonas, Distrito Federal, Espírito Santo, Rio de Janeiro, Rio Grande do Norte e Tocantins terão segundo turno para governador. Essas disputas locais podem alterar alianças, palanques e até a composição efetiva do Senado por causa de suplentes.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/15 pt-9">
            <h3 className="text-3xl font-black">O que isso significa para a América Latina e para o mundo</h3>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-slate-200">
              <p><strong className="text-white">Para a América Latina, o Brasil volta a funcionar como teste de escala.</strong> Uma direita competitiva no maior país da região fortalece redes conservadoras latino-americanas e muda o equilíbrio diplomático, mas não prova por si só uma “onda” regional: cada país tem calendários, partidos e problemas domésticos diferentes.</p>
              <p><strong className="text-white">Para os Estados Unidos, China e Europa, o segundo turno importa porque o Brasil é G20, BRICS, potência agrícola, energética e ambiental.</strong> Um governo de Flávio Bolsonaro tenderia a buscar maior proximidade política com a direita norte-americana e postura mais dura diante de governos como Venezuela e Cuba; um novo governo Lula tenderia a preservar a diplomacia Sul-Sul, os BRICS, a relação intensa com a China e a agenda climática multilateral. Em ambos os casos, comércio e investimento limitam mudanças abruptas.</p>
              <p><strong className="text-white">Para os mercados, a principal pergunta não é apenas quem vence, mas com qual Congresso governará.</strong> Um Legislativo mais conservador pode favorecer algumas agendas de disciplina fiscal, segurança e liberalização, mas também pode aumentar conflitos institucionais se Executivo, Congresso e STF entrarem em rota de colisão.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-amber-400 text-sm font-black uppercase tracking-[.18em]">Análise</div><h2 className="mt-2 text-3xl md:text-5xl font-black">Paulo Fayad: “O centro do poder político se deslocou”</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-200">
            <p><strong className="text-amber-400">A Câmara mostra forte vantagem dos partidos classificados à direita.</strong> Na consulta desta manhã, esses partidos somavam 62,98 milhões de votos para deputado federal, contra 29,83 milhões da esquerda e 19,93 milhões do centro. Das 505 cadeiras já atribuídas no recorte do TSE, 296 estavam à direita, 124 à esquerda e 85 ao centro; MG e SP ainda não apareciam formalmente encerrados no arquivo consultado.</p>
            <p><strong className="text-amber-400">O Senado é a peça que pode produzir a maior mudança institucional.</strong> Se as duas primeiras posições atuais se confirmarem e forem somadas às 27 cadeiras não renovadas nesta eleição, a projeção editorial chega a 52 senadores em partidos classificados à direita, 15 à esquerda e 13 ao centro, além de uma cadeira sem partido. É uma composição capaz de mudar a relação com o STF, com o governo e com as indicações para cargos de Estado.</p>
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
          <a className="font-bold text-green-700 underline" href="https://www.tse.jus.br/comunicacao/noticias/2026/Outubro/flavio-bolsonaro-e-lula-vao-disputar-o-2o-turno-para-a-presidencia-da-republica" target="_blank" rel="noopener">TSE: resultado presidencial e 2º turno</a>
          <a className="font-bold text-green-700 underline" href="https://www12.senado.leg.br/noticias/materias/2026/10/04/conheca-os-54-senadores-eleitos-neste-domingo" target="_blank" rel="noopener">Agência Senado: 54 eleitos</a>
          <a className="font-bold text-green-700 underline" href="https://www12.senado.leg.br/noticias/materias/2026/10/04/pl-tera-maior-bancada-em-inicio-de-legislatura-no-senado-desde-1988" target="_blank" rel="noopener">Agência Senado: composição de 2027</a>
          <a className="font-bold text-green-700 underline" href="https://www12.senado.leg.br/noticias/materias/2026/10/05/em-2027-senado-tera-40-senadores-novos-e-14-reeleitos" target="_blank" rel="noopener">Agência Senado: renovação</a>
          <a className="font-bold text-green-700 underline" href="https://www12.senado.leg.br/noticias/materias/2026/10/04/eleicao-para-governador-sera-decidida-em-segundo-turno-em-seis-estados-e-no-df" target="_blank" rel="noopener">Agência Senado: 2º turno nos estados</a>
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
