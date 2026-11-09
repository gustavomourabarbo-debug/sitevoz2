'use client';
import {useState,useEffect,type FormEvent} from 'react';
type Oferta={id:string;titulo:string;descricao:string;categoria:string;cidade:string;quantidade:string;valorReferencia:number;empresa:string;criadaEm:string};
export default function Catalogo(){
 const [itens,setItens]=useState<Oferta[]>([]),[busca,setBusca]=useState(''),[carregando,setCarregando]=useState(true),[erro,setErro]=useState(''),[cursor,setCursor]=useState<string|null>(null),[mais,setMais]=useState(false);
 const [selecionada,setSelecionada]=useState<Oferta|null>(null),[protocolo,setProtocolo]=useState(''),[email,setEmail]=useState(''),[mensagem,setMensagem]=useState(''),[aceite,setAceite]=useState(false),[enviando,setEnviando]=useState(false),[proposta,setProposta]=useState('');
 const reais=(n:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n);
 async function carregar(proximo?:string){try{
 const url='/api/clube-de-permutas/ofertas'+(proximo?'?cursor='+encodeURIComponent(proximo):'');
 const r=await fetch(url,{cache:'no-store'});const d=await r.json();if(!r.ok)throw new Error(d.erro||'Não foi possível consultar o catálogo.');
 setItens(old=>proximo?[...old,...(d.ofertas||[])]:d.ofertas||[]);setCursor(d.cursor||null);setMais(Boolean(d.hasMore));
 }catch(e){setErro(e instanceof Error?e.message:'Falha na consulta.');}finally{setCarregando(false);}}
 useEffect(()=>{void carregar()},[]);
 async function enviar(e:FormEvent){e.preventDefault();if(!selecionada)return;setEnviando(true);setErro('');setProposta('');
 try{const r=await fetch('/api/clube-de-permutas/propostas',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ofertaId:selecionada.id,protocolo,email,mensagem,aceite})});
 const d=await r.json();if(!r.ok)throw new Error(d.erro||'Não foi possível enviar a proposta.');
 setProposta(d.id);setSelecionada(null);setMensagem('');
 }catch(e){setErro(e instanceof Error?e.message:'Não foi possível registrar sua proposta.');}finally{setEnviando(false)}}
 const exibidas=itens.filter(o=>(o.titulo+' '+o.descricao+' '+o.categoria+' '+o.cidade).toLowerCase().includes(busca.toLowerCase()));
 return <div className="mt-9">
 <label className="font-semibold block">Buscar ofertas<input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Produto, serviço ou cidade" className="mt-2 w-full p-3 border border-slate-300 rounded-xl bg-white"/></label>
 {carregando&&<p className="mt-6">Consultando ofertas...</p>}
 {!carregando&&itens.length===0&&<div className="mt-6 bg-white border border-slate-200 rounded-xl p-7"><h2 className="font-black text-xl">Catálogo em formação</h2><p className="mt-2 text-slate-600">As primeiras ofertas serão disponibilizadas após conferência pela administração. Você pode solicitar seu credenciamento agora.</p><a className="mt-4 inline-block underline text-emerald-800 font-semibold" href="/clube-de-permutas#cadastro">Solicitar participação no clube</a></div>}
 <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">{exibidas.map(o=><article key={o.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm"><p className="text-xs uppercase text-emerald-800 font-black">{o.categoria} • {o.cidade}</p><h2 className="text-xl font-black mt-3">{o.titulo}</h2><p className="text-sm text-slate-600 mt-2 whitespace-pre-wrap">{o.descricao}</p><p className="text-sm mt-3">Ofertante: <strong>{o.empresa}</strong></p><p className="text-sm">Quantidade/condições: {o.quantidade}</p><p className="font-black text-emerald-900 text-lg mt-4">Referência: {reais(o.valorReferencia)}</p><button onClick={()=>{setErro('');setProposta('');setSelecionada(o)}} className="mt-4 w-full bg-emerald-800 text-white font-bold rounded-lg p-3">ENVIAR PROPOSTA</button></article>)}</div>
 {mais&&cursor&&<button className="border border-emerald-800 rounded-xl px-5 py-3 mt-6 font-semibold" onClick={()=>carregar(cursor)}>Carregar mais ofertas</button>}
 {selecionada&&<form onSubmit={enviar} className="mt-8 bg-white border-2 border-emerald-200 rounded-2xl p-6 grid gap-4">
 <h2 className="text-2xl font-black">Proposta: {selecionada.titulo}</h2><p className="text-slate-600">A administração recebe sua proposta para negociação assistida. Apenas associados aprovados podem enviar.</p>
 <label className="font-semibold">Seu protocolo de credenciamento<input required className="block w-full border border-slate-300 rounded-lg p-3 mt-2" value={protocolo} onChange={e=>setProtocolo(e.target.value)}/></label>
 <label className="font-semibold">E-mail do cadastro<input required type="email" className="block w-full border border-slate-300 rounded-lg p-3 mt-2" value={email} onChange={e=>setEmail(e.target.value)}/></label>
 <label className="font-semibold">Sua proposta, valor e condições<textarea required minLength={20} maxLength={1000} className="block w-full border border-slate-300 rounded-lg p-3 mt-2 min-h-28" value={mensagem} onChange={e=>setMensagem(e.target.value)}/></label>
 <label className="flex items-start gap-3 text-sm"><input type="checkbox" required checked={aceite} onChange={e=>setAceite(e.target.checked)} className="mt-1"/><span>Autorizo contato sobre esta proposta. Entendo que o envio não constitui compra, pagamento, transferência de crédito ou aceitação da oferta.</span></label>
 <div className="flex gap-3 flex-wrap"><button disabled={enviando} className="bg-emerald-800 text-white rounded-lg px-5 py-3 font-bold">{enviando?'ENVIANDO...':'REGISTRAR PROPOSTA'}</button><button type="button" onClick={()=>setSelecionada(null)} className="border border-slate-300 rounded-lg px-5 py-3">Cancelar</button></div></form>}
 {proposta&&<p role="status" className="bg-emerald-50 border border-emerald-200 text-emerald-950 mt-6 p-5 rounded-xl">Proposta registrada para análise. Número: <strong className="break-all">{proposta}</strong>. A equipe fará a avaliação antes de qualquer negociação.</p>}
 {erro&&<p role="alert" className="mt-5 bg-red-50 border border-red-200 text-red-900 rounded-lg p-5">{erro}</p>}
 </div>;
}