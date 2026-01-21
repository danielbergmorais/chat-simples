const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("api", {
    listarMensagens: () => ipcRenderer.invoke("listar-mensagens"),
    salvarMensagem: (data) => ipcRenderer.invoke("salvar-mensagem", data)
})
