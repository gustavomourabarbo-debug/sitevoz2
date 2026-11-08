# PERMUVOZ (PV) — desenho operacional preliminar
Nome provisório sujeito a busca de marca no INPI. A unidade é escritural, restrita ao clube e não resgatável em reais. Paridade de referência proposta: 1 PV corresponde a R$ 1 em valores contratualmente pactuados, sem direito de resgate ou conversão.

## Segurança antes de ativar saldos reais
- Identidade autenticada e autorizada de associado, sem confiar em identificadores ou valores enviados apenas pelo navegador.
- Verificação de identidade e análise comercial conforme risco; termos aceitos, LGPD, regras fiscais e tributárias.
- Registro de lançamento contábil em razão dupla (débito/crédito com soma zero), valores inteiros em centésimos de PV, transação atômica e chave de idempotência.
- Sem emissão de saldo por anúncio ou cadastro; sem saldo negativo nem antecipação sem política específica e análise jurídica.
- Escrow/Reserva: antes do aceite, bloquear saldo do comprador; somente liberar ao vendedor mediante confirmação, disputa ou procedimento de resolução documentado.
- Registro imutável dos eventos (criação, proposta, aceite, confirmação, cancelamento, contestação), autor, timestamp e protocolo.
- Comissões em reais, cobradas por provedor autorizado após apresentação e aceite das condições.
- Controles de chargeback, fraude, duplicidade, abuso, limitações e conciliação.
- Proteção contra acesso a registros pessoais de outros associados; segregação administrador/associado; auditoria de todos os acessos de administração.
- A base de pré-cadastro atual em Vercel Blob não é um ledger transacional. Não utilizar Blob como banco de lançamentos monetários concorrentes.

## Estados das negociações
RASCUNHO → PROPOSTA → ACEITA_PELAS_PARTES → SALDO_RESERVADO → ENTREGA_CONFIRMADA → CONCLUIDA.
Pode passar para CANCELADA ou EM_DISPUTA com regras explícitas.
Cada operação possui participantes, oferta, valores em PV, eventual diferença em reais, obrigação fiscal, taxa/forma de cobrança, prazos e comprovantes.

## Indicadores
Volume de ofertas, propostas, conversão, valor de permutas concluídas, volume de PV em circulação, créditos disponíveis/reservados, comissões a receber, comissões efetivamente pagas, disputas, cancelamentos.

## Estado da implantação
Página pública explicativa e simulador; nenhum saldo real nem transferência habilitados. Próxima fase depende de datastore transacional, autenticação, revisão jurídico-fiscal e integração com pagamentos.