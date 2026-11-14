'use client';
import {useState,type FormEvent} from 'react';
export default function Interesse({protocoloInicial}:{protocoloInicial:string}){
 const [protocolo,setProtocolo]=useState(protocoloInicial),[email,setEmail]=useState(''),[motivo,setMotivo]=useState(''),[ciente,setCiente]=useState(false);
 const [erro,setErro]=useState(''),[registro,setRegistro]=useState(''),[enviando,setEnviando]=useState(false);
 async function enviar(e:FormEvent){e.preventDefault();setEnviando(true);setErro('');setRegistro('');
 try{const r=await fetch('/api/clube-de-permutas/credix',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({protocolo,email,motivo,ciente})});
 const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.erro||'Falha ao registrar interesse.');setRegistro(d.id);
 }catch(e){setErro(e instanceof Error?e.message:'Falha no envio.');}finally{setEnviando(false)}}
 return <form onSubmit={enviar} className="mt-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 grid gap-5">
 <h2 className="text-2xl font-bold">Solicitação de informações</h2>
 <label className="font-semibold">Protocolo do associado aprovado<input required className="mt-2 block w-full rounded-lg border border-slate-300 p-3 font-mono text-sm" value={protocolo} onChange={e=>setProtocolo(e.target.value)}/></label>
 <label className="font-semibold">E-mail do cadastro<input required type="email" className="mt-2 block w-full rounded-lg border border-slate-300 p-3" value={email} onChange={e=>setEmail(e.target.value.toLowerCase())}/></label>
 <label className="font-semibold">Como você pretende utilizar os CREDIX?<textarea required maxLength={500} minLength={10} className="mt-2 block w-full min-h-28 rounded-lg border border-slate-300 p-3" value={motivo} onChange={e=>setMotivo(e.target.value)} placeholder="Ex.: Tenho interesse em receber informações sobre créditos para negociar com outros associados."/></label>
 <label className="flex items-start gap-3 text-sm text-slate-700"><input required type="checkbox" className="mt-1" checked={ciente} onChange={e=>setCiente(e.target.checked)}/><span>Entendo que este formulário registra somente interesse. Não estou efetuando uma compra, não há preço ou conversão definidos e nenhum CREDIX será creditado.</span></label>
 <button disabled={enviando} className="bg-emerald-800 text-white rounded-xl p-4 font-bold disabled:opacity-50">{enviando?'REGISTRANDO...':'REGISTRAR MEU INTERESSE'}</button>
 {erro&&<p role="alert" className="bg-red-50 border border-red-200 text-red-900 p-4 rounded-xl">{erro}</p>}
 {registro&&<div role="status" className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl"><strong>Interesse registrado.</strong><p className="mt-2 text-sm break-all">Identificação: {registro}</p><p className="mt-2 text-sm">A administração analisará sua solicitação quando as condições da operação estiverem definidas.</p></div>}
 </form>;
}