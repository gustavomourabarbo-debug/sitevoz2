import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = { title: 'Anuncie Conosco | TV Voz de Brasília', description: 'A TV Voz de Brasília disponibiliza oportunidades de divulgação comercial em seus espaços publicitários.' };

export default function Page() { return <div className="min-h-screen bg-gray-50"><Header /><main className="mx-auto max-w-4xl px-5 pt-28 pb-16"><article className="rounded-2xl bg-white p-8 shadow-sm"><h1 className="mb-6 text-3xl font-bold text-gray-900">Anuncie Conosco</h1><p className="mb-5 leading-8 text-gray-700">A TV Voz de Brasília disponibiliza oportunidades de divulgação comercial em seus espaços publicitários.</p><p className="mb-5 leading-8 text-gray-700">Para solicitar informações sobre formatos, disponibilidade e condições comerciais, fale com a equipe pelo Instagram oficial.</p><p className="mt-8"><Link href="/contato" className="font-semibold text-green-700">Contato oficial</Link></p></article></main><Footer /></div> }
