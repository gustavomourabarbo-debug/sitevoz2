import Link from 'next/link';

export default function ClubePermutasConvite() {
  return (
    <section
      aria-label="Convite ao Clube de Permutas Brasil"
      className="mx-auto max-w-[1400px] px-4 pt-6"
    >
      <div className="relative overflow-hidden rounded-2xl border border-emerald-700/30 bg-gradient-to-r from-slate-950 via-blue-950 to-emerald-900 text-white shadow-lg">
        <div className="flex flex-col items-start justify-between gap-6 px-6 py-7 md:flex-row md:items-center md:px-10 md:py-8">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-300">
              Uma iniciativa da TV Voz de Brasília
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight md:text-3xl">
              Clube de Permutas Brasil
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-100 md:text-base">
              Empresas e profissionais liberais: informe o que você oferece e o que
              procura. Participe da formação de uma rede de oportunidades comerciais.
            </p>
            <p className="mt-2 text-xs font-semibold text-emerald-200">
              Pré-inscrições abertas para análise • Sem cobrança nesta etapa
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row md:flex-col lg:flex-row">
            <Link
              href="/clube-de-permutas#cadastro"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-400 px-6 py-3 text-center font-extrabold text-slate-950 transition-colors hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              FAZER MINHA INSCRIÇÃO
            </Link>
            <Link
              href="/clube-de-permutas"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/50 px-6 py-3 text-center font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              CONHECER O CLUBE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
