'use client';
import {useState,type FormEvent} from 'react';
type Registro={protocolo:string;nome:string;email:string;perfil:string;criadoEm:string;status:string;ficha?:any;decisao?:any};
export default function PainelAdmin(){
 const [password,setPassword]=useState(''),[autenticado,setAutenticado]=useState(false),[itens,setItens]=useState<Registro[]>([]);
 const [cursor,setCursor]=useState<string|null>(null),[mais,setMais]=useState(false),[buscaProtocolo,setBuscaProtocolo]=useState(''),[mensagem,setMensagem]=useState('');
 const [erro,setErro]=useState(''),[ocupado,setOcupado]=useState(false),[observacoes,setObservacoes]=useState<Record<string,string>>({});
 async function carregar(proxima?:string,exato?:string){const parametros=exato?'?protocolo='+encodeURIComponent(exato):proxima?'?cursor='+encodeURIComponent(proxima):'';const r=await fetch('/api/clube-de-permutas/admin/registros'+parametros,{cache:'no-store'});const d=await r.json();if(!r.ok)throw new Error(d.erro||'Acesso não autorizado.');setItens(atual=>proxima&&!exato?[...atual,...(d.registros||[])]:d.registros||[]);setCursor(d.cursor||null);setMais(Boolean(d.hasMore));setAutenticado(true);}
 async function login(e:FormEvent){e.preventDefault();setErro('');setOcupado(true);
 try{const r=await fetch('/api/clube-de-permutas/admin/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password})});
 if(!r.ok)throw new Error('Senha incorreta ou acesso indisponível.');setPassword('');await carregar();}catch(e){setErro(e instanceof Error?e.message:'Erro de acesso.');}finally{setOcupado(false)}}
 async function acao(item:Registro,status:string){setOcupado(true);setErro('');setMensagem('');try{
 const r=await fetch('/api/clube-de-permutas/admin/registros',{method:'POST',headers:{'content-type':'application/json'},
 body:JSON.stringify({protocolo:item.protocolo,status,observacao:observacoes[item.protocolo]||''})});
 const d=await r.json();if(!r.ok)throw new Error(d.erro||'Falha ao registrar decisão.');await carregar(undefined,item.protocolo);setBuscaProtocolo(item.protocolo);
 const envio=d.notificacao?.enviado===true?' O serviço de e-mail aceitou a mensagem.':' E-mail ainda não enviado: falta configurar ou corrigir o provedor.';
 setMensagem((status==='APROVADO'?'Credenciamento APROVADO e registrado.':status==='REPROVADO'?'Credenciamento REPROVADO e registrado.':'Status EM ANÁLISE registrado.')+envio);
 }catch(e){setErro(e instanceof Error?e.message:'Erro ao atualizar.');}finally{setOcupado(false)}}
 async function reenviar(item:Registro){
  setOcupado(true);setErro('');setMensagem('');
  try{
   const r=await fetch('/api/clube-de-permutas/admin/notificar',{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({protocolo:item.protocolo})
   });
   const d=await r.json().catch(()=>({}));
   if(!r.ok)throw new Error('Não foi enviado automaticamente. '+(d.notificacao?.motivo||'Verifique a configuração do provedor.'));
   setMensagem('O provedor aceitou a notificação para '+item.email+'. Confirme a entrega no serviço de e-mail.');
  }catch(e){setErro(e instanceof Error?e.message:'Falha ao notificar.');}finally{setOcupado(false)}
 }
 const prepararEmail=(item:Registro)=>{
  const base='https://www.vozdebrasilia.com.br/clube-de-permutas';
  const assunto='Clube de Permutas Brasil — seu credenciamento foi aprovado';
  const corpo='Olá, '+item.nome+'!\n\nSeu credenciamento no Clube de Permutas Brasil foi APROVADO.\n\nAgora você pode cadastrar seus produtos e serviços para conferência pela equipe: '+base+'/associado?protocolo='+encodeURIComponent(item.protocolo)+'\n\nInforme o protocolo e o e-mail utilizado no cadastro. Após conferência, suas ofertas poderão aparecer no catálogo para receber propostas comerciais. Não há créditos CAMBRIQO emitidos nesta fase.\n\nEquipe Clube de Permutas Brasil — TV Voz de Brasília';
  return 'mailto:'+encodeURIComponent(item.email)+'?subject='+encodeURIComponent(assunto)+'&body='+encodeURIComponent(corpo);
 };
 if(!autenticado)return <form onSubmit={login} className="max-w-md bg-white rounded-xl border border-slate-200 p-7 shadow-sm"><label className="block font-bold">Senha administrativa<input required autoComplete="current-password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-3 w-full border border-slate-300 rounded-lg p-3"/></label><button disabled={ocupado} className="mt-5 bg-emerald-800 text-white p-4 rounded-xl font-bold w-full">ENTRAR NO PAINEL</button>{erro&&<p className="text-red-800 mt-3">{erro}</p>}</form>;
 return <div className="grid gap-5">
 <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-3"><p className="font-semibold">Gerencie também as ofertas e propostas comerciais do clube.</p><a href="/clube-de-permutas/administracao/ofertas" className="bg-emerald-800 text-white rounded-lg px-5 py-3 font-bold">ABRIR OFERTAS E PROPOSTAS</a></div>
 <form onSubmit={e=>{e.preventDefault();setErro('');setMensagem('');carregar(undefined,buscaProtocolo.trim()).catch(err=>setErro(err instanceof Error?err.message:'Não foi possível localizar.'));}} className="bg-white p-5 rounded-xl border border-slate-200 flex flex-wrap items-end gap-3">
 <label className="flex-1 min-w-60 font-bold">Localizar ficha pelo protocolo<input className="mt-2 w-full border border-slate-300 rounded-lg p-3 font-mono text-sm" required placeholder="Cole o protocolo do associado" value={buscaProtocolo} onChange={e=>setBuscaProtocolo(e.target.value)}/></label>
 <button type="submit" disabled={ocupado} className="bg-emerald-800 text-white rounded-lg py-3 px-5 font-bold">LOCALIZAR E ANALISAR</button>
 <button type="button" onClick={()=>{setBuscaProtocolo('');carregar().catch(e=>setErro(String(e)));}} className="bg-slate-100 rounded-lg py-3 px-5 font-semibold">VER TODOS</button>
 </form>
 {mensagem&&<p role="status" className="bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-xl p-4 font-semibold">{mensagem}</p>}
 <div className="bg-white rounded-xl p-5 border flex flex-wrap items-center justify-between gap-3"><div><p className="text-slate-600">Pré-cadastros localizados</p><p className="text-3xl font-black">{itens.length}</p></div><button className="px-4 py-3 rounded-lg bg-emerald-800 text-white" onClick={()=>carregar().catch(e=>setErro(String(e)))}>ATUALIZAR</button></div>
 {erro&&<p role="alert" className="text-red-800 bg-red-50 p-4 rounded-lg">{erro}</p>}
 {itens.length===0&&<p className="bg-white border p-6 rounded-xl">Nenhum cadastro encontrado no armazenamento atual.</p>}
 {itens.map(item=><article key={item.protocolo} className="bg-white border border-slate-200 rounded-xl p-6 grid gap-3">
 <div className="flex justify-between flex-wrap gap-3"><div><h2 className="font-black text-xl">{item.nome}</h2><p className="text-slate-600 text-sm">{item.perfil} • {item.email}</p><p className="text-xs text-slate-500 break-all">{item.protocolo}</p></div><span className="font-bold text-emerald-800">{item.status.replace(/_/g,' ')}</span></div>
 {item.ficha&&<details className="bg-slate-50 rounded-lg p-4"><summary className="cursor-pointer font-semibold">Ver ficha para conferência</summary><div className="mt-3 space-y-2 text-sm"><p>Responsável: {item.ficha.responsavel}</p><p>Identificação: {item.ficha.tipoDocumento} {item.ficha.documento||item.ficha.cnpj}</p><p>Endereço: {item.ficha.endereco} — {item.ficha.cidade}, {item.ficha.cep}</p><p>Telefone: {item.ficha.telefone}</p><p>Atividade: {item.ficha.atividade}</p><p>Tempo de atuação: {item.ficha.tempo}</p>
 <p className="font-bold">Referências comerciais</p>{(item.ficha.referencias||[]).map((r:any,i:number)=><p key={i}>{i+1}. {r.empresa} • {r.contato} • {r.telefone}</p>)}</div></details>}
 {item.status==='APROVADO'&&<div className="flex flex-wrap gap-3 items-center bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
 <a href={'/clube-de-permutas/associado?protocolo='+encodeURIComponent(item.protocolo)} className="text-emerald-900 font-bold underline">Área de cadastro dos produtos</a>
 <button type="button" disabled={ocupado} onClick={()=>reenviar(item)} className="bg-emerald-800 text-white rounded-lg px-4 py-3 font-bold disabled:opacity-50">REENVIAR E-MAIL AUTOMÁTICO</button>
 <a href={prepararEmail(item)} className="bg-white border border-emerald-800 text-emerald-900 rounded-lg px-4 py-3 font-bold">PREPARAR E-MAIL MANUAL</a>
 <p className="w-full text-xs text-slate-600">O botão manual abre o programa de e-mail para você confirmar o envio. Ele não comprova entrega.</p>
 </div>}
 {item.ficha&&<><label className="text-sm font-semibold">Anotações da análise<textarea className="w-full mt-2 p-3 border rounded-lg" maxLength={500} value={observacoes[item.protocolo]??item.decisao?.observacao??''} onChange={e=>setObservacoes(s=>({...s,[item.protocolo]:e.target.value}))}/></label>
 <div className="flex gap-2 flex-wrap"><button type="button" disabled={ocupado} onClick={()=>acao(item,'APROVADO')} className="bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold rounded-lg py-3 px-6">✓ APROVAR CADASTRO</button><button disabled={ocupado} onClick={()=>acao(item,'EM_ANALISE')} className="bg-amber-100 text-amber-900 font-semibold rounded-lg py-2 px-4">EM ANÁLISE</button><button disabled={ocupado} onClick={()=>acao(item,'REPROVADO')} className="bg-red-50 text-red-800 font-semibold rounded-lg py-2 px-4">REPROVAR</button></div></>}
 {!item.ficha&&<p className="text-amber-800">A ficha complementar ainda não foi localizada. A aprovação será habilitada após o recebimento da ficha.</p>}
 </article>)}
 {mais&&cursor&&<button disabled={ocupado} className="border border-emerald-800 text-emerald-800 bg-white p-4 rounded-xl font-bold" onClick={()=>carregar(cursor).catch(e=>setErro(String(e)))}>CARREGAR MAIS CADASTROS</button>}
 </div>;
}
