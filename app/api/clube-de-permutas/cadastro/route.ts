import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const texto = (valor: unknown, limite: number) =>
 typeof valor === 'string' ? valor.trim().slice(0, limite) : '';

export async function POST(request: Request) {
 try {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ erro: 'Dados inválidos.' }, { status: 400 });
  const nome = texto(body.nome,120), email = texto(body.email,200), telefone = texto(body.telefone,40);
  const cidade = texto(body.cidade,100), perfil = texto(body.perfil,50), oferta = texto(body.oferta,1200), busca = texto(body.busca,1200);
  if (!nome || !email || !telefone || !cidade || !perfil || !oferta || !busca || body.aceite !== true)
   return NextResponse.json({ erro: 'Preencha todos os campos e autorize o contato.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
   return NextResponse.json({ erro: 'Informe um e-mail válido.' }, { status: 400 });

  // A conta Gmail destinatária e as credenciais de envio devem ser ativadas no servidor.
  const chave = process.env.BREVO_API_KEY;
  const remetente = process.env.CLUBE_EMAIL_REMETENTE;
  const destino = process.env.CLUBE_EMAIL_DESTINO;
  if (!chave || !remetente || !destino)
   return NextResponse.json({ erro: 'O recebimento de inscrições está em configuração. Tente novamente quando a ativação for concluída.' }, { status: 503 });

  const campos = [['Nome', nome],['Perfil', perfil],['E-mail', email],['WhatsApp', telefone],['Cidade/UF', cidade],['Oferece', oferta],['Procura', busca],['Consentimento para contato','Sim']];
  const mensagem = campos.map(([titulo,valor])=>titulo+': '+valor).join('\n\n');
  const resultado = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'api-key': chave },
    body: JSON.stringify({
      sender: { name: 'Clube de Permutas — Voz de Brasília', email: remetente },
      to: [{email: destino}],
      replyTo: {email, name: nome},
      subject: 'Novo pré-cadastro Clube de Permutas — '+nome,
      textContent: mensagem
    }),
    cache: 'no-store'
  });
  if (!resultado.ok) {
    console.error('Clube de Permutas: falha na entrega via provedor:', resultado.status);
    return NextResponse.json({ erro: 'Não foi possível enviar sua inscrição. Tente novamente.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
 } catch {
  return NextResponse.json({ erro: 'Erro ao processar a inscrição. Tente novamente.' }, { status: 500 });
 }
}
