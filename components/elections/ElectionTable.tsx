'use client';

import { useEffect, useMemo, useState } from 'react';
import { candidateSlug } from '@/lib/election-data';

type Row = {
  cargo:string; nome:string; uf:string; partido22:string; votos22:string;
  candidato26:string; votos26:string; eleito26:string; partido26:string; nome26:string; situacao26:string;
};

// Fonte: Agência Senado, relação dos 54 eleitos em 04/10/2026.
const SENADORES_ELEITOS_2026 = [
  {nome:"Marcio Bittar",uf:"AC",partido:"PL"},
  {nome:"Mara Rocha",uf:"AC",partido:"Republicanos"},
  {nome:"Arthur Lira",uf:"AL",partido:"PP"},
  {nome:"Marina JHC",uf:"AL",partido:"PSDB"},
  {nome:"Rayssa Furlan",uf:"AP",partido:"Podemos"},
  {nome:"Lucas Barreto",uf:"AP",partido:"PSD"},
  {nome:"Eduardo Braga",uf:"AM",partido:"MDB"},
  {nome:"Plínio Valério",uf:"AM",partido:"PSDB"},
  {nome:"Rui Costa",uf:"BA",partido:"PT"},
  {nome:"Jaques Wagner",uf:"BA",partido:"PT"},
  {nome:"Cid Gomes",uf:"CE",partido:"PSB"},
  {nome:"Luizianne Lins",uf:"CE",partido:"Rede"},
  {nome:"Michelle Bolsonaro",uf:"DF",partido:"PL"},
  {nome:"Bia Kicis",uf:"DF",partido:"PL"},
  {nome:"Renato Casagrande",uf:"ES",partido:"PSB"},
  {nome:"Evair de Melo",uf:"ES",partido:"Republicanos"},
  {nome:"Gustavo Gayer",uf:"GO",partido:"PL"},
  {nome:"Gracinha Caiado",uf:"GO",partido:"União"},
  {nome:"André Fufuca",uf:"MA",partido:"PP"},
  {nome:"Lahesio Bonfim",uf:"MA",partido:"Novo"},
  {nome:"Mauro Mendes",uf:"MT",partido:"União"},
  {nome:"Zé Medeiros",uf:"MT",partido:"PL"},
  {nome:"Reinaldo Azambuja",uf:"MS",partido:"PL"},
  {nome:"Capitão Contar",uf:"MS",partido:"PL"},
  {nome:"Domingos Sávio",uf:"MG",partido:"PL"},
  {nome:"Marília Campos",uf:"MG",partido:"PT"},
  {nome:"Helder Barbalho",uf:"PA",partido:"MDB"},
  {nome:"Chicão",uf:"PA",partido:"União"},
  {nome:"João Azevêdo",uf:"PB",partido:"PSB"},
  {nome:"Veneziano Vital do Rêgo",uf:"PB",partido:"MDB"},
  {nome:"Filipe Barros",uf:"PR",partido:"PL"},
  {nome:"Deltan Dallagnol",uf:"PR",partido:"Novo"},
  {nome:"Humberto Costa",uf:"PE",partido:"PT"},
  {nome:"Marília Arraes",uf:"PE",partido:"PDT"},
  {nome:"Marcelo Castro",uf:"PI",partido:"MDB"},
  {nome:"Júlio César",uf:"PI",partido:"PSD"},
  {nome:"Carlos Portinho",uf:"RJ",partido:"PL"},
  {nome:"Carlos Jordy",uf:"RJ",partido:"PL"},
  {nome:"Styvenson Valentim",uf:"RN",partido:"Podemos"},
  {nome:"Samanda de Lula",uf:"RN",partido:"PT"},
  {nome:"Ubiratan Sanderson",uf:"RS",partido:"PL"},
  {nome:"Marcel Van Hattem",uf:"RS",partido:"Novo"},
  {nome:"Fernando Máximo",uf:"RO",partido:"PL"},
  {nome:"Bruno Scheid",uf:"RO",partido:"PL"},
  {nome:"Nicoletti",uf:"RR",partido:"PL"},
  {nome:"Teresa Surita",uf:"RR",partido:"MDB"},
  {nome:"Carol de Toni",uf:"SC",partido:"PL"},
  {nome:"Carlos Bolsonaro",uf:"SC",partido:"PL"},
  {nome:"Guilherme Derrite",uf:"SP",partido:"PP"},
  {nome:"André do Prado",uf:"SP",partido:"PL"},
  {nome:"Rogério Carvalho",uf:"SE",partido:"PT"},
  {nome:"Alessandro Vieira",uf:"SE",partido:"MDB"},
  {nome:"Eduardo Gomes",uf:"TO",partido:"PL"},
  {nome:"Alexandre Guimarães",uf:"TO",partido:"MDB"}
];
const SENADO_2026:Row[] = SENADORES_ELEITOS_2026.map(p=>({
  cargo:'Senador eleito em 2026', nome:p.nome, uf:p.uf, partido22:'', votos22:'',
  candidato26:'Sim — Senado', votos26:'', eleito26:'Sim', partido26:p.partido,
  nome26:p.nome, situacao26:'Eleito em 2026 · mandato 2027–2035'
}));

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
  if((s.includes('eleito') || s.includes('reeleito')) && !s.includes('nao eleito')) return 'won';
  if(s.includes('nao eleito') || s.includes('suplente') || s.includes('candidato')) return 'lost';
  return 'other';
}

