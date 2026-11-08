import type {Metadata} from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Ficha from './Ficha';
export const metadata:Metadata={title:'Credenciamento | Clube de Permutas',robots:{index:false,follow:false}};
export default function Credenciamento({searchParams}:{searchParams:{protocolo?:string}}){
 return <><Header/><main className="min-h-screen bg-slate-50 text-slate-900 px-5 py-14"><div className="max-w-3xl mx-auto">
 <p className="text-emerald-800 font-bold tracking-widest text-sm">CLUBE DE PERMUTAS • IDENTIFICAÇÃO EMPRESARIAL</p>
 <h1 className="text-3xl md:text-5xl font-black mt-4 mb-5">Ficha de credenciamento</h1>
 <p className="text-slate-600 mb-8">Esta etapa ajuda a avaliar a existência e a legitimidade da empresa ou atuação profissional. O preenchimento não implica aprovação.</p>
 <Ficha protocolo={searchParams.protocolo||''}/></div></main><Footer/></>;
}