'use client';
import {useState,type FormEvent} from 'react';
type Registro={protocolo:string;nome:string;email:string;perfil:string;criadoEm:string;status:string;ficha?:any;decisao?:any};
export default function PainelAdmin(){
 const [password,setPassword]=useState(''),[autenticado,setAutenticado]=useState(false),[itens,setItens]=useState<Registro[]>([]);
 const [cursor,setCursor]=useState<string|null>(null),[mais,setMais]=useState(false);
 const [erro,setErro]=useState(''),[ocupado,setOcupado]=useState(false),[observacoes,setObservacoes]=useState<Record<string,string>>({});
 async function carregar(proxima?:string){const r=await fetch('/api/clube-de-permutas/admin/registros'+(proxima?'?cursor='+encodeURIComponent(proxima):''),{cache:'no-store'});const d=await r.json();if(!r.ok)throw new Error(d.erro||'Acesso não autorizado.');setItens(atual=>proxima?[...atual,...(d.registros||[])]:d.registros||[]);setCursor(d.cursor||null);setMais(Boolean(d.hasMore));setAutenticado(true);}
 async function login(e:FormEvent){e.preventDefault();setErro('');setOcupado(true);
 try{const r=await fetch('/api/clube-de-permutas/admin/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password})});
 if(!r.ok)throw new Error('Senha incorreta ou acesso indisponível.');setPassword('');await carregar();}catch(e){setErro(e instanceof Error?e.message:'Erro de acesso.');}finally{setOcupado(false)}}
 async function acao(item:Registro,status:string){setOcupado(true);setErro('');try{
 const r=await fetch('/api/clube-de-permutas/admin/registros',{method:'POST',headers:{'content-type':'application/json'},
 body:JSON.stringify({protocolo:item.protocolo,status,observacao:observacoes[item.protocolo]||''})});
 const d=await r.json();if(!r.ok)throw new Error(d.erro||'Falha ao registrar decisão.');await carregar();
 }catch(e){setErro(e instanceof Error?e.message:'Erro ao atualizar.');}finally{setOcupado(false)}}
 if(!autenticado)return <form onSubmit={login} className="max-w-md bg-white rounded-xl border border-slate-200 p-7 shadow-sm"><label className="block font-bold">Senha administrativa<input required autoComplete="current-password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-3 w-full border border-slate-300 rounded-lg p-3"/></label><button disabled={ocupado} className="mt-5 bg-emerald-800 text-white p-4 rounded-xl font-bold w-full">ENTRAR NO PAINEL</button>{erro&&<p className="text-red-800 mt-3">{erro}</p>}</form>;
 return <div className="grid gap-5">
 <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-3"><p className="font-semibold">Gerencie também as ofertas e propostas comerciais do clube.</p><a href="/clube-de-permutas/administracao/ofertas" className="bg-emerald-800 text-white rounded-lg px-5 py-3 font-bold">ABRIR OFERTAS E PROPOSTAS</a></div>
 <div className="bg-white rounded-xl p-5 border flex flex-wrap items-center justify-between gap-3"><div><p className="text-slate-600">Pré-cadastros localizados</p><p className="text-3xl font-black">{itens.length}</p></div><button className="px-4 py-3 rounded-lg bg-emerald-800 text-white" onClick={()=>carregar().catch(e=>setErro(String(e)))}>ATUALIZAR</button></div>
 {erro&&<p role="alert" className="text-red-800 bg-red-50 p-4 rounded-lg">{erro}</p>}
 {itens.length===0&&<p className="bg-white border p-6 rounded-xl">Nenhum cadastro encontrado no armazenamento atual.</p>}
 {itens.map(item=><article key={item.protocolo} className="bg-white border border-slate-200 rounded-xl p-6 grid gap-3">
 <div className="flex justify-between flex-wrap gap-3"><div><h2 className="font-black text-xl">{item.nome}</h2><p className="text-slate-600 text-sm">{item.perfil} • {item.email}</p><p className="text-xs text-slate-500 break-all">{item.protocolo}</p></div><span className="font-bold text-emerald-800">{item.status.replace(/_/g,' ')}</span></div>
 {item.ficha&&<details className="bg-slate-50 rounded-lg p-4"><summary className="cursor-pointer font-semibold">Ver ficha para conferência</summary><div className="mt-3 space-y-2 text-sm"><p>Responsável: {item.ficha.responsavel}</p><p>Identificação: {item.ficha.tipoDocumento} {item.ficha.documento||item.ficha.cnpj}</p><p>Endereço: {item.ficha.endereco} — {item.ficha.cidade}, {item.ficha.cep}</p><p>Telefone: {item.ficha.telefone}</p><p>Atividade: {item.ficha.atividade}</p><p>Tempo de atuação: {item.ficha.tempo}</p>
 <p className="font-bold">Referências comerciais</p>{(item.ficha.referencias||[]).map((r:any,i:number)=><p key={i}>{i+1}. {r.empresa} • {r.contato} • {r.telefone}</p>)}</div></details>}
 {item.ficha&&<><label className="text-sm font-semibold">Anotações da análise<textarea className="w-full mt-2 p-3 border rounded-lg" maxLength={500} value={observacoes[item.protocolo]??item.decisao?.observacao??''} onChange={e=>setObservacoes(s=>({...s,[item.protocolo]:e.target.value}))}/></label>
 <div className="flex gap-2 flex-wrap"><button disabled={ocupado} onClick={()=>acao(item,'APROVADO')} className="bg-emerald-800 text-white font-semibold rounded-lg py-2 px-4">APROVAR</button><button disabled={ocupado} onClick={()=>acao(item,'EM_ANALISE')} className="bg-amber-100 text-amber-900 font-semibold rounded-lg py-2 px-4">EM ANÁLISE</button><button disabled={ocupado} onClick={()=>acao(item,'REPROVADO')} className="bg-red-50 text-red-800 font-semibold rounded-lg py-2 px-4">REPROVAR</button></div></>}
 {!item.ficha&&<p className="text-amber-800">Aguardando preenchimento da ficha de credenciamento.</p>}
 </article>)}
 {mais&&cursor&&<button disabled={ocupado} className="border border-emerald-800 text-emerald-800 bg-white p-4 rounded-xl font-bold" onClick={()=>carregar(cursor).catch(e=>setErro(String(e)))}>CARREGAR MAIS CADASTROS</button>}
 </div>;
}
