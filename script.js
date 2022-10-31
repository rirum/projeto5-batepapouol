let usuario = {name:''};
entrar();
pegarMensagens();


function entrar() {
    let nomeUsuario = window.prompt("Qual é o seu nome?");
    usuario = {"name": nomeUsuario};
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario)
   .then((response) => {})
   .catch((error) => {
    erroSala();
   });
}




    function erroSala() {
        usuarioOnline = false;
        alert("Já existe um usuário com esse nome, por favor escolha outro");
        entrar();
    }

    function verificaUsuario(){
        axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usuario)
        .then((responde)=> {

        }).catch((error) => {
            entrar();
        });
    } 

   



function pegarMensagens(){
    const chat = document.querySelector('.chat');

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

        const ultimaMensagem = chat.lastElementChild;
        ultimaMensagem.scrollIntoView();
    }).catch((error) => {
        console.log(error);
    });

   
}


function enviarMensagem(){
    const inputTexto = document.querySelector('input');

    if(inputTexto.value){
        axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', 
        {from: usuario.name,
            to: "Todos",
            text: inputTexto.value,
            type: "message"

        })
        .then((response) => {
            inputTexto.value = null;
        })
        .catch((error)=> {
            window.location.reload();

        });
    }
    
}

setInterval (() => {
    pegarMensagens();
}, 3000);

setInterval(() => {    
    verificaUsuario();    
}, 5000);