import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

const allowedRatios = new Set(['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9']);

export async function POST(request: Request) {
  try {
    const secret = process.env.XELVYA_PROXY_SECRET;
    const supplied = request.headers.get('x-xelvya-secret');
    if (!secret || supplied !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY não configurada.' }, { status: 503 });
    }

    const body = await request.json().catch(() => null);
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
    const aspectRatio = allowedRatios.has(body?.aspectRatio) ? body.aspectRatio : '1:1';

    if (!prompt || prompt.length > 1200) {
      return NextResponse.json({ error: 'Prompt inválido.' }, { status: 400 });
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ['IMAGE'],
            imageConfig: { aspectRatio },
          },
        }),
        cache: 'no-store',
        signal: AbortSignal.timeout(55000),
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error('Gemini image error', response.status, data);
      return NextResponse.json(
        { error: data?.error?.message || 'Falha no provedor de imagem.' },
        { status: response.status || 503 }
      );
    }

    const parts = data?.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((part: any) => part?.inlineData?.data || part?.inline_data?.data);
    const inline = imagePart?.inlineData || imagePart?.inline_data;

    if (!inline?.data) {
      return NextResponse.json({ error: 'O provedor não retornou imagem.' }, { status: 503 });
    }

    return NextResponse.json({
      data: inline.data,
      mimeType: inline.mimeType || inline.mime_type || 'image/png',
      model: 'gemini-2.5-flash-image',
    });
  } catch (error) {
    console.error('gemini image route failed', error);
    return NextResponse.json({ error: 'Erro ao gerar imagem.' }, { status: 503 });
  }
}
