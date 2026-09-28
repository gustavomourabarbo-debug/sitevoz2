import { NextResponse } from 'next/server';

const TERRACAP_URL =
  'https://www.terracap.df.gov.br/index.php/compre-imoveis/licitacoes/listagem-compre-imoveis-licitacao/344-edital-de-licitacao-13-2026-venda-de-imoveis?utm_source=voz_de_brasilia&utm_medium=paid&utm_campaign=2026_edital_13_2026___licitacao&utm_content=br_alcance_cpm_728x90_geral_ncl2026ed13-cap004';

export function GET() {
  return NextResponse.redirect(TERRACAP_URL, 307);
}
