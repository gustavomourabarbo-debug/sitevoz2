'use client';
import {useState} from 'react';
const reais=(n:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(n);
export default function Painel(){
const [associados,setAssociados]=useState(500),[volume,setVolume]=useState(200000),[taxa,setTaxa]=useState(10),[mensal,setMensal]=useState(99);
return <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm"><div className="grid md:grid-cols-2 gap-6">
{[[ 'Associados pagantes',associados,setAssociados,100,10000,100],['Volume mensal das permutas (R$)',volume,setVolume,10000,5000000,10000],['Comissão (%)',taxa,setTaxa,1,15,1],['Mensalidade (R$)',mensal,setMensal,0,299,1]].map(([label,value,set,min,max,step])=><label className="block" key={String(label)}><span className="font-bold">{label}</span><input className="w-full mt-3 accent-emerald-700" type="range" min={Number(min)} max={Number(max)} step={Number(step)} value={Number(value)} onChange={e=>(set as (n:number)=>void)(Number(e.target.value))}/><span className="text-xl text-emerald-900 font-black">{label==='Comissão (%)'?String(value)+'%':label==='Associados pagantes'?String(value):reais(Number(value))}</span></label>)}
</div><div className="grid md:grid-cols-3 gap-4 mt-8">{[['Mensalidades',associados*mensal],['Comissões',volume*taxa/100],['Receita bruta estimada',associados*mensal+volume*taxa/100]].map(([label,value])=><div key={String(label)} className="bg-slate-100 p-5 rounded-xl"><p className="text-sm text-slate-600">{label}</p><p className="font-black text-xl mt-2">{reais(Number(value))}</p></div>)}</div>
<p className="text-sm text-slate-500 mt-5">Estimativas sem despesas, impostos, custos de tecnologia, taxas financeiras ou inadimplência.</p></div>;
}