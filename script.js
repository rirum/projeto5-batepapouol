let usuario = {name:''};
let usuarioOnline = false;
const chat = document.querySelector('.chat');
entrar();
pegarMensagens();


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
        const verifica = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usuario);
        setInterval(verifica, 5000);
    } 

function pegarMensagens(mensagem){
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages').then((response) => {
        const mensagens = response.data;
        chat.innerHTML =""

        for (let i = 0; i < mensagens.length; i++){
    const mensagem = mensagens[i];
    if(mensagem.type === "status") {
        chat.innerHTML += `
        <div class="status ${mensagem.type}">
        <div class="time"> (${mensagem.time}) </div>
        <div class="from"> <strong>${mensagem.from}</strong> </div>
        <div class="text"> ${mensagem.text} </div>
        </div>`
    } else if (mensagem.type === "message") {
        chat.innerHTML += `
        <div class="status ${mensagem.type}">
        <div class="time"> (${mensagem.time}) </div>
        <div class="from"> <strong>${mensagem.from}</strong> para <strong>${mensagem.to}:</strong> ${mensagem.text}  </div>
       
        </div>
        `
    } else if (mensagem.type === "private_message" && mensagem.to == usuario) {
        chat.innerHTML += `
        <div class="mensagem-reservada ${mensagem.type}">
        <div class="time"> (${mensagem.time}) </div>
        <div class="from"> <strong>${mensagem.from}</strong> reservadamente para <strong>${mensagem.to}:</strong> ${mensagem.text} </div>
        <div class="text"> ${mensagem.text} </div>
        </div>
        `
    }
        }
    }).catch((error) => {
        console.log(error);
    });

   chat.scrollIntoView();
}




    /** 1- guardar nome em uma variavel OK
     *  2- utilizar nome no chat OK
     *  3- guardar nome na API
     *      3.1 - puxar API pro projeto
     *      3.2 - pegar as respostas da API para o chat
     *      3.3 - puxar o chat para o projeto
     * 
     * Separar as mensagens de sair entrar por type
Separar msg normal
Separar msg privada
Setar msg privada from - from
Antes modificar css (ver classes novas)
     


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