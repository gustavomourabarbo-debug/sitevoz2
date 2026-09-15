import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = { title: 'STF diante do espelho — análise de Paulo Fayad | Voz de Brasília' };

export default function AnaliseSTF() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-5 bg-white py-8 rounded-xl shadow-sm">
          <div className="text-red-700 font-bold uppercase tracking-wide">Análise • Paulo Fayad</div>
          <h1 className="text-4xl font-black mt-3 mb-5">O Supremo diante do espelho</h1>
          <img src="https://static.metricool.com/planner/202609/6885599-file-14133517272000082486.png" alt="Capa especial sobre a sessão do STF" className="w-full rounded-xl mb-7" />
          <p className="text-xl leading-8 mb-5">A sessão extraordinária desta terça-feira colocou o Supremo Tribunal Federal diante de uma questão que vai muito além de Alexandre de Moraes e André Mendonça: a capacidade da própria Corte de examinar fatos envolvendo seus integrantes com transparência, equilíbrio e respeito ao devido processo.</p>
          <p className="text-xl leading-8 mb-5">Edson Fachin assumiu a condução de uma sessão institucionalmente delicada. Ao organizar o rito e levar a discussão ao plenário, o presidente do STF colocou a controvérsia sob escrutínio público, num momento em que a credibilidade da instituição está no centro do debate.</p>
          <p className="text-xl leading-8 mb-5">Gilmar Mendes, por sua vez, vinha defendendo que os casos relacionados a Moraes e Mendonça fossem analisados de forma conjunta e chegou a sugerir o adiamento da sessão. A divergência expõe uma disputa não apenas sobre conclusões, mas sobre o próprio caminho processual que o Supremo deve seguir.</p>
          <p className="text-xl leading-8 mb-5">Minha posição é clara: investigar não significa condenar. Da mesma forma, questionamentos sobre a origem ou a validade de provas precisam ser examinados juridicamente, e não transformados em sentença antecipada.</p>
          <p className="text-xl leading-8 mb-5">O Supremo precisa sair desta crise maior do que entrou. Isso exige transparência, independência, contraditório e coragem institucional para esclarecer os fatos, sejam eles favoráveis ou desfavoráveis a qualquer ministro.</p>
          <p className="text-2xl font-bold leading-9 mt-8">Mais que o futuro de um ministro, está em julgamento a confiança da sociedade na própria instituição.</p>
          <div className="border-t mt-9 pt-5 font-bold">Paulo Fayad<br/><span className="font-normal">TV Voz de Brasília • 40+ anos de jornalismo</span></div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
