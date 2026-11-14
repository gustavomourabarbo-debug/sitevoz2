import type {Metadata} from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Area from './Area';
export const metadata:Metadata={title:'Área do associado | Clube de Permutas',robots:{index:false,follow:false}};
export default function Pagina({searchParams}:{searchParams:{protocolo?:string}}){
 return <><Header/><main className="bg-slate-50 text-slate-900 min-h-screen px-5 py-14"><section className="max-w-3xl mx-auto"><p className="text-emerald-800 font-bold uppercase tracking-widest text-sm">Clube de Permutas Brasil</p><h1 className="font-black text-4xl mt-2">Área do associado</h1><p className="text-slate-600 mt-4">Cadastre produtos e serviços para revisão e publicação pela equipe. Utilize seu protocolo aprovado e o e-mail informado no credenciamento.</p><div className="mt-6 flex flex-wrap gap-3"><a href={'/clube-de-permutas/credix?protocolo='+encodeURIComponent(searchParams.protocolo||'')} className="bg-slate-900 text-white rounded-lg px-5 py-3 font-bold">INTERESSE EM CREDIX</a><a href="/clube-de-permutas/ofertas" className="border border-emerald-800 text-emerald-900 rounded-lg px-5 py-3 font-bold">NEGOCIAR COM ASSOCIADOS</a></div><Area protocoloInicial={searchParams.protocolo||''}/></section></main><Footer/></>;
}