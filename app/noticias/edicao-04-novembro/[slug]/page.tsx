import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { noticias } from '@/lib/edicao-04-novembro';

export function generateStaticParams() {
  return noticias.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const noticia = noticias.find(({ slug }) => slug === params.slug);
  return noticia ? { title: noticia.titulo + ' | Voz de Brasília', description: noticia.resumo } : {};
}

export default function Reportagem({ params }: { params: { slug: string } }) {
  const noticia = noticias.find(({ slug }) => slug === params.slug);
  if (!noticia) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <article>
          <p className="text-sm font-bold uppercase text-green-700">{noticia.editoria}</p>
          <h1 className="my-3 text-3xl font-extrabold sm:text-5xl">{noticia.titulo}</h1>
          <p className="text-xl text-slate-700">{noticia.resumo}</p>
          <p className="my-6 border-b pb-4 text-sm text-slate-600">Redação Voz de Brasília · <time dateTime="2026-11-04">4 de novembro de 2026</time></p>
          <div className="space-y-5 text-lg leading-relaxed">
            {noticia.texto.map((paragrafo) => <p key={paragrafo}>{paragrafo}</p>)}
          </div>
          <p className="mt-8 text-sm text-slate-600">Fonte consultada: {noticia.fonte}.</p>
        </article>
        <Link href="/" className="mt-8 inline-block font-semibold text-green-800 underline">Voltar à capa</Link>
      </main>
      <Footer />
    </>
  );
}
