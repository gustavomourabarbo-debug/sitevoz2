import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Simulador from './Simulador';

export const metadata: Metadata = {
 title:'PERMUVOZ (PV) | Créditos de Troca do Clube de Permutas',
 description:'Entenda os créditos de troca PERMUVOZ, usados apenas nas negociações entre associados do Clube de Permutas.',
 alternates:{canonical:'/clube-de-permutas/permuvoz'}
};
const etapas=[
 ['1','Anúncio de oferta','O associado informa o bem ou serviço, quantidade, preço proposto em PV, local e condições. Apenas anunciar não gera créditos.'],
 ['2','Proposta e aceite','O comprador faz proposta. As duas partes aprovam preço, entrega e regras, com registro da negociação.'],
 ['3','Entrega e confirmação','Após as confirmações e verificação, o sistema registra a operação e credita o vendedor, debitando o comprador.'],
 ['4','Utilização dos créditos','O vendedor usa os PV recebidos para negociar com outro participante do clube, independentemente de ter sido o comprador original.']
];
export default function Permuvoz(){
 return <><Header/><main className="bg-slate-50 text-slate-900 min-h-screen">
 <section className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white px-5 py-16">
 <div className="max-w-6xl mx-auto"><p className="text-amber-300 uppercase tracking-widest font-bold text-sm">Clube de Permutas • Unidade de troca interna</p>
 <h1 className="text-5xl md:text-7xl font-black mt-4">PERMU<span className="text-amber-300">VOZ</span> <span className="text-emerald-300">PV</span></h1>
 <p className="text-lg md:text-xl text-slate-200 max-w-3xl mt-5">Venda para um associado e utilize seus créditos em negócios com outros participantes. Não é preciso encontrar alguém que queira trocar diretamente com você.</p>
 <p className="mt-5 text-sm text-slate-300">Nome provisório sujeito à verificação de marca • Plataforma de créditos em desenvolvimento, sem movimentações reais habilitadas</p>
 <div className="flex gap-3 flex-wrap mt-8"><a href="#simulador" className="bg-amber-400 text-slate-950 rounded-xl px-6 py-3 font-black">SIMULAR UMA PERMUTA</a><a href="/clube-de-permutas#cadastro" className="rounded-xl border border-white/40 px-6 py-3 font-bold">FAZER PRÉ-CADASTRO</a></div>
 </div></section>
 <section className="max-w-6xl mx-auto px-5 py-14"><div className="grid md:grid-cols-3 gap-4">
 {[
 ['1 PV = R$ 1','Unidade de referência para precificação contratual; não é promessa de conversão em dinheiro.'],
 ['Sem saque','PV não é dinheiro, criptomoeda ou moeda oficial e não pode ser resgatado em reais.'],
 ['Sem crédito por anúncio','PV só será registrado por operações verificadas, sem saldo inicial inventado.']
 ].map(([h,t])=><article key={h} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"><h2 className="font-black text-2xl text-emerald-800">{h}</h2><p className="text-slate-600 mt-3">{t}</p></article>)}
 </div></section>
 <section className="bg-white border-y border-slate-200 px-5 py-14"><div className="max-w-6xl mx-auto"><h2 className="text-3xl font-black">Como funcionará</h2><div className="grid md:grid-cols-2 gap-5 mt-8">{etapas.map(([n,h,t])=><article key={n} className="rounded-xl border border-slate-200 p-6"><span className="text-amber-600 font-black text-3xl">{n}</span><h3 className="font-bold text-xl mt-2">{h}</h3><p className="mt-2 text-slate-600">{t}</p></article>)}</div></div></section>
 <section id="simulador" className="max-w-6xl mx-auto px-5 py-16"><h2 className="text-3xl font-black">Simulador de negociação</h2><p className="text-slate-600 mt-3 mb-7">Exemplo ilustrativo, sem transações financeiras nem lançamento de créditos.</p><Simulador/></section>
 <section className="bg-slate-900 text-white px-5 py-12"><div className="max-w-6xl mx-auto"><h2 className="text-2xl font-bold">Próxima fase: carteira de associados</h2><p className="text-slate-300 mt-3">A carteira real terá autenticação individual, saldo e extrato, bloqueio de saldo em propostas, aceite de ambas as partes, trilha de auditoria, contestação e cobrança de comissões em reais. Transferências permanecem desativadas até a implantação desses controles e revisão jurídica e tributária.</p><a className="inline-block text-amber-300 underline mt-6" href="/clube-de-permutas">Voltar ao Clube de Permutas</a></div></section>
 </main><Footer/></>;
}