'use client';
import {useState,useRef,useEffect,type FormEvent} from 'react';
const capitalizar=(v:string)=>v.replace(/(^|[\s'/-])(\p{L})/gu,(_,sep:string,letra:string)=>sep+letra.toLocaleUpperCase('pt-BR'));
const numeros=(valor:string,limite:number)=>valor.replace(/\D/g,'').slice(0,limite);
function formatarCnpj(valor:string){
 const n=numeros(valor,14);
 return n.replace(/^(\d{2})(\d)/,'$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3').replace(/\.(\d{3})(\d)/,'.$1/$2').replace(/(\d{4})(\d)/,'$1-$2');
}
function formatarCpf(valor:string){
 const n=numeros(valor,11);
 return n.replace(/^(\d{3})(\d)/,'$1.$2').replace(/^(\d{3})\.(\d{3})(\d)/,'$1.$2.$3').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
const formatarDocumento=(valor:string,perfil:string)=>perfil==='Empresa'||numeros(valor,14).length>11?formatarCnpj(valor):formatarCpf(valor);
export default function Ficha({protocolo}:{protocolo:string}){
 const [dados,setDados]=useState({razao:'',nomeFantasia:'',responsavel:'',cnpj:'',endereco:'',numero:'',complemento:'',bairro:'',cidade:'',cep:'',telefone:'',email:'',site:'',atividade:'',tempo:''});
 const [refs,setRefs]=useState([{empresa:'',contato:'',telefone:''},{empresa:'',contato:'',telefone:''},{empresa:'',contato:'',telefone:''}]);
 const [perfil,setPerfil]=useState('Empresa');
 const [declaracao,setDeclaracao]=useState(false),[autoriza,setAutoriza]=useState(false),[enviando,setEnviando]=useState(false),[ok,setOk]=useState(false),[erro,setErro]=useState('');
 const [consultandoCep,setConsultandoCep]=useState(false),[avisoCep,setAvisoCep]=useState('');
 const ultimaBuscaCep=useRef('');
 const confirmacaoRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(ok){
   const id=requestAnimationFrame(()=>{
    confirmacaoRef.current?.scrollIntoView({behavior:'smooth',block:'start'});
    confirmacaoRef.current?.focus({preventScroll:true});
   });
   return ()=>cancelAnimationFrame(id);
  }
 },[ok]);
 const classe='mt-2 w-full rounded-lg border border-slate-300 p-3 bg-white text-slate-900';
 const atualizar=(campo:keyof typeof dados,valor:string)=>setDados(p=>({...p,[campo]:valor}));
 async function consultarCep(valor:string){
  const cep=numeros(valor,8);
  if(cep.length!==8)return;
  if(ultimaBuscaCep.current===cep)return;
  ultimaBuscaCep.current=cep;setConsultandoCep(true);setAvisoCep('');
  try{
   const resposta=await fetch('https://viacep.com.br/ws/'+cep+'/json/',{cache:'no-store'});
   if(!resposta.ok)throw new Error('Consulta indisponível. Preencha o endereço manualmente.');
   const endereco=await resposta.json();
   if(endereco.erro)throw new Error('CEP não encontrado. Confira os números.');
   setDados(prev=>{
    if(numeros(prev.cep,8)!==cep)return prev;
    return {...prev,cep:cep.slice(0,5)+'-'+cep.slice(5),
      endereco:endereco.logradouro||prev.endereco,bairro:endereco.bairro||prev.bairro,
      cidade:endereco.localidade&&endereco.uf?endereco.localidade+' / '+endereco.uf:prev.cidade};
   });
   setAvisoCep(endereco.logradouro?'Endereço localizado. Confira os dados e informe o número.':'CEP localizado. Complete rua, bairro e número.');
  }catch(err){ultimaBuscaCep.current='';setAvisoCep(err instanceof Error?err.message:'Não foi possível consultar o CEP.');}
  finally{setConsultandoCep(false);}
 }
 function alterarCep(valor:string){
  const n=numeros(valor,8);
  atualizar('cep',n.length>5?n.slice(0,5)+'-'+n.slice(5):n);
  if(n.length===8)void consultarCep(n);
  else{ultimaBuscaCep.current='';setAvisoCep('');}
 }
 async function enviar(e:FormEvent<HTMLFormElement>){
 e.preventDefault();if(enviando)return;setEnviando(true);setErro('');
 try{
  const response=await fetch('/api/clube-de-permutas/credenciamento',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...dados,endereco:[dados.endereco,dados.numero,dados.complemento,dados.bairro].filter(Boolean).join(', '),perfil,protocolo,
   referencias:refs,declaracao,consentimentoReferencias:autoriza})});
  const json=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(json.erro||'Falha ao enviar.');
  setOk(true);
 }catch(e){setErro(e instanceof Error?e.message:'Não foi possível enviar.');}finally{setEnviando(false)}
 }
 if(!protocolo)return <p className="bg-amber-50 p-5 rounded-xl">Para preencher a ficha, realize primeiro o pré-cadastro. O link exclusivo aparecerá em seguida.</p>;
 if(ok)return <div ref={confirmacaoRef} tabIndex={-1} role="status" className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 scroll-mt-36 focus:outline-none"><h2 className="text-2xl font-bold text-emerald-900">Ficha recebida para análise!</h2><p className="mt-3">Sua empresa ou atividade profissional ainda não está credenciada. A equipe verificará seus dados e referências antes da aprovação.</p><p className="mt-3 text-sm font-semibold break-all">Protocolo: {protocolo}</p><a className="inline-block mt-5 bg-emerald-800 text-white font-bold px-5 py-3 rounded-lg" href={'/clube-de-permutas/consulta?protocolo='+encodeURIComponent(protocolo)}>ACOMPANHAR MEU CADASTRO</a><p className="mt-3 text-sm text-emerald-900">Guarde seu protocolo. Os dados estão disponíveis à equipe no painel administrativo restrito.</p></div>;
 return <form onSubmit={enviar} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm grid gap-5">
 <p className="bg-blue-50 border border-blue-200 text-blue-950 p-4 rounded-lg text-sm">Segunda etapa obrigatória para credenciamento. Os dados serão analisados; nenhum perfil será considerado validado automaticamente.</p>
 <label className="font-semibold">Tipo de participante<select className={classe} value={perfil} onChange={e=>{setPerfil(e.target.value);atualizar('cnpj','');}}><option>Empresa</option><option>Profissional Liberal</option></select></label>
 {([
  ['razao','Razão social ou nome completo do profissional liberal',true],
  ['nomeFantasia','Nome fantasia',false],
  ['responsavel','Nome do responsável',true],
  ['cep','CEP',true],
  ['endereco','Rua / logradouro',true],
  ['numero','Número',true],
  ['complemento','Complemento',false],
  ['bairro','Bairro',true],
  ['cidade','Cidade e UF',true],
  ['telefone','Telefone comercial / WhatsApp',true],
  ['email','E-mail do pré-cadastro',true],
  ['cnpj',perfil==='Empresa'?'CNPJ da empresa':'CPF ou CNPJ do profissional liberal',true],
  ['site','Site ou rede social profissional',false],
  ['atividade','Ramo de atividade e produtos ou serviços prestados',true],
  ['tempo','Tempo de atuação',true],
 ] as [keyof typeof dados,string,boolean][]).map(([key,title,required])=><label className="font-semibold" key={key}>{title}<input className={classe} required={required} type={key==='email'?'email':'text'} maxLength={key==='endereco'?250:250} value={dados[key]} onChange={e=>key==='cep'?alterarCep(e.target.value):key==='cnpj'?atualizar(key,formatarDocumento(e.target.value,perfil)):atualizar(key,e.target.value)} onBlur={()=>{if(key==='cep')void consultarCep(dados.cep);else if(!['email','cnpj','telefone','site'].includes(key))atualizar(key,capitalizar(dados[key]));}} placeholder={key==='cep'?'00000-000':key==='cnpj'?(perfil==='Empresa'?'00.000.000/0000-00':'000.000.000-00 ou 00.000.000/0000-00'):undefined} inputMode={['cep','cnpj','telefone'].includes(key)?'numeric':undefined}/>{key==='cep'&&<span className="block mt-1 text-sm text-slate-600" role="status">{consultandoCep?'Consultando endereço...':avisoCep}</span>}</label>)}
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