import type {Metadata} from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Interesse from './Interesse';
export const metadata:Metadata={title:'CREDIX | Clube de Permutas Brasil',description:'Solicite informações sobre disponibilidade futura e condições dos créditos CREDIX.',robots:{index:false,follow:false}};
export default function Credix({searchParams}:{searchParams:{protocolo?:string}}){
 return <><Header/><main className="bg-slate-50 text-slate-900 px-5 py-14 min-h-screen"><section className="max-w-3xl mx-auto">
 <p className="text-emerald-800 text-sm uppercase font-bold tracking-widest">Clube de Permutas Brasil</p>
 <h1 className="text-4xl font-black mt-3">Interesse em adquirir CREDIX</h1>
 <p className="text-slate-600 mt-4">Associados aprovados podem registrar interesse e receber informações sobre as condições comerciais e jurídicas quando definidas. Esta página não efetua pagamentos ou emissão de créditos.</p>
 <Interesse protocoloInicial={searchParams.protocolo||''}/>
 <div className="mt-7"><a href="/clube-de-permutas/ofertas" className="text-emerald-800 font-semibold underline">Negociar diretamente com outros associados</a></div>
 </section></main><Footer/></>;
}