import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cop31Articles } from '@/lib/cop31-2026';

export const metadata: Metadata = {
  title: 'Cobertura COP31 em Antalya — Voz de Brasília',
  description: 'Reportagens originais sobre as negociações climáticas, o Brasil e o financiamento da COP31.',
  alternates: { canonical: 'https://www.vozdebrasilia.com.br/cop31' },
};

export default function Cop31Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-[1400px] px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wider text-green-700">18/11/2026 · Reportagens originais</p>
        <h1 className="mt-2 text-4xl font-black text-gray-900">COP31 — cobertura especial</h1>
        <p className="mt-2 max-w-3xl text-lg text-gray-600">O que está em discussão em Antalya e o que isso significa para a sociedade e a economia brasileira.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cop31Articles.map((a) => (
            <Link key={a.slug} href={'/cop31/' + a.slug} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg">
              <img src={a.image} alt={a.alt} className="h-52 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-bold text-green-700">{a.category}</p>
                <h2 className="mt-2 text-xl font-black">{a.title}</h2>
                <p className="mt-3 text-sm text-gray-700">{a.dek}</p>
                <span className="mt-4 inline-block font-semibold text-green-800 underline">Ler matéria</span>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/" className="mt-8 inline-block font-bold text-green-800 underline">Voltar à capa</Link>
      </main>
      <Footer />
    </div>
  );
}
