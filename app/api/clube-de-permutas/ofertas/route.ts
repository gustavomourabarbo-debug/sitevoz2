import {NextResponse} from 'next/server';
import {get,list,put} from '@vercel/blob';
import {randomUUID} from 'node:crypto';
import {isAdmin,sameOrigin} from '@/lib/clube-admin';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const txt=(x:unknown,n:number)=>typeof x==='string'?x.trim().slice(0,n):'';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
async function doc(path:string){const f=await get(path,{access:'private'}).catch(()=>null);return f?.stream?JSON.parse(await new Response(f.stream).text()):null;}
export async function GET(request:Request){
 const url=new URL(request.url);
 const cursor=url.searchParams.get('cursor')||undefined;
 if(cursor&&cursor.length>1000)return NextResponse.json({erro:'Página inválida.'},{status:400});
 try{
  const resultado=await list({prefix:'clube/ofertas/',limit:50,cursor});
  const dados=await Promise.all(resultado.blobs.map(async b=>{
   const id=b.pathname.split('/').pop()?.replace('.json','')||'';
   if(!uuid.test(id))return null;
   const o=await doc('clube/ofertas/'+id+'.json');
   if(!o||o.status!=='PUBLICADA')return null;
   return {id:o.id,titulo:o.titulo,descricao:o.descricao,categoria:o.categoria,cidade:o.cidade,
     quantidade:o.quantidade,valorReferencia:o.valorReferencia,empresa:o.empresa,criadaEm:o.criadaEm};
  }));
  return NextResponse.json({ofertas:dados.filter(Boolean),hasMore:resultado.hasMore,cursor:resultado.cursor||null},
   {headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({erro:'Ofertas indisponíveis.'},{status:503});}
}
export async function POST(request:Request){
 if(!isAdmin()||!sameOrigin(request))return NextResponse.json({erro:'Acesso não autorizado.'},{status:401});
 const b=await request.json().catch(()=>null);
 const titulo=txt(b?.titulo,140),descricao=txt(b?.descricao,1300),categoria=txt(b?.categoria,75);
 const cidade=txt(b?.cidade,100),empresa=txt(b?.empresa,120),quantidade=txt(b?.quantidade,60);
 const valorReferencia=Number(b?.valorReferencia);
 if(!titulo||!descricao||!categoria||!cidade||!empresa||!quantidade||!Number.isFinite(valorReferencia)||valorReferencia<=0||valorReferencia>100000000)
  return NextResponse.json({erro:'Informe os dados completos e um preço de referência válido.'},{status:400});
 const id=randomUUID();
 const registro={id,titulo,descricao,categoria,cidade,empresa,quantidade,valorReferencia,
   status:'PUBLICADA',criadaEm:new Date().toISOString(),operacoes:'SUJEITAS_A_APROVACAO'};
 try{
  await put('clube/ofertas/'+id+'.json',JSON.stringify(registro),
   {access:'private',contentType:'application/json',addRandomSuffix:false});
  return NextResponse.json({ok:true,id},{status:201});
 }catch{return NextResponse.json({erro:'Não foi possível publicar a oferta.'},{status:500});}
}
