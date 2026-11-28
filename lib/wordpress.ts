import { manualDaily2311 } from './manual-daily-2311';
import { manualDaily0410 } from './manual-daily-0410';
import { manualPolitica1109 } from './manual-politica-1109';
import { manualDaily1209 } from './manual-daily-1209';
import { manualDaily1309 } from './manual-daily-1309';
import { manualDaily1409 } from './manual-daily-1409';
import { manualDaily1509 } from './manual-daily-1509';
import { manualMorning1509 } from './manual-morning-1509';
import { manualPolitica1409 } from './manual-politica-1409';
import { manualPolitica1409Noite } from './manual-politica-1409-noite';

const LOVABLE_FEED = "https://voz-central-ai.lovable.app/api/public/voznews-feed";
const fetchHeaders={'User-Agent':'Mozilla/5.0','Accept':'application/json'};
const categoryPlaceholders:Record<string,string[]>={politica:['https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80'],'distrito-federal':['https://images.unsplash.com/photo-1600320844655-46b5d92823b2?w=800&auto=format&fit=crop&q=80'],turismo:['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80'],gastronomia:['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80'],saude:['https://images.unsplash.com/photo-1584515901387-a7a1a6337627?w=800&auto=format&fit=crop&q=80'],tecnologia:['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'],esportes:['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80'],economia:['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80'],'meio-ambiente':['https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80'],internacional:['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'],cultura:['https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=80'],general:['https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80']};
const categoryNames:Record<string,string>={politica:'Política','distrito-federal':'Distrito Federal',turismo:'Turismo',gastronomia:'Gastronomia',saude:'Saúde',tecnologia:'Tecnologia',esportes:'Esportes',economia:'Economia','meio-ambiente':'Meio Ambiente',internacional:'Internacional',cultura:'Cultura'};
const categoryColors:Record<string,string>={politica:'bg-red-600','distrito-federal':'bg-blue-600',turismo:'bg-green-600',gastronomia:'bg-orange-500',saude:'bg-purple-600',tecnologia:'bg-blue-500',esportes:'bg-orange-600',economia:'bg-yellow-600','meio-ambiente':'bg-green-700',internacional:'bg-indigo-600',cultura:'bg-pink-600'};
function getImageOverride(item:any):string{const rawTitle=item?.title?.rendered||item?.title||item?.titulo||'';const slug=String(item?.slug||'');const text=`${rawTitle} ${slug}`.toLowerCase();if(text.includes('michelle bolsonaro')&&(text.includes('senado')||text.includes('reta decisiva')||text.includes('liderança')||text.includes('lideranca')))return'https://michellebolsonaro222.com.br/wp-content/uploads/2026/08/MICHELLE-ISOLATED-634x1024.webp';if((text.includes('julio cesar')||text.includes('júlio césar'))&&(text.includes('esporte')||text.includes('semana decisiva')||text.includes('agenda ligada')))return'https://www.camara.leg.br/internet/deputado/bandep/204372.jpg';if(text.includes('datafolha')&&text.includes('lula')&&(text.includes('flávio')||text.includes('flavio')))return'https://sbt-news-assets-prod.s3.sa-east-1.amazonaws.com/lula_flavio_1_444b28cbc9.jpg';if(text.includes('misantropia')&&text.includes('defesa civil'))return'https://classic.exame.com/wp-content/uploads/2026/06/alerta-extremo-misantropia-defesa-civil.png?ims=750x%2Ffilters%3Aquality%2885%29%3Aformat%28webp%29';return'';}
export function decodeHtml(text:string):string{if(!text)return'';return text.replace(/&hellip;/g,'…').replace(/&#8230;/g,'…').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&nbsp;/g,' ').replace(/<[^>]+>/g,'').trim();}
function normalizeLovablePost(item:any){const categorySlug=item.categorySlug||item.category_slug||'distrito-federal';const category=item.category||categoryNames[categorySlug]||'Notícias';const featured=getImageOverride(item)||item.featured_image||item.imagem_url||categoryPlaceholders[categorySlug]?.[0]||categoryPlaceholders.general[0];return{...item,id:item.id,slug:item.slug,title:{rendered:item.title?.rendered||item.title||item.titulo||''},content:{rendered:item.content?.rendered||item.content||item.texto||''},excerpt:{rendered:item.excerpt?.rendered||item.excerpt||item.resumo||''},date:item.date||item.published_at||item.enviado_em||item.created_at,featured_image:featured,categorySlug,category,categoryColor:item.categoryColor||categoryColors[categorySlug]||'bg-blue-600',_embedded:item._embedded||{'wp:featuredmedia':[{source_url:featured}],author:[{name:item.author||'Paulo Fayad'}],'wp:term':[[{name:category,slug:categorySlug}]]}};}
function enrichPostsWithImages(posts:any){const enrich=(post:any)=>{if(!post)return post;const p=normalizeLovablePost(post);if(!p._embedded)p._embedded={};if(!p._embedded['wp:featuredmedia'])p._embedded['wp:featuredmedia']=[{}];if(!p._embedded['wp:featuredmedia'][0])p._embedded['wp:featuredmedia'][0]={};p._embedded['wp:featuredmedia'][0].source_url=p.featured_image;return p;};return Array.isArray(posts)?posts.map(enrich):enrich(posts);}
async function fetchLiveNews(limit=12):Promise<any[]|null>{try{const res=await fetch(`${LOVABLE_FEED}?limit=${limit}`,{method:'GET',headers:fetchHeaders,cache:'no-store'} as any);if(!res.ok)return null;const data=await res.json();const items=Array.isArray(data)?data:data.items;if(!Array.isArray(items))return null;return items.map(normalizeLovablePost);}catch(err){console.error('Error fetching live news:',err);return null;}}
function loadStaticNews():any[]{try{const localNews=require('../public/data/news.json');return Array.isArray(localNews)?localNews.map(normalizeLovablePost):[];}catch(err){console.error('Error loading static news:',err);return[];}}
function byDateDesc(items:any[]){return[...items].sort((a,b)=>new Date(b?.published_at||b?.created_at||b?.date||0).getTime()-new Date(a?.published_at||a?.created_at||a?.date||0).getTime());}
const manualDaily2811 = [
  {
    "id": 2811001,
    "slug": "brb-aval-28-novembro-2026",
    "categorySlug": "distrito-federal",
    "category": "Distrito Federal",
    "title": "BRB: parecer da PGR coloca aval federal no centro do debate",
    "excerpt": "A PGR manifestou-se contra obrigar a União a garantir empréstimo ao BRB. O parecer ao STF considera o aval discricionário; a decisão cabe ao ministro Luiz Fux.",
    "content": "<p>A PGR manifestou-se contra obrigar a União a garantir empréstimo ao BRB. O parecer ao STF considera o aval discricionário; a decisão cabe ao ministro Luiz Fux.</p><h2>Comentário autoral da redação</h2><p>O parecer não é decisão definitiva. É necessário proteger os depositantes sem transferir riscos desconhecidos ao contribuinte. O DF precisa divulgar as condições e os custos de qualquer solução.</p><p><small>Apuração: TV Sim Brasil, publicação de 28/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23153d68%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EDISTRITO%20FEDERAL%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EBRB%3A%20parecer%20da%20PGR%20coloca%20aval%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Efederal%20no%20centro%20do%20debate%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811002,
    "slug": "tarifas-eua-28-novembro-2026",
    "categorySlug": "internacional",
    "category": "Internacional",
    "title": "Tarifas dos EUA abrem nova frente de negociação com o Brasil",
    "excerpt": "O governo brasileiro avalia que a proposta americana de tarifas de 10% sobre aviões e açúcar busca proteger grandes empresas de tecnologia dos EUA.",
    "content": "<p>O governo brasileiro avalia que a proposta americana de tarifas de 10% sobre aviões e açúcar busca proteger grandes empresas de tecnologia dos EUA.</p><h2>Comentário autoral da redação</h2><p>Essa interpretação não confirma todos os motivos da medida. A diplomacia deve preservar canais de negociação, enquanto o país diversifica mercados e fortalece sua competitividade.</p><p><small>Apuração: Agência Brasil, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%2334456f%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EINTERNACIONAL%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ETarifas%20dos%20EUA%20abrem%20nova%20frente%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Ede%20negocia%C3%A7%C3%A3o%20com%20o%20Brasil%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811003,
    "slug": "cooperativas-exportacao-28-novembro-2026",
    "categorySlug": "economia",
    "category": "Economia",
    "title": "Cooperativas brasileiras buscam compradores de 24 países",
    "excerpt": "Encontro em Brasília reuniu 250 cooperativas e 34 compradores internacionais, com previsão de aproximadamente 900 reuniões comerciais até sexta-feira.",
    "content": "<p>Encontro em Brasília reuniu 250 cooperativas e 34 compradores internacionais, com previsão de aproximadamente 900 reuniões comerciais até sexta-feira.</p><h2>Comentário autoral da redação</h2><p>Reunião não é contrato fechado. O potencial de distribuir renda pelo interior depende de logística, certificação e acompanhamento comercial depois do evento.</p><p><small>Apuração: Brasil 61 / ApexBrasil, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23225747%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EECONOMIA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ECooperativas%20brasileiras%20buscam%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Ecompradores%20de%2024%20pa%C3%ADses%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811004,
    "slug": "inflacao-juros-28-novembro-2026",
    "categorySlug": "economia",
    "category": "Economia",
    "title": "Prévia da inflação movimenta expectativas para os juros",
    "excerpt": "A divulgação da prévia da inflação de novembro repercutiu no mercado de juros futuros, que registrou recuo na quinta-feira.",
    "content": "<p>A divulgação da prévia da inflação de novembro repercutiu no mercado de juros futuros, que registrou recuo na quinta-feira.</p><h2>Comentário autoral da redação</h2><p>Juros futuros traduzem expectativas, não uma decisão do Banco Central. O consumidor precisa observar o custo efetivo do crédito. O alívio só é concreto quando chega ao orçamento familiar.</p><p><small>Apuração: N3 News, publicação de 26/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23225747%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EECONOMIA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EPr%C3%A9via%20da%20infla%C3%A7%C3%A3o%20movimenta%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Eexpectativas%20para%20os%20juros%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811005,
    "slug": "triatlo-brasilia-28-novembro-2026",
    "categorySlug": "esportes",
    "category": "Esportes",
    "title": "Triatlo movimenta o fim de semana esportivo de Brasília",
    "excerpt": "A entrega dos kits do Triatlo Metrópoles Endurance começou na quinta-feira, dia 26, na preparação dos participantes.",
    "content": "<p>A entrega dos kits do Triatlo Metrópoles Endurance começou na quinta-feira, dia 26, na preparação dos participantes.</p><h2>Comentário autoral da redação</h2><p>Eventos de resistência movimentam serviços e incentivam atividades físicas. A capital deve aproveitar essa oportunidade para ampliar o acesso ao esporte durante todo o ano, com segurança e inclusão.</p><p><small>Apuração: Metrópoles, publicação de 26/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23a34c20%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EESPORTES%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ETriatlo%20movimenta%20o%20fim%20de%20semana%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Eesportivo%20de%20Bras%C3%ADlia%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811006,
    "slug": "comercio-feriado-28-novembro-2026",
    "categorySlug": "distrito-federal",
    "category": "Distrito Federal",
    "title": "Comércio do DF poderá funcionar no feriado de 30 de novembro",
    "excerpt": "A Fecomércio-DF informou que lojas, supermercados e restaurantes poderão funcionar no feriado de segunda-feira, respeitadas as convenções coletivas.",
    "content": "<p>A Fecomércio-DF informou que lojas, supermercados e restaurantes poderão funcionar no feriado de segunda-feira, respeitadas as convenções coletivas.</p><h2>Comentário autoral da redação</h2><p>Nem todo estabelecimento necessariamente abrirá. A atividade econômica deve conciliar o atendimento ao consumidor com a remuneração e o descanso dos trabalhadores.</p><p><small>Apuração: GPS Brasília / Fecomércio-DF, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23153d68%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EDISTRITO%20FEDERAL%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ECom%C3%A9rcio%20do%20DF%20poder%C3%A1%20funcionar%20no%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Eferiado%20de%2030%20de%20novembro%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811007,
    "slug": "natal-solidario-28-novembro-2026",
    "categorySlug": "distrito-federal",
    "category": "Distrito Federal",
    "title": "Natal solidário mobiliza voluntários e beneficia crianças do DF",
    "excerpt": "Uma ação no Nicolândia, promovida pela Fundação CDL-DF, beneficiou cerca de 750 crianças e adolescentes, mobilizando mais de cem voluntários.",
    "content": "<p>Uma ação no Nicolândia, promovida pela Fundação CDL-DF, beneficiou cerca de 750 crianças e adolescentes, mobilizando mais de cem voluntários.</p><h2>Comentário autoral da redação</h2><p>O valor da solidariedade vai além dos presentes. Empresas podem transformar a mobilização em apoio contínuo à educação, ao esporte e à proteção social.</p><p><small>Apuração: GPS Brasília, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23153d68%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EDISTRITO%20FEDERAL%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ENatal%20solid%C3%A1rio%20mobiliza%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Evolunt%C3%A1rios%20e%20beneficia%20crian%C3%A7as%20do%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22259%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EDF%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811008,
    "slug": "incendios-cerrado-28-novembro-2026",
    "categorySlug": "distrito-federal",
    "category": "Distrito Federal",
    "title": "Área atingida por incêndios cai no balanço ambiental do DF",
    "excerpt": "O balanço da Operação Verde Vivo, do Corpo de Bombeiros do DF, apontou redução de 44,9% nas áreas atingidas por incêndios.",
    "content": "<p>O balanço da Operação Verde Vivo, do Corpo de Bombeiros do DF, apontou redução de 44,9% nas áreas atingidas por incêndios.</p><h2>Comentário autoral da redação</h2><p>O resultado não elimina o risco de novos incêndios. Prevenção, educação ambiental e manejo adequado do Cerrado precisam ser políticas permanentes.</p><p><small>Apuração: Agência Brasília / GPS Brasília, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23153d68%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EDISTRITO%20FEDERAL%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3E%C3%81rea%20atingida%20por%20inc%C3%AAndios%20cai%20no%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Ebalan%C3%A7o%20ambiental%20do%20DF%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811009,
    "slug": "longevidade-28-novembro-2026",
    "categorySlug": "saude",
    "category": "Saúde",
    "title": "Brasileiros vivem mais: expectativa chega a 76,9 anos",
    "excerpt": "A expectativa de vida ao nascer chegou a 76,9 anos em 2025, ante 76,6 anos em 2024, segundo o IBGE.",
    "content": "<p>A expectativa de vida ao nascer chegou a 76,9 anos em 2025, ante 76,6 anos em 2024, segundo o IBGE.</p><h2>Comentário autoral da redação</h2><p>O indicador demográfico não prevê a duração da vida de cada pessoa. Viver mais precisa significar viver melhor, com atenção primária, acessibilidade e cuidados de longa duração.</p><p><small>Apuração: Agência Brasil / IBGE, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%2321655f%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3ESA%C3%9ADE%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EBrasileiros%20vivem%20mais%3A%20expectativa%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Echega%20a%2076%2C9%20anos%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811010,
    "slug": "dolar-fechamento-28-novembro-2026",
    "categorySlug": "economia",
    "category": "Economia",
    "title": "Dólar encerra a semana a R$ 5,51 após anúncio na Fazenda",
    "excerpt": "O dólar caiu quase 4% na sexta-feira e fechou a R$ 5,51, após a confirmação da escolha de Luiz Carlos Trabuco para a Fazenda no próximo governo. Na semana, a queda superou 7%.",
    "content": "<p>O dólar caiu quase 4% na sexta-feira e fechou a R$ 5,51, após a confirmação da escolha de Luiz Carlos Trabuco para a Fazenda no próximo governo. Na semana, a queda superou 7%.</p><h2>Comentário autoral da redação</h2><p>O movimento cambial reflete expectativas e não garante tendência permanente. A confiança econômica dependerá de resultados fiscais e de políticas que melhorem a vida fora do mercado financeiro.</p><p><small>Apuração: Agência Brasil, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23225747%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EECONOMIA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ED%C3%B3lar%20encerra%20a%20semana%20a%20R%24%205%2C51%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Eap%C3%B3s%20an%C3%BAncio%20na%20Fazenda%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811011,
    "slug": "superavit-outubro-28-novembro-2026",
    "categorySlug": "economia",
    "category": "Economia",
    "title": "Tesouro registra resultado positivo de R$ 52,3 bilhões em outubro",
    "excerpt": "As contas do governo central apresentaram superávit de R$ 52,3 bilhões em outubro. Em valores corrigidos pela inflação, foi o segundo melhor resultado para o mês na série divulgada.",
    "content": "<p>As contas do governo central apresentaram superávit de R$ 52,3 bilhões em outubro. Em valores corrigidos pela inflação, foi o segundo melhor resultado para o mês na série divulgada.</p><h2>Comentário autoral da redação</h2><p>Um resultado mensal não assegura equilíbrio no ano inteiro. É necessário observar a trajetória de médio prazo, as despesas e a qualidade dos serviços públicos.</p><p><small>Apuração: Agência Brasil / Tesouro Nacional, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23225747%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EECONOMIA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ETesouro%20registra%20resultado%20positivo%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Ede%20R%24%2052%2C3%20bilh%C3%B5es%20em%20outubro%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811012,
    "slug": "rendimento-trabalho-28-novembro-2026",
    "categorySlug": "economia",
    "category": "Economia",
    "title": "Rendimento real do trabalho cresce 3,5% em um ano",
    "excerpt": "O rendimento real do trabalhador aumentou 3,5% na comparação anual do trimestre encerrado em outubro e 1% ante o trimestre anterior, segundo o IBGE.",
    "content": "<p>O rendimento real do trabalhador aumentou 3,5% na comparação anual do trimestre encerrado em outubro e 1% ante o trimestre anterior, segundo o IBGE.</p><h2>Comentário autoral da redação</h2><p>A melhora precisa chegar aos trabalhadores de menor renda e aos informais. Formação profissional, produtividade e oportunidades de emprego ajudam a consolidar o avanço.</p><p><small>Apuração: Agência Brasil / IBGE, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23225747%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EECONOMIA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ERendimento%20real%20do%20trabalho%20cresce%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3E3%2C5%25%20em%20um%20ano%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811013,
    "slug": "orcamento-familias-28-novembro-2026",
    "categorySlug": "economia",
    "category": "Economia",
    "title": "Alimentação e saúde ganham peso no orçamento doméstico",
    "excerpt": "A pesquisa de orçamentos familiares mostrou que a participação dos gastos com saúde passou de 8% em 2017–2018 para 9,6% em 2024–2025. Alimentação também ganhou peso.",
    "content": "<p>A pesquisa de orçamentos familiares mostrou que a participação dos gastos com saúde passou de 8% em 2017–2018 para 9,6% em 2024–2025. Alimentação também ganhou peso.</p><h2>Comentário autoral da redação</h2><p>A elevação das despesas essenciais ajuda a explicar por que a renda média nem sempre traduz a realidade doméstica. Serviços públicos eficientes e concorrência nos mercados essenciais merecem prioridade.</p><p><small>Apuração: Agência Brasil / IBGE, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23225747%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EECONOMIA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EAlimenta%C3%A7%C3%A3o%20e%20sa%C3%BAde%20ganham%20peso%20no%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Eor%C3%A7amento%20dom%C3%A9stico%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811014,
    "slug": "baterias-fundo-clima-28-novembro-2026",
    "categorySlug": "tecnologia",
    "category": "Tecnologia",
    "title": "Fundo Clima reduz juros para estimular baterias nacionais",
    "excerpt": "O CMN reduziu juros do Fundo Clima para projetos que utilizem conjuntos de baterias produzidos no Brasil, observados os critérios de nacionalização do BNDES.",
    "content": "<p>O CMN reduziu juros do Fundo Clima para projetos que utilizem conjuntos de baterias produzidos no Brasil, observados os critérios de nacionalização do BNDES.</p><h2>Comentário autoral da redação</h2><p>A transição energética também é uma oportunidade industrial. Financiamento deve vir acompanhado de inovação, qualificação e avaliação da competitividade dos equipamentos.</p><p><small>Apuração: Agência Brasil / Ministério da Fazenda, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23314a80%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3ETECNOLOGIA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EFundo%20Clima%20reduz%20juros%20para%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Eestimular%20baterias%20nacionais%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811015,
    "slug": "credito-estados-28-novembro-2026",
    "categorySlug": "economia",
    "category": "Economia",
    "title": "Estados e municípios ganham R$ 1 bilhão em limite de crédito",
    "excerpt": "O CMN ampliou em R$ 1 bilhão o limite de operações de crédito para estados, municípios e DF até o final do ano.",
    "content": "<p>O CMN ampliou em R$ 1 bilhão o limite de operações de crédito para estados, municípios e DF até o final do ano.</p><h2>Comentário autoral da redação</h2><p>Não se trata de transferência automática de recursos. Governos locais devem demonstrar capacidade de pagamento e apresentar projetos de retorno social mensurável.</p><p><small>Apuração: Agência Brasil / Ministério da Fazenda, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23225747%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EECONOMIA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EEstados%20e%20munic%C3%ADpios%20ganham%20R%24%201%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Ebilh%C3%A3o%20em%20limite%20de%20cr%C3%A9dito%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811016,
    "slug": "decimo-terceiro-28-novembro-2026",
    "categorySlug": "economia",
    "category": "Economia",
    "title": "Primeira parcela do décimo terceiro tem prazo até segunda-feira",
    "excerpt": "Empresas e órgãos públicos têm até 30 de novembro para pagar a primeira parcela do décimo terceiro aos trabalhadores com direito ao benefício. Também podem pagar integralmente até essa data.",
    "content": "<p>Empresas e órgãos públicos têm até 30 de novembro para pagar a primeira parcela do décimo terceiro aos trabalhadores com direito ao benefício. Também podem pagar integralmente até essa data.</p><h2>Comentário autoral da redação</h2><p>O recurso pode ajudar a reduzir dívidas caras e organizar as despesas de janeiro. Antes de assumir novas parcelas, vale comparar o custo total e preservar uma reserva.</p><p><small>Apuração: Agência Brasil, publicação de 24/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23225747%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EECONOMIA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EPrimeira%20parcela%20do%20d%C3%A9cimo%20terceiro%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Etem%20prazo%20at%C3%A9%20segunda-feira%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811017,
    "slug": "enade-domingo-28-novembro-2026",
    "categorySlug": "cultura",
    "category": "Cultura",
    "title": "Enade: estudantes precisam completar questionário antes da prova",
    "excerpt": "Concluintes convocados de 18 cursos devem responder ao questionário até as 13h de domingo, dia 29, pelo horário de Brasília. A prova começa às 13h30 e o local é liberado após o preenchimento.",
    "content": "<p>Concluintes convocados de 18 cursos devem responder ao questionário até as 13h de domingo, dia 29, pelo horário de Brasília. A prova começa às 13h30 e o local é liberado após o preenchimento.</p><h2>Comentário autoral da redação</h2><p>As instituições precisam comunicar prazos com clareza. A avaliação do ensino superior deve identificar lacunas na formação, não se resumir a classificações.</p><p><small>Apuração: Agência Brasil / Inep, publicação de 28/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%2375405d%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3ECULTURA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EEnade%3A%20estudantes%20precisam%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Ecompletar%20question%C3%A1rio%20antes%20da%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22259%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Eprova%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811018,
    "slug": "festival-artesanato-28-novembro-2026",
    "categorySlug": "cultura",
    "category": "Cultura",
    "title": "Artesãos de 23 estados mostram talentos em festival no Rio",
    "excerpt": "O Festival Arpoarte reúne cerca de 300 artesãos, mestres, associações e cooperativas de 23 estados e do DF até domingo, no Rio de Janeiro, incluindo coletivos indígenas e quilombolas.",
    "content": "<p>O Festival Arpoarte reúne cerca de 300 artesãos, mestres, associações e cooperativas de 23 estados e do DF até domingo, no Rio de Janeiro, incluindo coletivos indígenas e quilombolas.</p><h2>Comentário autoral da redação</h2><p>Artesanato reúne identidade e empreendedorismo. Valorizar produtores exige preços justos, canais de comercialização e respeito à autoria das comunidades tradicionais.</p><p><small>Apuração: Agência Brasil, publicação de 28/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%2375405d%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3ECULTURA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EArtes%C3%A3os%20de%2023%20estados%20mostram%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Etalentos%20em%20festival%20no%20Rio%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811019,
    "slug": "musica-pedro-28-novembro-2026",
    "categorySlug": "cultura",
    "category": "Cultura",
    "title": "Rádio MEC leva música contemporânea à programação",
    "excerpt": "O programa Música e Músicos do Brasil apresenta neste sábado, às 19h, o álbum Two Horizons, do compositor greco-brasileiro Pedro Eleftheriou.",
    "content": "<p>O programa Música e Músicos do Brasil apresenta neste sábado, às 19h, o álbum Two Horizons, do compositor greco-brasileiro Pedro Eleftheriou.</p><h2>Comentário autoral da redação</h2><p>A criação musical não se limita às tendências comerciais. Emissoras culturais ajudam a aproximar compositores e ouvintes e a diversificar o repertório.</p><p><small>Apuração: Agência Brasil, publicação de 28/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%2375405d%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3ECULTURA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ER%C3%A1dio%20MEC%20leva%20m%C3%BAsica%20contempor%C3%A2nea%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3E%C3%A0%20programa%C3%A7%C3%A3o%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811020,
    "slug": "turismo-natureza-28-novembro-2026",
    "categorySlug": "turismo",
    "category": "Turismo",
    "title": "Mudanças climáticas desafiam o futuro do turismo de natureza",
    "excerpt": "Especialistas reunidos em congresso em Campo Grande discutem investimentos para adaptar o turismo de natureza às mudanças climáticas.",
    "content": "<p>Especialistas reunidos em congresso em Campo Grande discutem investimentos para adaptar o turismo de natureza às mudanças climáticas.</p><h2>Comentário autoral da redação</h2><p>Destinos naturais precisam planejar infraestrutura resiliente, capacitar guias e proteger ecossistemas. Turismo responsável pode contribuir para a conservação quando respeita limites ambientais.</p><p><small>Apuração: Agência Brasil, publicação de 28/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%2337644a%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3ETURISMO%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EMudan%C3%A7as%20clim%C3%A1ticas%20desafiam%20o%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Efuturo%20do%20turismo%20de%20natureza%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811021,
    "slug": "conceicao-evaristo-28-novembro-2026",
    "categorySlug": "cultura",
    "category": "Cultura",
    "title": "Conceição Evaristo completa 80 anos com coleção literária",
    "excerpt": "O lançamento de uma coleção das obras de Conceição Evaristo, pelas editoras Malê e Pallas, marca as comemorações de seus 80 anos. Sua trajetória ganhou projeção com os Cadernos Negros nos anos 1990.",
    "content": "<p>O lançamento de uma coleção das obras de Conceição Evaristo, pelas editoras Malê e Pallas, marca as comemorações de seus 80 anos. Sua trajetória ganhou projeção com os Cadernos Negros nos anos 1990.</p><h2>Comentário autoral da redação</h2><p>A celebração deve estimular o acesso democrático aos livros e oportunidades para novos escritores. Escolas e bibliotecas têm papel decisivo nessa ampliação de repertório.</p><p><small>Apuração: Agência Brasil, publicação de 28/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%2375405d%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3ECULTURA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EConcei%C3%A7%C3%A3o%20Evaristo%20completa%2080%20anos%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Ecom%20cole%C3%A7%C3%A3o%20liter%C3%A1ria%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811022,
    "slug": "copinha-feminina-28-novembro-2026",
    "categorySlug": "esportes",
    "category": "Esportes",
    "title": "Copinha feminina ganha visibilidade na televisão pública",
    "excerpt": "A TV Brasil anunciou a transmissão do confronto entre Corinthians e Atlético-MG pela Copinha F Petrobras neste sábado.",
    "content": "<p>A TV Brasil anunciou a transmissão do confronto entre Corinthians e Atlético-MG pela Copinha F Petrobras neste sábado.</p><h2>Comentário autoral da redação</h2><p>O futebol feminino precisa de visibilidade contínua, inclusive nas categorias de base. A cobertura pode aproximar torcedores e patrocinadores e incentivar novas jogadoras.</p><p><small>Apuração: Agência Brasil / TV Brasil, publicação de 28/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23a34c20%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EESPORTES%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ECopinha%20feminina%20ganha%20visibilidade%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Ena%20televis%C3%A3o%20p%C3%BAblica%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811023,
    "slug": "saberes-tradicionais-28-novembro-2026",
    "categorySlug": "cultura",
    "category": "Cultura",
    "title": "Lideranças comunitárias colocam saberes tradicionais em debate",
    "excerpt": "Encontro de lideranças comunitárias destaca cultura indígena e quilombola, artesanato, economia solidária e defesa dos territórios tradicionais, com atividades de gastronomia e produção cultural.",
    "content": "<p>Encontro de lideranças comunitárias destaca cultura indígena e quilombola, artesanato, economia solidária e defesa dos territórios tradicionais, com atividades de gastronomia e produção cultural.</p><h2>Comentário autoral da redação</h2><p>O conhecimento tradicional merece reconhecimento e proteção de seus titulares. Geração de renda deve respeitar o protagonismo comunitário e evitar apropriação indevida de saberes.</p><p><small>Apuração: Agência Brasil, publicação de 28/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%2375405d%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3ECULTURA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ELideran%C3%A7as%20comunit%C3%A1rias%20colocam%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Esaberes%20tradicionais%20em%20debate%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811024,
    "slug": "direitos-idosos-28-novembro-2026",
    "categorySlug": "politica",
    "category": "Política",
    "title": "Proteção patrimonial de idosos entra no debate sobre interdição fraudulenta",
    "excerpt": "A discussão sobre interdição fraudulenta de pessoas idosas e suas possíveis consequências sucessórias foi destaque da cobertura política deste sábado.",
    "content": "<p>A discussão sobre interdição fraudulenta de pessoas idosas e suas possíveis consequências sucessórias foi destaque da cobertura política deste sábado.</p><h2>Comentário autoral da redação</h2><p>A proteção patrimonial não deve justificar supressão indevida da autonomia. Casos de curatela exigem análise individual, garantias legais e acesso a orientação jurídica.</p><p><small>Apuração: Agência Brasil, publicação de 28/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%234d355e%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EPOL%C3%8DTICA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EProte%C3%A7%C3%A3o%20patrimonial%20de%20idosos%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Eentra%20no%20debate%20sobre%20interdi%C3%A7%C3%A3o%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22259%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Efraudulenta%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811025,
    "slug": "palmeiras-radio-28-novembro-2026",
    "categorySlug": "esportes",
    "category": "Esportes",
    "title": "Rádio Nacional anuncia cobertura de Palmeiras e Estudiantes",
    "excerpt": "A Rádio Nacional anunciou a transmissão do confronto entre Palmeiras e Estudiantes de La Plata neste sábado.",
    "content": "<p>A Rádio Nacional anunciou a transmissão do confronto entre Palmeiras e Estudiantes de La Plata neste sábado.</p><h2>Comentário autoral da redação</h2><p>O rádio continua relevante por alcançar públicos diversos sem exigir conexão de alta velocidade. Uma cobertura de qualidade combina narração, contexto e acessibilidade.</p><p><small>Apuração: Agência Brasil / Rádio Nacional, publicação de 28/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23a34c20%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EESPORTES%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ER%C3%A1dio%20Nacional%20anuncia%20cobertura%20de%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EPalmeiras%20e%20Estudiantes%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811026,
    "slug": "samba-luiz-carlos-28-novembro-2026",
    "categorySlug": "cultura",
    "category": "Cultura",
    "title": "Samba de Luiz Carlos da Vila recebe homenagem na TV Brasil",
    "excerpt": "O programa Cena Musical homenageia Luiz Carlos da Vila neste sábado, às 23h, com Augusto Martins e Cláudio Jorge.",
    "content": "<p>O programa Cena Musical homenageia Luiz Carlos da Vila neste sábado, às 23h, com Augusto Martins e Cláudio Jorge.</p><h2>Comentário autoral da redação</h2><p>Preservar a memória do samba é reconhecer compositores fundamentais para a identidade brasileira. A televisão pública pode aproximar esse patrimônio de novas gerações.</p><p><small>Apuração: Agência Brasil, publicação de 28/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%2375405d%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3ECULTURA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ESamba%20de%20Luiz%20Carlos%20da%20Vila%20recebe%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Ehomenagem%20na%20TV%20Brasil%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811027,
    "slug": "energia-renegociacao-28-novembro-2026",
    "categorySlug": "economia",
    "category": "Economia",
    "title": "Distribuidoras oferecem condições para renegociar dívidas de energia",
    "excerpt": "Distribuidoras iniciaram campanhas de renegociação. A Enel anunciou ação até 31 de dezembro para clientes elegíveis de São Paulo, Rio de Janeiro e Ceará.",
    "content": "<p>Distribuidoras iniciaram campanhas de renegociação. A Enel anunciou ação até 31 de dezembro para clientes elegíveis de São Paulo, Rio de Janeiro e Ceará.</p><h2>Comentário autoral da redação</h2><p>As condições variam por localidade e empresa. Parcelas devem caber no orçamento; consumidores precisam conferir os canais oficiais e evitar ofertas fraudulentas.</p><p><small>Apuração: Agência Brasil, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23225747%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EECONOMIA%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EDistribuidoras%20oferecem%20condi%C3%A7%C3%B5es%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Epara%20renegociar%20d%C3%ADvidas%20de%20energia%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811028,
    "slug": "dengue-df-28-novembro-2026",
    "categorySlug": "saude",
    "category": "Saúde",
    "title": "Taguatinga e Ceilândia recebem ações de combate à dengue neste sábado",
    "excerpt": "O DF programou ações neste sábado na Praça do Bicalho, Praça do Relógio e QNO 18 e 19, incluindo vacinação contra a dengue para jovens de 10 a 14 anos conforme a programação.",
    "content": "<p>O DF programou ações neste sábado na Praça do Bicalho, Praça do Relógio e QNO 18 e 19, incluindo vacinação contra a dengue para jovens de 10 a 14 anos conforme a programação.</p><h2>Comentário autoral da redação</h2><p>A prevenção exige atuação pública e participação dos moradores. Eliminar criadouros e facilitar o acesso às vacinas conforme as regras deve fazer parte de uma rotina, sobretudo no período chuvoso.</p><p><small>Apuração: Agência Brasília, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%2321655f%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3ESA%C3%9ADE%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3ETaguatinga%20e%20Ceil%C3%A2ndia%20recebem%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Ea%C3%A7%C3%B5es%20de%20combate%20%C3%A0%20dengue%20neste%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22259%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Es%C3%A1bado%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811029,
    "slug": "acolhimento-plano-piloto-28-novembro-2026",
    "categorySlug": "distrito-federal",
    "category": "Distrito Federal",
    "title": "DF programa acolhimento de pessoas em situação de rua no fim de semana",
    "excerpt": "Uma ação intersetorial de acolhimento foi programada para sábado e domingo no Plano Piloto, com início previsto às 9h deste sábado e participação de órgãos de assistência e saúde.",
    "content": "<p>Uma ação intersetorial de acolhimento foi programada para sábado e domingo no Plano Piloto, com início previsto às 9h deste sábado e participação de órgãos de assistência e saúde.</p><h2>Comentário autoral da redação</h2><p>O acolhimento não deve terminar em operações pontuais. É preciso oferecer atendimento digno, alternativas de moradia, documentação e acompanhamento individual, respeitando os direitos das pessoas.</p><p><small>Apuração: Agência Brasília, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%23153d68%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3EDISTRITO%20FEDERAL%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EDF%20programa%20acolhimento%20de%20pessoas%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Eem%20situa%C3%A7%C3%A3o%20de%20rua%20no%20fim%20de%20semana%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  },
  {
    "id": 2811030,
    "slug": "arapoanga-saude-animal-28-novembro-2026",
    "categorySlug": "saude",
    "category": "Saúde",
    "title": "Arapoanga recebe ação conjunta de saúde e proteção animal",
    "excerpt": "A Escola Classe 7 do Arapoanga foi anunciada como local de uma ação neste sábado com vacinação, atendimento de saúde e vagas para castração de animais. As cirurgias foram previstas para 1º a 8 de dezembro.",
    "content": "<p>A Escola Classe 7 do Arapoanga foi anunciada como local de uma ação neste sábado com vacinação, atendimento de saúde e vagas para castração de animais. As cirurgias foram previstas para 1º a 8 de dezembro.</p><h2>Comentário autoral da redação</h2><p>A integração dos serviços aproxima o atendimento de comunidades com dificuldades de deslocamento. Critérios claros, capacidade de atendimento e continuidade são fundamentais.</p><p><small>Apuração: Agência Brasília, publicação de 27/11/2026. Edição de 28/11/2026. Imagem: arte editorial, não fotografia documental.</small></p>",
    "date": "2026-11-28T10:45:00-03:00",
    "published_at": "2026-11-28T10:45:00-03:00",
    "author": "Redação TV Voz de Brasília",
    "featured_image": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22506%22%20viewBox%3D%220%200%20900%20506%22%3E%3Crect%20width%3D%22900%22%20height%3D%22506%22%20fill%3D%22%2321655f%22%2F%3E%3Cpath%20d%3D%22M620%200h280v506H765L620%200Z%22%20fill%3D%22%23fff%22%20opacity%3D%22.08%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%2276%22%20height%3D%225%22%20fill%3D%22%23f4bd4d%22%2F%3E%3Ctext%20x%3D%2248%22%20y%3D%2290%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2225%22%20font-weight%3D%22bold%22%3ESA%C3%9ADE%20%C2%B7%2028%20NOV%202026%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22155%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3EArapoanga%20recebe%20a%C3%A7%C3%A3o%20conjunta%20de%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22207%22%20fill%3D%22white%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2239%22%20font-weight%3D%22bold%22%3Esa%C3%BAde%20e%20prote%C3%A7%C3%A3o%20animal%3C%2Ftext%3E%3Ctext%20x%3D%2248%22%20y%3D%22463%22%20fill%3D%22white%22%20font-size%3D%2219%22%20font-family%3D%22Arial%2Csans-serif%22%3ETV%20VOZ%20DE%20BRAS%C3%8DLIA%20%C2%B7%20ARTE%20EDITORIAL%3C%2Ftext%3E%3C%2Fsvg%3E",
    "image_credit": "Arte editorial · TV Voz de Brasília"
  }
];
function allManual(){return[...manualDaily2811,...manualDaily2311,...manualDaily0410,...manualMorning1509,...manualDaily1509,...manualPolitica1409Noite,...manualPolitica1409,...manualDaily1409,...manualDaily1309,...manualDaily1209,...manualPolitica1109];}
function mergeManual(items:any[]){const manual=allManual().map(normalizeLovablePost);const slugs=new Set(manual.map((p:any)=>p.slug));return byDateDesc([...manual,...items.filter((p:any)=>!slugs.has(p.slug))]);}
export async function getPosts(limit=12){const live=await fetchLiveNews(Math.max(limit,150));const source=live&&live.length>0?live:loadStaticNews();return enrichPostsWithImages(mergeManual(source).slice(0,limit));}
export async function getInterviewPosts(limit=5){const all=await getPosts(150);return all.filter((news:any)=>news.categorySlug==='entrevista'||news.categorySlug==='entrevistas'||news.category==='Agenda Voz').slice(0,limit);}
export async function getPostBySlug(slug:string){const manual=allManual().find((item:any)=>item.slug===slug);if(manual)return enrichPostsWithImages(manual);const all=await fetchLiveNews(150);if(all&&all.length>0){const post=all.find((item:any)=>item.slug===slug);if(post)return enrichPostsWithImages(post);}const fallback=loadStaticNews().find((item:any)=>item.slug===slug);return fallback?enrichPostsWithImages(fallback):null;}
export async function getPostsByCategory(categoryId:number,limit=4){return getPosts(limit);}
export async function getPostsByCategorySlug(slug:string,limit=20,page=1){const all=await getPosts(150);const filtered=all.filter((news:any)=>{if(slug==='entrevista'||slug==='entrevistas')return news.categorySlug==='entrevista'||news.categorySlug==='entrevistas'||news.category==='Agenda Voz';return news.categorySlug===slug;});return filtered.slice((page-1)*limit,page*limit).map(normalizeLovablePost);}