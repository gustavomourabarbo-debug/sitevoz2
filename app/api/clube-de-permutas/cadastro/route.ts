import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const texto = (valor: unknown, limite: number) =>
 typeof valor === 'string' ? valor.trim().slice(0, limite) : '';

export async function POST(request: Request) {
 try {
  const tipo = request.headers.get('content-type') || '';
  if (!tipo.includes('application/json')) return NextResponse.json({ erro: 'Formato inválido.' }, { status: 415 });
  if (Number(request.headers.get('content-length') || '0') > 12000)
   return NextResponse.json({ erro: 'Formulário muito extenso.' }, { status: 413 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ erro: 'Dados inválidos.' }, { status: 400 });
  const nome = texto(body.nome,120), email = texto(body.email,200), telefone = texto(body.telefone,40);
  const cidade = texto(body.cidade,100), perfil = texto(body.perfil,50), oferta = texto(body.oferta,1200), busca = texto(body.busca,1200);
  if (!nome || !email || !telefone || !cidade || !perfil || !oferta || !busca || body.aceite !== true)
   return NextResponse.json({ erro: 'Preencha todos os campos e autorize o contato.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
   return NextResponse.json({ erro: 'Informe um e-mail válido.' }, { status: 400 });
  if (!['Empresa','MEI','Profissional autônomo','Pessoa física'].includes(perfil))
   return NextResponse.json({ erro: 'Perfil inválido.' }, { status: 400 });
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID)
   return NextResponse.json({ erro: 'Recebimento temporariamente indisponível.' }, { status: 503 });

  const protocolo = randomUUID();
  const registro = {
    protocolo, data: new Date().toISOString(), nome, perfil, email,
    telefone, cidade, oferta, busca, consentimento: true,
    origem: 'vozdebrasilia.com.br/clube-de-permutas'
  };
  await put('inscricoes/'+new Date().toISOString().slice(0,10)+'/'+protocolo+'.json',
    JSON.stringify(registro), {
      access: 'private', contentType: 'application/json',
      addRandomSuffix: false
    });
  return NextResponse.json({ ok: true, protocolo }, {
    headers: { 'Cache-Control': 'no-store' }
  });
 } catch (error) {
  console.error('Falha ao salvar cadastro no armazenamento privado', error instanceof Error ? error.name : 'erro');
  return NextResponse.json({ erro: 'Não foi possível concluir o cadastro. Tente novamente.' }, { status: 500 });
 }
}
