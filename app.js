const mensagemErro = document.querySelector("#mensagemErro");
const cepbusca = document.querySelector("#cep");
const logradouro = document.querySelector("#logradouro");
const bairro = document.querySelector("#bairro");
const localidade = document.querySelector("#localidade");
const uf = document.querySelector("#uf");
const btnBuscar = document.querySelector("#botao_buscar");
const btnLimpar = document.querySelector("#botao_limpar");
const btnSalvar = document.querySelector("#botao_salvar");
let endereco;

btnBuscar.addEventListener('click', (e) => {
    e.preventDefault();
    try {
        validaCEP();
    } catch (erro) {
        mensagemErro.innerHTML = erro.message;
    }
})

btnLimpar.addEventListener('click', () => {
    limparCampos();
})

btnSalvar.addEventListener('click', () => {
    alert("Dados salvos com sucesso!!!");
    limparCampos();
})

function preencherCampos(endereco) {
    for (const campo in endereco) {
        if (document.querySelector("#" + campo)) {
            document.querySelector("#" + campo).value = endereco[campo];
        }
    }
}

function buscaEndereco() {
    fetch(`https://viacep.com.br/ws/${cepbusca.value}/json`)
        //resposta
        .then((resposta) => {
            return resposta.json();
        })
        .then((endereco) => {
            preencherCampos(endereco);
        })
        .catch((erro) => {
            console.error(erro);
        })
}

function validaCEP() {
    const regex = /^\d{8}$/;
    if (regex.test(cepbusca.value)) {
        buscaEndereco();
    } else {
        throw new Error("CEP inválido");
    }
}

function limpaCampos() {
    cepbusca.value = "";
    logradouro.value = "";
    bairro.value = "";
    localidade.value = "";
    uf.value = "";
    mensagemErro.innerHTML = "";
}