import {randomUUID} from 'node:crypto';
import {put} from '@vercel/blob';
type Tipo='APROVADO'|'REPROVADO'|'EM_ANALISE';
export async function notificarDecisao({email,nome,protocolo,status}:{email:string;nome:string;protocolo:string;status:Tipo}){
 const token=process.env.RESEND_API_KEY;
 const remetente=process.env.CLUBE_EMAIL_REMETENTE;
 if(!token||!remetente)return {enviado:false,motivo:'PROVEDOR_NAO_CONFIGURADO'};
 const assunto=status==='APROVADO'?'Credenciamento aprovado — Clube de Permutas Brasil':
   status==='REPROVADO'?'Atualização do credenciamento — Clube de Permutas Brasil':'Análise do credenciamento — Clube de Permutas Brasil';
 const base='https://www.vozdebrasilia.com.br/clube-de-permutas';
 const texto=status==='APROVADO'
  ?'Seu credenciamento foi APROVADO. Você já pode cadastrar seus produtos e serviços para análise da equipe, pelo endereço: '+base+'/associado?protocolo='+encodeURIComponent(protocolo)+'. As ofertas não são publicadas automaticamente. As negociações serão acompanhadas pela equipe. A moeda CAMBRIQO ainda não foi emitida, e nenhum saldo digital foi creditado.'
  : status==='REPROVADO'?'Seu credenciamento não foi aprovado nesta análise. Entre em contato com o Clube para esclarecimentos.':
    'Seu credenciamento continua em análise. Consulte o andamento em '+base+'/consulta?protocolo='+encodeURIComponent(protocolo)+'.';
 const body='Olá, '+nome+'!\n\n'+texto+'\n\nSeu protocolo: '+protocolo+'\n\nClube de Permutas Brasil — TV Voz de Brasília';
 try{
  const retorno=await fetch('https://api.resend.com/emails',{method:'POST',
   headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},
   body:JSON.stringify({from:'Clube de Permutas <'+remetente+'>',to:[email],subject:assunto,text:body}),cache:'no-store'});
  const resultado=await retorno.json().catch(()=>null);
  if(!retorno.ok)return {enviado:false,motivo:'ERRO_PROVEDOR_'+retorno.status};
  const codigo=typeof resultado?.id==='string'?resultado.id:'';
  await put('clube/notificacoes/'+protocolo+'/'+randomUUID()+'.json',
   JSON.stringify({email,protocolo,status,registradoEm:new Date().toISOString(),codigo,aceitoPeloProvedor:true}),
   {access:'private',contentType:'application/json',addRandomSuffix:false}).catch(()=>{});
  return {enviado:true,motivo:'ACEITO_PELO_PROVEDOR'};
 }catch{return {enviado:false,motivo:'FALHA_DE_CONEXAO'};}
}
