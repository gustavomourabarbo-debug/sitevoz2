'use client';
import {useState,type FormEvent} from 'react';
import {formatarValorBR,valorBRParaNumero} from '@/lib/moeda-br';
type Oferta={id:string;titulo:string;descricao:string;categoria:string;empresa:string;cidade:string;valorReferencia:number;quantidade:string;status:string;associado?:{email:string;protocolo:string};avaliacao?:{observacao:string}};
type Interesse={id:string;nome:string;email:string;protocolo:string;motivo:string;criadoEm:string;status:string};
type Proposta={id:string;ofertaTitulo:string;email:string;mensagem:string;protocolo:string;status:string;criadaEm:string};
export default function OfertasAdmin(){
 const [dados,setDados]=useState({titulo:'',descricao:'',categoria:'',cidade:'',empresa:'',quantidade:'',valorReferencia:''});
 const [propostas,setPropostas]=useState<Proposta[]>([]),[erro,setErro]=useState(''),[ok,setOk]=useState(''),[ocupado,setOcupado]=useState(false);
 const [cursor,setCursor]=useState<string|null>(null),[mais,setMais]=useState(false);
 const [interesses,setInteresses]=useState<Interesse[]>([]),[cursorCredix,setCursorCredix]=useState<string|null>(null),[maisCredix,setMaisCredix]=useState(false);
 const [ofertas,setOfertas]=useState<Oferta[]>([]),[ofertasCursor,setOfertasCursor]=useState<string|null>(null),[ofertasMais,setOfertasMais]=useState(false),[notas,setNotas]=useState<Record<string,string>>({});
 const [andamentos,setAndamentos]=useState<Record<string,{status:string;observacao:string;comprador:boolean;vendedor:boolean}>>({});
 const alterar=(k:keyof typeof dados,v:string)=>setDados(p=>({...p,[k]:v}));
 async function carregarInteresses(proxima?:string){
 setOcupado(true);setErro('');
 try{
  const r=await fetch('/api/clube-de-permutas/admin/credix'+(proxima?'?cursor='+encodeURIComponent(proxima):''),{cache:'no-store'});
  const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.erro||'Falha na consulta.');
  setInteresses(v=>proxima?[...v,...(d.solicitacoes||[])]:d.solicitacoes||[]);
  setCursorCredix(d.cursor||null);setMaisCredix(Boolean(d.hasMore));
 }catch(e){setErro(e instanceof Error?e.message:'Consulta indisponível.');}
 finally{setOcupado(false)}
 }
 async function carregarOfertas(proxima?:string){
  setOcupado(true);setErro('');
  try{
   const r=await fetch('/api/clube-de-permutas/admin/ofertas'+(proxima?'?cursor='+encodeURIComponent(proxima):''),{cache:'no-store'});
   const d=await r.json();if(!r.ok)throw new Error(d.erro||'Falha ao carregar ofertas.');
   setOfertas(old=>proxima?[...old,...d.ofertas]:d.ofertas||[]);
   setOfertasCursor(d.cursor||null);setOfertasMais(Boolean(d.hasMore));
  }catch(e){setErro(e instanceof Error?e.message:'Falha ao consultar ofertas.');}finally{setOcupado(false)}
 }
 async function moderar(o:Oferta,status:string){
  const observacao=(notas[o.id]||'').trim();setOcupado(true);setErro('');setOk('');
  try{
   const r=await fetch('/api/clube-de-permutas/admin/ofertas',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({id:o.id,status,observacao})});
   const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.erro||'Não foi possível registrar decisão.');
   setOk('Decisão registrada para a oferta '+o.id+'. '+(d.notificacao?.enviado===true?'O serviço de e-mail aceitou o aviso ao associado.':'Aviso automático não enviado: provedor de e-mail não configurado ou indisponível.'));await carregarOfertas();
  }catch(e){setErro(e instanceof Error?e.message:'Falha ao moderar oferta.');}finally{setOcupado(false)}
 }
 async function publicar(e:FormEvent){e.preventDefault();setOcupado(true);setErro('');setOk('');
 try{const r=await fetch('/api/clube-de-permutas/ofertas',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...dados,valorReferencia:valorBRParaNumero(dados.valorReferencia)})});
 const d=await r.json();if(!r.ok)throw new Error(d.erro||'Falha ao publicar.');
 setOk('Oferta publicada. Código: '+d.id);setDados({titulo:'',descricao:'',categoria:'',cidade:'',empresa:'',quantidade:'',valorReferencia:''});
 }catch(e){setErro(e instanceof Error?e.message:'Não foi possível publicar. Faça login no painel primeiro.');}finally{setOcupado(false)}}
 async function atualizarProposta(p:Proposta){
 const a=andamentos[p.id]||{status:p.status,observacao:'',comprador:false,vendedor:false};
 setOcupado(true);setErro('');setOk('');
 try{
  const r=await fetch('/api/clube-de-permutas/propostas',{method:'PATCH',headers:{'Content-Type':'application/json'},
   body:JSON.stringify({id:p.id,status:a.status,observacao:a.observacao,confirmacaoComprador:a.comprador,confirmacaoVendedor:a.vendedor})});
  const d=await r.json();if(!r.ok)throw new Error(d.erro||'Falha ao atualizar negociação.');
  setOk('Andamento registrado para a proposta '+p.id);await carregar();
 }catch(e){setErro(e instanceof Error?e.message:'Erro ao atualizar.');}finally{setOcupado(false)}
 }
 function alterarAndamento(id:string,parcial:Partial<{status:string;observacao:string;comprador:boolean;vendedor:boolean}>,statusOriginal:string){
 setAndamentos(s=>({...s,[id]:{status:statusOriginal,observacao:'',comprador:false,vendedor:false,...s[id],...parcial}}));
 }
 async function carregar(proxima?:string){setOcupado(true);setErro('');
 try{const r=await fetch('/api/clube-de-permutas/propostas'+(proxima?'?cursor='+encodeURIComponent(proxima):''),{cache:'no-store'});
 const d=await r.json();if(!r.ok)throw new Error(d.erro||'Falha ao carregar.');
 setPropostas(old=>proxima?[...old,...d.propostas]:d.propostas);setCursor(d.cursor||null);setMais(Boolean(d.hasMore));
 }catch(e){setErro(e instanceof Error?e.message:'Não foi possível consultar. Faça login no painel de credenciamento primeiro.');}finally{setOcupado(false)}}
 return <div className="grid gap-8"><div className="rounded-xl border bg-amber-50 border-amber-200 px-5 py-4 text-sm">Acesse primeiro o <a className="text-emerald-900 font-bold underline" href="/clube-de-permutas/administracao">painel de credenciamento</a> e faça login. Só publique ofertas cuja existência, preço e autorização do ofertante tenham sido verificados.</div>
 <section className="bg-white rounded-2xl border shadow-sm p-6"><h2 className="text-2xl font-black">Solicitações de CREDIX</h2><p className="text-slate-600 text-sm mt-2">Registros de interesse, sem pagamentos ou créditos emitidos.</p>
 <button disabled={ocupado} onClick={()=>void carregarInteresses()} className="bg-slate-900 text-white rounded-lg px-5 py-3 mt-4 font-bold">VER INTERESSES REGISTRADOS</button>
 <div className="grid gap-3 mt-4">{interesses.map(i=><article key={i.id} className="border rounded-lg p-4 bg-slate-50">
 <p className="font-black">{i.nome}</p><p className="text-sm">{i.email} • {i.status}</p><p className="text-sm mt-2 whitespace-pre-wrap">{i.motivo}</p><p className="text-xs text-slate-500 mt-2 break-all">Protocolo: {i.protocolo} • Registro: {i.id}</p>
 </article>)}</div>{maisCredix&&cursorCredix&&<button disabled={ocupado} onClick={()=>void carregarInteresses(cursorCredix)} className="underline mt-3 text-emerald-800 font-bold">Carregar mais solicitações</button>}
 </section>
  <section className="bg-white rounded-2xl border shadow-sm p-6"><h2 className="text-2xl font-black">Ofertas enviadas pelos associados</h2><p className="text-sm text-slate-600 mt-2">Confira a descrição, o valor e a autorização do associado antes de publicar. Cada decisão fica registrada.</p>
 <button disabled={ocupado} onClick={()=>carregarOfertas()} className="bg-slate-900 text-white rounded-lg py-3 px-5 font-bold mt-4">CARREGAR OFERTAS RECEBIDAS</button>
 <div className="grid gap-4 mt-5">{ofertas.map(o=><article key={o.id} className="border border-slate-200 rounded-xl bg-slate-50 p-5">
 <div className="flex flex-wrap justify-between gap-3"><h3 className="font-black text-lg">{o.titulo}</h3><span className="font-bold text-emerald-900">{o.status.replace(/_/g,' ')}</span></div>
 <p className="text-sm text-slate-700 mt-2">{o.empresa} • {o.cidade} • {o.categoria}</p>
 <p className="mt-2 whitespace-pre-wrap">{o.descricao}</p><p className="mt-2 text-sm">Quantidade: {o.quantidade}</p>
 <p className="font-bold mt-2">Valor de referência: R$ {Number(o.valorReferencia).toLocaleString('pt-BR',{minimumFractionDigits:2})}</p>
 {o.associado&&<p className="text-xs mt-2">Associado: {o.associado.email} • {o.associado.protocolo}</p>}
 <label className="block font-semibold text-sm mt-4">Observação para a decisão<textarea required maxLength={700} className="mt-2 block w-full p-3 border border-slate-300 rounded-lg" value={notas[o.id]||''} onChange={e=>setNotas(s=>({...s,[o.id]:e.target.value}))} placeholder="Ex.: validade e disponibilidade conferidas com o ofertante"/></label>
 <div className="flex flex-wrap gap-2 mt-3">
 <button disabled={ocupado} onClick={()=>moderar(o,'PUBLICADA')} className="bg-emerald-800 text-white rounded-lg px-4 py-3 font-bold">APROVAR PUBLICAÇÃO</button>
 <button disabled={ocupado} onClick={()=>moderar(o,'REPROVADA')} className="bg-red-100 text-red-900 rounded-lg px-4 py-3 font-bold">REJEITAR</button>
 <button disabled={ocupado} onClick={()=>moderar(o,'SUSPENSA')} className="bg-amber-100 text-amber-900 rounded-lg px-4 py-3 font-bold">SUSPENDER</button>
 </div></article>)}</div>
 {ofertasMais&&ofertasCursor&&<button disabled={ocupado} onClick={()=>carregarOfertas(ofertasCursor)} className="mt-4 text-emerald-800 font-bold underline">Carregar mais ofertas</button>}</section>
  <form onSubmit={publicar} className="bg-white p-6 rounded-2xl border shadow-sm grid gap-4"><h2 className="font-black text-2xl">Publicar uma oferta verificada</h2>
 {([
 ['titulo','Título do produto ou serviço'],['empresa','Nome público da empresa ofertante'],['categoria','Categoria'],['cidade','Cidade / UF'],['quantidade','Quantidade e condições de disponibilidade'],['valorReferencia','Valor de referência em reais']
 ] as [keyof typeof dados,string][]).map(([k,label])=><label className="block font-semibold" key={k}>{label}<input required type="text" inputMode={k==='valorReferencia'?'numeric':undefined} placeholder={k==='valorReferencia'?'R$ 0,00':undefined} maxLength={140} value={dados[k]} onChange={e=>alterar(k,k==='valorReferencia'?formatarValorBR(e.target.value):e.target.value)} className="mt-2 block w-full border border-slate-300 rounded-lg p-3"/></label>)}
 <label className="block font-semibold">Descrição e condições de entrega<textarea required minLength={20} maxLength={1300} value={dados.descricao} onChange={e=>alterar('descricao',e.target.value)} className="mt-2 block w-full border border-slate-300 rounded-lg p-3 min-h-28"/></label>
 <button disabled={ocupado} className="bg-emerald-800 text-white font-bold px-6 py-4 rounded-xl">PUBLICAR OFERTA</button></form>
 <div className="bg-white p-6 rounded-2xl border"><h2 className="font-black text-2xl">Propostas de associados</h2><button disabled={ocupado} onClick={()=>carregar()} className="bg-slate-900 text-white mt-4 rounded-lg px-5 py-3 font-bold">CONSULTAR PROPOSTAS</button>
 <div className="grid gap-3 mt-4">{propostas.map(p=><article key={p.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200"><h3 className="font-bold">{p.ofertaTitulo}</h3><p className="mt-1 text-sm">{p.email} • {p.status}</p><p className="text-xs mt-1 break-all">Protocolo: {p.protocolo} | Proposta: {p.id}</p><p className="mt-2 whitespace-pre-wrap">{p.mensagem}</p>
 <div className="grid gap-3 mt-4 border-t border-slate-200 pt-3">
 <label className="font-semibold text-sm">Andamento da negociação<select value={andamentos[p.id]?.status||p.status} onChange={e=>alterarAndamento(p.id,{status:e.target.value},p.status)} className="mt-1 w-full border border-slate-300 rounded-lg p-2">
 {['AGUARDANDO_CONTATO','CONTATO_REALIZADO','EM_NEGOCIACAO','AGUARDANDO_COMPROVANTES','CONCLUIDA','CANCELADA'].map(s=><option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}</select></label>
 <label className="font-semibold text-sm">Registro de contatos, condições ou evidências<textarea maxLength={800} value={andamentos[p.id]?.observacao||''} onChange={e=>alterarAndamento(p.id,{observacao:e.target.value},p.status)} className="mt-1 w-full border border-slate-300 rounded-lg p-2 min-h-20" placeholder="Informe o andamento e as evidências de confirmação"/></label>
 {(andamentos[p.id]?.status||p.status)==='CONCLUIDA'&&<div className="grid gap-2">
 <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={andamentos[p.id]?.comprador||false} onChange={e=>alterarAndamento(p.id,{comprador:e.target.checked},p.status)}/>Confirmação do comprador foi verificada</label>
 <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={andamentos[p.id]?.vendedor||false} onChange={e=>alterarAndamento(p.id,{vendedor:e.target.checked},p.status)}/>Confirmação do ofertante foi verificada</label></div>}
 <button disabled={ocupado} onClick={()=>atualizarProposta(p)} className="bg-emerald-800 text-white p-3 rounded-lg font-bold">REGISTRAR ANDAMENTO</button></div>
 </article>)}</div>
 {mais&&cursor&&<button disabled={ocupado} className="mt-4 underline text-emerald-800 font-bold" onClick={()=>carregar(cursor)}>Carregar mais propostas</button>}</div>
 {ok&&<p role="status" className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-900">{ok}</p>}{erro&&<p role="alert" className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-900">{erro}</p>}
 </div>;
}