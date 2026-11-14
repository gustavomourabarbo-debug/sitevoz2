import {NextResponse} from 'next/server';
import {get} from '@vercel/blob';

export const runtime='nodejs';
export const dynamic='force-dynamic';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export async function GET(request:Request){
 const protocolo=new URL(request.url).searchParams.get('protocolo')||'';
 if(!uuid.test(protocolo))return NextResponse.json({erro:'Protocolo inválido.'},{status:400});
 try{
  const convite=await get('credenciamento/convites/'+protocolo+'.json',{access:'private'});
  if(!convite?.stream)return NextResponse.json({erro:'Protocolo não localizado.'},{status:404});
  const ficha=await get('credenciamento/fichas/'+protocolo+'.json',{access:'private'}).catch(()=>null);
  const emAnalise=Boolean(ficha?.stream);
  const decisao=await get('credenciamento/decisoes/'+protocolo+'.json',{access:'private'}).catch(()=>null);
  const registro=decisao?.stream?JSON.parse(await new Response(decisao.stream).text()):null;
  const status=registro?.status|| (emAnalise?'EM_ANALISE':'AGUARDANDO_CREDENCIAMENTO');
  const mensagem=status==='APROVADO'?'Seu credenciamento foi aprovado. Acesse a área do associado para cadastrar produtos e serviços para análise e publicação.':
     status==='REPROVADO'?'O credenciamento não foi aprovado. Entre em contato com a equipe para esclarecimentos.':
     emAnalise?'Sua ficha foi recebida e aguarda conferência da equipe.':'Seu pré-cadastro foi recebido. Preencha a ficha de credenciamento para continuar.';
  return NextResponse.json({ok:true,protocolo,status,
   mensagem,
   atualizadoEm:new Date().toISOString()}, {headers:{'Cache-Control':'no-store, private'}});
 }catch{
  return NextResponse.json({erro:'Não foi possível consultar agora. Tente novamente.'},{status:503});
 }
}