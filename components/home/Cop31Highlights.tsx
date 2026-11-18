import Link from 'next/link';
import { cop31Articles } from '@/lib/cop31-2026';

export default function Cop31Highlights() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-6 pb-3" aria-label="COP31 - cobertura da Redação Voz de Brasília">
      <div className="mb-5 border-b-2 border-green-700 pb-3">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-green-700">Cobertura especial · COP31 · Antalya</p>
        <h2 className="mt-1 text-3xl font-black leading-tight text-slate-900 md:text-4xl">COP31: decisões que afetam o Brasil</h2>
        <p className="mt-2 text-sm text-slate-600">Reportagens originais da Redação Voz de Brasília · 18 de novembro de 2026</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {cop31Articles.map((article) => (
          <Link
            href={'/cop31/' + article.slug}
            key={article.slug}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-700"
            aria-label={'Ler reportagem: ' + article.title}
          >
            <img
              src={article.image}
              alt={article.alt}
              className="h-48 w-full object-cover"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            <div className="px-5 pb-5 pt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{article.category} · 18/11/2026</p>
              <h3 className="mt-2 text-xl font-black leading-snug text-slate-900 group-hover:text-green-700">{article.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{article.dek}</p>
              <span className="mt-4 inline-block text-sm font-bold text-emerald-800 underline underline-offset-2">Ler reportagem completa</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
