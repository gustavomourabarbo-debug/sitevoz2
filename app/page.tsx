import Header from '@/components/layout/Header';
import HeroCarousel from '@/components/home/HeroCarousel';
import LatestNews from '@/components/home/LatestNews';
import InterviewsSection from '@/components/home/InterviewsSection';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import CategoriesSection from '@/components/home/CategorySection'; // <-- IMPORT ADICIONADO
import { getPosts, getInterviewPosts } from "../lib/wordpress";

export default async function Home() {
  const posts = await getPosts(30);
  const interviews = await getInterviewPosts(5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20">

        {/* 🔥 BANNER ADICIONADO */}
  <div className="w-full text-center my-5 px-4">
  <a
    href="https://agenciabrasilia.df.gov.br/w/gdf-que-fez-acoes-do-governo-contribuem-para-melhorar-a-vida-da-populacao-em-diversas-areas"
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full"
  >
    <img
      src="https://www.vozdebrasilia.com.br/wp-content/uploads/2026/03/728x90-1.gif"
      alt="Banner publicitário"
      className="w-full max-w-[1200px] h-[140px] mx-auto object-cover"
    />
  </a>
 </div>

        <HeroCarousel posts={posts.slice(0, 5)} />

        <div className="bg-white py-8">
          <div className="max-w-[1400px] mx-auto px-4">
            <LatestNews posts={posts} />
          </div>
        </div>

        <div className="bg-gray-50 py-12">
          <div className="max-w-[1400px] mx-auto px-4">
            <InterviewsSection posts={interviews} />
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUNA PRINCIPAL */}
            <div className="lg:col-span-2 space-y-12">
              <CategoriesSection /> {/* <-- ADICIONADO AQUI */}
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}