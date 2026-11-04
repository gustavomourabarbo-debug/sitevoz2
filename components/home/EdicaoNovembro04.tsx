import Link from 'next/link';
import { noticias } from '@/lib/edicao-04-novembro';

const [manchete, ...secundarias] = noticias;

export default function EdicaoNovembro04() {
  return (
    <section aria-label="Notícias de 4 de novembro de 2026" className="mx-auto max-w-[1400px] px-4 py-5">
      <article className="grid overflow-hidden rounded-2xl bg-slate-900 text-white md:grid-cols-2">
        <div className="p-6 md:p-8">
          <p className="text-sm font-bold text-amber-300">EDIÇÃO 04/11/2026 · {manchete.editoria}</p>
          <h1 className="my-3 text-3xl font-black md:text-4xl">{manchete.titulo}</h1>
          <p className="text-lg text-slate-200">{manchete.resumo}</p>
          <Link href={`/noticias/edicao-04-novembro/${manchete.slug}`} className="mt-5 inline-block rounded-lg bg-amber-400 px-4 py-2 font-bold text-slate-950">
            Leia a matéria
          </Link>
        </div>
        <figure className="relative">
          <img
            src="https://www.agenciabrasilia.df.gov.br/documents/20117/0/Qualifica-DF-1536x10203333.jpg/8af7c9df-9670-4350-4dc4-3eec1dcd5b1a?version=1.0"
            alt="Atividade de qualificação profissional do programa QualificaDF"
            className="h-full w-full object-cover"
          />
          <figcaption className="absolute bottom-0 right-0 bg-slate-900 px-2 py-1 text-xs">Divulgação/Sedet-DF</figcaption>
        </figure>
      </article>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {secundarias.map(({ editoria, titulo, resumo, slug }) => (
          <article key={slug} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase text-green-700">{editoria} · 04/11/2026</p>
            <h2 className="my-2 text-xl font-bold">{titulo}</h2>
            <p className="mb-3 text-sm text-slate-700">{resumo}</p>
            <Link href={`/noticias/edicao-04-novembro/${slug}`} className="font-semibold text-green-800 underline">Leia a matéria</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
