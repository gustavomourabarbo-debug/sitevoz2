import { NextResponse } from 'next/server';
import { get, put } from '@vercel/blob';
import {notificarClube} from '@/lib/clube-notificacoes';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const txt=(v:unknown,n:number)=>typeof v==='string'?v.trim().slice(0,n):'';
function cnpjValido(raw:string){
 const n=raw.replace(/\D/g,'');
 if(n.length!==14||/^(\d)\1{13}$/.test(n))return false;
 const digito=(pos:number,pesos:number[])=>{
   const soma=pesos.reduce((acc,peso,i)=>acc+Number(n[i])*peso,0);
   const resto=soma%11; return resto<2?0:11-resto;
 };
 return Number(n[12])===digito(12,[5,4,3,2,9,8,7,6,5,4,3,2]) &&
   Number(n[13])===digito(13,[6,5,4,3,2,9,8,7,6,5,4,3,2]);
}
function cpfValido(raw:string){
 const n=raw.replace(/\D/g,'');
 if(n.length!==11||/^(\d)\1{10}$/.test(n))return false;
 const dv=(pos:number)=>{
  const soma=Array.from({length:pos-1},(_,i)=>Number(n[i])*(pos-i)).reduce((a,b)=>a+b,0);
  const x=(soma*10)%11;return x===10?0:x;
 };
 return Number(n[9])===dv(10)&&Number(n[10])===dv(11);
}
export async function POST(request:Request){
 try{
  if(!request.headers.get('content-type')?.includes('application/json')) return NextResponse.json({erro:'Formato inválido.'},{status:415});
  if(Number(request.headers.get('content-length')||'0')>16000)return NextResponse.json({erro:'Dados muito extensos.'},{status:413});
  const b=await request.json().catch(()=>null);
  if(!b||typeof b!=='object')return NextResponse.json({erro:'Dados inválidos.'},{status:400});
  const protocolo=txt(b.protocolo,50);
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(protocolo))return NextResponse.json({erro:'Convite inválido.'},{status:400});
  const origem=await get('credenciamento/convites/'+protocolo+'.json',{access:'private'}).catch(()=>null);
  if(!origem?.stream)return NextResponse.json({erro:'Não encontramos este pré-cadastro. Solicite um novo convite.'},{status:404});
  const original=JSON.parse(await new Response(origem.stream).text());
  const razao=txt(b.razao,160),nomeFantasia=txt(b.nomeFantasia,160),responsavel=txt(b.responsavel,120),documento=txt(b.cnpj,25);
  const endereco=txt(b.endereco,250),cidade=txt(b.cidade,100),cep=txt(b.cep,15),telefone=txt(b.telefone,50);
  const email=txt(b.email,200).toLowerCase(),site=txt(b.site,250),atividade=txt(b.atividade,250),tempo=txt(b.tempo,80);
  const referencias=Array.isArray(b.referencias)?b.referencias.slice(0,3).map((r:unknown)=>{
   const x=r&&typeof r==='object'?r as Record<string,unknown>:{};
   return {empresa:txt(x.empresa,120),contato:txt(x.contato,120),telefone:txt(x.telefone,50)};
  }):[];
  if(!razao||!responsavel||!endereco||!cidade||!cep||!telefone||!email||!atividade||!tempo||
     referencias.length!==3||referencias.some((r:{empresa:string,contato:string,telefone:string})=>!r.empresa||!r.contato||!r.telefone)||
     b.declaracao!==true||b.consentimentoReferencias!==true)
     return NextResponse.json({erro:'Preencha os dados de credenciamento, as três referências e as declarações.'},{status:400});
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
     return NextResponse.json({erro:'Informe um e-mail válido.'},{status:400});
  if(original.email!==email)return NextResponse.json({erro:'Use o mesmo e-mail informado no pré-cadastro.'},{status:400});
  const perfilOrigem=original.perfil;
  if(!['Empresa','Profissional','Profissional Liberal'].includes(perfilOrigem))return NextResponse.json({erro:'Perfil do pré-cadastro inválido.'},{status:400});
  if(perfilOrigem==='Empresa'&&!cnpjValido(documento))
    return NextResponse.json({erro:'Informe um CNPJ válido para a empresa.'},{status:400});
  if(perfilOrigem!=='Empresa'&&!cpfValido(documento)&&!cnpjValido(documento))
    return NextResponse.json({erro:'Informe um CPF ou CNPJ válido para o profissional liberal.'},{status:400});
  const registro={protocolo,recebidoEm:new Date().toISOString(),perfil:original.perfil,razao,nomeFantasia,responsavel,tipoDocumento:documento.replace(/\D/g,'').length===11?'CPF':'CNPJ',documento:documento.replace(/\D/g,''),
    endereco,cidade,cep,telefone,email,site,atividade,tempo,referencias,declaracao:true,consentimentoReferencias:true,status:'PENDENTE_VERIFICACAO_MANUAL'};
  await put('credenciamento/fichas/'+protocolo+'.json',JSON.stringify(registro),{
    access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:false
  });
  console.info('Clube: ficha recebida',protocolo);
  const notificacaoClube=await notificarClube({
    assunto:'Clube de Permutas — nova ficha para análise: '+razao,
    corpo:'Nova ficha de credenciamento recebida.\n\nEmpresa/profissional: '+razao+
     '\nResponsável: '+responsavel+'\nE-mail: '+email+
     '\nProtocolo: '+protocolo+'\n\nConsulte dados e referências no painel administrativo restrito: https://www.vozdebrasilia.com.br/clube-de-permutas/administracao',
    protocolo
  });
  return NextResponse.json({ok:true,protocolo,status:'Em análise',notificacaoClube},
    {headers:{'Cache-Control':'no-store'}});
 }catch(error){
  if(error instanceof Error&&/already exists|already exists|overwrite/i.test(error.message))
    return NextResponse.json({erro:'Este credenciamento já foi registrado e está em análise.'},{status:409});
  console.error('Clube: erro na ficha',error instanceof Error?error.name:'erro');
  return NextResponse.json({erro:'Não foi possível salvar a ficha. Tente novamente.'},{status:500});
 }
}