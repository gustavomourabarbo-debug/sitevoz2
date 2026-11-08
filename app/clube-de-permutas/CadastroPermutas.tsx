'use client';
import {useState, type FormEvent} from 'react';
function iniciaisMaiusculas(valor:string){ return valor.replace(/(^|[\s'/-])(\p{L})/gu,(_,separador:string,letra:string)=>separador+letra.toLocaleUpperCase('pt-BR')); }
function formatarCidadeUF(valor:string){
 const texto=valor.trim();
 const corresponde=texto.match(/^(.*?)(\s*[/,–-]\s*|\s+)([a-zA-Z]{2})$/u);
 if(!corresponde) return iniciaisMaiusculas(texto);
 return iniciaisMaiusculas(corresponde[1].trim())+'/'+corresponde[3].toLocaleUpperCase('pt-BR');
}
export default function CadastroPermutas(){
 const [nome,setNome]=useState(''),[email,setEmail]=useState(''),[telefone,setTelefone]=useState(''),[cidade,setCidade]=useState(''),[perfil,setPerfil]=useState('Empresa'),[oferta,setOferta]=useState(''),[busca,setBusca]=useState(''),[aceite,setAceite]=useState(false),[enviado,setEnviado]=useState(false),[enviando,setEnviando]=useState(false),[erro,setErro]=useState(''),[protocolo,setProtocolo]=useState(''),[emailEnviado,setEmailEnviado]=useState(false),[whatsappAutorizado,setWhatsappAutorizado]=useState(false),[whatsappEnviado,setWhatsappEnviado]=useState(false);
 const campo='w-full rounded-lg border border-slate-300 p-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600';
 async function enviar(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(!aceite||enviando)return;
  setErro('');setEnviando(true);setEnviado(false);
  try {
   const resposta=await fetch('/api/clube-de-permutas/cadastro',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
     nome:iniciaisMaiusculas(nome.trim()),
     email:email.trim().toLowerCase(),telefone:telefone.trim(),cidade:formatarCidadeUF(cidade),
     perfil,oferta:iniciaisMaiusculas(oferta.trim()),busca:iniciaisMaiusculas(busca.trim()),aceite,whatsappAutorizado
    })
   });
   const dados=await resposta.json().catch(()=>({}));
   if(!resposta.ok)throw new Error(typeof dados.erro==='string'?dados.erro:'Não foi possível concluir a inscrição. Tente novamente.');
   setProtocolo(typeof dados.protocolo==='string'?dados.protocolo:'');
   setEmailEnviado(dados.emailEnviado===true);
   setWhatsappEnviado(dados.whatsappEnviado===true);
   setEnviado(true);
  }catch(e){setErro(e instanceof Error?e.message:'Não foi possível concluir a inscrição.');}
  finally{setEnviando(false);}
 }
 return <form onSubmit={enviar} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-9 shadow-sm grid gap-5">
 <label className="font-semibold">Nome completo ou razão social <input className={campo+' mt-2'} required maxLength={120} value={nome} onChange={e=>setNome(e.target.value)} onBlur={()=>setNome(iniciaisMaiusculas(nome))}/></label>
 <div className="grid md:grid-cols-2 gap-5"><label className="font-semibold">E-mail <input className={campo+' mt-2'} type="email" required value={email} onChange={e=>setEmail(e.target.value)} onBlur={()=>setEmail(email.trim().toLowerCase())}/></label><label className="font-semibold">WhatsApp <input className={campo+' mt-2'} type="tel" required value={telefone} onChange={e=>setTelefone(e.target.value)}/></label></div>
 <div className="grid md:grid-cols-2 gap-5"><label className="font-semibold">Cidade / UF <input className={campo+' mt-2'} required value={cidade} onChange={e=>setCidade(e.target.value)} onBlur={()=>setCidade(formatarCidadeUF(cidade))}/></label><label className="font-semibold">Perfil <select className={campo+' mt-2'} value={perfil} onChange={e=>setPerfil(e.target.value)}><option>Empresa</option><option>Profissional Liberal</option></select></label></div>
 <label className="font-semibold">Que produto ou serviço você oferece? <textarea className={campo+' mt-2 min-h-28'} required maxLength={1200} value={oferta} onChange={e=>setOferta(e.target.value)} onBlur={()=>setOferta(iniciaisMaiusculas(oferta))} placeholder="Descreva sua proposta de permuta"/></label>
 <label className="font-semibold">Que produtos ou serviços você procura para receber em permuta? <textarea className={campo+' mt-2 min-h-28'} required maxLength={1200} value={busca} onChange={e=>setBusca(e.target.value)} onBlur={()=>setBusca(iniciaisMaiusculas(busca))} placeholder="Descreva os produtos ou serviços que deseja receber na troca"/></label>
 <label className="flex gap-3 text-sm text-slate-600 items-start"><input className="mt-1" type="checkbox" required checked={aceite} onChange={e=>setAceite(e.target.checked)}/><span>Li as regras preliminares e autorizo o uso dos meus dados exclusivamente para contato sobre meu pré-cadastro, conforme a LGPD.</span></label>
 <label className="flex gap-3 text-sm text-slate-600 items-start"><input className="mt-1" type="checkbox" checked={whatsappAutorizado} onChange={e=>setWhatsappAutorizado(e.target.checked)}/><span>Autorizo o Clube de Permutas a enviar pelo WhatsApp mensagens de serviço relacionadas à inscrição e ao credenciamento. Posso revogar esta autorização.</span></label>
 <button className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl py-4 px-6" type="submit" disabled={enviando}>{enviando?'ENVIANDO...':'ENVIAR PRÉ-CADASTRO'}</button>
 {enviado&&<div role="status" className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-950"><strong>Pré-cadastro recebido — em análise.</strong><p className="mt-2">Para solicitar o credenciamento, preencha agora a ficha empresarial ou profissional com endereço, dados de atividade e três referências comerciais.</p>{protocolo&&<a className="mt-4 inline-block rounded-lg bg-emerald-800 text-white font-bold px-5 py-3" href={'/clube-de-permutas/credenciamento?protocolo='+encodeURIComponent(protocolo)}>PREENCHER FICHA DE CREDENCIAMENTO</a>}<p className="mt-3 text-sm">{emailEnviado?'Enviamos também o convite para seu e-mail cadastrado.':'O link da ficha está disponível acima. O envio automático por e-mail ainda não está ativo.'}</p><p className="mt-2 text-sm">{whatsappEnviado?'A notificação de WhatsApp foi aceita pelo serviço de envio.':'Notificação automática por WhatsApp ainda não confirmada.'}</p></div>}
 {erro&&<p role="alert" className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-900">{erro}</p>}
 <p className="text-xs text-slate-500">Não há pagamento nesta etapa. Nunca envie senhas, documentos ou dados bancários neste formulário.</p>
 </form>
}