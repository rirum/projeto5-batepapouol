let usuario = {"name":''};
let usuarioOnline = false;
entrar();


function entrar() {
    let nomeUsuario = window.prompt("Qual é o seu nome?");
    usuario = {"name": nomeUsuario};
    const entrar = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);
    entrar.then(entraSala);
    entrar.catch(erroSala);
}




function entraSala() {
    usuarioOnline = true;
   
}



    function erroSala() {
        usuarioOnline = false;
        alert("Já existe um usuário com esse nome, por favor escolha outro");
        entrar();
    }

    function verificaUsuario(){
        const verifica = axios.get('https://mock-api.driven.com.br/api/v6/uol/status', usuario);
        setInterval(verifica, 5000);
    } 

function pegarMensagens(){
    const mensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    mensagens.then(printMsg);
   
}


function printMsg(){
    
}



    /** 1- guardar nome em uma variavel OK
     *  2- utilizar nome no chat OK
     *  3- guardar nome na API
     *      3.1 - puxar API pro projeto
     *      3.2 - pegar as respostas da API para o chat
     *      3.3 - puxar o chat para o projeto
     


    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(processarResposta);

    function processarResposta(resposta) {
        console.log(resposta.data);
    }
    */

    /**
     * para saber se o usuário online 3segundos
     * 
     * https://mock-api.driven.com.br/api/v6/uol/status
     */