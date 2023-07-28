//Algorítimo

//CALCULADORAIMC
// 1. Pegar os valores
// 2. Caluclar IMC
// 3. Gerar a classificação do IMC
// 4. Organizar as informações
// 5. Salvar os dados na lista
// 6. Ler a lista com os dados
// 7. Renderizar o conteúdo no HTML
// 8. BOTÃO Limpar os registros


// Função Principal
function calcularImc(event) {
    //event.preventDefault() //= prevenir o carregamento da página automaticamente.

    console.log("Funcionante!!!");

    let dadosUsuarios = pegarValores();

    let imc = calcular(dadosUsuarios.altura, dadosUsuarios.peso);

    let classificacaoImc = classificarImc(imc);

    let dadosUsuarioAtualizado = organizarDados(dadosUsuarios, imc, classificacaoImc);

    cadastrarUsuario(dadosUsuarioAtualizado);



}

// Passo 1. Pegar os valores

function pegarValores() {
    let nomeRecebido = document.getElementById("nome").value.trim();
    let alturaRecebido = parseFloat(document.getElementById("altura").value);
    let pesoRecebido = parseFloat(document.getElementById("peso").value)


    let dadosUsuarios = {
        nome: nomeRecebido,
        altura: alturaRecebido,
        peso: pesoRecebido
    }

    console.log(dadosUsuarios);

    return dadosUsuarios;
}

// Passo 2. Caluclar IMC

function calcular(altura, peso) {
    let imc = peso / (altura * altura)

    console.log(imc);

    return imc;
}


// Passo 3. Gerar a classificação do IMC

function classificarImc(imc) {
    /* 
    Resultado               Situação
    Abaixo de 18,5          Filezinho!!!
    Entre 18,5 e 24,99      Diliça!!!
    Entre 25 e 29,99        Tá TOP!!!
    Acima de 30             Oh lá em casa!!!
    */

    if (imc < 18.5) {
        return "Filezinho!!!"
    } else if (imc < 25) {
        return "Diliça!!!"
    } else if (imc < 30) {
        return "Tá TOP!!!"
    } else {
        return "Oh lá em casa!!!"
    }
}

// Passo 4. Organizar as informações

function organizarDados(dadosUsuarios, valorImc, classificarImc) {
    let dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());

    let dadosUsuarioAtualizado = {
        ...dadosUsuarios,
        imc: valorImc.toFixed(2),
        classificacao: classificarImc,
        dataCadastro: dataHoraAtual
    }

    console.log(dadosUsuarioAtualizado);

    return dadosUsuarioAtualizado;
}

// Passo 5. Salvar os dados na lista

function cadastrarUsuario(usuario) {
let listaUsuarios = [];

if (localStorage.getItem("usuariosCadastrados")) {
    listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
}

listaUsuarios.push(usuario)

localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

// Passo 6. Ler a lista com os dados

function carregarUsuarios() {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }
    
    if (listaUsuarios.length == 0) {
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuário cadastrado!</td>
    </tr>`
    }else{
        montarTabela(listaUsuarios);
    }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());

// Passo 7. Renderizar o conteúdo no HTML (MONTAR TABELA)

function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById("corpo-tabela");

    let template = '';

    listaDeCadastrados.forEach(pessoa => {
        
        template += `<tr>
        <td data-cell="nome">${pessoa.nome}</td>
        <td data-cell="altura">${pessoa.altura}</td>
        <td data-cell="peso">${pessoa.peso}</td>
        <td data-cell="valor do IMC">${pessoa.imc}1</td>
        <td data-cell="classificação do IMC">${pessoa.classificacao}</td>
        <td data-cell="data de cadastro">${pessoa.dataCadastro}</td>
    </tr>`;

    });
    
    tabela.innerHTML = template; 
}

// Passo 8. BOTÃO Limpar os registros (storage)

function deletarRegistros() {
    localStorage.removeItem("usuariosCadastrados")
    window.location.reload();
}
