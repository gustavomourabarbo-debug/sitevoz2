'use client';

import { useEffect, useMemo, useState } from 'react';\nimport { candidateSlug } from '@/lib/election-data';

type Row = {
  cargo:string; nome:string; uf:string; partido22:string; votos22:string;
  candidato26:string; votos26:string; eleito26:string; partido26:string; nome26:string; situacao26:string;
};

function parseLine(line:string){
  const out:string[]=[]; let cur=''; let quoted=false;
  for(let i=0;i<line.length;i++){const c=line[i];
    if(c==='"'){ if(quoted && line[i+1]==='"'){cur+='"';i++;} else quoted=!quoted; }
    else if(c===';' && !quoted){out.push(cur);cur='';} else cur+=c;
  } out.push(cur); return out;
}
const fmt=(v:string)=>v && /^\d+$/.test(v) ? Number(v).toLocaleString('pt-BR') : (v||'—');

export default function ElectionTable(){
  const [rows,setRows]=useState<Row[]>([]); const [q,setQ]=useState(''); const [tab,setTab]=useState<'camara'|'senado'|'brasilia'>('camara');
  useEffect(()=>{fetch('/documentos/planilha-eleitos-2022-comparacao-2026.csv').then(r=>r.text()).then(t=>{
    const lines=t.replace(/^\uFEFF/,'').split(/\r?\n/).filter(Boolean).slice(1);
    setRows(lines.map(l=>{const c=parseLine(l);return {cargo:c[0]||'',nome:c[1]||'',uf:c[2]||'',partido22:c[3]||'',votos22:c[4]||'',candidato26:c[5]||'',votos26:c[6]||'',eleito26:c[7]||'',partido26:c[8]||'',nome26:c[9]||'',situacao26:c[10]||''}}));
  })},[]);
  const filtered=useMemo(()=>rows.filter(r=>{
    const section=tab==='camara'?r.cargo==='Deputado Federal':tab==='senado'?r.cargo==='Senador':r.uf==='DF';
    const term=q.trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const hay=(r.nome+' '+r.nome26+' '+r.partido22+' '+r.partido26+' '+r.uf).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    return section && (!term || hay.includes(term));
  }),[rows,q,tab]);
  return <div className="mt-8">
    <div className="grid grid-cols-3 gap-2 rounded-2xl bg-gray-100 p-2">
      {([['camara','Câmara Federal'],['senado','Senado'],['brasilia','Brasília / DF']] as const).map(([k,l])=><button key={k} onClick={()=>setTab(k)} className={`rounded-xl px-3 py-3 text-sm md:text-base font-black transition ${tab===k?'bg-green-700 text-white shadow':'bg-white text-gray-700 hover:bg-green-50'}`}>{l}</button>)}
    </div>
    <div className="mt-5 sticky top-20 z-10 bg-white/95 backdrop-blur py-3">
      <label className="block text-sm font-bold text-gray-700 mb-2">Pesquisar candidato</label>
      <div className="relative"><span className="absolute left-4 top-3.5 text-xl">🔎</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Digite o nome, partido ou UF..." className="w-full rounded-2xl border-2 border-green-700 bg-white pl-12 pr-4 py-3 text-lg outline-none focus:ring-4 focus:ring-green-100"/></div>
      <p className="mt-2 text-sm text-gray-500">{filtered.length.toLocaleString('pt-BR')} registro(s) encontrado(s)</p>
    </div>
    <div className="mt-3 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="min-w-[1150px] w-full text-sm bg-white">
        <thead className="bg-green-800 text-white"><tr>{['Nome','UF','Cargo','Partido 2022','Votos 2022','Candidatura 2026','Partido 2026','Votos 2026','Resultado 2026'].map(h=><th key={h} className="px-4 py-4 text-left font-black">{h}</th>)}</tr></thead>
        <tbody>{filtered.map((r,i)=><tr key={r.nome+r.uf+i} className={i%2?'bg-gray-50':'bg-white'}>
          <td className="px-4 py-3 font-black"><a className="text-green-800 hover:underline" href={`/eleicoes/candidato/${candidateSlug(r)}`}>{r.nome}</a></td><td className="px-4 py-3">{r.uf}</td><td className="px-4 py-3">{r.cargo}</td><td className="px-4 py-3">{r.partido22}</td><td className="px-4 py-3 font-semibold">{fmt(r.votos22)}</td><td className="px-4 py-3">{r.candidato26}</td><td className="px-4 py-3">{r.partido26||'—'}</td><td className="px-4 py-3 font-semibold">{fmt(r.votos26)}</td><td className="px-4 py-3"><span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${/reeleito|eleito/i.test(r.situacao26)&&!/não eleito/i.test(r.situacao26)?'bg-green-100 text-green-800':'bg-amber-100 text-amber-900'}`}>{r.situacao26||r.eleito26||'—'}</span></td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>
}