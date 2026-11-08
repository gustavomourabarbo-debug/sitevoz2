import {NextResponse} from 'next/server';
import {get,list,put} from '@vercel/blob';
import {isAdmin,sameOrigin} from '@/lib/clube-admin';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
async function getDoc(path:string){
 const blob=await get(path,{access:'private'}).catch(()=>null);
 if(!blob?.stream)return null;
 return JSON.parse(await new Response(blob.stream).text());
}
export async function GET(){
 if(!isAdmin())return NextResponse.json({erro:'Acesso não autorizado.'},{status:401});
 try{
  const rows:any[]=[];let cursor: string|undefined;
  for(let i=0;i<10;i++){
   const result=await list({prefix:'credenciamento/convites/',limit:100,cursor});
   for(const blob of result.blobs){
    const protocolo=blob.pathname.split('/').at(-1)?.replace(/\.json$/,'')||'';
    if(!uuid.test(protocolo))continue;
    const [convite,ficha,decisao]=await Promise.all([
     getDoc('credenciamento/convites/'+protocolo+'.json'),
     getDoc('credenciamento/fichas/'+protocolo+'.json'),
     getDoc('credenciamento/decisoes/'+protocolo+'.json')
    ]);
    if(convite)rows.push({protocolo,nome:convite.nome,email:convite.email,perfil:convite.perfil,criadoEm:convite.criadoEm,
       ficha,decisao,status:decisao?.status|| (ficha?'EM_ANALISE':'AGUARDANDO_CREDENCIAMENTO')});
   }
   if(!result.hasMore||!result.cursor)break;cursor=result.cursor;
  }
  rows.sort((a,b)=>(b.criadoEm||'').localeCompare(a.criadoEm||''));
  return NextResponse.json({ok:true,registros:rows,total:rows.length},{headers:{'Cache-Control':'no-store, private'}});
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
 const ficha=await getDoc('credenciamento/fichas/'+protocolo+'.json');
 if(!ficha)return NextResponse.json({erro:'Ficha de credenciamento ainda não enviada.'},{status:409});
 const registro={protocolo,status,observacao,data:new Date().toISOString(),origem:'admin_clube'};
 try{
  await put('credenciamento/decisoes/'+protocolo+'.json',JSON.stringify(registro),
   {access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:true});
  return NextResponse.json({ok:true,status},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({erro:'Falha ao gravar a decisão.'},{status:500});}
}
