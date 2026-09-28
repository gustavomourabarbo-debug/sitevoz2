/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**.vozdebrasilia.com.br' },
      { protocol: 'https', hostname: '**.wp.com' },
      { protocol: 'https', hostname: '**.wordpress.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { protocol: 'http', hostname: '**.vozdebrasilia.com.br' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/anuncio/terracap',
        destination: 'https://www.terracap.df.gov.br/index.php/compre-imoveis/licitacoes/listagem-compre-imoveis-licitacao/344-edital-de-licitacao-13-2026-venda-de-imoveis?utm_source=voz_de_brasilia&utm_medium=paid&utm_campaign=2026_edital_13_2026___licitacao&utm_content=br_alcance_cpm_728x90_geral_ncl2026ed13-cap004',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
