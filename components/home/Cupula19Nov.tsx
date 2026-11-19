import Link from 'next/link';

const fotoArquivo = 'https://www.whitehouse.gov/wp-content/uploads/2026/10/P20260924DT-1643.jpg?w=1200';

export default function Cupula19Nov() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-7" aria-label="Cobertura internacional de 19 de novembro de 2026">
      <div className="overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-lg">
        <div className="bg-slate-950 px-6 py-3 text-xs font-black uppercase tracking-widest text-amber-300">
          Mundo · Destaque internacional · 19/11/2026
        </div>
        <div className="grid lg:grid-cols-2">
          <div className="p-7 md:p-9">
            <p className="mb-2 text-sm font-bold text-amber-700">Cúpula na China</p>
            <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
              Trump, Putin e Xi se reúnem e colocam armas nucleares e guerras na agenda mundial
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              Os presidentes dos Estados Unidos, da Rússia e da China participaram nesta quinta-feira de uma cúpula inédita em Shenzhen, durante a APEC. O diálogo abordou riscos nucleares, Ucrânia, Irã e relações comerciais; declarações divulgadas por autoridades apontam entendimento para ampliar conversas, sem anúncio de acordo de paz.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Antes da reunião conjunta, Trump conversou separadamente com Putin e Xi Jinping. A cúpula reuniu as três potências em meio a disputas geopolíticas e comerciais.
            </p>
            <Link href="/mundo/cupula-trump-putin-xi-19-nov-2026" className="mt-5 inline-block rounded-lg bg-amber-400 px-5 py-3 font-black text-slate-950 hover:bg-amber-300">
              Ler a reportagem completa
            </Link>
          </div>
          <div className="bg-slate-100">
            <img src={fotoArquivo} alt="Donald Trump e Xi Jinping conversam em fotografia oficial de setembro de 2026, anterior à cúpula com Putin" className="h-full min-h-[260px] w-full object-cover" loading="eager" />
            <p className="px-4 py-2 text-xs text-slate-600">Foto de arquivo (24/09/2026): Trump e Xi na Casa Branca. Foto oficial: Daniel Torok / White House. Não é imagem do encontro trilateral.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
