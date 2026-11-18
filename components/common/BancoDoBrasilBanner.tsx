export default function BancoDoBrasilBanner() {
  return (
    <section className="relative z-0 mx-auto max-w-[1400px] px-4 pt-3" aria-label="Banco do Brasil">
      <div className="mx-auto max-w-[1100px] rounded-2xl bg-[#f8d92f] px-6 py-4 text-[#173a83] shadow-sm md:flex md:items-center md:justify-between">
        <div>
          <p className="text-2xl font-black md:text-3xl">Banco do Brasil</p>
          <p className="mt-1 text-sm font-medium md:text-base">Soluções financeiras para pessoas e empresas.</p>
        </div>
        <a href="https://www.bb.com.br/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block shrink-0 rounded-lg bg-[#173a83] px-5 py-3 text-center font-bold text-white hover:bg-[#102d67] md:mt-0">Conheça o BB</a>
      </div>
    </section>
  );
}
