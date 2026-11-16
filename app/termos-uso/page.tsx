import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = { title: 'Termos de Uso | TV Voz de Brasília', description: 'Os conteúdos publicados neste portal destinam-se à informação jornalística. A reprodução de materiais autorais depende de autorização, ressalvadas as ' };

export default function Page() { return <div className="min-h-screen bg-gray-50"><Header /><main className="mx-auto max-w-4xl px-5 pt-28 pb-16"><article className="rounded-2xl bg-white p-8 shadow-sm"><h1 className="mb-6 text-3xl font-bold text-gray-900">Termos de Uso</h1><p className="mb-5 leading-8 text-gray-700">Os conteúdos publicados neste portal destinam-se à informação jornalística. A reprodução de materiais autorais depende de autorização, ressalvadas as hipóteses permitidas por lei.</p><p className="mb-5 leading-8 text-gray-700">Conteúdos e links externos podem estar sujeitos às condições e políticas de seus respectivos responsáveis.</p><p className="mb-5 leading-8 text-gray-700">Informações podem ser atualizadas ou corrigidas. Para comunicar eventual erro, utilize a página Contato.</p><p className="mt-8"><Link href="/contato" className="font-semibold text-green-700">Contato oficial</Link></p></article></main><Footer /></div> }
