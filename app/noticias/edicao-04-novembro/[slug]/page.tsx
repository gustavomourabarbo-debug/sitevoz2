import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { noticias } from '@/lib/edicao-04-novembro';

const fotosPorSlug: Record<string, [string,string]> = {"qualificadf-movel":["https://www.agenciabrasilia.df.gov.br/documents/d/guest/4-11-foto-divulgacao-sedet-df-jpeg","Foto: Sedet-DF/Agência Brasília, 04/11/2026"],"emendas-federais-df":["https://www.agenciabrasilia.df.gov.br/documents/d/guest/whatsapp-image-2026-11-04-at-10-26-01-jpeg","Foto: Agência Brasília, 04/11/2026"],"gdf-saude":["https://www.agenciabrasilia.df.gov.br/documents/d/guest/foto-fachada-gdf-saude-jpg","Foto da sede do GDF Saúde: Agência Brasília"],"lei-rouanet":["https://agenciagov.ebc.com.br/noticias/202611/lei-rouanet-bate-recorde-de-25-6-mil-propostas-culturais-em-2026-1/@@images/1c31138c-f411-4034-999e-0420775c4b94.png","Imagem da divulgação da Lei Rouanet: Agência Gov"]};

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
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <article>
          <p className="text-sm font-bold uppercase text-green-700">{noticia.editoria}</p>
          <h1 className="my-3 text-3xl font-extrabold sm:text-5xl">{noticia.titulo}</h1>
          <figure className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><img src={fotosPorSlug[noticia.slug][0]} alt={"Foto documental da notícia: "+noticia.titulo} className="block h-auto max-h-[450px] w-full object-cover" loading="lazy" referrerPolicy="no-referrer"/><figcaption className="px-3 py-2 text-xs text-slate-600">{fotosPorSlug[noticia.slug][1]}</figcaption></figure><p className="text-xl text-slate-700">{noticia.resumo}</p>
          <p className="my-6 border-b pb-4 text-sm text-slate-600">Redação Voz de Brasília · <time dateTime="2026-11-04">4 de novembro de 2026</time></p>
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
