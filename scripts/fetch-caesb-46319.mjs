import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';

// Materiais originais fornecidos pela Mene & Portella, PI 46319.
// Uso dos quatro originais de maior resolução 970 x 250, sem ampliação nem recorte.
const assets = [
  { slug: 'cafe', id: '1na9qTUS1Q697w_JJTSxq2r6Xc2SE8X0r', size: 19089048, sha256: '9caefb7ea175667368e537852b51a4b9a40413d1e64e2b9dfd11b306077b6c69' },
  { slug: 'vaso', id: '1tO-v1Y3MZ1iw14hL-SJTo4b1Z8MIuEgm', size: 19192809, sha256: '888b32510bae89c4dd1b72b8ffb877971581344e273c541e08ef0ded39c344ef' },
  { slug: 'oleo', id: '1ftiQEDbZTsapl-cLarKwN8O6yzeSIjw0', size: 18836502, sha256: '6e2f3ee2e618e011e32c0f6a89e2f630b8d2688257134bb3175df22f6cb03bdb' },
  { slug: 'chuva', id: '14Y6dczyhHPD_kE1JqgjgfascvHag2mXU', size: 28039680, sha256: '66359032c304eebdea09283ea4aa693a3a086398080da0994307a64e4b7beccc' },
];
const folder = resolve(process.cwd(), 'public', 'publicidade', 'caesb-46319');
await mkdir(folder, { recursive: true });

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const isOriginal = (bytes, asset) => bytes.length === asset.size && sha256(bytes) === asset.sha256;

async function download(asset) {
  const path = join(folder, asset.slug + '.mp4');
  try {
    const bytes = await readFile(path);
    if (isOriginal(bytes, asset)) {
      console.log('CAESB PI 46319: original verificado SHA-256 ' + asset.slug + ' ' + asset.sha256);
      return;
    }
  } catch { /* download the exact original */ }
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
      if (!isOriginal(bytes, asset)) throw new Error('Arquivo diferente do original SHA-256');
      await writeFile(path, bytes);
      console.log('CAESB PI 46319: original verificado SHA-256 ' + asset.slug + ' ' + asset.sha256);
      console.log('CAESB PI 46319: arquivo ' + asset.slug + ' (' + bytes.length + ' bytes) preparado.');
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error('CAESB PI 46319: original indisponivel ' + asset.slug + ': ' + String(lastError));
}

await Promise.all(assets.map(download));

const gdf = await readFile(resolve(process.cwd(), 'public', 'publicidade', 'gdf-145080', 'banner.gif'));
if (gdf.length !== 65359 || sha256(gdf) !== 'be890187d4559f642c0d6c1f3627c536eb463028fc8571f09770bf2c61d088bd') {
  throw new Error('GDF PI 145080: GIF diferente do original da agencia');
}
console.log('GDF PI 145080: GIF original verificado SHA-256 ' + sha256(gdf));
