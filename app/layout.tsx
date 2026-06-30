import './globals.css';
import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  referrer: 'no-referrer',
  title: 'TV Voz de Brasília - Portal de Notícias do Distrito Federal',
  description: 'O portal de notícias mais completo do Distrito Federal. Política, economia, turismo, saúde, tecnologia, esportes e entrevistas exclusivas. Informação de qualidade sobre Brasília e o Brasil.',
  keywords: 'notícias brasília, notícias df, tv voz de brasília, jornalismo brasília, política df, economia brasília, turismo distrito federal, entrevistas',
  authors: [{ name: 'TV Voz de Brasília' }],
  creator: 'TV Voz de Brasília',
  publisher: 'TV Voz de Brasília',
  metadataBase: new URL('https://tvvozdebrasilia.com.br'),
  openGraph: {
    title: 'TV Voz de Brasília - Portal de Notícias do Distrito Federal',
    description: 'O portal de notícias mais completo do Distrito Federal. Informação de qualidade sobre Brasília e o Brasil.',
    url: 'https://tvvozdebrasilia.com.br',
    siteName: 'TV Voz de Brasília',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TV Voz de Brasília',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TV Voz de Brasília - Portal de Notícias do Distrito Federal',
    description: 'O portal de notícias mais completo do Distrito Federal.',
    images: ['/twitter-image.jpg'],
    creator: '@tvvozdebrasilia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

import GoogleAnalytics from '@/components/common/GoogleAnalytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <meta name="referrer" content="no-referrer" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
