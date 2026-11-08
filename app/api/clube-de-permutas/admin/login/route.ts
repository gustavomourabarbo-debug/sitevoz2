import {NextResponse} from 'next/server';
import {validPassword,createSession,sessionCookie,sameOrigin} from '@/lib/clube-admin';
export const runtime='nodejs';
export async function POST(request:Request){
 if(!sameOrigin(request))return NextResponse.json({erro:'Origem não permitida.'},{status:403});
 const b=await request.json().catch(()=>null);
 const password=typeof b?.password==='string'?b.password:'';
 if(!password||password.length>256||!validPassword(password))
  return NextResponse.json({erro:'Acesso não autorizado.'},{status:401});
 const response=NextResponse.json({ok:true});
 response.cookies.set(sessionCookie,createSession(),{httpOnly:true,secure:true,sameSite:'strict',path:'/api/clube-de-permutas/admin',maxAge:8*60*60});
 return response;
}
export async function DELETE(request:Request){
 if(!sameOrigin(request))return NextResponse.json({erro:'Origem não permitida.'},{status:403});
 const response=NextResponse.json({ok:true});
 response.cookies.set(sessionCookie,'',{httpOnly:true,secure:true,sameSite:'strict',path:'/api/clube-de-permutas/admin',maxAge:0});
 return response;
}
