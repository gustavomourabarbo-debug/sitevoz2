'use client';
import {useState} from 'react';
export default function Simulador(){
 const [valor,setValor]=useState(10000);
 const [taxa,setTaxa]=useState(10);
 const fmt=(n:number)=>new Intl.NumberFormat('pt-BR',{maximumFractionDigits:0}).format(n);
 return <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
 <div className="grid md:grid-cols-2 gap-8">
 <label className="block"><span className="block font-bold">Valor da permuta em PV</span><input className="w-full mt-4 accent-emerald-700" type="range" min="1000" max="100000" step="1000" value={valor} onChange={e=>setValor(Number(e.target.value))}/><span className="text-2xl text-emerald-800 font-black">{fmt(valor)} PV</span></label>
 <label className="block"><span className="block font-bold">Comissão proposta do clube</span><input className="w-full mt-4 accent-emerald-700" type="range" min="2" max="15" step="1" value={taxa} onChange={e=>setTaxa(Number(e.target.value))}/><span className="text-2xl text-emerald-800 font-black">{taxa}% em reais</span></label>
 </div>
 <div className="grid md:grid-cols-3 gap-4 mt-7">
 {[
 ['Vendedor recebe',fmt(valor)+' PV'],
 ['Comprador utiliza',fmt(valor)+' PV'],
 ['Comissão do clube','R$ '+fmt(valor*taxa/100)]
 ].map(([h,t])=><div className="rounded-xl bg-slate-100 px-5 py-4" key={h}><p className="text-sm text-slate-600">{h}</p><p className="font-black text-xl mt-2">{t}</p></div>)}
 </div>
 <p className="text-sm text-slate-500 mt-5">Exemplo condicionado à existência de saldo legítimo e à conclusão da negociação. Créditos não são emitidos antecipadamente por cadastrar ofertas. Comissão sujeita a contrato e cobrança real integrada.</p>
 </div>;
}