'use client';
import {useState,type FormEvent} from 'react';
const capitalizar=(v:string)=>v.replace(/(^|[\s'/-])(\p{L})/gu,(_,sep:string,letra:string)=>sep+letra.toLocaleUpperCase('pt-BR'));
export default function Ficha({protocolo}:{protocolo:string}){
 const [dados,setDados]=useState({razao:'',nomeFantasia:'',responsavel:'',cnpj:'',endereco:'',cidade:'',cep:'',telefone:'',email:'',site:'',atividade:'',tempo:''});
 const [refs,setRefs]=useState([{empresa:'',contato:'',telefone:''},{empresa:'',contato:'',telefone:''},{empresa:'',contato:'',telefone:''}]);
 const [perfil,setPerfil]=useState('Empresa');
 const [declaracao,setDeclaracao]=useState(false),[autoriza,setAutoriza]=useState(false),[enviando,setEnviando]=useState(false),[ok,setOk]=useState(false),[erro,setErro]=useState('');
 const classe='mt-2 w-full rounded-lg border border-slate-300 p-3 bg-white text-slate-900';
 const atualizar=(campo:keyof typeof dados,valor:string)=>setDados(p=>({...p,[campo]:valor}));
 async function enviar(e:FormEvent<HTMLFormElement>){
 e.preventDefault();if(enviando)return;setEnviando(true);setErro('');
 try{
  const response=await fetch('/api/clube-de-permutas/credenciamento',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...dados,perfil,protocolo,
   referencias:refs,declaracao,consentimentoReferencias:autoriza})});
  const json=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(json.erro||'Falha ao enviar.');
  setOk(true);
 }catch(e){setErro(e instanceof Error?e.message:'Não foi possível enviar.');}finally{setEnviando(false)}
 }
 if(!protocolo)return <p className="bg-amber-50 p-5 rounded-xl">Para preencher a ficha, realize primeiro o pré-cadastro. O link exclusivo aparecerá em seguida.</p>;
 if(ok)return <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8"><h2 className="text-2xl font-bold text-emerald-900">Ficha recebida para análise!</h2><p className="mt-3">Sua empresa ou atividade profissional ainda não está credenciada. A equipe verificará seus dados e referências antes da aprovação.</p><p className="mt-3 text-sm">Protocolo: {protocolo}</p></div>;
 return <form onSubmit={enviar} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm grid gap-5">
 <p className="bg-blue-50 border border-blue-200 text-blue-950 p-4 rounded-lg text-sm">Segunda etapa obrigatória para credenciamento. Os dados serão analisados; nenhum perfil será considerado validado automaticamente.</p>
 <label className="font-semibold">Tipo de participante<select className={classe} value={perfil} onChange={e=>setPerfil(e.target.value)}><option>Empresa</option><option>Profissional Liberal</option></select></label>
 {([
  ['razao','Razão social ou nome completo do profissional liberal',true],
  ['nomeFantasia','Nome fantasia',false],
  ['responsavel','Nome do responsável',true],
  ['endereco','Endereço comercial completo (rua, número, bairro, complemento)',true],
  ['cidade','Cidade e UF',true],
  ['cep','CEP',true],
  ['telefone','Telefone comercial / WhatsApp',true],
  ['email','E-mail do pré-cadastro',true],
  ['cnpj',perfil==='Empresa'?'CNPJ da empresa':'CPF ou CNPJ do profissional liberal',true],
  ['site','Site ou rede social profissional',false],
  ['atividade','Ramo de atividade e produtos ou serviços prestados',true],
  ['tempo','Tempo de atuação',true],
 ] as [keyof typeof dados,string,boolean][]).map(([key,title,required])=><label className="font-semibold" key={key}>{title}<input className={classe} required={required} type={key==='email'?'email':'text'} maxLength={key==='endereco'?250:250} value={dados[key]} onChange={e=>atualizar(key,e.target.value)} onBlur={()=>{if(!['email','cnpj','cep','telefone','site'].includes(key))atualizar(key,capitalizar(dados[key]));}}/></label>)}
 <div><h2 className="text-xl font-black">Três referências comerciais</h2><p className="text-sm text-slate-600 mt-2">Informe três empresas ou clientes comerciais que possam confirmar a existência e a atuação do seu negócio. Obtenha autorização para compartilhar os contatos.</p></div>
 {refs.map((ref,i)=><fieldset key={i} className="rounded-xl border border-slate-200 p-4 grid gap-3"><legend className="font-bold px-2">Referência {i+1}</legend>
 {([['empresa','Empresa ou cliente'],['contato','Pessoa de contato'],['telefone','Telefone profissional']] as [keyof typeof ref,string][]).map(([key,label])=><label key={key} className="font-medium">{label}<input required maxLength={120} className={classe} value={ref[key]} onChange={e=>setRefs(prev=>prev.map((r,j)=>j===i?{...r,[key]:e.target.value}:r))} onBlur={()=>{if(key!=='telefone')setRefs(prev=>prev.map((r,j)=>j===i?{...r,[key]:capitalizar(r[key])}:r));}}/></label>)}</fieldset>)}
 <label className="flex items-start gap-3 text-sm"><input className="mt-1" type="checkbox" required checked={declaracao} onChange={e=>setDeclaracao(e.target.checked)}/><span>Declaro que os dados são verdadeiros, represento legitimamente a empresa ou atividade informada e autorizo a verificação cadastral.</span></label>
 <label className="flex items-start gap-3 text-sm"><input className="mt-1" type="checkbox" required checked={autoriza} onChange={e=>setAutoriza(e.target.checked)}/><span>Confirmo ter autorização para compartilhar os dados profissionais das referências comerciais, exclusivamente para análise do credenciamento.</span></label>
 <button disabled={enviando} type="submit" className="bg-emerald-800 text-white rounded-xl p-4 font-black disabled:opacity-60">{enviando?'ENVIANDO FICHA...':'ENVIAR FICHA PARA VERIFICAÇÃO'}</button>
 {erro&&<p role="alert" className="text-red-800 bg-red-50 p-4 rounded-lg">{erro}</p>}
 <p className="text-sm text-slate-500">Não envie senhas, fotos de documentos ou dados bancários neste formulário. O CPF ou CNPJ informado será usado somente para credenciamento e verificação. Seus dados não serão divulgados no marketplace sem aprovação.</p>
 </form>
}