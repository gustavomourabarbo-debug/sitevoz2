import type {Metadata} from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OfertasAdmin from './OfertasAdmin';
export const metadata:Metadata={title:'Ofertas e propostas | Administração do Clube',robots:{index:false,follow:false}};
export default function Pagina(){return <><Header/><main className="min-h-screen bg-slate-50 px-5 py-14 text-slate-900"><div className="max-w-5xl mx-auto"><p className="font-bold text-sm text-emerald-800">CLUBE DE PERMUTAS • ACESSO ADMINISTRATIVO</p><h1 className="text-4xl font-black mt-2">Ofertas e propostas</h1><p className="text-slate-600 mt-3 mb-7">Somente a equipe pode publicar ofertas verificadas. O registro de propostas não representa fechamento automático de negócio.</p><OfertasAdmin/></div></main><Footer/></>}