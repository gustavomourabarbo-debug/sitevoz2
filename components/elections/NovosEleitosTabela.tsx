'use client';
import { useMemo, useState } from 'react';
type Person = {nome:string;partido:string;uf:string};
const normal=(x:string)=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
export default function NovosEleitosTabela({people,office}:{people:Person[];office:'deputados'|'senadores'}){
 const [q,setQ]=useState(''); const [uf,setUf]=useState('TODOS');const [order,setOrder]=useState('nome');
 const options=useMemo(()=>Array.from(new Set(people.map(p=>p.uf))).sort(),[people]);
 const filtered=useMemo(()=>people.filter(p=>(uf==='TODOS'||p.uf===uf)&&normal(p.nome+' '+p.partido+' '+p.uf).includes(normal(q.trim()))).sort((a,b)=>a[order as keyof Person].localeCompare(b[order as keyof Person],'pt-BR')),[q,uf,order,people]);
 return <section className="mt-7 overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200">
  <div className="grid gap-3 bg-slate-50 p-4 md:grid-cols-3 md:p-6">
   <label className="block text-sm font-bold text-slate-700 md:col-span-1">Pesquisar nome ou partido<input className="mt-1 w-full rounded-xl border-2 border-emerald-600 bg-white p-3 text-base outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Digite nome ou partido…" value={q} onChange={e=>setQ(e.target.value)}/></label>
   <label className="block text-sm font-bold text-slate-700">Estado<select className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3" value={uf} onChange={e=>setUf(e.target.value)}><option value="TODOS">Todos os estados</option>{options.map(x=><option key={x}>{x}</option>)}</select></label>
   <label className="block text-sm font-bold text-slate-700">Ordenar por<select className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3" value={order} onChange={e=>setOrder(e.target.value)}><option value="nome">Nome (A–Z)</option><option value="uf">Estado</option><option value="partido">Partido</option></select></label>
   <div className="md:col-span-3 flex items-center justify-between gap-3 text-sm font-semibold text-slate-600"><span>Exibindo {filtered.length} de {people.length} nomes</span><button onClick={()=>{setQ('');setUf('TODOS');setOrder('nome')}} className="rounded-lg bg-white border border-slate-300 px-3 py-2 font-bold hover:bg-slate-100">Limpar filtros</button></div>
  </div>
  <div className="max-h-[75vh] overflow-auto" role="region" aria-label="Lista de novos eleitos" tabIndex={0}>
   <table className="w-full min-w-[620px] text-sm"><thead className="sticky top-0 z-10 bg-emerald-900 text-white"><tr><th className="p-4 text-left">Nome</th><th className="p-4 text-left">Partido</th><th className="p-4 text-left">UF</th><th className="p-4 text-left">Mandato</th></tr></thead>
   <tbody>{filtered.map((p,i)=><tr key={p.nome+p.uf} className={i%2?'bg-slate-50 hover:bg-emerald-50':'bg-white hover:bg-emerald-50'}><td className="p-3 md:p-4 border-b border-slate-100 font-bold text-slate-900">{p.nome}</td><td className="p-3 md:p-4 border-b border-slate-100">{p.partido}</td><td className="p-3 md:p-4 border-b border-slate-100 font-semibold">{p.uf}</td><td className="p-3 md:p-4 border-b border-slate-100 text-slate-600">{office==='senadores'?'2027–2035':'2027–2031'}</td></tr>)}{!filtered.length&&<tr><td colSpan={4} className="p-10 text-center">Nenhum nome encontrado. Limpe os filtros e tente novamente.</td></tr>}</tbody></table>
  </div>
 </section>
}