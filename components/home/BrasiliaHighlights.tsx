import Link from 'next/link';
import { brasiliaStories } from '@/lib/brasilia-stories';
export default function BrasiliaHighlights(){
return <section className="mx-auto max-w-[1400px] px-4 pt-7 pb-4" aria-label="Notícias de Brasília">
  <div className="mb-4 border-b-2 border-green-700 pb-3">
    <p className="text-xs font-bold uppercase tracking-widest text-green-700">Distrito Federal · 18/11/2026</p>
    <h2 className="mt-1 text-3xl font-black text-slate-900">Brasília em destaque</h2>
  </div>
  <div className="grid gap-5 md:grid-cols-3">{brasiliaStories.map(a=><Link key={a.slug} href={'/brasilia/'+a.slug} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
    <img src={a.image} alt={a.alt} referrerPolicy="no-referrer" loading="eager" className="h-48 w-full object-cover"/>
    <div className="p-5">
      <p className="text-xs font-bold uppercase text-green-700">Brasília · Fato de {a.date}</p>
      <h3 className="mt-2 text-xl font-black leading-tight text-slate-900 group-hover:text-green-700">{a.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{a.sub}</p>
      <span className="mt-4 inline-block text-sm font-bold text-green-800 underline">Ler reportagem</span>
    </div></Link>)}</div>
</section>
}
