'use client';
import {useState, type FormEvent} from 'react';
export default function CadastroPermutas(){
 const [nome,setNome]=useState(''),[email,setEmail]=useState(''),[telefone,setTelefone]=useState(''),[cidade,setCidade]=useState(''),[perfil,setPerfil]=useState('Empresa'),[oferta,setOferta]=useState(''),[aceite,setAceite]=useState(false),[enviado,setEnviado]=useState(false);
 const campo='w-full rounded-lg border border-slate-300 p-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600';
 function enviar(e:FormEvent<HTMLFormElement>){e.preventDefault();if(!aceite)return;
 const assunto='Pré-cadastro Clube de Permutas - '+nome;
 const corpo=['Solicitação de pré-cadastro — Clube de Permutas','Nome: '+nome,'Perfil: '+perfil,'E-mail: '+email,'Telefone/WhatsApp: '+telefone,'Cidade/UF: '+cidade,'O que oferece: '+oferta,'Consentimento: autorizo contato sobre meu pré-cadastro.'].join('\n');
 window.location.href='mailto:paulofayad@gmail.com?subject='+encodeURIComponent(assunto)+'&body='+encodeURIComponent(corpo);setEnviado(true);}
 return <form onSubmit={enviar} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-9 shadow-sm grid gap-5">
 <label className="font-semibold">Nome completo ou razão social <input className={campo+' mt-2'} required maxLength={120} value={nome} onChange={e=>setNome(e.target.value)}/></label>
 <div className="grid md:grid-cols-2 gap-5"><label className="font-semibold">E-mail <input className={campo+' mt-2'} type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label className="font-semibold">WhatsApp <input className={campo+' mt-2'} type="tel" required value={telefone} onChange={e=>setTelefone(e.target.value)}/></label></div>
 <div className="grid md:grid-cols-2 gap-5"><label className="font-semibold">Cidade / UF <input className={campo+' mt-2'} required value={cidade} onChange={e=>setCidade(e.target.value)}/></label><label className="font-semibold">Perfil <select className={campo+' mt-2'} value={perfil} onChange={e=>setPerfil(e.target.value)}><option>Empresa</option><option>MEI</option><option>Profissional autônomo</option><option>Pessoa física</option></select></label></div>
 <label className="font-semibold">Que produto ou serviço você oferece? <textarea className={campo+' mt-2 min-h-28'} required maxLength={1200} value={oferta} onChange={e=>setOferta(e.target.value)} placeholder="Descreva sua proposta de permuta"/></label>
 <label className="flex gap-3 text-sm text-slate-600 items-start"><input className="mt-1" type="checkbox" required checked={aceite} onChange={e=>setAceite(e.target.checked)}/><span>Li as regras preliminares e autorizo o uso dos meus dados exclusivamente para contato sobre meu pré-cadastro, conforme a LGPD.</span></label>
 <button className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl py-4 px-6" type="submit">ENVIAR PRÉ-CADASTRO POR E-MAIL</button>
 {enviado&&<p role="status" className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-950">Seu aplicativo de e-mail foi aberto. Confirme o envio da mensagem nele para concluir a solicitação. Ainda não há conta ativada no clube.</p>}
 <p className="text-xs text-slate-500">Não há pagamento nesta etapa. Nunca envie senhas, documentos ou dados bancários neste formulário.</p>
 </form>
}