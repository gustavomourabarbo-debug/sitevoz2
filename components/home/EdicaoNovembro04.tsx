const noticias = [
  {
    editoria: 'Educação e trabalho',
    titulo: 'QualificaDF Móvel oferece 907 vagas gratuitas em quatro regiões',
    resumo: 'Taguatinga Sul, Cruzeiro, São Sebastião e Sol Nascente recebem cursos de qualificação. As inscrições vão até 17 de novembro e as aulas começam no dia 24.',
    fonte: 'Agência Brasília',
    url: 'https://www.agenciabrasilia.df.gov.br/w/gdf-abre-907-vagas-gratuitas-em-cursos-do-qualificadf-movel-em-quatro-regioes-do-df',
  },
  {
    editoria: 'Distrito Federal',
    titulo: 'GDF propõe 420 projetos para emendas federais de 2027',
    resumo: 'A lista entregue à bancada do DF reúne R$ 4,3 bilhões em propostas nas áreas de saúde, educação, infraestrutura e assistência social, entre outras.',
    fonte: 'Agência Brasília',
    url: 'https://www.agenciabrasilia.df.gov.br/w/gdf-sugere-420-projetos-para-captar-r-43-bilhoes-em-emendas-federais',
  },
  {
    editoria: 'Saúde',
    titulo: 'GDF Saúde mantém mensalidades sem reajuste em 2027',
    resumo: 'O conselho do Inas aprovou a manutenção dos valores pagos por servidores do DF e seus dependentes.',
    fonte: 'Agência Brasília',
    url: 'https://www.agenciabrasilia.df.gov.br/w/gdf-saude-tera-reajuste-zero-nas-mensalidades-em-2027',
  },
  {
    editoria: 'Cultura',
    titulo: 'Lei Rouanet recebe 25,6 mil propostas culturais em 2026',
    resumo: 'O balanço federal registra recorde de inscrições de projetos no mecanismo de incentivo à cultura.',
    fonte: 'Agência Gov',
    url: 'https://agenciagov.ebc.com.br/noticias/202611/lei-rouanet-bate-recorde-de-25-6-mil-propostas-culturais-em-2026-1',
  },
];
const [manchete, ...secundarias] = noticias;

export default function EdicaoNovembro04() {
  return (
    <section aria-label="Notícias de 4 de novembro de 2026" className="mx-auto max-w-[1400px] px-4 py-5">
      <article className="grid overflow-hidden rounded-2xl bg-slate-900 text-white md:grid-cols-2">
        <div className="p-6 md:p-8">
          <p className="text-sm font-bold text-amber-300">EDIÇÃO 04/11/2026 · {manchete.editoria}</p>
          <h1 className="my-3 text-3xl font-black md:text-4xl">{manchete.titulo}</h1>
          <p className="text-lg text-slate-200">{manchete.resumo}</p>
          <a href={manchete.url} className="mt-5 inline-block rounded-lg bg-amber-400 px-4 py-2 font-bold text-slate-950">
            Leia na {manchete.fonte}
          </a>
        </div>
        <figure className="relative">
          <img
            src="https://www.agenciabrasilia.df.gov.br/documents/20117/0/Qualifica-DF-1536x10203333.jpg/8af7c9df-9670-4350-4dc4-3eec1dcd5b1a?version=1.0"
            alt="Atividade de qualificação profissional do programa QualificaDF"
            className="h-full w-full object-cover"
          />
          <figcaption className="absolute bottom-0 right-0 bg-slate-900 px-2 py-1 text-xs">Divulgação/Sedet-DF</figcaption>
        </figure>
      </article>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {secundarias.map(({ editoria, titulo, resumo, fonte, url }) => (
          <article key={url} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase text-green-700">{editoria} · 04/11/2026</p>
            <h2 className="my-2 text-xl font-bold">{titulo}</h2>
            <p className="mb-3 text-sm text-slate-700">{resumo}</p>
            <a href={url} className="font-semibold text-green-800 underline">Leia na {fonte}</a>
          </article>
        ))}
      </div>
    </section>
  );
}
