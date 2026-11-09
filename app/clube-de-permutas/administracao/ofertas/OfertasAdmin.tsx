'use client';
import {useState,type FormEvent} from 'react';
type Proposta={id:string;ofertaTitulo:string;email:string;mensagem:string;protocolo:string;status:string;criadaEm:string};
export default function OfertasAdmin(){
 const [dados,setDados]=useState({titulo:'',descricao:'',categoria:'',cidade:'',empresa:'',quantidade:'',valorReferencia:''});
 const [propostas,setPropostas]=useState<Proposta[]>([]),[erro,setErro]=useState(''),[ok,setOk]=useState(''),[ocupado,setOcupado]=useState(false);
 const [cursor,setCursor]=useState<string|null>(null),[mais,setMais]=useState(false);
 const alterar=(k:keyof typeof dados,v:string)=>setDados(p=>({...p,[k]:v}));
 async function publicar(e:FormEvent){e.preventDefault();setOcupado(true);setErro('');setOk('');
 try{const r=await fetch('/api/clube-de-permutas/ofertas',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...dados,valorReferencia:Number(dados.valorReferencia)})});
 const d=await r.json();if(!r.ok)throw new Error(d.erro||'Falha ao publicar.');
 setOk('Oferta publicada. Código: '+d.id);setDados({titulo:'',descricao:'',categoria:'',cidade:'',empresa:'',quantidade:'',valorReferencia:''});
 }catch(e){setErro(e instanceof Error?e.message:'Não foi possível publicar. Faça login no painel primeiro.');}finally{setOcupado(false)}}
 async function carregar(proxima?:string){setOcupado(true);setErro('');
 try{const r=await fetch('/api/clube-de-permutas/propostas'+(proxima?'?cursor='+encodeURIComponent(proxima):''),{cache:'no-store'});
 const d=await r.json();if(!r.ok)throw new Error(d.erro||'Falha ao carregar.');
 setPropostas(old=>proxima?[...old,...d.propostas]:d.propostas);setCursor(d.cursor||null);setMais(Boolean(d.hasMore));
 }catch(e){setErro(e instanceof Error?e.message:'Não foi possível consultar. Faça login no painel de credenciamento primeiro.');}finally{setOcupado(false)}}
 return <div className="grid gap-8"><div className="rounded-xl border bg-amber-50 border-amber-200 px-5 py-4 text-sm">Acesse primeiro o <a className="text-emerald-900 font-bold underline" href="/clube-de-permutas/administracao">painel de credenciamento</a> e faça login. Só publique ofertas cuja existência, preço e autorização do ofertante tenham sido verificados.</div>
 <form onSubmit={publicar} className="bg-white p-6 rounded-2xl border shadow-sm grid gap-4"><h2 className="font-black text-2xl">Publicar uma oferta verificada</h2>
 {([
 ['titulo','Título do produto ou serviço'],['empresa','Nome público da empresa ofertante'],['categoria','Categoria'],['cidade','Cidade / UF'],['quantidade','Quantidade e condições de disponibilidade'],['valorReferencia','Valor de referência em reais']
 ] as [keyof typeof dados,string][]).map(([k,label])=><label className="block font-semibold" key={k}>{label}<input required type={k==='valorReferencia'?'number':'text'} min={k==='valorReferencia'?0.01:undefined} step={k==='valorReferencia'?'0.01':undefined} maxLength={140} value={dados[k]} onChange={e=>alterar(k,e.target.value)} className="mt-2 block w-full border border-slate-300 rounded-lg p-3"/></label>)}
 <label className="block font-semibold">Descrição e condições de entrega<textarea required minLength={20} maxLength={1300} value={dados.descricao} onChange={e=>alterar('descricao',e.target.value)} className="mt-2 block w-full border border-slate-300 rounded-lg p-3 min-h-28"/></label>
 <button disabled={ocupado} className="bg-emerald-800 text-white font-bold px-6 py-4 rounded-xl">PUBLICAR OFERTA</button></form>
 <div className="bg-white p-6 rounded-2xl border"><h2 className="font-black text-2xl">Propostas de associados</h2><button disabled={ocupado} onClick={()=>carregar()} className="bg-slate-900 text-white mt-4 rounded-lg px-5 py-3 font-bold">CONSULTAR PROPOSTAS</button>
 <div className="grid gap-3 mt-4">{propostas.map(p=><article key={p.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200"><h3 className="font-bold">{p.ofertaTitulo}</h3><p className="mt-1 text-sm">{p.email} • {p.status}</p><p className="text-xs mt-1 break-all">Protocolo: {p.protocolo} | Proposta: {p.id}</p><p className="mt-2 whitespace-pre-wrap">{p.mensagem}</p></article>)}</div>
 {mais&&cursor&&<button disabled={ocupado} className="mt-4 underline text-emerald-800 font-bold" onClick={()=>carregar(cursor)}>Carregar mais propostas</button>}</div>
 {ok&&<p role="status" className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-900">{ok}</p>}{erro&&<p role="alert" className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-900">{erro}</p>}
 </div>;
}