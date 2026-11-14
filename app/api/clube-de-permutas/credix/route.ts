import {NextResponse} from 'next/server';
import {get,put} from '@vercel/blob';
import {randomUUID} from 'node:crypto';
import {sameOrigin} from '@/lib/clube-admin';
import {notificarClube} from '@/lib/clube-notificacoes';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
async function doc(path:string){
 const blob=await get(path,{access:'private'}).catch(()=>null);
 return blob?.stream?JSON.parse(await new Response(blob.stream).text()):null;
}
export async function POST(request:Request){
 if(!sameOrigin(request))return NextResponse.json({erro:'Origem não autorizada.'},{status:403});
 if(Number(request.headers.get('content-length')||'0')>5000)return NextResponse.json({erro:'Solicitação excede o limite.'},{status:413});
 const b=await request.json().catch(()=>null);
 const protocolo=typeof b?.protocolo==='string'?b.protocolo.trim():'';
 const email=typeof b?.email==='string'?b.email.trim().toLowerCase():'';
 const motivo=typeof b?.motivo==='string'?b.motivo.trim().slice(0,500):'';
 if(!uuid.test(protocolo)||!email||!motivo||b?.ciente!==true)
  return NextResponse.json({erro:'Informe o protocolo, e-mail e objetivo da consulta.'},{status:400});
 try{
  const [convite,decisao]=await Promise.all([
   doc('credenciamento/convites/'+protocolo+'.json'),
   doc('credenciamento/decisoes/'+protocolo+'.json')
  ]);
  if(!convite||String(convite.email||'').toLowerCase()!==email||decisao?.status!=='APROVADO')
   return NextResponse.json({erro:'A solicitação é reservada aos associados aprovados. Use o mesmo e-mail do cadastro.'},{status:403});
  const id=randomUUID();
  const registro={id,protocolo,email,nome:convite.nome,motivo,
   tipo:'INTERESSE_COMPRA_CREDIX',status:'AGUARDANDO_CONDICOES_E_REGULACAO',
   criadoEm:new Date().toISOString(),pagamentoEfetuado:false,creditosEmitidos:false};
  await put('clube/interesse-credix/'+id+'.json',JSON.stringify(registro),{
   access:'private',contentType:'application/json',addRandomSuffix:false
  });
  const aviso=await notificarClube({assunto:'Clube de Permutas — interesse em CREDIX',
    corpo:'Associado manifestou interesse em adquirir CREDIX.\n\nAssociado: '+convite.nome+
     '\nE-mail: '+email+'\nProtocolo: '+protocolo+'\nInteresse: '+motivo+
     '\nRegistro: '+id+'\n\nNenhuma venda foi processada.',protocolo});
  return NextResponse.json({ok:true,id,status:registro.status,notificacaoClube:aviso},{status:201});
 }catch{return NextResponse.json({erro:'Não foi possível registrar o interesse.'},{status:503});}
}
