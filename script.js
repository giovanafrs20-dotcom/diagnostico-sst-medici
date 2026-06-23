const perguntas = [

{
pergunta:"Sua empresa mantém a documentação de saúde e segurança dos colaboradores atualizada?",
opcoes:[
{texto:"Sim", pontos:0},
{texto:"Parcialmente", pontos:5},
{texto:"Não", pontos:10}
]
},

{
pergunta:"Os colaboradores realizam os exames ocupacionais obrigatórios?",
opcoes:[
{texto:"Todos realizam", pontos:0},
{texto:"Apenas alguns", pontos:5},
{texto:"Não realizam", pontos:10}
]
},

{
pergunta:"Sua empresa possui controle dos riscos existentes no ambiente de trabalho?",
opcoes:[
{texto:"Sim", pontos:0},
{texto:"Parcialmente", pontos:5},
{texto:"Não", pontos:10}
]
},

{
pergunta:"Os treinamentos obrigatórios dos colaboradores estão em dia?",
opcoes:[
{texto:"Sim", pontos:0},
{texto:"Alguns estão vencidos", pontos:5},
{texto:"Não estão em dia", pontos:10}
]
},

{
pergunta:"Sua empresa possui controle da entrega de EPIs?",
opcoes:[
{texto:"Sim", pontos:0},
{texto:"Parcialmente", pontos:5},
{texto:"Não", pontos:10}
]
},

{
pergunta:"Você tem segurança de que sua empresa atende às exigências do eSocial relacionadas à SST?",
opcoes:[
{texto:"Sim", pontos:0},
{texto:"Tenho dúvidas", pontos:5},
{texto:"Não", pontos:10}
]
},

{
pergunta:"Sua empresa já recebeu alguma notificação ou fiscalização trabalhista?",
opcoes:[
{texto:"Nunca", pontos:0},
{texto:"Sim, mas foi resolvida", pontos:5},
{texto:"Sim, ainda existem pendências", pontos:10}
]
},

{
pergunta:"Existe alguém responsável pela saúde e segurança do trabalho na empresa?",
opcoes:[
{texto:"Sim", pontos:0},
{texto:"Parcialmente", pontos:5},
{texto:"Não", pontos:10}
]
},

{
pergunta:"Você sabe quais são os principais riscos trabalhistas e previdenciários da sua empresa?",
opcoes:[
{texto:"Sim", pontos:0},
{texto:"Em parte", pontos:5},
{texto:"Não", pontos:10}
]
},

{
pergunta:"Se sua empresa fosse fiscalizada hoje, você acredita que estaria preparada?",
opcoes:[
{texto:"Sim", pontos:0},
{texto:"Tenho dúvidas", pontos:5},
{texto:"Não", pontos:10}
]
}

];

let perguntaAtual = 0;
let pontuacao = 0;
let respostaSelecionada = null;

const API_URL = "https://script.google.com/macros/s/AKfycbyPWKizxKP4Q5cQFCp6pmyU4Ku4RhihxUSU4CYXa9QpNt9qqmk5DWfth2H40U9xqLqR/exec";

function iniciarDiagnostico(){

const nome = document.getElementById("nome").value.trim();
const empresa = document.getElementById("empresa").value.trim();
const whatsapp = document.getElementById("whatsapp").value.trim();
const email = document.getElementById("email").value.trim();

if(!nome || !empresa || !whatsapp || !email){
alert("Preencha todos os campos.");
return;
}

document.getElementById("inicio").classList.remove("active");
document.getElementById("quiz").classList.add("active");

carregarPergunta();
}

function carregarPergunta(){

const atual = perguntas[perguntaAtual];

document.getElementById("contador").innerText =
`Pergunta ${perguntaAtual+1} de ${perguntas.length}`;

document.getElementById("pergunta").innerText =
atual.pergunta;

document.getElementById("progresso").style.width =
`${((perguntaAtual+1)/perguntas.length)*100}%`;

const opcoes = document.getElementById("opcoes");

opcoes.innerHTML = "";

respostaSelecionada = null;

atual.opcoes.forEach(opcao=>{

const div = document.createElement("div");

div.className = "opcao";

div.innerText = opcao.texto;

div.onclick = ()=>{

document
.querySelectorAll(".opcao")
.forEach(o=>o.classList.remove("selecionada"));

div.classList.add("selecionada");

respostaSelecionada = opcao.pontos;

};

opcoes.appendChild(div);

});

}

function proximaPergunta(){

if(respostaSelecionada===null){
alert("Selecione uma resposta.");
return;
}

pontuacao += respostaSelecionada;

perguntaAtual++;

if(perguntaAtual < perguntas.length){

carregarPergunta();

}else{

mostrarResultado();

}

}

function mostrarResultado(){

document.getElementById("quiz")
.classList.remove("active");

document.getElementById("resultado")
.classList.add("active");

let titulo = "";
let texto = "";
let emoji = "";
let resultadoTexto = "";

if(pontuacao <= 20){

emoji = "🟢";

titulo = "BAIXO RISCO";

resultadoTexto = "Baixo Risco";

texto = `
Parabéns!

Sua empresa apresenta boa conformidade com os requisitos de SST.

A Medici pode ajudá-lo a manter esse padrão de excelência.
`;

}else if(pontuacao <= 50){

emoji = "🟡";

titulo = "ATENÇÃO";

resultadoTexto = "Atenção";

texto = `
Sua empresa possui pontos que merecem atenção.

A correção preventiva reduz riscos trabalhistas e previdenciários.

Solicite uma avaliação gratuita da Medici.
`;

}else{

emoji = "🔴";

titulo = "ALTO RISCO";

resultadoTexto = "Alto Risco";

texto = `
Sua empresa apresenta não conformidades importantes.

Isso pode gerar autuações, passivos trabalhistas e inconsistências no eSocial.

Recomendamos uma análise especializada.
`;

}

document.getElementById("iconeResultado").innerText = emoji;

document.getElementById("tituloResultado").innerText = titulo;

document.getElementById("pontuacaoFinal").innerHTML =
`Pontuação: <strong>${pontuacao} pontos</strong>`;

document.getElementById("textoResultado").innerText = texto;

const mensagem = encodeURIComponent(
`Olá, realizei o Diagnóstico Empresarial de SST da Medici.\n\nResultado: ${resultadoTexto}\nPontuação: ${pontuacao} pontos.\n\nGostaria de receber uma avaliação gratuita.`
);

document.getElementById("btnWhatsapp").href =
`https://wa.me/5595991543486?text=${mensagem}`;

salvarLead(resultadoTexto);

}

function salvarLead(resultadoTexto){

fetch(API_URL,{
method:"POST",
body:JSON.stringify({

nome:document.getElementById("nome").value,

empresa:document.getElementById("empresa").value,

whatsapp:document.getElementById("whatsapp").value,

email:document.getElementById("email").value,

pontuacao:pontuacao,

resultado:resultadoTexto

})

})
.catch(error=>console.log(error));

}