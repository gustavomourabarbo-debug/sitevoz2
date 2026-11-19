import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { brasiliaStories } from '@/lib/brasilia-stories';
export default function BrasiliaIndex(){
return <div className="min-h-screen bg-slate-50"><Header/><main className="mx-auto max-w-[1400px] px-4 py-10">
 <h1 className="text-4xl font-black text-slate-900">Brasília — reportagens recentes</h1>
 <p className="mt-2 text-gray-600">Reportagens originais da Redação Voz de Brasília.</p>
 <div className="mt-8 grid gap-6 md:grid-cols-3">{brasiliaStories.map(a=><Link href={'/brasilia/'+a.slug} key={a.slug} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg">
  <img src={a.image} alt={a.alt} className="h-52 w-full object-cover" referrerPolicy="no-referrer"/>
  <div className="p-5"><p className="text-xs font-semibold text-green-800">Fato de {a.date}</p><h2 className="mt-2 text-xl font-black">{a.title}</h2><p className="mt-2 text-sm text-gray-600">{a.sub}</p></div></Link>)}</div>
</main><Footer/></div>
}
