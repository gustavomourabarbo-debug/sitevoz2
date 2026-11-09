import {NextResponse} from 'next/server';
import {get,put,list} from '@vercel/blob';
import {randomUUID} from 'node:crypto';
import {isAdmin,sameOrigin} from '@/lib/clube-admin';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const txt=(x:unknown,n:number)=>typeof x==='string'?x.trim().slice(0,n):'';
const uuidReal=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
async function doc(path:string){const f=await get(path,{access:'private'}).catch(()=>null);return f?.stream?JSON.parse(await new Response(f.stream).text()):null;}
export async function POST(request:Request){
 if(!sameOrigin(request))return NextResponse.json({erro:'Origem não autorizada.'},{status:403});
 if(Number(request.headers.get('content-length')||'0')>8000)return NextResponse.json({erro:'Dados extensos demais.'},{status:413});
 const b=await request.json().catch(()=>null);
 const ofertaId=txt(b?.ofertaId,50),protocolo=txt(b?.protocolo,50);
 const email=txt(b?.email,200).toLowerCase(),mensagem=txt(b?.mensagem,1000);
 if(!uuidReal.test(ofertaId)||!uuidReal.test(protocolo)||!email||!mensagem||b?.aceite!==true)
   return NextResponse.json({erro:'Informe uma oferta, seu protocolo, e-mail e proposta.'},{status:400});
 try{
  const [oferta,cadastro,decisao]=await Promise.all([
   doc('clube/ofertas/'+ofertaId+'.json'),doc('credenciamento/convites/'+protocolo+'.json'),
   doc('credenciamento/decisoes/'+protocolo+'.json')]);
  if(!oferta||oferta.status!=='PUBLICADA')return NextResponse.json({erro:'Oferta indisponível.'},{status:404});
  if(!cadastro||cadastro.email!==email||decisao?.status!=='APROVADO')
   return NextResponse.json({erro:'Para propor negociações, seu credenciamento precisa estar aprovado e o e-mail deve corresponder ao cadastro.'},{status:403});
  const id=randomUUID();
  const registro={id,ofertaId,ofertaTitulo:oferta.titulo,protocolo,email,mensagem,
     status:'AGUARDANDO_CONTATO',criadaEm:new Date().toISOString(),aceite:true};
  await put('clube/propostas/'+id+'.json',JSON.stringify(registro),{access:'private',contentType:'application/json',addRandomSuffix:false});
  return NextResponse.json({ok:true,id,status:'AGUARDANDO_CONTATO'},{status:201});
 }catch{return NextResponse.json({erro:'Não foi possível registrar a proposta.'},{status:503});}
}
export async function GET(request:Request){
 if(!isAdmin())return NextResponse.json({erro:'Acesso não autorizado.'},{status:401});
 const cursor=new URL(request.url).searchParams.get('cursor')||undefined;
 if(cursor&&cursor.length>1000)return NextResponse.json({erro:'Página inválida.'},{status:400});
 try{
  const l=await list({prefix:'clube/propostas/',limit:40,cursor});
  const itens=await Promise.all(l.blobs.map(async b=>{
   const id=b.pathname.split('/').pop()?.replace('.json','')||'';
   if(!uuidReal.test(id))return null;
   const [p,estado]=await Promise.all([doc('clube/propostas/'+id+'.json'),doc('clube/estados/'+id+'.json')]);
   return p?{...p,status:estado?.status||p.status,estado}:null;
  }));
  return NextResponse.json({propostas:itens.filter(Boolean),hasMore:l.hasMore,cursor:l.cursor||null},
   {headers:{'Cache-Control':'no-store, private'}});
 }catch{return NextResponse.json({erro:'Falha ao consultar propostas.'},{status:503});}
}

export async function PATCH(request:Request){
 if(!isAdmin()||!sameOrigin(request))return NextResponse.json({erro:'Acesso não autorizado.'},{status:401});
 const b=await request.json().catch(()=>null);
 const id=txt(b?.id,50),status=txt(b?.status,50),observacao=txt(b?.observacao,800);
 const validos=['AGUARDANDO_CONTATO','CONTATO_REALIZADO','EM_NEGOCIACAO','AGUARDANDO_COMPROVANTES','CONCLUIDA','CANCELADA'];
 if(!uuidReal.test(id)||!validos.includes(status)||!observacao)
  return NextResponse.json({erro:'Escolha o estado e registre uma observação auditável.'},{status:400});
 try{
 const proposta=await doc('clube/propostas/'+id+'.json');
 if(!proposta)return NextResponse.json({erro:'Proposta inexistente.'},{status:404});
 if(status==='CONCLUIDA'&&!(b?.confirmacaoComprador===true&&b?.confirmacaoVendedor===true&&observacao.length>=20))
  return NextResponse.json({erro:'Para concluir, registre evidências e confirme que comprador e ofertante aprovaram o negócio.'},{status:400});
 const evento={id:randomUUID(),propostaId:id,status,observacao,
  confirmacaoComprador:b?.confirmacaoComprador===true,confirmacaoVendedor:b?.confirmacaoVendedor===true,data:new Date().toISOString()};
 await put('clube/eventos/'+id+'/'+evento.id+'.json',JSON.stringify(evento),{access:'private',contentType:'application/json',addRandomSuffix:false});
 await put('clube/estados/'+id+'.json',JSON.stringify(evento),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:true});
 return NextResponse.json({ok:true,status});
 }catch{return NextResponse.json({erro:'Falha ao registrar andamento.'},{status:500});}
}
