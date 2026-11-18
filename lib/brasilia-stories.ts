export type BrasiliaStory = {
 slug:string;title:string;sub:string;date:string;image:string;alt:string;credit:string;imageDate:string;paras:string[];
};
export const brasiliaStories:BrasiliaStory[]=[
{
 slug:"celina-leao-estadio-sobradinho-17-novembro",
 title:"Celina Leão entrega nova pista de atletismo e iluminação em Sobradinho",
 sub:"Reforma de R$ 5,5 milhões no Estádio Augustinho Lima amplia a estrutura para esportistas e moradores.",
 date:"17/11/2026",
 image:"https://agenciabrasilia.df.gov.br/documents/d/guest/whatsapp-image-2026-11-17-at-19-59-00-jpeg",
 alt:"Celina Leão na entrega da pista de atletismo no Estádio Augustinho Lima, em Sobradinho, em 17/11/2026",
 credit:"Joel Rodrigues / Agência Brasília",
 imageDate:"Foto do evento de 17/11/2026",
 paras:[
 "O Estádio Augustinho Lima, em Sobradinho, iniciou uma nova etapa de utilização esportiva nesta terça-feira, 17 de novembro. A governadora Celina Leão participou da entrega da pista oficial de atletismo e do sistema de iluminação reformulado, intervenção que soma R$ 5,5 milhões em investimentos divulgados pelo Governo do Distrito Federal.",
 "A recuperação da pista, de aproximadamente R$ 2,61 milhões, contempla oito raias e estruturas preparadas para provas de salto e lançamento. O revestimento sintético e as adaptações técnicas ampliam as possibilidades de treinamento de atletas profissionais e de formação. Na prática, a qualidade de uma pista pública pode influenciar a regularidade de exercícios e a preparação de novas gerações.",
 "Na iluminação foram aplicados cerca de R$ 2,89 milhões, incluindo 84 refletores de LED e a atualização de componentes elétricos. A melhoria deve permitir treinos em horários alternativos, uma demanda importante para estudantes e trabalhadores que não conseguem frequentar o estádio durante o expediente.",
 "O complexo é referência para esportistas de Sobradinho, Planaltina, Paranoá e municípios do Entorno, além de integrar a trajetória do marchador Caio Bonfim. A administração esportiva informa que o acesso da comunidade à pista será organizado por cadastro e horários, medida voltada a conciliar uso público e conservação.",
 "O alcance da entrega dependerá agora da rotina de manutenção, da transparência dos horários disponíveis e da participação dos moradores. Obra esportiva bem-sucedida é aquela que continua acessível depois da cerimônia e transforma estrutura física em oportunidades concretas de prática e formação."
]
},
{
 slug:"upa-estrutural-obra-65-leitos",
 title:"Estrutural se prepara para receber sua primeira UPA, com 65 leitos",
 sub:"Projeto de R$ 18 milhões no Jóquei avança e pode reduzir deslocamentos em busca de atendimento de urgência.",
 date:"18/11/2026",
 image:"https://www.agenciabrasilia.df.gov.br/documents/d/guest/dentro-3-49-jpg",
 alt:"Fotografia documental divulgada sobre a ampliação da estrutura de atendimento de urgência no Distrito Federal",
 credit:"Lúcio Bernardo Jr. / Agência Brasília",
 imageDate:"Imagem divulgada em 18/11/2026; data da captura não confirmada",
 paras:[
 "A primeira Unidade de Pronto Atendimento da Estrutural avança em uma das regiões onde a distância até o socorro pesa no cotidiano das famílias. Localizada na Rua Pônei 7, no Jóquei, a construção foi apresentada nesta quarta-feira, 18 de novembro, com investimento aproximado de R$ 18 milhões.",
 "O planejamento prevê 2,6 mil metros quadrados e 65 leitos modulares para atendimento adulto e pediátrico. Esses números descrevem a capacidade projetada; a UPA ainda está em obras e não representa leitos já disponíveis para utilização.",
 "Entre os trabalhos atuais estão alvenarias, contrapisos e instalações hidrossanitárias e elétricas. A unidade faz parte de um conjunto de seis estruturas em construção no DF, que também inclui Águas Claras, Água Quente, Guará, Sol Nascente e Taguatinga.",
 "O projeto contempla ambientes clínicos, de repouso, recuperação e radiologia, além de soluções para uso mais eficiente de energia. Para quem hoje precisa se deslocar a outras regiões durante a noite, a principal expectativa é a proximidade do atendimento.",
 "O benefício concreto dependerá da conclusão da obra, da contratação ou organização de equipes e do fornecimento de equipamentos. O desafio será transformar a capacidade anunciada em serviço regular, com rapidez, acolhimento e integração à rede de urgência."
]
},
{
 slug:"upa-planaltina-triagem-tempo-espera",
 title:"Planaltina reforça triagem e organiza horários para reduzir espera na UPA",
 sub:"Unidade que recebe cerca de 220 pacientes por dia busca melhorar o fluxo sem abandonar a prioridade dos casos graves.",
 date:"18/11/2026",
 image:"https://agenciabrasilia.df.gov.br/documents/d/guest/img_0569-1-jpg",
 alt:"Profissional de enfermagem mede a pressão arterial de paciente durante atendimento na UPA",
 credit:"Divulgação / IgesDF",
 imageDate:"Imagem divulgada em 18/11/2026; data da captura não confirmada",
 paras:[
 "O primeiro atendimento em uma UPA determina quais casos precisam de assistência imediata e quais podem aguardar com segurança. Em Planaltina, onde são realizados aproximadamente 220 atendimentos diários, a administração iniciou ajustes na classificação de risco e no retorno de pacientes para medicação.",
 "A avaliação inicial pela equipe de enfermagem costuma levar entre três e dez minutos. Ela considera os sintomas e os sinais de gravidade, não apenas a ordem de chegada. Em períodos de maior procura, a unidade reforça os profissionais da triagem para acelerar essa etapa.",
 "Para usuários de menor complexidade que necessitam retornar exclusivamente para receber medicamentos, foram organizados períodos de atendimento entre 8h e 9h, 14h e 15h e 20h e 21h, sempre de acordo com a orientação individual recebida na unidade.",
 "A reorganização busca evitar filas em momentos de pico e permitir que a equipe se prepare para os procedimentos agendados. Isso não altera a prioridade de quem chega em situação grave nem substitui a avaliação médica.",
 "A eficiência das mudanças deverá ser acompanhada por indicadores de espera e satisfação dos pacientes. O desafio de uma unidade pública é combinar velocidade com segurança clínica, respeitando o risco de cada quadro."
]
}
];
export const brasiliaStory=(slug:string)=>brasiliaStories.find(a=>a.slug===slug);
