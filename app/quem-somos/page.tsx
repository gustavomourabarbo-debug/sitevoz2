import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = { title: 'Quem Somos | TV Voz de Brasília', description: 'A TV Voz de Brasília é um veículo de comunicação dedicado à cobertura de Brasília, do Distrito Federal e de assuntos de interesse nacional.' };

export default function Page() { return <div className="min-h-screen bg-gray-50"><Header /><main className="mx-auto max-w-4xl px-5 pt-28 pb-16"><article className="rounded-2xl bg-white p-8 shadow-sm"><h1 className="mb-6 text-3xl font-bold text-gray-900">Quem Somos</h1><p className="mb-5 leading-8 text-gray-700">A TV Voz de Brasília é um veículo de comunicação dedicado à cobertura de Brasília, do Distrito Federal e de assuntos de interesse nacional.</p><p className="mb-5 leading-8 text-gray-700">O portal reúne notícias, entrevistas e conteúdos jornalísticos, com destaque para entrevistas conduzidas por Paulo Fayad.</p><p className="mb-5 leading-8 text-gray-700">A identificação de fontes e a atribuição de conteúdos de terceiros integram nosso compromisso editorial.</p><p className="mt-8"><Link href="/contato" className="font-semibold text-green-700">Contato oficial</Link></p></article></main><Footer /></div> }
