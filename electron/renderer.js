
let myName = "";

// Adiciona nome
document.getElementById('btnEnter').addEventListener("click", () => {
    const nameInput = document.getElementById('nameInput')
    const name = nameInput.value.trim();

    if (!name) {
        alert("Digite seu nome");
        return;
    }

    myName = name;
    nameInput.disabled = true;
    chatArea.style.display = "block";
})

// Envia mensagem
document.getElementById('sendBtn').addEventListener("click", async () => {
    const texto = document.getElementById('msgInput').value.trim();

    if (!texto) return;

    const dataAtual = new Date();
    const mensagem = {
        name: myName,
        text: texto,
        time: dataAtual.toLocaleDateString('pt-BR') + ' - ' + dataAtual.toLocaleTimeString('pt-BR')
    }

    // Chama a função do preload
    await window.api.salvarMensagem(mensagem)

    msgInput.value = ""
})


// Ajusta formato da mensagem
function appendMessage(m, isMine) {
    const p = document.createElement("div");
    p.classList.add("message")
    p.classList.add(isMine ? "msg-me" : "msg-other")
    p.innerHTML = `<strong> ${m.name}</strong>
    <small style="float.right"> ${m.time}</small>
    <div> ${m.text}</div>`;

    messageDiv.appendChild(p);
}

// Recebe a lista de mensagens
async function carregarMensagens() {
    // Limpa tudo
    messageDiv.innerHTML = "";

    // Chama a função do preload
    const mensagens = await window.api.listarMensagens()

    mensagens.forEach(m => {
        appendMessage(m, m.name === myName)
    })

    messageDiv.scrollTop = messageDiv.scrollHeight;

    setTimeout(carregarMensagens, 2000)
}

document.addEventListener("DOMContentLoaded", () => {
    carregarMensagens()
})

