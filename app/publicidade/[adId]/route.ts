import { NextResponse } from 'next/server';

const adsConfig: Record<string, { token: string; width: string; height: string }> = {
  '728-90': {
    token: 'cad1456400464e69a8a7ada3d2ccab43',
    width: '728',
    height: '90'
  },
  '300-250': {
    token: '02cda84a0e4149c2855e170b9c26dedd',
    width: '300',
    height: '250'
  },
  '300-600': {
    token: '528c9f9e89c0496a8d9da2ba4bfb1124',
    width: '300',
    height: '600'
  }
};

export async function generateStaticParams() {
  return [
    { adId: '728-90' },
    { adId: '300-250' },
    { adId: '300-600' }
  ];
}

export async function GET(
  request: Request,
  { params }: { params: { adId: string } }
) {
  const { adId } = params;
  const config = adsConfig[adId];

  if (!config) {
    return new NextResponse('Ad Config Not Found', { status: 404 });
  }

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Ad ${config.width}x${config.height}</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
      }
    </style>
  </head>
  <body>
    <script src="https://cdn.snsrsv.com/sdk.js"></script>
    <script>
      try {
        new sdk("${config.token}")
          .setSize("${config.width}", "${config.height}")
          .start();
      } catch (e) {
        console.error("Ad load error:", e);
      }
    </script>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
