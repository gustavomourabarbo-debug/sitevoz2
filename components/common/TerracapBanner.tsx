import c0 from './detran/chunk0';
import c1 from './detran/chunk1';
import c2 from './detran/chunk2';
import c3 from './detran/chunk3';
import c4 from './detran/chunk4';
import c5 from './detran/chunk5';
import c6 from './detran/chunk6';
import c7 from './detran/chunk7';
import c8 from './detran/chunk8';
import c9 from './detran/chunk9';
import c10 from './detran/chunk10';

const detranBanner = 'data:image/gif;base64,' + c0 + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9 + c10;

export default function TerracapBanner() {
  const href = 'https://youtu.be/2i33OO9AKuU';

  return (
    <div className="w-full bg-white border-b border-gray-100 py-2">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-[9px] uppercase tracking-[0.18em] text-gray-400 font-semibold mb-1">
          Publicidade
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          aria-label="DETRAN-DF - Campanha Segurança do Motociclista 2026"
        >
          <img
            src={detranBanner}
            alt="DETRAN-DF - Campanha Segurança do Motociclista 2026"
            width="728"
            height="90"
            className="block w-full max-w-[728px] h-auto mx-auto"
          />
        </a>
      </div>
    </div>
  );
}
