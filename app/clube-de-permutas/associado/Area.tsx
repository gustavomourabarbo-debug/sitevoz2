'use client';
import {useState,useRef,type FormEvent} from 'react';
import {formatarValorBR,valorBRParaNumero} from '@/lib/moeda-br';
export default function Area({protocoloInicial}:{protocoloInicial:string}){
 const [protocolo,setProtocolo]=useState(protocoloInicial),[email,setEmail]=useState(''),[dados,setDados]=useState({titulo:'',descricao:'',categoria:'',cidade:'',empresa:'',quantidade:'',valorReferencia:''});
 const [aceite,setAceite]=useState(false),[enviando,setEnviando]=useState(false),[erro,setErro]=useState(''),[resultado,setResultado]=useState('');
 const [statusCadastro,setStatusCadastro]=useState('');
 const avisoRef=useRef<HTMLDivElement>(null);
 async function conferir(){
  setErro('');setStatusCadastro('Consultando...');
  try{
   const r=await fetch('/api/clube-de-permutas/status?protocolo='+encodeURIComponent(protocolo.trim()),{cache:'no-store'});
   const j=await r.json();if(!r.ok)throw new Error(j.erro||'Não foi possível consultar.');
   setStatusCadastro(j.status==='APROVADO'?'APROVADO — utilize o mesmo e-mail do pré-cadastro.':j.mensagem||j.status);
  }catch(e){setStatusCadastro(e instanceof Error?e.message:'Consulta indisponível.');}
 }
 const campo='mt-2 block w-full border border-slate-300 rounded-lg p-3 bg-white';
 const alterar=(key:keyof typeof dados,valor:string)=>setDados(d=>({...d,[key]:valor}));
 async function enviar(e:FormEvent){e.preventDefault();if(enviando)return;setEnviando(true);setErro('');setResultado('');
 try{const r=await fetch('/api/clube-de-permutas/ofertas',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({...dados,origem:'ASSOCIADO',protocolo,email,autorizacao:aceite,valorReferencia:valorBRParaNumero(dados.valorReferencia)})});
 const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.erro||'Não foi possível enviar sua oferta.');
 setResultado(d.id);setDados({titulo:'',descricao:'',categoria:'',cidade:'',empresa:'',quantidade:'',valorReferencia:''});
 }catch(err){setErro(err instanceof Error?err.message:'Falha no envio.');requestAnimationFrame(()=>avisoRef.current?.scrollIntoView({behavior:'smooth',block:'center'}));}finally{setEnviando(false)}}
 return <div className="mt-8 grid gap-6">
 <div className="border border-amber-200 bg-amber-50 rounded-xl p-5"><strong>CREDIX: créditos digitais ainda não emitidos.</strong><p className="text-sm text-slate-700 mt-2">Informe o valor de referência de cada produto ou serviço em reais. Não existe saldo CREDIX, preço de aquisição definido, carteira ativa ou transferência de créditos. O clube não emite créditos automaticamente.</p></div>
 <form className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm grid gap-5" onSubmit={enviar}>
 <h2 className="text-2xl font-black">Cadastrar produto ou serviço</h2>
 <label className="font-semibold">Protocolo aprovado<input required className={campo+' font-mono text-sm'} value={protocolo} onChange={e=>{setProtocolo(e.target.value);setStatusCadastro('');}}/></label>
 <div className="flex flex-wrap items-center gap-3"><button type="button" onClick={()=>void conferir()} className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg font-semibold text-sm">CONFERIR APROVAÇÃO</button>{statusCadastro&&<span role="status" className="text-sm text-emerald-900 font-semibold">{statusCadastro}</span>}</div>
 <label className="font-semibold">E-mail do pré-cadastro<input required type="email" autoComplete="email" className={campo} value={email} onChange={e=>setEmail(e.target.value.toLowerCase().trim())}/><span className="text-xs text-slate-500 block mt-1">Use o endereço de e-mail informado na primeira inscrição, não outro e-mail da empresa.</span></label>
 <label className="font-semibold">Título da oferta<input required maxLength={140} className={campo} value={dados.titulo} onChange={e=>alterar('titulo',e.target.value)} placeholder="Ex.: 10 diárias de hospedagem"/></label>
 <label className="font-semibold">Empresa ofertante<input required maxLength={120} className={campo} value={dados.empresa} onChange={e=>alterar('empresa',e.target.value)} placeholder="Nome comercial"/></label>
 <div className="grid md:grid-cols-2 gap-4"><label className="font-semibold">Categoria<input required maxLength={75} className={campo} value={dados.categoria} onChange={e=>alterar('categoria',e.target.value)} placeholder="Ex.: Hotelaria"/></label><label className="font-semibold">Cidade/UF<input required maxLength={100} className={campo} value={dados.cidade} onChange={e=>alterar('cidade',e.target.value)} placeholder="Brasília/DF"/></label></div>
 <label className="font-semibold">Quantidade e disponibilidade<input required maxLength={60} className={campo} value={dados.quantidade} onChange={e=>alterar('quantidade',e.target.value)} placeholder="Ex.: 10 unidades disponíveis"/></label>
 <label className="font-semibold">Valor de referência (R$)<input required type="text" inputMode="numeric" autoComplete="off" placeholder="R$ 0,00" className={campo} value={dados.valorReferencia} onChange={e=>alterar('valorReferencia',formatarValorBR(e.target.value))}/><span className="block mt-1 text-xs text-slate-500">Valores em reais, com vírgula nos centavos. Exemplo: R$ 1.250,50</span></label>
 <label className="font-semibold">Descrição, condições, prazos e entrega<textarea required minLength={20} maxLength={1300} className={campo+' min-h-32'} value={dados.descricao} onChange={e=>alterar('descricao',e.target.value)} placeholder="Descreva exatamente o que pode oferecer e as condições da permuta"/></label>
 <label className="text-sm flex gap-3 items-start"><input type="checkbox" className="mt-1" required checked={aceite} onChange={e=>setAceite(e.target.checked)}/><span>Declaro que tenho autorização para oferecer o produto/serviço. Entendo que a publicação depende de análise e não representa negócio fechado nem crédito financeiro.</span></label>
 <button type="submit" disabled={enviando} className="rounded-xl bg-emerald-800 text-white font-black p-4 disabled:opacity-60">{enviando?'ENVIANDO...':'ENVIAR OFERTA PARA APROVAÇÃO'}</button>
 </form>
 {resultado&&<div role="status" className="bg-emerald-50 border border-emerald-200 rounded-xl p-5"><h2 className="font-black text-emerald-900 text-xl">Oferta recebida para revisão</h2><p className="mt-2">Protocolo da oferta: <strong className="break-all">{resultado}</strong></p><p className="mt-2 text-sm">A equipe precisa conferir disponibilidade, preço e autorização antes de publicar no catálogo.</p></div>}
 {erro&&<div ref={avisoRef} role="alert" className="bg-red-50 text-red-900 border border-red-200 rounded-lg p-5">{erro}</div>}
 <a href="/clube-de-permutas/ofertas" className="font-bold text-emerald-800 underline">Ver ofertas já publicadas</a></div>;
}