import type {Metadata} from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PainelAdmin from './PainelAdmin';
export const metadata:Metadata={title:'Administração do Clube de Permutas',robots:{index:false,follow:false}};
export default function Pagina(){
 return <><Header/><main className="bg-slate-50 min-h-screen px-5 py-14 text-slate-900"><div className="max-w-6xl mx-auto">
 <p className="text-xs font-bold tracking-widest text-emerald-800">ACESSO RESTRITO • CLUBE DE PERMUTAS</p>
 <h1 className="text-3xl md:text-5xl font-black mt-3 mb-6">Painel de credenciamento</h1>
 <PainelAdmin/></div></main><Footer/></>;
}
