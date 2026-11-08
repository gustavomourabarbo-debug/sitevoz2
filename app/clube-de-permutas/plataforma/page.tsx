import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
export const metadata: Metadata={title:'Clube de Permutas | Fintech e Blockchain',description:'Plataforma integrada do Clube de Permutas, fintech e projeto de criptomoeda.',alternates:{canonical:'/clube-de-permutas/plataforma'}};
const modulos=[
['Marketplace','Vitrine de produtos e serviços, propostas, negociação, entrega e confirmação.','Planejado'],
['Fintech','Pix, cobranças, assinaturas e conciliação por parceiro de pagamentos autorizado.','Integração futura'],
['Carteira de permutas','Saldo de créditos comerciais, extrato, reserva e transferência após validação das partes.','Em especificação'],
['Criptomoeda','Token próprio em blockchain EVM, com nome em definição e possibilidade futura de negociação externa.','Pré-emissão'],
['Administração','Controle de associados, negócios, receitas, disputas e auditoria.','Em especificação']];
export default function Plataforma(){return <><Header/><main className="min-h-screen bg-slate-50 text-slate-900">
<section className="bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 text-white px-5 py-16"><div className="max-w-6xl mx-auto">
<p className="text-amber-300 text-sm font-bold tracking-widest">TV VOZ DE BRASÍLIA • PROJETO INTEGRADO</p><h1 className="text-4xl md:text-6xl font-black mt-5">CLUBE DE PERMUTAS <span className="text-amber-300">+ FINTECH + BLOCKCHAIN</span></h1>
<p className="text-slate-200 text-lg mt-6 max-w-3xl">Um único ambiente para anunciar, negociar e acompanhar trocas entre empresas. Pagamentos em reais e moeda digital própria fazem parte das próximas fases de desenvolvimento.</p>
<div className="flex flex-wrap gap-3 mt-8"><a className="rounded-xl px-6 py-4 bg-amber-400 text-slate-950 font-black" href="#modulos">EXPLORAR O PROJETO</a><a className="rounded-xl border border-white/40 px-6 py-4 font-bold" href="/clube-de-permutas#cadastro">PRÉ-CADASTRO</a></div>
<p className="text-slate-300 text-sm mt-5">Fase de projeto. Ainda não há conta bancária, Pix próprio, carteira ativa, token emitido ou transações reais.</p>
</div></section>
<section id="modulos" className="max-w-6xl mx-auto px-5 py-14"><h2 className="text-3xl font-black">Uma plataforma. Cinco módulos.</h2>
<div className="grid md:grid-cols-2 gap-5 mt-7">{modulos.map(([nome,descricao,status])=><article key={nome} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"><h3 className="text-xl font-black">{nome}</h3><p className="mt-2 text-slate-600">{descricao}</p><p className="mt-4 text-emerald-700 text-xs font-bold uppercase">{status}</p></article>)}</div></section>
<section className="bg-white border-y border-slate-200 px-5 py-14"><div className="max-w-6xl mx-auto"><h2 className="text-3xl font-black">Como uma permuta gera receita</h2>
<div className="grid md:grid-cols-3 gap-4 mt-6">{[['1','Negociação','Duas partes definem produto, valor, entrega e aceite.'],['2','Conciliação','O módulo financeiro identifica a comissão cobrada e seu efetivo pagamento em reais.'],['3','Auditoria','Cada operação terá número, comprovante, estado e histórico de movimentações.']].map(([n,t,d])=><div key={n} className="bg-slate-50 border border-slate-200 rounded-xl p-5"><p className="font-black text-emerald-800 text-3xl">{n}</p><h3 className="font-bold text-lg mt-3">{t}</h3><p className="mt-2 text-slate-600">{d}</p></div>)}</div>
</div></section>
<section className="bg-slate-950 px-5 py-14 text-white"><div className="max-w-6xl mx-auto"><h2 className="text-3xl font-black">Criptomoeda própria: projeto pré-emissão</h2><p className="text-slate-300 mt-4 max-w-4xl">O nome ainda será escolhido. Créditos comerciais de permuta e eventual token negociável em mercados externos terão regras distintas até que uma análise técnica, econômica e jurídica determine a arquitetura final. Não há promessa de paridade, rendimentos ou listagem em corretoras.</p>
<p className="text-amber-300 mt-5 font-semibold">Exigências: identificação de associados, revisão BCB/CVM e fiscal, auditoria de contratos inteligentes, política de emissão, custódia e combate à fraude.</p><a className="inline-block mt-6 underline text-amber-300" href="/clube-de-permutas">Voltar ao Clube de Permutas</a></div></section>
</main><Footer/></>}