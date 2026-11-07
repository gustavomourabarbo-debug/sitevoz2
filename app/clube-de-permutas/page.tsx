import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CadastroPermutas from './CadastroPermutas';

export const metadata: Metadata = {
  title: 'Clube de Permutas | TV Voz de Brasília',
  description: 'Negocie produtos, serviços e oportunidades por permutas totais ou parciais. Conheça as regras e solicite seu pré-cadastro.',
  alternates: { canonical: '/clube-de-permutas' },
};
const itens = [
  ['01','Quem participa','Empresas, MEIs, profissionais autônomos e pessoas físicas maiores de 18 anos, mediante análise e aprovação.'],
  ['02','O que pode negociar','Produtos e serviços lícitos, próprios, disponíveis e descritos com preço em reais, condições, prazo e localização.'],
  ['03','Como negociar','Propostas voluntárias de permuta total ou parcial. Cada parte aprova valores, entregas e eventual diferença em dinheiro antes de fechar.'],
  ['04','Taxas e comissões','Valores de adesão, mensalidade e comissão serão apresentados para aceite antes de qualquer cobrança. Não há cobrança automática neste pré-cadastro.'],
  ['05','Responsabilidades','Cada participante responde pela qualidade, origem, garantias, tributos, notas fiscais, entrega e cumprimento dos acordos.'],
  ['06','Segurança e conduta','É proibido anunciar itens ilegais, informações falsas, pirâmides financeiras ou ofertas enganosas. Perfis poderão ser suspensos.'],
  ['07','Privacidade','Os dados do pré-cadastro serão usados apenas para contato sobre o clube. Não divulgue documentos sensíveis na proposta inicial.'],
  ['08','Formalização','A plataforma facilitará o contato, mas cada negócio dependerá de acordo próprio, inclusive sobre cancelamento e solução de conflitos.'],
];
export default function ClubeDePermutas() {
 return <><Header/><main className="bg-slate-50 min-h-screen text-slate-900">
 <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-900 text-white py-20 px-5">
 <div className="max-w-6xl mx-auto"><p className="text-amber-300 tracking-[.2em] font-bold text-sm mb-5">UM NOVO CLUBE DE NEGÓCIOS • TV VOZ DE BRASÍLIA</p>
 <h1 className="text-5xl md:text-7xl font-black max-w-4xl leading-tight">CLUBE DE <span className="text-amber-300">PERMUTAS</span></h1>
 <p className="mt-6 text-xl text-slate-200 max-w-2xl">Seu produto tem valor. Seu serviço também. Transforme o que você oferece em novas oportunidades de negócios.</p>
 <div className="flex flex-wrap gap-3 mt-9"><a className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl px-7 py-4" href="#cadastro">QUERO PARTICIPAR</a><a className="border border-white/40 rounded-xl px-7 py-4 font-bold hover:bg-white/10" href="#regras">CONHEÇA AS REGRAS</a></div>
 <p className="text-sm text-slate-300 mt-6">Lançamento em preparação • Pré-cadastro sem cobrança</p></div></section>
 <section className="max-w-6xl mx-auto px-5 py-16"><h2 className="text-3xl md:text-4xl font-black">Como o clube vai funcionar</h2>
 <div className="grid md:grid-cols-3 gap-5 mt-8">{[
 ['1','Cadastre-se','Envie seu pré-cadastro e informe o que deseja oferecer.'],
 ['2','Encontre oportunidades','Consulte empresas, profissionais e ofertas participantes quando o catálogo estiver disponível.'],
 ['3','Negocie a permuta','Combine valores, entregas e condições com a outra parte, com transparência.']
 ].map((e)=><div key={e[0]} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7"><span className="text-4xl font-black text-emerald-700">{e[0]}</span><h3 className="text-xl font-bold mt-4">{e[1]}</h3><p className="mt-2 text-slate-600">{e[2]}</p></div>)}</div></section>
 <section id="regras" className="bg-white border-y border-slate-200"><div className="max-w-6xl mx-auto px-5 py-16"><p className="text-emerald-700 uppercase font-bold tracking-widest text-sm">Transparência</p><h2 className="text-3xl md:text-4xl font-black mt-2">Regras de participação — versão preliminar</h2><p className="mt-3 text-slate-600">Regulamento informativo, sujeito à versão contratual definitiva antes de qualquer adesão paga.</p><div className="grid md:grid-cols-2 gap-5 mt-8">{itens.map(([n,t,d])=><div key={n} className="p-6 rounded-xl bg-slate-50 border border-slate-200"><div className="flex gap-3 items-center"><span className="font-black text-emerald-700">{n}</span><h3 className="font-bold text-lg">{t}</h3></div><p className="text-slate-600 mt-2">{d}</p></div>)}</div></div></section>
 <section id="cadastro" className="max-w-6xl mx-auto px-5 py-16"><div className="max-w-3xl mx-auto"><p className="font-bold text-emerald-700">PARTICIPE DESDE O INÍCIO</p><h2 className="text-3xl md:text-4xl font-black mt-2">Pré-cadastro do Clube de Permutas</h2><p className="text-slate-600 mt-3 mb-7">Preencha o formulário diretamente nesta página. O envio ficará disponível após a ativação do endereço exclusivo do clube e do serviço seguro de recebimento.</p><CadastroPermutas /></div></section>
 <section className="text-center bg-slate-900 text-white py-10 px-5"><h2 className="text-2xl font-black">Clube de Permutas • TV Voz de Brasília</h2><p className="mt-3 text-slate-300">Uma iniciativa para conectar negócios, profissionais e oportunidades.</p><a href="/" className="text-amber-300 underline mt-5 inline-block">Voltar ao portal</a></section>
 </main><Footer/></>;
}