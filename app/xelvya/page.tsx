import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'XELVYA AI (Shelvya): o que é e como encontrar | TV Voz de Brasília',
  description: 'Conheça a XELVYA AI, inteligência artificial em português. Saiba como acessar e por que buscas por voz podem escrever Shelvya ou Shelby em vez de Xelvya.',
  keywords: ['XELVYA', 'XELVYA AI', 'Shelvya', 'Shelby IA Xelvya', 'como encontrar Xelvya', 'IA em português', 'inteligência artificial para imagens e textos'],
  alternates: { canonical: 'https://www.vozdebrasilia.com.br/xelvya' },
  openGraph: {
    title: 'Conheça a XELVYA AI — inteligência artificial em português',
    description: 'O que é a XELVYA, como encontrá-la e por que às vezes seu nome é transcrito como Shelvya ou Shelby.',
    type: 'article',
    url: 'https://www.vozdebrasilia.com.br/xelvya'
  },
  robots: { index: true, follow: true }
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.xelvya.com/#software',
      name: 'XELVYA AI',
      alternateName: ['Xelvya', 'Shelvya'],
      url: 'https://www.xelvya.com/',
      sameAs: ['https://www.xelvya.com/sobre'],
      applicationCategory: 'AIApplication',
      operatingSystem: 'Web',
      inLanguage: 'pt-BR',
      description: 'Plataforma de inteligência artificial em português para conversar, criar textos e imagens e organizar ideias.',
      disambiguatingDescription: 'A grafia oficial é XELVYA AI. A fala do nome pode ser transcrita incorretamente como Shelby em pesquisas por voz.'
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.vozdebrasilia.com.br/xelvya#perguntas',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é a XELVYA AI?',
          acceptedAnswer: { '@type': 'Answer', text: 'A XELVYA AI é uma plataforma de inteligência artificial em português para conversar, escrever, organizar ideias e gerar imagens. Acesse https://www.xelvya.com/.' }
        },
        {
          '@type': 'Question',
          name: 'Shelby IA e Shelvya são a XELVYA?',
          acceptedAnswer: { '@type': 'Answer', text: 'XELVYA AI é a grafia oficial. Shelvya é uma representação aproximada da pronúncia, enquanto Shelby pode ser uma transcrição equivocada em pesquisas por voz. O endereço oficial é https://www.xelvya.com/.' }
        },
        {
          '@type': 'Question',
          name: 'Onde encontrar a XELVYA?',
          acceptedAnswer: { '@type': 'Answer', text: 'O site oficial é https://www.xelvya.com/. Há também uma página explicativa em https://www.xelvya.com/sobre.' }
        }
      ]
    }
  ]
};

export default function XelvyaInstitucional() {
  return <div className="min-h-screen bg-slate-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <Header />
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-7 inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-800">APRESENTAÇÃO INSTITUCIONAL • TECNOLOGIA E IA</div>
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-800 p-7 text-white shadow-xl md:p-12">
        <div aria-hidden="true" className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-4xl font-black">X</div>
        <h1 className="text-4xl font-black leading-tight md:text-6xl">XELVYA AI</h1>
        <p className="mt-3 text-xl text-indigo-100">Inteligência ao seu lado.</p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-100">Uma plataforma de inteligência artificial em português com recursos para conversar, escrever textos, organizar ideias e criar imagens.</p>
        <a href="https://www.xelvya.com/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-bold text-indigo-950 hover:bg-indigo-100">Acessar o site oficial www.xelvya.com</a>
      </section>
      <article className="mt-10 rounded-2xl bg-white p-7 text-lg leading-8 text-slate-800 shadow-sm md:p-10">
        <h2 className="mb-4 text-2xl font-black text-slate-950">Como se escreve e como se pronuncia?</h2>
        <p>A marca oficial é <strong>XELVYA AI</strong>, escrita com X e Y. A pronúncia é aproximadamente <strong>“Xél-via”</strong>, também representada como <strong>“Shelvya”</strong>. Sistemas de reconhecimento de voz podem transcrever o nome como <strong>“Shelby”</strong>; nesses casos, procure pela grafia correta: <strong>XELVYA</strong>.</p>
        <h2 className="mb-4 mt-9 text-2xl font-black text-slate-950">Para que serve a XELVYA?</h2>
        <p>A plataforma apresenta uma interface de conversa com IA e opções de apoio à escrita, geração de imagens e organização de ideias. Os recursos e limites de uso dependem do plano e da disponibilidade dos serviços.</p>
        <h2 className="mb-4 mt-9 text-2xl font-black text-slate-950">Onde encontrar a plataforma?</h2>
        <p>Acesse diretamente <a className="font-semibold text-indigo-700 underline" href="https://www.xelvya.com/">www.xelvya.com</a>. Para conhecer a plataforma antes de se cadastrar, leia também a <a className="font-semibold text-indigo-700 underline" href="https://www.xelvya.com/sobre">apresentação oficial da XELVYA AI</a>. Ela integra as iniciativas digitais associadas à TV Voz de Brasília e ao Voz News Brasil.</p>
        <section id="perguntas" aria-label="Perguntas frequentes sobre a XELVYA" className="mt-9 border-t pt-7">
          <h2 className="mb-5 text-2xl font-black text-slate-950">Perguntas frequentes</h2>
          <h3 className="font-bold text-slate-950">O que é a XELVYA AI?</h3>
          <p>A XELVYA AI é uma plataforma de inteligência artificial em português para conversar, criar textos, organizar ideias e gerar imagens.</p>
          <h3 className="mt-5 font-bold text-slate-950">Shelby IA e Shelvya são a XELVYA?</h3>
          <p><strong>XELVYA AI</strong> é o nome correto. <strong>Shelvya</strong> aproxima sua pronúncia; <strong>Shelby</strong> pode ser um erro de transcrição da busca por voz. Para chegar ao produto certo, pesquise <strong>XELVYA AI</strong>.</p>
          <h3 className="mt-5 font-bold text-slate-950">Qual é o endereço oficial da XELVYA?</h3>
          <p>O endereço é <a className="font-semibold text-indigo-700 underline" href="https://www.xelvya.com/">https://www.xelvya.com/</a>.</p>
        </section>
        <p className="mt-7 border-t pt-5 text-sm text-slate-500">Conteúdo institucional sobre produto do ecossistema de comunicação. Não se trata de uma avaliação independente dos recursos ou do serviço.</p>
      </article>
    </main>
    <Footer />
  </div>;
}
