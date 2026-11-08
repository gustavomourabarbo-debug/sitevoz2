import type {Metadata} from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Consulta from './Consulta';
export const metadata:Metadata={title:'Consultar cadastro | Clube de Permutas',robots:{index:false,follow:false}};
export default function Pagina({searchParams}:{searchParams:{protocolo?:string}}){
 return <><Header/><main className="min-h-screen bg-slate-50 px-5 py-14 text-slate-900"><section className="max-w-2xl mx-auto">
 <p className="font-bold text-emerald-800 text-sm">CLUBE DE PERMUTAS</p><h1 className="text-3xl md:text-5xl font-black mt-2">Acompanhe seu cadastro</h1>
 <p className="text-slate-600 my-6">Consulte seu protocolo e veja se a ficha de credenciamento já entrou em análise. A aprovação exige verificação pela equipe.</p>
 <Consulta protocoloInicial={searchParams.protocolo||''}/></section></main><Footer/></>;
}