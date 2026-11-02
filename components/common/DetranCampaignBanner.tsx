'use client';
import {useEffect,useState} from 'react';
const IMAGE='https://cdn.creativeclaw.co/u/d4de7256/images/1a3c8e5c-0711-49ce-a657-3e28aa020de9.gif';
export default function DetranCampaignBanner(){
 const [active,setActive]=useState(false);
 useEffect(()=>{
  const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  setActive(day>='2026-10-20'&&day<='2026-10-26');
 },[]);
 if(!active)return null;
 return <aside aria-label="Publicidade institucional DETRAN-DF" className="relative z-40 w-full bg-white border-b border-gray-200 px-2 py-3 text-center">
  <a href="https://youtu.be/2i33OO9AKuU" target="_blank" rel="noopener noreferrer" aria-label="Campanha Segurança do Motociclista 2026 — DETRAN-DF" className="inline-block max-w-full">
   <img src={IMAGE} width={728} height={90} alt="DETRAN-DF — Segurança do Motociclista 2026" className="block max-w-full h-auto mx-auto"/>
  </a>
 </aside>
}