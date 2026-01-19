const btnEnter = document.getElementById('btnEnter');
const nameInput = document.getElementById('nameInput');
const chatArea = document.getElementById('chatArea');
const messageDiv = document.getElementById('messageDiv');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');

const sendNewChat = document.getElementById('sendNewChat');// não foi declarado

let myName = "";

btnEnter.addEventListener("click", () => {
    const n = nameInput.value.trim();
    if (!n) {
        alert("digite seu nome");
        return;
    }
    myName = n;
    nameInput.disabled = true;
    chatArea.style.display = "block";

    console.log(myName)
})

sendNewChat.addEventListener("click", () => {
    chatArea.style.display = "block";
    carregarHistorico();
})

//Enviar mensagem
sendBtn.addEventListener("click", () => {
    const txt = msgInput.value.trim();
    if (!txt) return;

    const dataAtual = new Date();
    const mensagem = {
        name: myName,
        text: txt,
        time: dataAtual.toLocaleDateString('pt-BR') + ' - ' + dataAtual.toLocaleTimeString('pt-BR')
    }
    console.log(mensagem);
    salvarHIstorico(mensagem)
    msgInput.value = ""
})

// Receber mensagem
// window.chatAPI.onMessage((mensagem) => {
//     appendMessage(mensagem, mensagem.name === myName)
// })


function appendMessage(m, isMine) {
    const p = document.createElement("div");
    p.classList.add("message")
    p.classList.add(isMine ? "msg-me" : "msg-other")
    p.innerHTML = `<strong> ${m.name}</strong>
    <small style="float.right"> ${m.time}</small>
    <div> ${m.text}</div>`;

    messageDiv.appendChild(p);
}

function salvarHIstorico(mensagem) {
    let historico = JSON.parse(localStorage.getItem("chatHistorico")) || [];
    historico.push(mensagem);

    localStorage.setItem("chatHistorico", JSON.stringify(historico));
}

function carregarHistorico() {
    let historico = JSON.parse(localStorage.getItem("chatHistorico")) || [];
    historico.forEach(m => {
        appendMessage(m, m.name === myName)
    })
}

// Nova adição
document.addEventListener("DOMContentLoaded", () => {
    // Assim que carrega a pagina chama a função recorrente para atualizar
    atualizaChat()
})

function atualizaChat() {
    messageDiv.innerHTML = "";// Limpa tudo
    carregarHistorico()// Carrega tudo da memoria

    setTimeout(atualizaChat, 2000)// A cada 2 segundos atualiza o chat
    console.log('Atualizei')
}