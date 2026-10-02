import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const GEMINI_MODELS = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash-lite'];

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

    let lastStatus = 503;
    let lastData: any = null;

    for (const model of GEMINI_MODELS) {
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
                parts: [{ text: prompt.trim() }],
              },
            ],
          }),
          cache: 'no-store',
        }
      );

      const data = await response.json().catch(() => null);

      if (response.ok) {
        const text = data?.candidates?.[0]?.content?.parts
          ?.map((part: { text?: string }) => part.text ?? '')
          .join('')
          .trim();

        if (text) {
          return NextResponse.json({ text, model });
        }
      }

      lastStatus = response.status;
      lastData = data;
      console.error('Gemini API error:', model, response.status, data);

      if (![429, 500, 502, 503, 504].includes(response.status)) {
        break;
      }
    }

    console.error('Gemini providers exhausted:', lastStatus, lastData);
    return NextResponse.json(
      { error: 'Erro temporário ao gerar texto com o Gemini.' },
      { status: lastStatus || 503 }
    );
  } catch (error) {
    console.error('Gemini route error:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar a solicitação.' },
      { status: 500 }
    );
  }
}
