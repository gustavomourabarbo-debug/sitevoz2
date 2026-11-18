import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { brasiliaStories, brasiliaStory } from '@/lib/brasilia-stories';
import { notFound } from 'next/navigation';
export const dynamicParams=false;
export function generateStaticParams(){return brasiliaStories.map(a=>({slug:a.slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{
  const a=brasiliaStory(params.slug);
  if(!a)return{title:'Página não encontrada'};
  return{title:a.title+' — Voz de Brasília',description:a.sub,alternates:{canonical:'https://www.vozdebrasilia.com.br/brasilia/'+a.slug},openGraph:{title:a.title,description:a.sub,images:[a.image],type:'article'}};
}
export default function BrasiliaDetail({params}:{params:{slug:string}}){
const a=brasiliaStory(params.slug);if(!a)notFound();
return <div className="min-h-screen bg-slate-50"><Header/><main className="mx-auto max-w-[960px] px-4 py-8">
  <nav className="mb-5 text-sm font-bold text-green-800"><Link href="/">Início</Link> / <Link href="/brasilia">Brasília</Link></nav>
  <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="px-6 pt-8 pb-6 md:px-12">
      <p className="text-xs font-bold uppercase tracking-wider text-green-800">Distrito Federal · Fato de {a.date} · Publicado em 18/11/2026</p>
      <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-5xl">{a.title}</h1>
      <p className="mt-4 text-lg text-slate-600">{a.sub}</p>
      <p className="mt-4 text-xs uppercase tracking-wider text-gray-500">Redação Voz de Brasília · Reportagem original</p>
    </div>
    <img src={a.image} alt={a.alt} referrerPolicy="no-referrer" className="max-h-[540px] w-full object-cover"/>
    <p className="px-6 pt-2 text-xs text-gray-500 md:px-12">Foto: {a.credit} · {a.imageDate}</p>
    <div className="space-y-6 px-6 py-8 text-lg leading-8 text-slate-800 md:px-12">{a.paras.map((p,i)=><p key={i}>{p}</p>)}</div>
  </article>
  <section className="mt-6 grid gap-4 md:grid-cols-2">{brasiliaStories.filter(x=>x.slug!==a.slug).map(x=><Link key={x.slug} href={'/brasilia/'+x.slug} className="rounded-xl border border-gray-200 bg-white p-5 font-bold text-green-900 hover:border-green-700">{x.title}</Link>)}</section>
</main><Footer/></div>
}
