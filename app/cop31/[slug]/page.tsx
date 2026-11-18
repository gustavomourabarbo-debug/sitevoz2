import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cop31Articles, cop31ArticleBySlug } from '@/lib/cop31-2026';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
  return cop31Articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = cop31ArticleBySlug(params.slug);
  if (!item) return { title: 'Reportagem não encontrada' };
  const url = 'https://www.vozdebrasilia.com.br/cop31/' + item.slug;
  return {
    title: item.title + ' — Voz de Brasília',
    description: item.dek,
    alternates: { canonical: url },
    openGraph: { title: item.title, description: item.dek, images: [item.image], type: 'article', url, publishedTime: '2026-11-18T12:00:00-03:00' },
  };
}

export default function Cop31Detail({ params }: { params: { slug: string } }) {
  const item = cop31ArticleBySlug(params.slug);
  if (!item) notFound();

  const url = 'https://www.vozdebrasilia.com.br/cop31/' + item.slug;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.dek,
    image: [item.image],
    datePublished: '2026-11-18T12:00:00-03:00',
    author: { '@type': 'Organization', name: 'Redação Voz de Brasília' },
    publisher: { '@type': 'Organization', name: 'TV Voz de Brasília', url: 'https://www.vozdebrasilia.com.br' },
    mainEntityOfPage: url,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="mx-auto max-w-[1000px] px-4 py-9">
        <nav className="mb-6 text-sm font-semibold text-emerald-800">
          <Link href="/" className="hover:underline">Início</Link>
          <span className="px-2 text-gray-400">/</span>
          <Link href="/cop31" className="hover:underline">COP31</Link>
        </nav>
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="px-6 pb-5 pt-8 md:px-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700">COP31 · {item.category} · 18/11/2026</p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 md:text-5xl">{item.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{item.dek}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Redação Voz de Brasília · Reportagem original</p>
          </div>
          <img className="max-h-[560px] w-full object-cover" src={item.image} alt={item.alt} referrerPolicy="no-referrer" />
          <p className="px-6 pt-2 text-xs text-gray-500 md:px-12">Foto: {item.photoCredit}</p>
          <div className="space-y-6 px-6 py-8 text-lg leading-8 text-slate-800 md:px-12 md:py-10">
            {item.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
        </article>
        <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="Outras reportagens da COP31">
          {cop31Articles.filter((p) => p.slug !== item.slug).map((p) => (
            <Link key={p.slug} href={'/cop31/' + p.slug} className="rounded-xl border border-gray-200 bg-white p-5 hover:border-green-700 hover:text-green-800">
              <p className="mb-1 text-xs font-bold uppercase text-emerald-700">Mais notícias da COP31</p>
              <p className="font-bold">{p.title}</p>
            </Link>
          ))}
        </section>
        <div className="mt-8"><Link href="/" className="font-bold text-emerald-800 underline">Voltar à página inicial</Link></div>
      </main>
      <Footer />
    </div>
  );
}
