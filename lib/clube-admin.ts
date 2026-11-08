import {createHmac,createHash,timingSafeEqual} from 'node:crypto';
import {cookies} from 'next/headers';
const name='clube_admin';
const validPassword=(password:string)=>{
 const stored=process.env.CLUBE_ADMIN_PASSWORD_SHA256||'';
 if(!/^[a-f0-9]{64}$/.test(stored))return false;
 const digest=createHash('sha256').update(password).digest('hex');
 return timingSafeEqual(Buffer.from(digest),Buffer.from(stored));
};
export {validPassword};
export function createSession(){
 const secret=process.env.CLUBE_ADMIN_SESSION_SECRET;
 if(!secret)throw new Error('Sessão indisponível');
 const exp=Date.now()+8*60*60*1000;
 const payload=String(exp);
 const mac=createHmac('sha256',secret).update(payload).digest('hex');
 return payload+'.'+mac;
}
export function isAdmin(){
 const value=cookies().get(name)?.value||'';
 const [payload,mac]=value.split('.');
 if(!payload||!mac||!/^[a-f0-9]{64}$/.test(mac))return false;
 const exp=Number(payload);
 if(!Number.isSafeInteger(exp)||exp<Date.now()||exp>Date.now()+9*60*60*1000)return false;
 const secret=process.env.CLUBE_ADMIN_SESSION_SECRET||'';
 if(!secret)return false;
 const computed=createHmac('sha256',secret).update(payload).digest('hex');
 return timingSafeEqual(Buffer.from(mac),Buffer.from(computed));
}
export const sessionCookie=name;
export function sameOrigin(request:Request){
 const origin=request.headers.get('origin');
 if(!origin)return false;
 try{return new URL(origin).host===new URL(request.url).host&&new URL(origin).protocol==='https:';}catch{return false;}
}
