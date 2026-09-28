export default function TerracapBanner() {
  const href = "https://www.terracap.df.gov.br/index.php/compre-imoveis/licitacoes/listagem-compre-imoveis-licitacao/344-edital-de-licitacao-13-2026-venda-de-imoveis?utm_source=voz_de_brasilia&utm_medium=paid&utm_campaign=2026_edital_13_2026___licitacao&utm_content=br_alcance_cpm_728x90_geral_ncl2026ed13-cap004";
  return (
    <div className="w-full bg-white border-b border-gray-100 py-2">
      <div className="max-w-[1680px] mx-auto px-4">
        <div className="text-[9px] uppercase tracking-[0.18em] text-gray-400 font-semibold mb-1">Publicidade</div>
        <a href={href} target="_blank" rel="noopener noreferrer sponsored" aria-label="Terracap - Edital 13/2026">
          <img src="/anuncios/terracap-edital-13-2026.jpg?v=20260927-original-2" alt="Terracap - Edital 13/2026" width="1600" height="198" className="block w-full max-w-none h-auto mx-auto object-contain" />
        </a>
      </div>
    </div>
  );
}
