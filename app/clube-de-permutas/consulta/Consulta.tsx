'use client';
import {useState,type FormEvent} from 'react';
type Estado={ok:boolean;protocolo:string;status:string;mensagem:string};
export default function Consulta({protocoloInicial}:{protocoloInicial:string}){
 const [protocolo,setProtocolo]=useState(protocoloInicial),[resultado,setResultado]=useState<Estado|null>(null),[erro,setErro]=useState(''),[carregando,setCarregando]=useState(false);
 async function consultar(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setCarregando(true);setErro('');setResultado(null);
  try{const r=await fetch('/api/clube-de-permutas/status?protocolo='+encodeURIComponent(protocolo),{cache:'no-store'});
  const d=await r.json();if(!r.ok)throw new Error(d.erro||'Consulta indisponível.');setResultado(d);
  }catch(e){setErro(e instanceof Error?e.message:'Falha na consulta.');}finally{setCarregando(false)}
 }
 return <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
 <form onSubmit={consultar}><label className="block font-semibold">Número de protocolo<input required type="text" className="mt-2 w-full border border-slate-300 rounded-lg p-3" value={protocolo} onChange={e=>setProtocolo(e.target.value)}/></label>
 <button disabled={carregando} className="mt-4 w-full bg-emerald-800 text-white p-4 rounded-xl font-bold">{carregando?'CONSULTANDO...':'CONSULTAR SITUAÇÃO'}</button></form>
 {resultado&&<div role="status" className="mt-5 bg-emerald-50 border border-emerald-200 p-5 rounded-xl"><h2 className="text-xl font-bold">{resultado.status==='EM_ANALISE'?'Ficha recebida — em análise':'Pré-cadastro recebido — falta a ficha'}</h2><p className="mt-2">{resultado.mensagem}</p>
 {resultado.status==='AGUARDANDO_CREDENCIAMENTO'&&<a className="inline-block mt-3 text-emerald-800 underline font-semibold" href={'/clube-de-permutas/credenciamento?protocolo='+encodeURIComponent(resultado.protocolo)}>Preencher ficha de credenciamento</a>}</div>}
 {erro&&<p role="alert" className="mt-4 bg-red-50 text-red-800 p-4 rounded-lg">{erro}</p>}
 <p className="mt-5 text-sm text-slate-500">Guarde seu protocolo. A consulta não exibe documentos nem dados pessoais de outros associados.</p>
 </div>;
}