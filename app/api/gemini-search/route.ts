import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MODELS = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash'];

export async function POST(request: Request) {
  try {
    const secret = process.env.XELVYA_PROXY_SECRET;
    const supplied = request.headers.get('x-xelvya-secret');

    if (!secret || supplied !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY não configurada.' },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => null);
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';

    if (!prompt || prompt.length > 16000) {
      return NextResponse.json({ error: 'Prompt inválido.' }, { status: 400 });
    }

    let lastStatus = 503;
    let lastData: any = null;

    for (const model of MODELS) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: prompt }],
              },
            ],
            tools: [{ google_search: {} }],
            generationConfig: {
              temperature: 0.35,
            },
          }),
          cache: 'no-store',
          signal: AbortSignal.timeout(55000),
        }
      );

      const data = await response.json().catch(() => null);

      if (response.ok) {
        const candidate = data?.candidates?.[0];
        const text = candidate?.content?.parts
          ?.map((part: { text?: string }) => part.text || '')
          .join('')
          .trim();

        if (text) {
          const chunks = candidate?.groundingMetadata?.groundingChunks || [];
          const sources = chunks
            .map((chunk: any) => chunk?.web)
            .filter(Boolean)
            .map((web: any) => ({
              title: String(web.title || web.uri || 'Fonte'),
              url: String(web.uri || ''),
            }))
            .filter((source: any) => source.url)
            .filter(
              (source: any, index: number, array: any[]) =>
                array.findIndex(item => item.url === source.url) === index
            )
            .slice(0, 8);

          return NextResponse.json({
            text,
            model,
            sources,
            webSearchQueries:
              candidate?.groundingMetadata?.webSearchQueries || [],
          });
        }
      }

      lastStatus = response.status;
      lastData = data;
      console.error('Gemini grounded search error', model, response.status, data);

      if (![429, 500, 502, 503, 504].includes(response.status)) break;
    }

    return NextResponse.json(
      {
        error:
          lastData?.error?.message ||
          'Não foi possível consultar a internet agora.',
      },
      { status: lastStatus || 503 }
    );
  } catch (error) {
    console.error('gemini search route failed', error);
    return NextResponse.json(
      { error: 'Erro ao pesquisar na internet.' },
      { status: 503 }
    );
  }
}
