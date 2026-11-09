import {NextResponse} from 'next/server';
import {get} from '@vercel/blob';
import {isAdmin,sameOrigin} from '@/lib/clube-admin';
import {notificarDecisao} from '@/lib/clube-notificacoes';
export const runtime='nodejs';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
async function registro(path:string){const f=await get(path,{access:'private'}).catch(()=>null);return f?.stream?JSON.parse(await new Response(f.stream).text()):null;}
export async function POST(request:Request){
 if(!isAdmin()||!sameOrigin(request))return NextResponse.json({erro:'Acesso não autorizado.'},{status:401});
 const b=await request.json().catch(()=>null),protocolo=typeof b?.protocolo==='string'?b.protocolo:'';
 if(!uuid.test(protocolo))return NextResponse.json({erro:'Protocolo inválido.'},{status:400});
 const [cadastro,decisao]=await Promise.all([
  registro('credenciamento/convites/'+protocolo+'.json'),
  registro('credenciamento/decisoes/'+protocolo+'.json')
 ]);
 if(!cadastro||!decisao||!['APROVADO','REPROVADO','EM_ANALISE'].includes(decisao.status))
  return NextResponse.json({erro:'Não existe decisão para comunicar.'},{status:409});
 const notificacao=await notificarDecisao({email:cadastro.email,nome:cadastro.nome,protocolo,status:decisao.status});
 return NextResponse.json({ok:notificacao.enviado,notificacao},{status:notificacao.enviado?503:200});
}
