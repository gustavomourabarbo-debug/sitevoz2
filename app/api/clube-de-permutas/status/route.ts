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
  return NextResponse.json({ok:true,protocolo,status:emAnalise?'EM_ANALISE':'AGUARDANDO_CREDENCIAMENTO',
   mensagem:emAnalise?'Sua ficha foi recebida e aguarda conferência da equipe.':'Seu pré-cadastro foi recebido. Preencha a ficha de credenciamento para continuar.',
   atualizadoEm:new Date().toISOString()}, {headers:{'Cache-Control':'no-store, private'}});
 }catch{
  return NextResponse.json({erro:'Não foi possível consultar agora. Tente novamente.'},{status:503});
 }
}