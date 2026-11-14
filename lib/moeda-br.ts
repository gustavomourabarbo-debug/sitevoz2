/** Máscara de moeda brasileira para formulários. Entrada em centavos; saída numérica em reais. */
export function formatarValorBR(entrada:string):string{
 const algarismos=entrada.replace(/\D/g,'').slice(0,11);
 if(!algarismos)return '';
 const centavos=Number(algarismos);
 return 'R$ '+(centavos/100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
}
export function valorBRParaNumero(entrada:string):number{
 const algarismos=entrada.replace(/\D/g,'');
 return algarismos?Number(algarismos)/100:0;
}
