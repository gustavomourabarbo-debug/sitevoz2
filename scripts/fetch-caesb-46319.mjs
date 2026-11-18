import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

// Materiais originais fornecidos pela Mene & Portella, PI 46319.
// Uso dos quatro originais de maior resolução 970 x 250, sem ampliação nem recorte.
const assets = [
  { slug: 'cafe', id: '1na9qTUS1Q697w_JJTSxq2r6Xc2SE8X0r' },
  { slug: 'vaso', id: '1tO-v1Y3MZ1iw14hL-SJTo4b1Z8MIuEgm' },
  { slug: 'oleo', id: '1ftiQEDbZTsapl-cLarKwN8O6yzeSIjw0' },
  { slug: 'chuva', id: '14Y6dczyhHPD_kE1JqgjgfascvHag2mXU' },
];
const folder = resolve(process.cwd(), 'public', 'publicidade', 'caesb-46319');
await mkdir(folder, { recursive: true });

async function download(asset) {
  const urls = [
    'https://drive.google.com/uc?export=download&id=' + asset.id,
    'https://drive.usercontent.google.com/download?id=' + asset.id + '&export=download&confirm=t',
  ];
  let lastError;
  for (const url of urls) {
    try {
      const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(45000) });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 100000 || bytes.toString('ascii', 4, 8) !== 'ftyp') {
        throw new Error('Resposta nao e video MP4 valido (' + bytes.length + ' bytes)');
      }
      await writeFile(join(folder, asset.slug + '.mp4'), bytes);
      console.log('CAESB PI 46319: arquivo ' + asset.slug + ' (' + bytes.length + ' bytes) preparado.');
      return;
    } catch (error) {
      lastError = error;
    }
  }
  // A indisponibilidade de um link externo não deve derrubar o site.
  // O componente tentará o endereço direto da mídia como contingência.
  console.warn('CAESB PI 46319: nao foi possivel baixar ' + asset.slug + ': ' + String(lastError));
}

await Promise.all(assets.map(download));
