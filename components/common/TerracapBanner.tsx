export default function TerracapBanner() {
  const href = "/anuncio/terracap";
  return (
    <div className="w-full bg-white border-b border-gray-100 py-3">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-[9px] uppercase tracking-[0.18em] text-gray-400 font-semibold mb-1">Publicidade</div>
        <a href={href} target="_blank" rel="noopener noreferrer sponsored" aria-label="Terracap - Edital 13/2026" className="block w-full overflow-hidden rounded-xl shadow-lg bg-white">
          <img src="/publicidade/terracap-edital-13-2026.jpg?v=20260926-2" alt="Terracap - Edital 13/2026" className="block w-full h-auto object-contain" />
        </a>
      </div>
    </div>
  );
}
