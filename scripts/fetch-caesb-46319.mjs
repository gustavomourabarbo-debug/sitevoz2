import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

// Materiais originais fornecidos pela Mene & Portella, PI 46319.
// A agência ainda não forneceu CHUVA no tamanho contratado de 728 x 90.
const assets = [
  { slug: 'cafe', id: '1AyWaZ3o1fZIPUBcMCl95s3GyVYd9_PDm' },
  { slug: 'vaso', id: '1S7JN_0oVHYFaSs3zc4dhcIVn-FiC2yMH' },
  { slug: 'oleo', id: '1_6zUYCqdRxZz3EdNpXb5842gcfzPCYPh' },
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
      const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(25000) });
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
