'use client';

import { useEffect, useMemo, useState } from 'react';
import { candidateSlug } from '@/lib/election-data';

type Row = {
  cargo:string; nome:string; uf:string; partido22:string; votos22:string;
  candidato26:string; votos26:string; eleito26:string; partido26:string; nome26:string; situacao26:string;
};

function parseLine(line:string){
  const out:string[]=[]; let cur=''; let quoted=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(c==='"'){
      if(quoted && line[i+1]==='"'){cur+='"';i++;} else quoted=!quoted;
    } else if(c===';' && !quoted){out.push(cur);cur='';} else cur+=c;
  }
  out.push(cur); return out;
}
const fmt=(v:string)=>v && /^\d+$/.test(v) ? Number(v).toLocaleString('pt-BR') : (v||'—');
const norm=(s:string)=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

function statusKind(r:Row){
  const s=norm(r.situacao26+' '+r.eleito26);
  if(s.includes('nao se aplica')) return 'neutral';
  if(s.includes('reeleito') || (s.includes('eleito') && !s.includes('nao eleito'))) return 'won';
  if(s.includes('nao eleito') || s.includes('candidato')) return 'lost';
  return 'other';
}

export default function ElectionTable(){
  const [rows,setRows]=useState<Row[]>([]);
  const [q,setQ]=useState('');
  const [tab,setTab]=useState<'camara'|'senado'|'brasilia'>('camara');
  const [status,setStatus]=useState<'todos'|'eleitos'|'nao-eleitos'>('todos');

  useEffect(()=>{
    fetch('/documentos/planilha-eleitos-2022-comparacao-2026.csv')
      .then(r=>r.text())
      .then(t=>{
        const lines=t.replace(/^\uFEFF/,'').split(/\r?\n/).filter(Boolean).slice(1);
        setRows(lines.map(l=>{
          const c=parseLine(l);
          return {
            cargo:c[0]||'', nome:c[1]||'', uf:c[2]||'', partido22:c[3]||'', votos22:c[4]||'',
            candidato26:c[5]||'', votos26:c[6]||'', eleito26:c[7]||'', partido26:c[8]||'',
            nome26:c[9]||'', situacao26:c[10]||''
          };
        }));
      });
  },[]);

  const filtered=useMemo(()=>rows.filter(r=>{
    const section =
      tab==='camara' ? r.cargo==='Deputado Federal' :
      tab==='senado' ? r.cargo==='Senador' :
      r.uf==='DF' || r.uf==='Distrito Federal';

    const term=norm(q.trim());
    const hay=norm([r.nome,r.nome26,r.partido22,r.partido26,r.uf,r.situacao26].join(' '));
    const kind=statusKind(r);
    const statusOk=status==='todos' || (status==='eleitos' ? kind==='won' : kind==='lost');
    return section && statusOk && (!term || hay.includes(term));
  }),[rows,q,tab,status]);

  return <div className="mt-7">
    <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1.5 border border-slate-200">
      {([
        ['camara','Câmara Federal'],
        ['senado','Senado'],
        ['brasilia','Brasília / DF']
      ] as const).map(([k,l])=>
        <button key={k} onClick={()=>{setTab(k);setStatus('todos')}} className={`rounded-lg px-2 py-2.5 text-xs md:text-sm font-black transition ${tab===k?'bg-emerald-700 text-white shadow':'bg-white text-slate-700 hover:bg-emerald-50'}`}>
          {l}
        </button>
      )}
    </div>

    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 md:p-4 shadow-sm sticky top-16 z-20">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-end">
        <div className="flex-1">
          <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">Pesquisar nome, partido ou UF</label>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ex.: Aécio Neves, PL, DF..." className="w-full rounded-lg border-2 border-emerald-700 bg-white px-4 py-2.5 text-base outline-none focus:ring-4 focus:ring-emerald-100"/>
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">Situação em 2026</label>
          <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
            {([
              ['todos','Todos'],
              ['eleitos','Eleitos'],
              ['nao-eleitos','Não eleitos']
            ] as const).map(([k,l])=>
              <button key={k} onClick={()=>setStatus(k)} className={`rounded-md px-3 py-2 text-xs font-bold ${status===k?'bg-slate-900 text-white':'bg-white text-slate-700'}`}>{l}</button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs font-semibold text-slate-500">{filtered.length.toLocaleString('pt-BR')} registro(s)</div>
    </div>

    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-300 shadow-sm bg-white">
      <table className="w-full min-w-[940px] table-fixed text-[12px] md:text-[13px]">
        <colgroup>
          <col className="w-[24%]"/>
          <col className="w-[5%]"/>
          <col className="w-[8%]"/>
          <col className="w-[11%]"/>
          <col className="w-[13%]"/>
          <col className="w-[8%]"/>
          <col className="w-[11%]"/>
          <col className="w-[20%]"/>
        </colgroup>
        <thead className="sticky top-[158px] z-10">
          <tr className="bg-emerald-800 text-white">
            <th className="px-3 py-3 text-left font-black">Nome</th>
            <th className="px-2 py-3 text-center font-black">UF</th>
            <th className="px-2 py-3 text-center font-black">Partido<br/>2022</th>
            <th className="px-3 py-3 text-right font-black">Votos<br/>2022</th>
            <th className="px-3 py-3 text-center font-black">Candidatura<br/>2026</th>
            <th className="px-2 py-3 text-center font-black">Partido<br/>2026</th>
            <th className="px-3 py-3 text-right font-black">Votos<br/>2026</th>
            <th className="px-3 py-3 text-left font-black bg-emerald-950">Situação 2026</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r,i)=>{
            const kind=statusKind(r);
            const band = kind==='won' ? 'border-l-4 border-l-emerald-500' : kind==='lost' ? 'border-l-4 border-l-amber-500' : 'border-l-4 border-l-slate-300';
            const badge = kind==='won' ? 'bg-emerald-100 text-emerald-900 border-emerald-200' : kind==='lost' ? 'bg-amber-100 text-amber-900 border-amber-200' : 'bg-slate-100 text-slate-700 border-slate-200';
            return <tr key={r.nome+r.uf+i} className={`${i%2?'bg-slate-50':'bg-white'} hover:bg-emerald-50/60 ${band}`}>
              <td className="px-3 py-2.5 font-black text-slate-900 leading-tight">
                <a className="hover:text-emerald-800 hover:underline" href={`/eleicoes/candidato/${candidateSlug(r)}`}>{r.nome}</a>
                {tab==='brasilia' && <div className="mt-1 text-[10px] uppercase font-bold text-slate-400">{r.cargo}</div>}
              </td>
              <td className="px-2 py-2.5 text-center font-bold text-slate-600">{r.uf==='Distrito Federal'?'DF':r.uf}</td>
              <td className="px-2 py-2.5 text-center"><span className="inline-flex min-w-[42px] justify-center rounded-md bg-slate-200 px-2 py-1 font-black text-slate-800">{r.partido22||'—'}</span></td>
              <td className="px-3 py-2.5 text-right font-semibold tabular-nums">{fmt(r.votos22)}</td>
              <td className="px-3 py-2.5 text-center font-semibold text-slate-700">{r.candidato26||'—'}</td>
              <td className="px-2 py-2.5 text-center"><span className="inline-flex min-w-[42px] justify-center rounded-md bg-blue-50 px-2 py-1 font-black text-blue-900">{r.partido26||'—'}</span></td>
              <td className="px-3 py-2.5 text-right font-black tabular-nums">{fmt(r.votos26)}</td>
              <td className="px-3 py-2.5">
                <span className={`inline-block rounded-md border px-2 py-1 font-bold leading-tight ${badge}`}>{r.situacao26||r.eleito26||'—'}</span>
              </td>
            </tr>;
          })}
          {!filtered.length && <tr><td colSpan={8} className="px-4 py-12 text-center text-slate-500 font-semibold">Nenhum registro encontrado.</td></tr>}
        </tbody>
      </table>
    </div>

    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold text-slate-600">
      <span><b className="text-emerald-700">Faixa verde:</b> eleito/reeleito em 2026</span>
      <span><b className="text-amber-700">Faixa amarela:</b> candidato não eleito</span>
      <span><b className="text-slate-600">Faixa cinza:</b> não se aplica/não localizado</span>
    </div>
  </div>;
}