function movedOffice(r:Row){
  const c=norm(r.candidato26);
  if(!c.startsWith('sim')) return false;
  if(r.cargo==='Deputado Federal') return !c.includes('camara federal');
  if(r.cargo==='Deputado Distrital') return !c.includes('camara legislativa');
  if(r.cargo==='Senador') return !c.includes('senado');
  return false;
}

export default function ElectionTable(){
  const [rows,setRows]=useState<Row[]>([]);
  const [loading,setLoading]=useState(true);
  const [loadError,setLoadError]=useState(false);
  const [ufFilter,setUfFilter]=useState('todas');
  const [sort,setSort]=useState<'nome'|'votos22'|'votos26'>('nome');
  const [q,setQ]=useState('');
  const [tab,setTab]=useState<'camara'|'senado'|'brasilia'>('camara');
  const [status,setStatus]=useState<'todos'|'eleitos'|'nao-eleitos'|'mudou'>('todos');

  useEffect(()=>{
    fetch('/documentos/planilha-eleitos-2022-comparacao-2026.csv', {cache:'no-store'})
      .then(r=>{if(!r.ok) throw new Error('Falha ao carregar a base'); return r.text();})
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
      })
      .catch(()=>setLoadError(true))
      .finally(()=>setLoading(false));
  },[]);

  const filtered=useMemo(()=>([...rows,...SENADO_2026]).filter(r=>{
    const searching=Boolean(q.trim());
    const section = searching || (tab==='camara' ? r.cargo==='Deputado Federal' :
      tab==='senado' ? r.cargo.startsWith('Senador') :
      r.cargo==='Deputado Distrital');

    const term=norm(q.trim());
    const hay=norm([r.nome,r.nome26,r.partido22,r.partido26,r.uf,r.situacao26,r.candidato26,r.cargo].join(' '));
    const kind=statusKind(r);
    const statusOk =
      status==='todos' ||
      (status==='eleitos' && kind==='won') ||
      (status==='nao-eleitos' && kind==='lost') ||
      (status==='mudou' && movedOffice(r));
    const ufOk=ufFilter==='todas'||r.uf===ufFilter;
    return section && statusOk && ufOk && (!term || hay.includes(term));
  }).sort((a,b)=>sort==='nome' ? a.nome.localeCompare(b.nome,'pt-BR') : (Number(b[sort])||0)-(Number(a[sort])||0)),[rows,q,tab,status,ufFilter,sort]);

  const stats=useMemo(()=>{
    const total=filtered.length;
    const won=filtered.filter(r=>statusKind(r)==='won').length;
    const lost=filtered.filter(r=>statusKind(r)==='lost').length;
    const moved=filtered.filter(movedOffice).length;
    return {total,won,lost,moved};
  },[filtered]);

  return <div className="mt-7">
    <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-2 border border-slate-200 shadow-sm">
      {([
        ['camara','Câmara Federal'],
        ['senado','Senado · 81 cadeiras'],
        ['brasilia','Câmara Legislativa do DF']
      ] as const).map(([k,l])=>
        <button key={k} onClick={()=>{setTab(k);setQ('');setStatus('todos');setUfFilter('todas')}} className={`rounded-xl px-3 py-3 text-xs md:text-sm font-black transition ${tab===k?'bg-emerald-700 text-white shadow-md':'bg-white text-slate-700 hover:bg-emerald-50'}`}>
          {l}
        </button>
      )}
    </div>

    {tab==='senado' && !q && <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm font-semibold text-blue-950">Senado: 81 cadeiras — 27 mandatos eleitos em 2022 (até 2031) + 54 eleitos em 2026 (mandato 2027–2035). Os 54 nomes de 2026 têm fonte Agência Senado; a votação individual de 2026 não está informada nesta base.</div>}
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col xl:flex-row gap-4 xl:items-end">
        <div className="flex-1">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">Pesquisar candidato, partido ou UF</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-lg">🔎</span>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Digite o nome em qualquer aba: Benedita da Silva, Aécio Neves..." aria-label="Buscar em todos os candidatos" className="w-full rounded-xl border-2 border-emerald-700 bg-white pl-11 pr-16 py-2.5 text-base font-semibold outline-none focus:ring-4 focus:ring-emerald-100"/>
            {q && <button type="button" onClick={()=>setQ('')} aria-label="Limpar busca" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200">Limpar</button>}
          </div>
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">Filtrar 2026</label>
          <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
            {([
              ['todos','Todos'],
              ['eleitos','Eleitos'],
              ['nao-eleitos','Não eleitos'],
              ['mudou','Mudou de cargo']
            ] as const).map(([k,l])=>
              <button key={k} onClick={()=>setStatus(k)} className={`rounded-lg px-3 py-2 text-xs font-black transition ${status===k?'bg-slate-900 text-white shadow':'bg-white text-slate-700 hover:bg-slate-50'}`}>{l}</button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs font-semibold text-slate-600">{q ? 'Busca em todas as categorias (Câmara Federal, Senado e Câmara Legislativa do DF).' : 'Selecione Câmara Federal, Senado ou Câmara Legislativa do DF. A busca encontra nomes em todas as abas.'}</p>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label className="text-xs font-bold text-slate-700">UF<br/><select aria-label="Filtrar por UF" value={ufFilter} onChange={e=>setUfFilter(e.target.value)} className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"><option value="todas">Todas as UFs</option>{Array.from(new Set(rows.map(r=>r.uf))).filter(Boolean).sort().map(uf=><option key={uf} value={uf}>{uf}</option>)}</select></label>
        <label className="text-xs font-bold text-slate-700">Ordenar por<br/><select aria-label="Ordenar registros" value={sort} onChange={e=>setSort(e.target.value as 'nome'|'votos22'|'votos26')} className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"><option value="nome">Nome (A–Z)</option><option value="votos22">Mais votos em 2022</option><option value="votos26">Mais votos em 2026</option></select></label>
        {(q||status!=='todos'||ufFilter!=='todas'||sort!=='nome') && <button type="button" onClick={()=>{setQ('');setStatus('todos');setUfFilter('todas');setSort('nome')}} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">Restaurar filtros</button>}
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2"><div className="text-[10px] uppercase font-black text-slate-500">Registros</div><div className="text-xl font-black text-slate-900">{stats.total}</div></div>
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2"><div className="text-[10px] uppercase font-black text-emerald-700">Eleitos</div><div className="text-xl font-black text-emerald-900">{stats.won}</div></div>
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-2"><div className="text-[10px] uppercase font-black text-amber-700">Não eleitos</div><div className="text-xl font-black text-amber-900">{stats.lost}</div></div>
        <div className="rounded-xl bg-blue-50 border border-blue-200 px-3 py-2"><div className="text-[10px] uppercase font-black text-blue-700">Mudaram de cargo</div><div className="text-xl font-black text-blue-900">{stats.moved}</div></div>
      </div>
    </div>

    {loadError && <div role="alert" className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4 font-semibold text-red-900">Não foi possível carregar a base eleitoral. Atualize a página para tentar novamente.</div>}
    <div className="mt-4 rounded-2xl border border-slate-300 shadow-lg bg-white overflow-hidden">
      <div className="max-h-[72vh] overflow-auto" role="region" aria-label="Resultados da planilha eleitoral" tabIndex={0}>
        <table className="w-full min-w-[980px] table-fixed text-[12px] md:text-[13px]">
          <colgroup>
            <col className="w-[23%]"/>
            <col className="w-[5%]"/>
            <col className="w-[7%]"/>
            <col className="w-[10%]"/>
            <col className="w-[15%]"/>
            <col className="w-[7%]"/>
            <col className="w-[10%]"/>
            <col className="w-[23%]"/>
          </colgroup>
          <thead className="sticky top-0 z-30">
            <tr className="bg-emerald-800 text-white shadow">
              <th className="px-3 py-3 text-left font-black border-r border-emerald-700">Nome</th>
              <th className="px-2 py-3 text-center font-black border-r border-emerald-700">UF</th>
              <th className="px-2 py-3 text-center font-black border-r border-emerald-700">Partido<br/>2022</th>
              <th className="px-3 py-3 text-right font-black border-r border-emerald-700">Votos<br/>2022</th>
              <th className="px-3 py-3 text-center font-black border-r border-emerald-700">Candidatura<br/>2026</th>
              <th className="px-2 py-3 text-center font-black border-r border-emerald-700">Partido<br/>2026</th>
              <th className="px-3 py-3 text-right font-black border-r border-emerald-700">Votos<br/>2026</th>
              <th className="px-3 py-3 text-left font-black bg-emerald-950">Situação em 2026</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r,i)=>{
              const kind=statusKind(r);
              const moved=movedOffice(r);
              const band = moved ? 'border-l-[6px] border-l-blue-500' : kind==='won' ? 'border-l-[6px] border-l-emerald-500' : kind==='lost' ? 'border-l-[6px] border-l-amber-500' : 'border-l-[6px] border-l-slate-300';
              const badge = kind==='won' ? 'bg-emerald-100 text-emerald-900 border-emerald-200' : kind==='lost' ? 'bg-amber-100 text-amber-900 border-amber-200' : 'bg-slate-100 text-slate-700 border-slate-200';
              return <tr key={r.nome+r.uf+i} className={`${i%2?'bg-slate-50':'bg-white'} hover:bg-emerald-50/70 ${band} border-b border-slate-100`}>
                <td className="px-3 py-2 font-black text-slate-900 leading-tight">
                  <a className="hover:text-emerald-800 hover:underline" href={`/eleicoes/candidato/${candidateSlug(r)}`}>{r.nome}</a>
                  {(tab==='brasilia'||tab==='senado'||Boolean(q)) && <div className="mt-1 text-[10px] uppercase font-black text-slate-500">{r.cargo}{q ? ` · ${r.uf}`:''}</div>}
                </td>
                <td className="px-2 py-2 text-center font-black text-slate-600">{r.uf==='Distrito Federal'?'DF':r.uf}</td>
                <td className="px-2 py-2 text-center"><span className="inline-flex min-w-[38px] justify-center rounded-md bg-slate-200 px-1.5 py-1 text-[11px] font-black text-slate-800">{r.partido22||'—'}</span></td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums whitespace-nowrap">{fmt(r.votos22)}</td>
                <td className="px-3 py-2 text-center font-black text-slate-700 leading-tight">{r.candidato26||'—'}</td>
                <td className="px-2 py-2 text-center"><span className="inline-flex min-w-[38px] justify-center rounded-md bg-blue-50 px-1.5 py-1 text-[11px] font-black text-blue-900">{r.partido26||'—'}</span></td>
                <td className="px-3 py-2 text-right font-black tabular-nums whitespace-nowrap">{fmt(r.votos26)}</td>
                <td className="px-3 py-2">
                  <span className={`inline-block rounded-md border px-2 py-1 text-[11px] font-black leading-tight ${badge}`}>{r.situacao26||r.eleito26||'—'}</span>
                </td>
              </tr>;
            })}
            {!filtered.length && <tr><td colSpan={8} className="px-4 py-14 text-center text-slate-500 font-bold">{loading?'Carregando base eleitoral…':loadError?'Falha ao carregar a base.':'Nenhum registro encontrado. Tente outro nome, UF ou limpe os filtros.'}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-bold text-slate-600">
      <span><b className="text-emerald-700">Verde:</b> eleito/reeleito</span>
      <span><b className="text-amber-700">Amarelo:</b> candidato não eleito</span>
      <span><b className="text-blue-700">Azul:</b> mudou de cargo em 2026</span>
      <span><b className="text-slate-600">Cinza:</b> não localizado/não se aplica</span>
    </div>
  </div>;
}