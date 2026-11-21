import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Celina Leão firma acordo para facilitar negociação de pequenas dívidas no Distrito Federal | Voz de Brasília',
  description: 'Acordo assinado em 19 de novembro prevê negociação de débitos de pequeno valor, redução de custos de protesto e canais digitais no Distrito Federal.',
  alternates: { canonical: 'https://www.vozdebrasilia.com.br/noticia/celina-leao-negociacao-dividas-df' },
  openGraph: { title: 'Celina Leão firma acordo para facilitar negociação de pequenas dívidas no Distrito Federal', type: 'article', images: ['https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2024/12/31140019/53153252639_3e99496d5c_k.jpg'] },
};
export const revalidate = 3600;
const paragraphs = [
  "O Governo do Distrito Federal anunciou uma nova modalidade de negociação de dívidas de pequeno valor que pretende reduzir custos e simplificar a regularização de pendências. O convênio que instituiu a chamada Cobrança Social Extrajudicial foi assinado pela governadora Celina Leão na quinta-feira, 19 de novembro.",
  "A iniciativa reúne órgãos distritais, concessionárias de serviços essenciais e representantes dos cartórios de protesto. A proposta é criar caminhos menos onerosos para que moradores solucionem contas atrasadas e retirem restrições relacionadas a débitos que se enquadrem nas regras do acordo.",
  "De acordo com os critérios divulgados, o mecanismo abrange dívidas vencidas há pelo menos 30 dias e no máximo 120 dias, de valor não superior a um terço do salário mínimo vigente. Para verificar esse limite, considera-se cada obrigação ou o conjunto de débitos de um mesmo devedor perante o mesmo credor.",
  "Entre as alternativas previstas estão descontos, parcelamentos e renegociação de valores em aberto. Os participantes também deverão disponibilizar ferramentas eletrônicas que facilitem consultas, a apresentação de propostas e a escolha das condições de pagamento.",
  "Um ponto central do convênio é a redução das despesas cartorárias. Nos casos abrangidos pela modalidade, os emolumentos de protesto e cancelamento não poderão ultrapassar 30% do valor da dívida. Custos adicionais devidamente comprovados, como despesas postais, bancárias ou de intimação, não estão incluídos nesse percentual.",
  "Há ainda uma regra específica para débitos que já foram protestados e continuam sem cancelamento do registro. A redução de custos poderá ser aplicada nessas situações quando o montante final negociado não ultrapassar um salário mínimo, conforme as condições informadas pelos responsáveis pela iniciativa.",
  "Os cartórios deverão manter canais eletrônicos gratuitos para consulta e negociação, com informações sobre débitos, benefícios disponíveis e possibilidades de quitação. Após o pagamento, o cancelamento digital do protesto deverá ser efetivado em até 20 dias, segundo as regras anunciadas.",
  "A Central Nacional de Serviços Eletrônicos dos Tabeliães de Protesto estima que cerca de 497 mil pessoas poderão ser alcançadas pela medida. Trata-se de uma estimativa de público potencial, e não de um número de moradores já atendidos ou com descontos concedidos.",
  "Participam do acordo o Instituto de Estudos de Protesto de Títulos do Brasil no DF, a associação distrital de notários e registradores, a Procuradoria-Geral do DF, a Neoenergia e a Caesb, além dos 15 cartórios de protesto da capital. O texto prevê 90 dias para a adoção dos procedimentos administrativos e operacionais necessários ao funcionamento da modalidade.",
  "O convênio tem vigência inicial de 24 meses, com possibilidade de prorrogação. Para o consumidor, a orientação é conferir se o tipo de débito, o valor e o prazo de atraso se enquadram nas condições oficiais antes de negociar. A efetiva aplicação dos benefícios dependerá da implementação das rotinas pelos participantes e da análise de cada caso."
];
export default function CelinaDividasDF() {
 return <main className="min-h-screen bg-slate-50">
  <article className="mx-auto max-w-[920px] px-5 py-10 md:py-14">
   <Link href="/" className="font-semibold text-blue-800 hover:underline">← Voltar à capa da Voz de Brasília</Link>
   <div className="mt-9 text-xs font-extrabold uppercase tracking-widest text-green-800">Distrito Federal · Política pública · 20 de novembro de 2026</div>
   <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 md:text-5xl">Celina Leão firma acordo para facilitar negociação de pequenas dívidas no Distrito Federal</h1>
   <p className="mt-5 text-xl leading-relaxed text-slate-700">Convênio com concessionárias e cartórios estabelece regras para renegociação de débitos, redução de despesas de protesto e atendimento digital.</p>
   <p className="mt-5 text-sm font-semibold text-slate-600">Redação Voz de Brasília · Brasília (DF)</p>
   <figure className="my-8 overflow-hidden rounded-2xl bg-white shadow-sm">
      <img src="https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2024/12/31140019/53153252639_3e99496d5c_k.jpg" alt="Celina Leão em fotografia de arquivo do GDF" className="mx-auto block max-h-[520px] h-auto w-full object-contain" referrerPolicy="no-referrer" />
      <figcaption className="px-4 py-3 text-xs text-slate-600">Celina Leão em imagem de arquivo, de 2024. Foto: George Gianni/GDF.</figcaption>
   </figure>
   <div className="space-y-6 text-[18px] leading-[1.85] text-slate-900">
    {paragraphs.map((paragraph, index)=><p key={index}>{paragraph}</p>)}
   </div>
   <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-600">
     <p>Reportagem de redação própria elaborada a partir das informações oficiais divulgadas em 19 e atualizadas em 20 de novembro de 2026. A publicação não representa entrevista exclusiva.</p>
     <p className="mt-2"><a href="https://www.agenciabrasilia.df.gov.br/w/gdf-cria-modalidade-de-cobranca-extrajudicial-para-negociar-dividas" target="_blank" rel="noopener noreferrer" className="text-blue-800 underline">Documento de referência e critérios oficiais para consulta</a></p>
   </div>
   <div className="mt-8"><Link href="/" className="font-bold text-blue-800 hover:underline">Voltar às notícias</Link></div>
  </article>
 </main>;
}