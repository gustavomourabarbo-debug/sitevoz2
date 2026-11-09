import {NextResponse} from 'next/server';
import {get,list,put} from '@vercel/blob';
import {isAdmin,sameOrigin} from '@/lib/clube-admin';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const runtime='nodejs';
export const dynamic='force-dynamic';
async function doc(path:string){
 const blob=await get(path,{access:'private'}).catch(()=>null);
 return blob?.stream?JSON.parse(await new Response(blob.stream).text()):null;
}
export async function GET(request:Request){
 if(!isAdmin())return NextResponse.json({erro:'Acesso não autorizado.'},{status:401});
 const cursor=new URL(request.url).searchParams.get('cursor')||undefined;
 if(cursor&&cursor.length>1000)return NextResponse.json({erro:'Página inválida.'},{status:400});
 try{
  const resultado=await list({prefix:'clube/ofertas/',limit:50,cursor});
  const itens=await Promise.all(resultado.blobs.map(async f=>{
   const id=f.pathname.split('/').at(-1)?.replace('.json','')||'';
   if(!uuid.test(id))return null;
   const [oferta,avaliacao]=await Promise.all([doc('clube/ofertas/'+id+'.json'),doc('clube/ofertas/avaliacoes/'+id+'.json')]);
   return oferta?{...oferta,status:avaliacao?.status||oferta.status,avaliacao}:null;
  }));
  return NextResponse.json({ok:true,ofertas:itens.filter(Boolean),hasMore:resultado.hasMore,cursor:resultado.cursor||null},
    {headers:{'Cache-Control':'private, no-store'}});
 }catch{return NextResponse.json({erro:'Falha ao buscar ofertas.'},{status:503});}
}
export async function POST(request:Request){
 if(!isAdmin()||!sameOrigin(request))return NextResponse.json({erro:'Acesso não autorizado.'},{status:401});
 const b=await request.json().catch(()=>null);
 const id=typeof b?.id==='string'?b.id:'';
 const status=b?.status,observacao=typeof b?.observacao==='string'?b.observacao.trim().slice(0,700):'';
 if(!uuid.test(id)||!['PUBLICADA','REPROVADA','SUSPENSA'].includes(status)||!observacao)
  return NextResponse.json({erro:'Selecione uma decisão e registre uma justificativa.'},{status:400});
 const oferta=await doc('clube/ofertas/'+id+'.json');
 if(!oferta)return NextResponse.json({erro:'Oferta não localizada.'},{status:404});
 try{
  const registro={id,status,observacao,avaliadaEm:new Date().toISOString()};
  await put('clube/ofertas/avaliacoes/'+id+'.json',JSON.stringify(registro),
    {access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:true});
  return NextResponse.json({ok:true,status});
 }catch{return NextResponse.json({erro:'Não foi possível salvar a decisão.'},{status:503});}
}
