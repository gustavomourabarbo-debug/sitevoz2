import {NextResponse} from 'next/server';
import {get,list,put} from '@vercel/blob';
import {isAdmin,sameOrigin} from '@/lib/clube-admin';
import {notificarDecisao} from '@/lib/clube-notificacoes';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
async function getDoc(path:string){
 const blob=await get(path,{access:'private'}).catch(()=>null);
 if(!blob?.stream)return null;
 return JSON.parse(await new Response(blob.stream).text());
}
export async function GET(request:Request){
 if(!isAdmin())return NextResponse.json({erro:'Acesso não autorizado.'},{status:401});
 try{
  const url=new URL(request.url);
  const protocoloBusca=url.searchParams.get('protocolo')||'';
  if(protocoloBusca){
    if(!uuid.test(protocoloBusca))return NextResponse.json({erro:'Protocolo inválido.'},{status:400});
    const [convite,ficha,decisao]=await Promise.all([
      getDoc('credenciamento/convites/'+protocoloBusca+'.json'),
      getDoc('credenciamento/fichas/'+protocoloBusca+'.json'),
      getDoc('credenciamento/decisoes/'+protocoloBusca+'.json')
    ]);
    if(!convite)return NextResponse.json({erro:'Não encontramos o pré-cadastro deste protocolo.'},{status:404});
    const registro={protocolo:protocoloBusca,nome:convite.nome,email:convite.email,perfil:convite.perfil,
      criadoEm:convite.criadoEm,ficha,decisao,status:decisao?.status||(ficha?'EM_ANALISE':'AGUARDANDO_CREDENCIAMENTO')};
    return NextResponse.json({ok:true,registros:[registro],total:1,hasMore:false,cursor:null},
      {headers:{'Cache-Control':'no-store, private'}});
  }
  const cursor=url.searchParams.get('cursor')||undefined;
  if(cursor&&cursor.length>1000)return NextResponse.json({erro:'Página inválida.'},{status:400});
  const result=await list({prefix:'credenciamento/convites/',limit:25,cursor});
  const rows=await Promise.all(result.blobs.map(async blob=>{
    const protocolo=blob.pathname.split('/').at(-1)?.replace(/\.json$/,'')||'';
    if(!uuid.test(protocolo))return null;
    const [convite,ficha,decisao]=await Promise.all([
      getDoc('credenciamento/convites/'+protocolo+'.json'),
      getDoc('credenciamento/fichas/'+protocolo+'.json'),
      getDoc('credenciamento/decisoes/'+protocolo+'.json')
    ]);
    if(!convite)return null;
    return {protocolo,nome:convite.nome,email:convite.email,perfil:convite.perfil,criadoEm:convite.criadoEm,
       ficha,decisao,status:decisao?.status||(ficha?'EM_ANALISE':'AGUARDANDO_CREDENCIAMENTO')};
  }));
  const registros=rows.filter(Boolean).sort((a:any,b:any)=>(b.criadoEm||'').localeCompare(a.criadoEm||''));
  return NextResponse.json({ok:true,registros,total:registros.length,hasMore:result.hasMore,cursor:result.cursor||null},
    {headers:{'Cache-Control':'no-store, private'}});
 }catch(e){
  console.error('Clube admin: falha consulta',e instanceof Error?e.name:'erro');
  return NextResponse.json({erro:'Falha ao carregar registros.'},{status:500});
 }
}
export async function POST(request:Request){
 if(!isAdmin()||!sameOrigin(request))return NextResponse.json({erro:'Acesso não autorizado.'},{status:401});
 const b=await request.json().catch(()=>null);
 const protocolo=typeof b?.protocolo==='string'?b.protocolo:'';
 const status=b?.status;
 const observacao=typeof b?.observacao==='string'?b.observacao.trim().slice(0,500):'';
 if(!uuid.test(protocolo)||!['APROVADO','REPROVADO','EM_ANALISE'].includes(status))
  return NextResponse.json({erro:'Dados inválidos.'},{status:400});
 const [ficha,convite]=await Promise.all([
  getDoc('credenciamento/fichas/'+protocolo+'.json'),
  getDoc('credenciamento/convites/'+protocolo+'.json')
 ]);
 if(!ficha||!convite)return NextResponse.json({erro:'Ficha de credenciamento ainda não enviada. Consulte a ficha antes de aprovar.'},{status:409});
 const registro={protocolo,status,observacao,data:new Date().toISOString(),origem:'admin_clube'};
 try{
  await put('credenciamento/decisoes/'+protocolo+'.json',JSON.stringify(registro),
   {access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:true});
  const notificacao=await notificarDecisao({email:convite.email,nome:convite.nome,protocolo,status});
  return NextResponse.json({ok:true,status,notificacao},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({erro:'Falha ao gravar a decisão.'},{status:500});}
}
