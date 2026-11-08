import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const texto = (valor: unknown, limite: number) =>
 typeof valor === 'string' ? valor.trim().slice(0, limite) : '';
const iniciaisMaiusculas = (valor: string) => valor.replace(/(^|[\s'/-])(\p{L})/gu, (_:string, separador:string, letra:string) => separador + letra.toLocaleUpperCase('pt-BR'));
const cidadeUF = (valor: string) => { const m=valor.match(/^(.*?)(\s*[/,–-]\s*|\s+)([a-zA-Z]{2})$/u); return m?iniciaisMaiusculas(m[1].trim())+'/'+m[3].toUpperCase():iniciaisMaiusculas(valor); };

export async function POST(request: Request) {
 try {
  const tipo = request.headers.get('content-type') || '';
  if (!tipo.includes('application/json')) return NextResponse.json({ erro: 'Formato inválido.' }, { status: 415 });
  if (Number(request.headers.get('content-length') || '0') > 12000)
   return NextResponse.json({ erro: 'Formulário muito extenso.' }, { status: 413 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ erro: 'Dados inválidos.' }, { status: 400 });
  const nome = iniciaisMaiusculas(texto(body.nome,120)), email = texto(body.email,200).toLowerCase(), telefone = texto(body.telefone,40);
  const cidade = cidadeUF(texto(body.cidade,100)), perfil = texto(body.perfil,50), oferta = iniciaisMaiusculas(texto(body.oferta,1200)), busca = iniciaisMaiusculas(texto(body.busca,1200));
  if (!nome || !email || !telefone || !cidade || !perfil || !oferta || !busca || body.aceite !== true)
   return NextResponse.json({ erro: 'Preencha todos os campos e autorize o contato.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
   return NextResponse.json({ erro: 'Informe um e-mail válido.' }, { status: 400 });
  if (!['Empresa','Profissional'].includes(perfil))
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
  // O protocolo opaco permite continuar a qualificação sem expor dados do associado.
  await put('credenciamento/convites/'+protocolo+'.json',
    JSON.stringify({protocolo, perfil, email, nome, criadoEm:new Date().toISOString()}), {
      access:'private', contentType:'application/json', addRandomSuffix:false
    });
  let emailEnviado=false;
  // O disparo depende de provedor transacional autenticado e remetente verificado.
  // Não usamos a conta do visitante nem informamos envio caso a API rejeite.
  if(process.env.RESEND_API_KEY && process.env.CLUBE_EMAIL_REMETENTE){
   const endereco='https://www.vozdebrasilia.com.br/clube-de-permutas/credenciamento?protocolo='+encodeURIComponent(protocolo);
   try {
    const retorno=await fetch('https://api.resend.com/emails',{method:'POST',
     headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},
     body:JSON.stringify({
       from:'Clube de Permutas <'+process.env.CLUBE_EMAIL_REMETENTE+'>',
       to:[email],
       subject:'Clube de Permutas — complete seu credenciamento',
       text:'Olá, '+nome+'!\\n\\nRecebemos seu pré-cadastro no Clube de Permutas. Para validar sua empresa ou atuação profissional, preencha a ficha complementar: '+endereco+'\\n\\nPrecisaremos de endereço comercial, contatos, CNPJ quando aplicável, área de atuação e três referências comerciais autorizadas. O envio da ficha não significa aprovação automática.\\n\\nEquipe Clube de Permutas — TV Voz de Brasília'
     }),cache:'no-store'});
    emailEnviado=retorno.ok;
    if(!retorno.ok)console.error('Clube: e-mail de credenciamento não entregue ao provedor',retorno.status);
   }catch {console.error('Clube: falha de comunicação com provedor de e-mail');}
  }
  console.info('Clube de Permutas: cadastro gravado', protocolo);
  return NextResponse.json({ ok: true, protocolo, emailEnviado }, {
    headers: { 'Cache-Control': 'no-store' }
  });
 } catch (error) {
  console.error('Falha ao salvar cadastro no armazenamento privado', error instanceof Error ? error.name : 'erro');
  return NextResponse.json({ erro: 'Não foi possível concluir o cadastro. Tente novamente.' }, { status: 500 });
 }
}
