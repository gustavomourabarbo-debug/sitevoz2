export default function DetranCampaignBanner(){
 const day = new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Sao_Paulo' }).format(new Date());
 if (day < '2026-11-03' || day > '2026-11-09') return null;
 return <aside aria-label="Publicidade institucional DETRAN-DF" className="relative z-40 w-full bg-white border-b border-gray-200 px-2 py-3 text-center">
  <a href="https://youtu.be/fjB2Y963Sj4" target="_blank" rel="noopener noreferrer" aria-label="Campanha Segurança do Motociclista 2026 — DETRAN-DF" className="inline-block max-w-full">
   <img src="/publicidade/detran-pi-385630.gif" width={728} height={90} alt="DETRAN-DF — Segurança do Motociclista 2026" className="block max-w-full h-auto mx-auto"/>
  </a>
 </aside>
}