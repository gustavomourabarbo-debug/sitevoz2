import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { noticias } from '@/lib/edicao-03-novembro';

const fotosPorSlug: Record<string, [string,string]> = {"candangolandia-70-anos":["https://agenciabrasilia.df.gov.br/documents/d/guest/3-11-candangolandia-foto-arquivo2-jpg","Foto documental da Candangolândia: Arquivo/Agência Brasília"],"adote-uma-praca":["https://www.agenciabrasilia.df.gov.br/documents/d/guest/capa-adote-uma-praca-gama-jro_2094-14-jpg","Foto: Arquivo/Agência Brasília, programa Adote uma Praça"],"residencia-profissional-df":["https://www.gdfsaude.df.gov.br/documents/d/guest/whatsapp-image-2026-11-03-at-08-10-44-jpeg","Foto: Agência Saúde DF/Fepecs, 03/11/2026"],"feirao-limpa-nome":["https://agenciagov.ebc.com.br/noticias/202611/correios-e-serasa-promovem-nova-edicao-do-feirao-limpa-nome-com-atendimento-em-mais-de-7-mil-agencias/@@images/6420ad5c-546a-4568-ac30-1d4041e9bfc3.jpeg","Foto: Correios / Agência Gov, 03/11/2026"]};

export function generateStaticParams() {
  return noticias.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const noticia = noticias.find(({ slug }) => slug === params.slug);
  return noticia ? { title: noticia.titulo + ' | Voz de Brasília', description: noticia.resumo } : {};
}

export default function Reportagem({ params }: { params: { slug: string } }) {
  const noticia = noticias.find(({ slug }) => slug === params.slug);
  if (!noticia) notFound();

  return (
    <>
      <Header dataEdicao="2026-11-03" />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <article>
          <p className="text-sm font-bold uppercase text-green-700">{noticia.editoria}</p>
          <h1 className="my-3 text-3xl font-extrabold sm:text-5xl">{noticia.titulo}</h1>
          <figure className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><img src={fotosPorSlug[noticia.slug][0]} alt={"Foto documental da notícia: "+noticia.titulo} className="block h-auto max-h-[450px] w-full object-cover" loading="lazy" referrerPolicy="no-referrer"/><figcaption className="px-3 py-2 text-xs text-slate-600">{fotosPorSlug[noticia.slug][1]}</figcaption></figure><p className="text-xl text-slate-700">{noticia.resumo}</p>
          <p className="my-6 border-b pb-4 text-sm text-slate-600">Redação Voz de Brasília · <time dateTime="2026-11-03">3 de novembro de 2026</time></p>
          <div className="space-y-5 text-lg leading-relaxed">
            {noticia.texto.map((paragrafo) => <p key={paragrafo}>{paragrafo}</p>)}
          </div>
          <p className="mt-8 text-sm text-slate-600">Fonte consultada: {noticia.fonte}.</p>
        </article>
        <Link href="/" className="mt-8 inline-block font-semibold text-green-800 underline">Voltar à capa</Link>
      </main>
      <Footer />
    </>
  );
}
