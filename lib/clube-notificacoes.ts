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

export async function notificarClube({assunto,corpo,protocolo}:{assunto:string;corpo:string;protocolo:string}){
 const token=process.env.RESEND_API_KEY;
 const remetente=process.env.CLUBE_EMAIL_REMETENTE;
 const destino=process.env.CLUBE_EMAIL_DESTINO;
 if(!token||!remetente||!destino)return {enviado:false,motivo:'PROVEDOR_OU_DESTINATARIO_NAO_CONFIGURADO'};
 try{
  const resposta=await fetch('https://api.resend.com/emails',{method:'POST',
    headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},
    body:JSON.stringify({from:'Clube de Permutas <'+remetente+'>',to:[destino],subject:assunto,text:corpo}),
    cache:'no-store'});
  if(!resposta.ok)return {enviado:false,motivo:'ERRO_PROVEDOR_'+resposta.status};
  const json=await resposta.json().catch(()=>null);
  await put('clube/notificacoes/'+protocolo+'/'+randomUUID()+'.json',
    JSON.stringify({destinoTipo:'CLUBE',protocolo,assunto,enviadoEm:new Date().toISOString(),codigo:json?.id||null,
      aceitoPeloProvedor:true}),
    {access:'private',contentType:'application/json',addRandomSuffix:false}).catch(()=>{});
  return {enviado:true,motivo:'ACEITO_PELO_PROVEDOR'};
 }catch{return {enviado:false,motivo:'FALHA_DE_CONEXAO'};}
}

export async function notificarOferta({email,nome,ofertaId,titulo,status}:{email:string;nome:string;ofertaId:string;titulo:string;status:'PUBLICADA'|'REPROVADA'|'SUSPENSA'}){
 const token=process.env.RESEND_API_KEY,remetente=process.env.CLUBE_EMAIL_REMETENTE;
 if(!token||!remetente)return {enviado:false,motivo:'PROVEDOR_NAO_CONFIGURADO'};
 const texto=status==='PUBLICADA'
  ?'Sua oferta foi aprovada e publicada no catálogo do Clube de Permutas Brasil.'
  :status==='SUSPENSA'?'Sua oferta foi suspensa do catálogo para conferência.':
   'Sua oferta não foi aprovada nesta avaliação. Consulte a administração do Clube para mais informações.';
 const corpo='Olá, '+nome+'!\n\n'+texto+'\n\nOferta: '+titulo+
  '\nIdentificação: '+ofertaId+'\n\nCatálogo: https://www.vozdebrasilia.com.br/clube-de-permutas/ofertas'+
  '\n\nClube de Permutas Brasil — TV Voz de Brasília';
 try{
  const r=await fetch('https://api.resend.com/emails',{method:'POST',
   headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},
   body:JSON.stringify({from:'Clube de Permutas <'+remetente+'>',to:[email],
    subject:'Clube de Permutas — atualização da sua oferta',text:corpo}),cache:'no-store'});
  return r.ok?{enviado:true,motivo:'ACEITO_PELO_PROVEDOR'}:{enviado:false,motivo:'ERRO_PROVEDOR_'+r.status};
 }catch{return {enviado:false,motivo:'FALHA_DE_CONEXAO'};}
}
