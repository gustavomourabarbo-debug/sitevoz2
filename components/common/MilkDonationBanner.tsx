export default function MilkDonationBanner() {
  const day = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  if (day < '2026-10-23' || day > '2026-10-30') return null;
  return <aside aria-label="Publicidade institucional — Doação de Leite Materno 2026" className="w-full border-b border-gray-200 bg-white px-2 py-3 text-center">
    <a href="https://amamentabrasilia.saude.df.gov.br/" target="_blank" rel="noopener noreferrer sponsored" aria-label="Doação de Leite Materno 2026 — saiba como doar" className="inline-block max-w-full">
      <img src="/campaigns/GDF_Banner_728x90px_Lucca.gif" width={728} height={90} alt="Campanha Doação de Leite Materno 2026 — Lucca" className="mx-auto block h-auto max-w-full" />
    </a>
  </aside>;
}
