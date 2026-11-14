import {NextResponse} from 'next/server';
import {get,list} from '@vercel/blob';
import {isAdmin} from '@/lib/clube-admin';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export async function GET(request:Request){
 if(!isAdmin())return NextResponse.json({erro:'Acesso administrativo necessário.'},{status:401});
 const cursor=new URL(request.url).searchParams.get('cursor')||undefined;
 if(cursor&&cursor.length>1000)return NextResponse.json({erro:'Cursor inválido.'},{status:400});
 try{
 const result=await list({prefix:'clube/interesse-credix/',limit:40,cursor});
 const regs=await Promise.all(result.blobs.map(async b=>{
  const id=b.pathname.split('/').at(-1)?.replace(/\.json$/,'')||'';
  if(!uuid.test(id))return null;
  const x=await get('clube/interesse-credix/'+id+'.json',{access:'private'}).catch(()=>null);
  return x?.stream?JSON.parse(await new Response(x.stream).text()):null;
 }));
 return NextResponse.json({solicitacoes:regs.filter(Boolean),hasMore:result.hasMore,cursor:result.cursor||null},
  {headers:{'Cache-Control':'no-store, private'}});
 }catch{return NextResponse.json({erro:'Falha ao consultar solicitações.'},{status:503});}
}
