import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const GEMINI_MODEL = 'gemini-3.6-flash';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY não está configurada no servidor.' },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => null);
    const prompt = body?.prompt;

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'Envie um prompt válido no corpo da requisição.' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
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
              parts: [{ text: prompt.trim() }],
            },
          ],
        }),
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error('Gemini API error:', response.status, data);
      return NextResponse.json(
        { error: 'Erro ao gerar texto com o Gemini.' },
        { status: response.status }
      );
    }

    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? '')
      .join('')
      .trim();

    if (!text) {
      return NextResponse.json(
        { error: 'O Gemini não retornou texto.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Gemini route error:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar a solicitação.' },
      { status: 500 }
    );
  }
}
